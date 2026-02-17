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
          token = request.cookies.get("sessionToken")?.value;
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
      } catch (err) {
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
 * Middleware wrapper for protected routes
 */
export function withAuth(
  handler: (
    request: NextRequest,
    user: { userId: string; email: string; role: string },
  ) => Promise<NextResponse>,
) {
  return async (request: NextRequest) => {
    const user = await verifyAuth(request);

    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 },
      );
    }

    return handler(request, user);
  };
}

/**
 * Middleware wrapper for admin-only routes
 */
export function withAdmin(
  handler: (
    request: NextRequest,
    user: { userId: string; email: string; role: string },
  ) => Promise<NextResponse>,
) {
  return async (request: NextRequest) => {
    const user = await verifyAuth(request);

    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 },
      );
    }

    if (user.role !== "admin") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 },
      );
    }

    return handler(request, user);
  };
}

/**
 * Middleware wrapper for Author or Admin routes
 */
export function withAuthorOrAdmin(
  handler: (
    request: NextRequest,
    user: { userId: string; email: string; role: string },
  ) => Promise<NextResponse>,
) {
  return async (request: NextRequest) => {
    const user = await verifyAuth(request);

    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 },
      );
    }

    if (user.role !== "admin" && user.role !== "Author") {
      return NextResponse.json(
        { error: "Author or Admin access required" },
        { status: 403 },
      );
    }

    return handler(request, user);
  };
}
