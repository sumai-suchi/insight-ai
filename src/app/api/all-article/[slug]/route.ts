// src/app/api/all-article/[slug]/route.ts

import NewArticle from "@/lib/models/NewArticle";
import connectMongo from "@/lib/mongoose-connect/connect-db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectMongo();
    const { slug } = await params;

    // DEBUG: Log the slug to make sure it's arriving correctly
    console.log("Searching for slug:", slug);

    // CHANGE: Remove 'isPublished: true' temporarily to see if it finds the article at all
    const article = await NewArticle.findOne({ slug })
      .populate("author", "name avatar role")
      .populate("category", "name slug");

    if (!article) {
      return NextResponse.json(
        { success: false, message: `Article with slug "${slug}" not found in DB` },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: article });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}