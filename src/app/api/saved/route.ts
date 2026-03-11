import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/mongoose-connect/connect-db";
import UserProfile from "@/lib/models/UserProfile";


export async function POST(req: NextRequest) {
  try {
    await connectMongo();

    const { userId, postId } = await req.json();

    if (!userId || !postId) {
      return NextResponse.json(
        { error: "userId and postId are required" },
        { status: 400 },
      );
    }

    const updated = await UserProfile.findByIdAndUpdate(
      userId,
      { $addToSet: { savedPosts: postId } },
      { new: true },
    );

    if (!updated) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (err) {
    console.error("Saved Post Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

