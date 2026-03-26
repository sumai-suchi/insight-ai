// components/dashboard/StatCards.tsx
"use client";

import { Card } from "@/components/ui/EditorCard";
import type { DashboardStats } from "@/types/editor";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface StatCardsProps {
  stats: DashboardStats;
}

interface StatConfig {
  label: string;
  value: number;
  sub: string;
  subColor: string;
  href: string;
}

export function StatCards({ stats }: StatCardsProps) {
  const router = useRouter();

    if (!stats) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-24 bg-gray-100 rounded-xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  const cards: StatConfig[] = [
    {
      label: "In review",
      value: stats?.inReview ?? 0,
      sub: `${stats?.urgentReview ?? 0} urgent`,
      subColor: "text-amber-600",
      href: "/editor/review-queue",
    },
    {
      label: "Drafts",
      value: stats?.drafts ?? 0,               // ← was stats.drafts
      sub: `${stats?.aiDrafts ?? 0} AI-generated`, // ← was stats.aiDrafts
      subColor: "text-blue-600",
      href: "/editor/drafts",
    },
    {
      label: "Published today",
      value: stats?.publishedToday ?? 0,        // ← was stats.publishedToday
      sub: `+${(stats?.publishedToday ?? 0) - (stats?.publishedYesterday ?? 0)} vs yesterday`,
      subColor: "text-green-600",
      href: "/editor/published",
    },
    {
      label: "Scheduled",
      value: stats?.scheduled ?? 0,             // ← was stats.scheduled
      sub: `Next in ${stats?.nextScheduledIn ?? "—"}`,
      subColor: "text-blue-600",
      href: "/editor/scheduled",
    },
    {
      label: "Flagged comments",
      value: stats?.flaggedComments ?? 0,       // ← was stats.flaggedComments
      sub: "Needs action",
      subColor: "text-red-600",
      href: "/editor/comments",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {cards.map((card) => (
        <button
          key={card.label}
          onClick={() => router.push(card.href)}
          className="text-left"
        >
          <Card className="hover:border-gray-200 transition-colors cursor-pointer h-full">
            <p className="text-[11px] text-gray-500 mb-2 uppercase tracking-wide">
              {card.label}
            </p>
            <p className="text-[26px] font-medium text-gray-900 leading-none">
              {card.value}
            </p>
            <p className={cn("text-[11px] mt-1.5", card.subColor)}>
              {card.sub}
            </p>
          </Card>
        </button>
      ))}
    </div>
  );
}