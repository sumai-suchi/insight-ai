"use client";

import {
  FileText,
  Clock,
  CheckCircle2,
  CalendarClock,
  MessageSquareWarning,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";
import type { DashboardStats } from "@/types/editor";

interface StatCardsProps {
  stats: DashboardStats;
}

interface CardDef {
  label: string;
  key: keyof Omit<DashboardStats, "deltas">;
  icon: React.ElementType;
  color: string;
  bg: string;
  description: string;
}

const CARDS: CardDef[] = [
  {
    label: "In Review",
    key: "inReview",
    icon: Clock,
    color: "text-amber-600",
    bg: "bg-amber-50",
    description: "Articles awaiting editor review",
  },
  {
    label: "Drafts",
    key: "drafts",
    icon: FileText,
    color: "text-zinc-500",
    bg: "bg-zinc-100",
    description: "Unpublished drafts by all authors",
  },
  {
    label: "Published Today",
    key: "publishedToday",
    icon: CheckCircle2,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    description: "Articles that went live today",
  },
  {
    label: "Scheduled",
    key: "scheduled",
    icon: CalendarClock,
    color: "text-blue-600",
    bg: "bg-blue-50",
    description: "Queued for future publishing",
  },
  {
    label: "Flagged Comments",
    key: "flaggedComments",
    icon: MessageSquareWarning,
    color: "text-red-500",
    bg: "bg-red-50",
    description: "Comments pending moderation",
  },
];

function Delta({ value }: { value?: number }) {
  if (value === undefined || value === 0)
    return (
      <span className="flex items-center gap-0.5 text-xs text-zinc-400">
        <Minus className="w-3 h-3" /> No change
      </span>
    );

  const isUp = value > 0;
  return (
    <span
      className={`flex items-center gap-0.5 text-xs font-medium ${
        isUp ? "text-emerald-600" : "text-red-500"
      }`}
    >
      {isUp ? (
        <TrendingUp className="w-3 h-3" />
      ) : (
        <TrendingDown className="w-3 h-3" />
      )}
      {Math.abs(value)} this week
    </span>
  );
}

export function StatCards({ stats }: StatCardsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-1">
      {CARDS.map(({ label, key, icon: Icon, color, bg, description }) => {
        const value = stats[key] as number;
        const delta = stats.deltas?.[key as keyof typeof stats.deltas];

        return (
          <div
            key={key}
            className="bg-white rounded-2xl border border-zinc-100 p-4 flex flex-col gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default"
          >
            <div className="flex items-center justify-between">
              <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center`}>
                <Icon className={`w-4.5 h-4.5 ${color}`} strokeWidth={2} />
              </div>
              <Delta value={delta} />
            </div>

            <div>
              <p className="text-2xl font-bold text-zinc-900 leading-none">
                {value.toLocaleString()}
              </p>
              <p className="text-xs font-medium text-zinc-500 mt-1">{label}</p>
            </div>

            <p className="text-[11px] text-zinc-400 leading-snug">{description}</p>
          </div>
        );
      })}
    </div>
  );
}