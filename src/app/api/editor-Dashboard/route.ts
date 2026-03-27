// app/api/dashboard/route.ts

import { NextResponse } from "next/server";
import type { ApiResponse, DashboardStats, ActivityItem } from "@/types/editor";

// ─── swap these with your real Mongoose models ───────────────────────────────
// import Article from "@/models/Article";
// import Comment from "@/models/Comment";
// import { connectDB } from "@/lib/db";
// ─────────────────────────────────────────────────────────────────────────────

import {
  mockStats, mockReviewQueue, mockScheduled,
  mockActivity, mockComments,
} from "@/lib/mockData/editor";

export async function GET() {
  try {
    // ── when your DB is ready, replace this block ──────────────────────────
    // await connectDB();
    // const [inReview, drafts, publishedToday, scheduled, flagged] =
    //   await Promise.all([
    //     Article.countDocuments({ status: "in_review" }),
    //     Article.countDocuments({ status: "draft" }),
    //     Article.countDocuments({
    //       status: "published",
    //       publishedAt: { $gte: startOfToday() },
    //     }),
    //     Article.countDocuments({ status: "scheduled" }),
    //     Comment.countDocuments({ flag: { $ne: "none" }, status: "pending" }),
    //   ]);         
    // ── end DB block ────────────────────────────────────────────────────────

    return NextResponse.json({
      success: true,
      data: {
        stats: mockStats,
        reviewQueue: mockReviewQueue.slice(0, 5),
        scheduled: mockScheduled,
        activity: mockActivity,
        comments: mockComments,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to load dashboard" },
      { status: 500 }
    );
  }
}