import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/mongoose-connect/connect-db"; // Your DB connection helper
import NewArticle from "@/lib/models/NewArticle";

export async function GET(request: NextRequest) {
  try {
    await connectMongo();

    // 1. Extract Query Params from the URL
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "6");
    const search = searchParams.get("search") || "";

    const skip = (page - 1) * limit;

    // 2. Build Query
    const query: any = { status: "published" };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
      ];
    }

    // 3. Fetch Data & Total Count in parallel for better performance
    const [articles, totalArticles] = await Promise.all([
      NewArticle.find(query)
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("author", "name avatar"),
      NewArticle.countDocuments(query),
    ]);
    console.log(articles)

    // 4. Return Response
    return NextResponse.json({
      success: true,
      data: articles,
      pagination: {
        totalItems: totalArticles,
        totalPages: Math.ceil(totalArticles / limit),
        currentPage: page,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Server Error", error: error.message },
      { status: 500 }
    );
  }
}