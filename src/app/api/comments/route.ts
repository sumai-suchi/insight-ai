import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/mongoose-connect/connect-db";
import Comment from "@/lib/models/Comments";
import NewArticle from "@/lib/models/NewArticle";
import mongoose from "mongoose";

export async function GET(request: NextRequest) {
  try {
    await connectMongo();
    const { searchParams } = new URL(request.url);
    const articleId = searchParams.get("articleId");

    if (!articleId || !mongoose.Types.ObjectId.isValid(articleId)) {
      return NextResponse.json({ success: false, message: "Valid Article ID required" }, { status: 400 });
    }

    const comments = await Comment.find({ articleId: new mongoose.Types.ObjectId(articleId) })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, data: comments });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectMongo();
    const body = await request.json();
    const { articleId, content, user, parentId } = body;

    // Validation
    if (!articleId || !content || !user) {
      return NextResponse.json({ success: false, message: "Missing fields" }, { status: 400 });
    }

    // 1. Prepare data (Cast strings to ObjectIds)
    const commentData: any = {
      articleId: new mongoose.Types.ObjectId(articleId),
      content,
      user,
      parentId: parentId ? new mongoose.Types.ObjectId(parentId) : null
    };

    // 2. Create the comment
    const newComment = await Comment.create(commentData);

    // 3. Increment the count (Make sure 'NewArticle' matches your collection)
    await NewArticle.findByIdAndUpdate(articleId, {
      $inc: { commentCount: 1 }
    });

    return NextResponse.json({ success: true, data: newComment });
  } catch (error: any) {
    console.error("POST Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}