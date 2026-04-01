import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/mongoose-connect/connect-db";
import Comment from "@/lib/models/Comments";

export async function GET(request: NextRequest) {
  try {
    await connectMongo();
    const { searchParams } = new URL(request.url);
    
    // Get status from query: ?status=pending
    const status = searchParams.get("status") || "pending";

    // Fetch comments matching the status, populated with article info if needed
    const comments = await Comment.find({ status })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ 
      success: true, 
      count: comments.length,
      data: comments 
    });
  } catch (error: any) {
    console.error("Fetch Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}