// app/api/user/get/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/mongoose-connect/connect-db";
import { UserCurd } from "@/lib/mongoose-connect/User";

export async function POST(req: NextRequest) {
  try {
    // Parse JSON body to get the user ID
    const body = await req.json();
    console.log("Received request body:", body); // Debug log
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Connect to MongoDB
    await connectMongo();

    // Find the user by ID
    const user = await UserCurd.findById(id).lean();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return the user data
    return NextResponse.json(user);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}