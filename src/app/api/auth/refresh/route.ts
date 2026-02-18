import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/lib/models/User";
import {
  verifyRefreshToken,
  generateSessionToken,
  generateRefreshToken,
} from "@/lib/auth/jwt";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // Get refresh token from cookie or body
    const refreshToken =
      request.cookies.get("refreshToken")?.value ||
      (await request.json()).refreshToken;

    if (!refreshToken) {
      return NextResponse.json(
        { error: "Refresh token is required" },
        { status: 401 }
      );
    }

    // Verify refresh token
    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded) {
      return NextResponse.json(
        { error: "Invalid or expired refresh token" },
        { status: 401 }
      );
    }

    // Verify user still exists
    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 401 }
      );
    }

    // Generate new tokens
    const tokenPayload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    const newSessionToken = generateSessionToken(tokenPayload);
    const newRefreshToken = generateRefreshToken(tokenPayload);

    // Return new tokens
    const response = NextResponse.json(
      {
        success: true,
        sessionToken: newSessionToken,
        refreshToken: newRefreshToken,
      },
      { status: 200 }
    );

    // Set HTTP-only cookies for new tokens
    response.cookies.set("sessionToken", newSessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60, // 15 minutes
    });

    response.cookies.set("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 2 * 60 * 60, // 2 hours
    });

    return response;
  } catch (error) {
    console.error("Token refresh error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to refresh token" },
      { status: 500 }
    );
  }
}

