// app/api/articles/[id]/review/route.ts

import { NextRequest, NextResponse } from "next/server";
// import Article from "@/models/Article";
// import { connectDB } from "@/lib/db";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { decision, note } = await req.json();
    // decision: "approve" | "reject" | "request_changes"

    // ── DB version ──────────────────────────────────────────────────────────
    // await connectDB();
    // const statusMap = {
    //   approve:          "approved",
    //   reject:           "rejected",
    //   request_changes:  "draft",
    // };
    // const article = await Article.findByIdAndUpdate(
    //   params.id,
    //   { status: statusMap[decision], reviewNote: note },
    //   { new: true }
    // );
    // if (!article) return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
    // ── end DB block ─────────────────────────────────────────────────────────

    // mock response
    return NextResponse.json({
      success: true,
      data: { id: params.id, decision, note },
      message: `Article ${decision}d successfully`,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Review action failed" },
      { status: 500 }
    );
  }
}