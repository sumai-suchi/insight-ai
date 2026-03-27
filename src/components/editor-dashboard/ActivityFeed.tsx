// components/dashboard/ActivityFeed.tsx
"use client";

import { useRouter } from "next/navigation";
import { Card, CardHeader } from "@/components/ui/EditorCard";
import type { ActivityItem } from "@/types/editor";
import { timeAgo } from "@/lib/utils/editor";
import { cn } from "@/lib/utils";

const iconMap: Record<ActivityItem["type"], { bg: string; path: string }> = {
  published: {
    bg: "bg-green-50",
    path: "M2 7l3.5 3.5L12 3",
  },
  submitted: {
    bg: "bg-amber-50",
    path: "M8 2v4l2.5 2.5M8 14A6 6 0 108 2a6 6 0 000 12z",
  },
  flagged: {
    bg: "bg-red-50",
    path: "M8 5v4M8 11v1M3 8a5 5 0 1010 0A5 5 0 003 8z",
  },
  scheduled: {
    bg: "bg-violet-50",
    path: "M3 6h10M5 3v3M9 3v3M3 9h2v2H3zm4 0h2v2H7zm4 0h2v2h-2z",
  },
  approved: {
    bg: "bg-teal-50",
    path: "M2 7l3.5 3.5L12 3",
  },
  rejected: {
    bg: "bg-red-50",
    path: "M4 4l8 8M12 4l-8 8",
  },
};

const iconColorMap: Record<ActivityItem["type"], string> = {
  published: "stroke-green-600",
  submitted: "stroke-amber-600",
  flagged:   "stroke-red-600",
  scheduled: "stroke-violet-600",
  approved:  "stroke-teal-600",
  rejected:  "stroke-red-600",
};

export function ActivityFeed({ items }: { items: ActivityItem[] }) {
  const router = useRouter();
  return (
    <Card>
      <CardHeader
        title="Activity feed"
        action={
          <button
            onClick={() => router.push("/editor/notifications")}
            className="text-[12px] text-blue-600 hover:text-blue-700"
          >
            All →
          </button>
        }
      />
      <div className="space-y-0">
        {items.map((item, i) => {
          const icon = iconMap[item.type];
          return (
            <div
              key={item._id}
              className={cn(
                "flex gap-3 py-3 items-start",
                i < items.length - 1 && "border-b border-gray-50"
              )}
            >
              <div
                className={cn(
                  "w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5",
                  icon.bg
                )}
              >
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  className={cn("w-3.5 h-3.5", iconColorMap[item.type])}
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={icon.path} />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] text-gray-800 leading-snug">
                  {item.message}
                </p>
                <p className="text-[11px] text-gray-400 mt-1">
                  {timeAgo(item.createdAt)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}