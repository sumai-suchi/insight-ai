import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, extractTokenFromHeader } from "./jwt";
import connectDB from "../db";
import User from "../models/User";

export interface AuthRequest extends NextRequest {
  user?: {
    userId: string;
    email: string;
    role: string;
  };
}

/**
 * Middleware to verify authentication
 * Returns the user payload if authenticated, null otherwise
 */
export async function verifyAuth(
  request: NextRequest,
): Promise<{ userId: string; email: string; role: string } | null> {
  try {
    // Get token from Authorization header or cookie
    const authHeader = request.headers.get("authorization");
    let token = extractTokenFromHeader(authHeader);

    // If no token from header, try cookies. `request.cookies` may be undefined
    // when a plain Request is passed in (some server helpers create a Request
    // and cast to NextRequest). Fallback to parsing the Cookie header.
    if (!token) {
      try {
        if (request.cookies && typeof request.cookies.get === "function") {
          token = request.cookies.get("sessionToken")?.value ?? null;
        } else {
          const cookieHeader = request.headers.get("cookie") || "";
          const match = cookieHeader
            .split(";")
            .map((c) => c.trim())
            .find((c) => c.startsWith("sessionToken="));
          if (match) {
            token = decodeURIComponent(match.split("=").slice(1).join("="));
          }
        }
      } catch {
        // ignore and continue
      }
    }

    if (!token) {
      return null;
    }

    // Verify token
    const decoded = verifySessionToken(token);
    if (!decoded) {
      return null;
    }

    // Optionally verify user still exists in database
    await connectDB();
    const user = await User.findById(decoded.userId);
    if (!user) {
      return null;
    }

    return {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    };
  } catch (error) {
    console.error("Auth verification error:", error);
    return null;
  }
}

/**
 * Route handler type with user context
 */
type AuthenticatedHandler = (
  request: NextRequest,
  user: { userId: string; email: string; role: string },
) => Promise<NextResponse>;

/**
 * Route handlers object type
 */
type RouteHandlers = {
  GET?: AuthenticatedHandler;
  POST?: AuthenticatedHandler;
  PUT?: AuthenticatedHandler;
  DELETE?: AuthenticatedHandler;
  PATCH?: AuthenticatedHandler;
};

/**
 * Authorization options
 */
type AuthOptions = {
  requireAuth?: boolean;
  allowedRoles?: ("user" | "admin" | "Author")[];
};

/**
 * Creates a Proxy that intercepts route handler calls and applies authentication/authorization
 */
function createAuthProxy(
  handlers: RouteHandlers,
  options: AuthOptions = {},
): RouteHandlers {
  const { requireAuth = true, allowedRoles } = options;

  return new Proxy(handlers, {
    get(target, prop: string | symbol) {
      const handler = target[prop as keyof RouteHandlers];

      // If handler doesn't exist or is not a function, return as-is
      if (!handler || typeof handler !== "function") {
        return handler;
      }

      // Return a wrapped handler that checks auth before executing
      return async (request: NextRequest) => {
        // If auth is not required, execute handler directly
        if (!requireAuth) {
          return handler(request, {
            userId: "",
            email: "",
            role: "user",
          });
        }

        // Verify authentication
        const user = await verifyAuth(request);

        if (!user) {
          return NextResponse.json(
            { error: "Authentication required" },
            { status: 401 },
          );
        }

        // Check role authorization if specified
        if (allowedRoles && allowedRoles.length > 0) {
          if (!allowedRoles.includes(user.role as "user" | "admin" | "Author")) {
            return NextResponse.json(
              {
                error: `Access denied. Required roles: ${allowedRoles.join(", ")}`,
              },
              { status: 403 },
            );
          }
        }

        // Execute the original handler with authenticated user
        return handler(request, user);
      };
    },
  });
}

/**
 * Proxy-based middleware for protected routes
 * Usage: export const { GET, POST } = withAuth({ GET: handler, POST: handler })
 */
export function withAuth(handlers: RouteHandlers): RouteHandlers {
  return createAuthProxy(handlers, { requireAuth: true });
}

/**
 * Proxy-based middleware for admin-only routes
 * Usage: export const { GET, POST } = withAdmin({ GET: handler, POST: handler })
 */
export function withAdmin(handlers: RouteHandlers): RouteHandlers {
  return createAuthProxy(handlers, {
    requireAuth: true,
    allowedRoles: ["admin"],
  });
}

/**
 * Proxy-based middleware for Author or Admin routes
 * Usage: export const { GET, POST } = withAuthorOrAdmin({ GET: handler, POST: handler })
 */
export function withAuthorOrAdmin(handlers: RouteHandlers): RouteHandlers {
  return createAuthProxy(handlers, {
    requireAuth: true,
    allowedRoles: ["admin", "Author"],
  });
}

/**
 * Proxy-based middleware with custom authorization options
 * Usage: export const { GET } = withCustomAuth({ GET: handler }, { allowedRoles: ['admin', 'Author'] })
 */
export function withCustomAuth(
  handlers: RouteHandlers,
  options: AuthOptions,
): RouteHandlers {
  return createAuthProxy(handlers, options);
}
