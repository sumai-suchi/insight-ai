import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/mongoose-connect/connect-db";
import NewArticle from "@/lib/models/NewArticle";

// GET: Fetch all articles waiting for human review
export async function GET() {
  try {
    await connectMongo();
    const articles = await NewArticle.find({ status: "in_review" })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, data: articles });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// PATCH: Update Article Status (Publish / Reject)
export async function PATCH(request: NextRequest) {
  try {
    await connectMongo();
    const { articleId, action } = await request.json(); // action: "published" | "draft" | "rejected"

    const updatedArticle = await NewArticle.findByIdAndUpdate(
      articleId,
      { 
        status: action,
        publishedAt: action === "published" ? new Date().toISOString() : null 
      },
      { new: true }
    );

    return NextResponse.json({ success: true, data: updatedArticle });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}














































































































