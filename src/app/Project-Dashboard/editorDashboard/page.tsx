"use client";

// import { StatCards } from "@/components/editor-dashboard/StatCards";
// import { ReviewQueue } from "@/components/editor-dashboard/ReviewQueue";
// import { ScheduledToday }   from "@/components/editor-dashboard/ScheduledToday";
// import { ActivityFeed }     from "@/components/editor-dashboard/ActivityFeed";
// import { CommentsSnapshot } from "@/components/editor-dashboard/ComponentSnapShot";
// import { SeoHealth }        from "@/components/editor-dashboard/SeoHealth";
// import { Topbar }           from "@/components/layout/topbar";
import { useEffect, useState } from "react";
import type {
  DashboardStats,
  ReviewQueueItem,
  ScheduledArticle,
  ActivityItem,
  Comment,
} from "@/types/editor";
import { Topbar } from "@/components/editor-dashboard-Components/Topbar";
import { StatCards } from "@/components/editor-dashboard-Components/Statcards";
import { ReviewQueue } from "@/components/editor-dashboard-Components/Reviewqueue";
import { ScheduledToday } from "@/components/editor-dashboard-Components/Scheduledtoday";
// import { ActivityFeed } from "@/components/editor-dashboard-Components/Activityfeed";
import { CommentsSnapshot } from "@/components/editor-dashboard-Components/Componentsnapshot";
import { SeoHealth } from "@/components/editor-dashboard-Components/Seohealth";

// Typed shape of what the API returns inside "data"
interface DashboardPayload {
  stats:       DashboardStats;
  reviewQueue: ReviewQueueItem[];
  scheduled:   ScheduledArticle[];
  activity:    ActivityItem[];
  comments:    Comment[];
}

export default function EditorDashboardPage() {
  const [payload, setPayload] = useState<DashboardPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/editor-Dashboard");
        if (!res.ok) throw new Error("Failed to fetch dashboard data");
        const json = await res.json();
        // API returns { success: true, data: { stats, reviewQueue, ... } }
        setPayload(json.data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // ── loading skeleton ──────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="max-w-[2000px] mx-auto px-6">
        {/* topbar skeleton */}
        <div className="py-5 mb-1 h-16 bg-zinc-100 rounded-xl animate-pulse" />

        {/* stat cards skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-28 bg-zinc-100 rounded-2xl animate-pulse" />
          ))}
        </div>

        {/* main grid skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4 mt-4">
          <div className="h-96 bg-zinc-100 rounded-2xl animate-pulse" />
          <div className="flex flex-col gap-4">
            <div className="h-44 bg-zinc-100 rounded-2xl animate-pulse" />
            <div className="h-44 bg-zinc-100 rounded-2xl animate-pulse" />
          </div>
        </div>

        {/* bottom grid skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 pb-8">
          <div className="h-72 bg-zinc-100 rounded-2xl animate-pulse" />
          <div className="h-72 bg-zinc-100 rounded-2xl animate-pulse" />
        </div>
      </div>
    );
  }

  // ── error state ───────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="max-w-[2000px] mx-auto px-6 py-20 text-center">
        <div className="inline-flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center">
            <span className="text-2xl">⚠️</span>
          </div>
          <p className="text-sm font-medium text-zinc-700">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-[13px] px-4 py-2 bg-zinc-900 text-white rounded-xl hover:bg-zinc-700 transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  // ── dashboard ─────────────────────────────────────────────────────────────
  return (
    <div className="max-w-[2000px] mx-auto px-6 bg-zinc-50 min-h-screen">
      {/* topbar */}
      <Topbar editorName="Rafiul Ahmed" />

      {/* stat cards row */}
      <StatCards stats={payload!.stats} />

      {/* main content: review queue + sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4 mt-4">
        <ReviewQueue items={payload!.reviewQueue} />

        <div className="flex flex-col gap-4">
          <ScheduledToday items={payload!.scheduled} />
          {/* <ActivityFeed   items={payload!.activity} /> */}
        </div>
      </div>

      {/* bottom row: comments + seo */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 pb-8">
        <CommentsSnapshot comments={payload!.comments} />
        <SeoHealth      articles={payload!.scheduled} />
      </div>
    </div>
  );
}