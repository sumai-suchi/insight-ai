// app/api/editor-Dashboard/route.ts
// ─────────────────────────────────────────────────────────────────────────────
// Returns all data needed by the Editor Dashboard page in a single round-trip.
// Swap the mock imports for real Mongoose/Prisma queries when your DB is ready.
// ─────────────────────────────────────────────────────────────────────────────

import { NextResponse } from "next/server";
import type { ApiResponse, DashboardS, DashboardStats } from "@/types/editor";

// ── swap these with your real Mongoose / Prisma models ────────────────────────
import connectMongo from "@/lib/mongoose-connect/connect-db";
import NewArticle from "@/lib/models/NewArticle";
import Comment from "@/lib/models/Comments";
import User from "@/lib/models/User";

// ─────────────────────────────────────────────────────────────────────────────

// import {
//   mockStats,
//   mockReviewQueue,
//   mockScheduled,
//   mockActivity,
//   mockComments,
// } from "@/lib/mockData/editor";

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/editor-Dashboard
// ─────────────────────────────────────────────────────────────────────────────
export async function GET() {
  try {
    // ── DB version (uncomment when ready) ────────────────────────────────────
    await connectMongo();
    
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    
    const [inReview, drafts, publishedToday, scheduled, flaggedComments] =
      await Promise.all([
        NewArticle.countDocuments({ status: "in_review" }),
        NewArticle.countDocuments({ status: "draft" }),
        NewArticle.countDocuments({
          status: "published",
          publishedAt: { $gte: startOfToday },
        }),
        NewArticle.countDocuments({ status: "scheduled" }),
        Comment.countDocuments({ flag: { $ne: "none" }, status: "pending" }),
      ]);
    
    const stats: DashboardS = {
      inReview, drafts, publishedToday, scheduled, flaggedComments 
    };
    
    const [reviewQueue, scheduledArticles,  comments] =
      await Promise.all([
        NewArticle.find({ status: "in_review" })
          .sort({ submittedAt: -1 })
          .limit(8)
          .populate("author", "name avatar")
          .lean(),
        NewArticle.find({ status: "scheduled", scheduledAt: { $gte: startOfToday } })
          .sort({ scheduledAt: 1 })
          .populate("author", "name avatar")
          .lean(),
        // ActivityLog.find()
        //   .sort({ timestamp: -1 })
        //   .limit(10)
        //   .lean(),
        Comment.find({ status: "pending" })
          .sort({ createdAt: -1 })
          .limit(6)
          .lean(),
      ]);
    
    return NextResponse.json<ApiResponse>({
      success: true,
      data: { stats, reviewQueue, scheduled: scheduledArticles,  comments },
    });
    // ── end DB version ────────────────────────────────────────────────────────

    // ── Mock version ──────────────────────────────────────────────────────────
    // const data = {
    //   stats:       mockStats,
    //   reviewQueue: mockReviewQueue.slice(0, 6),
    //   scheduled:   mockScheduled,
    //   activity:    mockActivity,
    //   comments:    mockComments,
    // };

    // return NextResponse.json<ApiResponse<typeof data>>({
    //   success: true,
    //   data,
    // });
  } catch (error) {
    console.error("[editor-Dashboard] GET error:", error);
    return NextResponse.json<ApiResponse>(
      { success: false, message: "Failed to load dashboard data" },
      { status: 500 }
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// PATCH /api/editor-Dashboard
// Handles quick actions from the dashboard (approve / reject / delete comment).
// Body: { action: "approve_article" | "reject_article" | "approve_comment" |
//                  "reject_comment" | "delete_comment", id: string, meta?: string }
// ─────────────────────────────────────────────────────────────────────────────
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { action, id, meta } = body as {
      action: string;
      id: string;
      meta?: string;
    };

    if (!action || !id) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: "action and id are required" },
        { status: 400 }
      );
    }

    // ── DB version ────────────────────────────────────────────────────────────
    await connectMongo();
    switch (action) {
      case "approve_article":
        await NewArticle.findByIdAndUpdate(id, { status: "approved" });
        break;
      case "reject_article":
        await NewArticle.findByIdAndUpdate(id, { status: "rejected", rejectionReason: meta });
        break;
      case "approve_comment":
        await Comment.findByIdAndUpdate(id, { status: "approved" });
        break;
      case "reject_comment":
        await Comment.findByIdAndUpdate(id, { status: "rejected" });
        break;
      case "delete_comment":
        await Comment.findByIdAndDelete(id);
        break;
      default:
        return NextResponse.json({ success: false, message: "Unknown action" }, { status: 400 });
    }
    // ── end DB version ────────────────────────────────────────────────────────

    // Mock: just acknowledge
    // console.log(`[editor-Dashboard] PATCH action=${action} id=${id} meta=${meta}`);

    // return NextResponse.json<ApiResponse>({ success: true });
  } catch (error) {
    console.error("[editor-Dashboard] PATCH error:", error);
    return NextResponse.json<ApiResponse>(
      { success: false, message: "Action failed" },
      { status: 500 }
    );
  }
}