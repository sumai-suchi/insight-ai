import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Post from "@/lib/models/Post";

export async function GET(req: NextRequest) {
  await connectDB();
  const userId = req.nextUrl.searchParams.get("userId");
  const posts = await Post.find({ authorId: userId }).sort({ createdAt: -1 });
  return NextResponse.json({ posts });
}
