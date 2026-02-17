import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { verifyAuth } from "./middleware";
import connectDB from "../db";
import User from "../models/User";

/**
 * Get current session on the server side
 */
export async function getSession() {
  try {
    const headersList = await headers();
    const authHeader = headersList.get("authorization");
    const cookieHeader = headersList.get("cookie");

    // Create a mock request object for verifyAuth
    const request = new Request("http://localhost", {
      headers: {
        authorization: authHeader || "",
        cookie: cookieHeader || "",
      },
    }) as unknown as NextRequest;

    const user = await verifyAuth(request);

    if (!user) {
      return { user: null };
    }

    // Get full user data from database
    await connectDB();
    const userData = await User.findById(user.userId).select("-password");

    if (!userData) {
      return { user: null };
    }

    return {
      user: {
        _id: userData._id.toString(),
        name: userData.name,
        email: userData.email,
        role: userData.role,
        photoURL: userData.photoURL,
        createdAt: userData.createdAt,
      },
    };
  } catch (error) {
    console.error("Get session error:", error);
    return { user: null };
  }
}

/**
 * Sign out on the server side
 */
export async function signOut() {
  // This will be handled by the API route
  redirect("/sign-in");
}
