// FILE: app/api/articles/drafts/route.ts

import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/mongoose-connect/connect-db"; // ← adjust to your DB connection helper
import EditorArticle from "@/lib/models/NewArticle" // ← adjust to your model path

// ─── GET /api/articles/drafts ─────────────────────────────────────────────────
// Returns all articles with status === "draft", sorted newest first.
// Supports optional pagination: ?page=1&limit=12
// Supports optional search:     ?q=keyword
// ─────────────────────────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    await connectMongo();

    const { searchParams } = new URL(req.url);
    const page  = Math.max(1, parseInt(searchParams.get("page")  ?? "1", 10));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") ?? "12", 10)));
    const q     = searchParams.get("q")?.trim() ?? "";

    // Build query
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: Record<string, any> = { status: "draft" };

    if (q) {
      query.$or = [
        { title:           { $regex: q, $options: "i" } },
        { content:         { $regex: q, $options: "i" } },
        { focusKeyword:    { $regex: q, $options: "i" } },
        { category:        { $regex: q, $options: "i" } },
        { tags:            { $regex: q, $options: "i" } },
      ];
    }

    const [drafts, total] = await Promise.all([
      EditorArticle.find(query)
        .sort({ updatedAt: -1 })           // newest updated first
        .skip((page - 1) * limit)
        .limit(limit)
        .select(                           // only send what the list page needs
          "title metaDescription category tags featuredImage seoScore focusKeyword contentType updatedAt createdAt"
        )
        .lean(),
      EditorArticle.countDocuments(query),
    ]);
    console.log(drafts)

    return NextResponse.json({
      success: true,
      data: {
        drafts,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasNextPage: page < Math.ceil(total / limit),
          hasPrevPage: page > 1,
        },
      },
    });
  } catch (error) {
    console.error("[GET /api/articles/drafts]", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch drafts." },
      { status: 500 }
    );
  }
}