import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/mongoose-connect/connect-db";
import NewArticle from "@/lib/models/NewArticle";

export async function GET(
  request: NextRequest,
  // Change the type to Promise
  { params }: { params: Promise<{ slug: string }> } 
) {
  try {
    await connectMongo();

    // 1. You MUST await params in Next.js 15
    const resolvedParams = await params;
    const slug = resolvedParams.slug;

    console.log("Fetching Slug:", slug);

    // 2. Query the database
    const article = await NewArticle.findOne({ slug, status: "published" })
      .populate("author", "name avatar role")
      .populate("category", "name slug");

    if (!article) {
      return NextResponse.json(
        { success: false, message: `Article with slug "${slug}" not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: article });
  } catch (error: any) {
    console.error("Route Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}