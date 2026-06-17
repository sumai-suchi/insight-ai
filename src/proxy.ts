import { NextRequest, NextResponse } from "next/server";

// dont go without login
const protectedRoutes = [
  "/dashboard",
  "/dashboard/profile",
  "/dashboard/settings",
  "/dashboard/chat",
  "/dashboard/projects",
  "/Project-Dashboard",
];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Check if the route is protected
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!isProtected) return NextResponse.next();

  // Check session cookie
  const sessionCookie =
    req.cookies.get("better-auth.session_token") ||
    req.cookies.get("__Secure-better-auth.session_token");

  if (!sessionCookie) {
    // Redirect to sign-in with the desired page
    const redirectUrl = new URL("/auth/sign-in", req.url);
    redirectUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/Project-Dashboard/:path*"],
};

