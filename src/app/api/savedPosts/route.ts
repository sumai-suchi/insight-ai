import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import UserProfile from "@/lib/models/UserProfile";
import Post from "@/lib/models/Post";

// GET saved posts
export async function GET(req: NextRequest) {
  await connectDB();
  const userId = req.nextUrl.searchParams.get("userId");
  const userProfile = await UserProfile.findById(userId);
  const savedPosts = await Post.find({
    _id: { $in: userProfile?.savedPosts || [] },
  });
  return NextResponse.json({ savedPosts });
}

// POST add new saved post
export async function POST(req: NextRequest) {
  await connectDB();
  const { userId, postId } = await req.json();
  const updated = await UserProfile.findByIdAndUpdate(
    userId,
    { $addToSet: { savedPosts: postId } },
    { new: true },
  );
  return NextResponse.json(updated);
}
