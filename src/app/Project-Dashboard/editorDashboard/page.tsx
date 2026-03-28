"use client";

import { StatCards }        from "@/components/editor-dashboard/StatCards";
import { ReviewQueue }      from "@/components/editor-dashboard/ReviewQueue";
import { ScheduledToday }   from "@/components/editor-dashboard/ScheduledToday";
import { ActivityFeed }     from "@/components/editor-dashboard/ActivityFeed";
import { CommentsSnapshot } from "@/components/editor-dashboard/ComponentSnapShot";
import { SeoHealth }        from "@/components/editor-dashboard/SeoHealth";
import { Topbar }           from "@/components/layout/topbar";
import { useEffect, useState } from "react";
import type { DashboardStats, ReviewQueueItem, ScheduledArticle, ActivityItem, Comment } from "@/types/editor";

// typed shape of what the API returns inside "data"
interface DashboardPayload {
  stats:       DashboardStats;
  reviewQueue: ReviewQueueItem[];
  scheduled:   ScheduledArticle[];
  activity:    ActivityItem[];
  comments:    Comment[];
}

export default function EditorDashboardPage() {
  const [payload, setPayload] = useState<DashboardPayload | null>(null);
  const [loading, setLoading]  = useState(true);
  const [error, setError]      = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/editor-Dashboard");
        if (!res.ok) throw new Error("Failed to fetch dashboard data");
        const json = await res.json();
        // API returns { success: true, data: { stats, reviewQueue, ... } }
        // so we read json.data, not json directly
        setPayload(json.data);
    
      } catch (err: any) {
        setError(err.message ?? "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);
      console.log(payload)

  // ── loading skeleton ──────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="max-w-[2000px] mx-auto px-6">
        <div className="py-5 mb-1 h-16 bg-gray-100 rounded-xl animate-pulse" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4 mt-4">
          <div className="h-80 bg-gray-100 rounded-xl animate-pulse" />
          <div className="flex flex-col gap-4">
            <div className="h-40 bg-gray-100 rounded-xl animate-pulse" />
            <div className="h-40 bg-gray-100 rounded-xl animate-pulse" />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <div className="h-64 bg-gray-100 rounded-xl animate-pulse" />
          <div className="h-64 bg-gray-100 rounded-xl animate-pulse" />
        </div>
      </div>
    );
  }

  // ── error state ───────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="max-w-[2000px] mx-auto px-6 py-20 text-center">
        <p className="text-red-500 text-sm">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 text-[13px] px-4 py-2 bg-gray-900 text-white rounded-lg"
        >
          Retry
        </button>
      </div>
    );
  }

  // ── dashboard ─────────────────────────────────────────────────────────────
  return (
    <div className="max-w-[2000px] mx-auto px-6">
      <Topbar editorName="Rafiul Ahmed" />

      <StatCards stats={payload!.stats} />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4 mt-4">
        <ReviewQueue items={payload!.reviewQueue} />
        <div className="flex flex-col gap-4">
          <ScheduledToday items={payload!.scheduled} />
          <ActivityFeed items={payload!.activity} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 pb-8">
        <CommentsSnapshot comments={payload!.comments} />
        <SeoHealth articles={payload!.scheduled} />
      </div>
    </div>
  );
}