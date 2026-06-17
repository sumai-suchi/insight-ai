import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/mongoose-connect/connect-db";
import UserProfile from "@/lib/models/UserProfile";
import Post from "@/lib/models/Post";

// GET saved posts
export async function GET(req: NextRequest) {
  await connectMongo();
  const userId = req.nextUrl.searchParams.get("userId");
  const userProfile = await UserProfile.findById(userId);
  const savedPosts = await Post.find({
    _id: { $in: userProfile?.savedPosts || [] },
  });
  return NextResponse.json({ savedPosts });
}

// POST add new saved post
export async function POST(req: NextRequest) {
  await connectMongo();
  const { userId, postId } = await req.json();
  const updated = await UserProfile.findByIdAndUpdate(
    userId,
    { $addToSet: { savedPosts: postId } },
    { new: true },
  );
  return NextResponse.json(updated);
}
