import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/mongoose-connect/connect-db";
import NewArticle from "@/lib/models/NewArticle";

export async function GET(request: NextRequest) {
  try {
    await connectMongo();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "6");
    const skip = (page - 1) * limit;

    // Filter for Scheduled only
    const query = { status: "scheduled" };

    const [articles, total] = await Promise.all([
      NewArticle.find(query)
        .sort({ scheduledFor: 1 }) // Sort by soonest to go live
        .skip(skip)
        .limit(limit)
        .populate("author", "name avatar"),
      NewArticle.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      data: articles,
      pagination: {
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}