"use client";

import { CalendarClock, ChevronRight } from "lucide-react";
import type { ScheduledArticle } from "@/types/editor";

interface ScheduledTodayProps {
  items: ScheduledArticle[];
}

const CATEGORY_DOTS: Record<string, string> = {
  Health:     "bg-emerald-400",
  Technology: "bg-blue-400",
  Finance:    "bg-yellow-400",
  Lifestyle:  "bg-purple-400",
  Sports:     "bg-orange-400",
  Science:    "bg-cyan-400",
};
function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function ScheduledToday({ items }: ScheduledTodayProps) {
  const now = new Date();
  
  return (
    <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden">
      {/* header */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-zinc-50">
        <div className="flex items-center gap-2">
          <CalendarClock className="w-4 h-4 text-blue-500" />
          <h2 className="text-sm font-semibold text-zinc-900">Scheduled Today</h2>
        </div>
        <button className="flex items-center gap-0.5 text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors">
          All <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* timeline */}
      <div className="px-4 py-3 space-y-1">
        {items.length === 0 ? (
          <p className="text-xs text-zinc-400 py-4 text-center">
            Nothing scheduled for today
          </p>
        ) : (
          items.map((item) => {
            const scheduledDate = new Date(item.scheduledAt);
            const isPast = scheduledDate < now;
            const isNext =
              !isPast &&
              items.findIndex(
                (i) => new Date(i.scheduledAt) >= now
              ) === items.indexOf(item);
              const categoryName = typeof item.category === 'string' 
          ? item.category 
          : item.category.name;


            return (
              <div
                key={item.id}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ${
                  isNext
                    ? "bg-blue-50 ring-1 ring-blue-100"
                    : "hover:bg-zinc-50"
                }`}
              >
                {/* time */}
                <span
                  className={`text-[11px] font-semibold w-16 shrink-0 ${
                    isPast ? "text-zinc-300" : isNext ? "text-blue-600" : "text-zinc-500"
                  }`}
                >
                  {formatTime(item.scheduledAt)}
                </span>

                {/* dot */}
                <div
                  className={`w-2 h-2 rounded-full shrink-0 ${
                    isPast
                  ? "bg-zinc-200"
                  : CATEGORY_DOTS[categoryName] ?? "bg-zinc-300"
                  }`}
                />

                {/* title + author */}
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-xs font-medium truncate ${
                      isPast ? "text-zinc-400" : "text-zinc-800"
                    }`}
                  >
                    {item.title}
                  </p>
                  <p className="text-[10px] text-zinc-400">{item.author}</p>
                </div>

                {/* status pill */}
                {isPast ? (
                  <span className="text-[10px] bg-zinc-100 text-zinc-400 px-2 py-0.5 rounded-full font-medium shrink-0">
                    Done
                  </span>
                ) : isNext ? (
                  <span className="text-[10px] bg-blue-500 text-white px-2 py-0.5 rounded-full font-medium shrink-0 animate-pulse">
                    Next
                  </span>
                ) : null}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}