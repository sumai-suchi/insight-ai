"use client";

import { useState, useEffect } from "react";
import {
  CheckCheck,
  X,
  Eye,
  Clock,
  ChevronRight,
  Flame,
  ArrowUpCircle,
  Circle,
  ArrowDownCircle,
} from "lucide-react";
import type { ReviewQueueItem } from "@/types/editor";

interface ReviewQueueProps {
  items: ReviewQueueItem[];
}

type Priority = "urgent" | "high" | "normal" | "low";

// Define the shape of a single config entry
interface PriorityDetails {
  label: string;
  color: string;
  bg: string;
  border: string;
  icon: React.ElementType;
}

// FIX: Define it as a Record, not a function type
const PRIORITY_CONFIG: Record<Priority, PriorityDetails> = {
  urgent: {
    label: "Urgent",
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-100",
    icon: Flame,
  },
  high: {
    label: "High",
    color: "text-orange-500",
    bg: "bg-orange-50",
    border: "border-orange-100",
    icon: ArrowUpCircle,
  },
  normal: {
    label: "Normal",
    color: "text-blue-500",
    bg: "bg-blue-50",
    border: "border-blue-100",
    icon: Circle,
  },
  low: {
    label: "Low",
    color: "text-zinc-400",
    bg: "bg-zinc-50",
    border: "border-zinc-100",
    icon: ArrowDownCircle,
  },
};

const CATEGORY_COLORS: Record<string, string> = {
  Health: "bg-emerald-100 text-emerald-700",
  Technology: "bg-blue-100 text-blue-700",
  Finance: "bg-yellow-100 text-yellow-700",
  Lifestyle: "bg-purple-100 text-purple-700",
  Sports: "bg-orange-100 text-orange-700",
  Science: "bg-cyan-100 text-cyan-700",
};

const DEFAULT_CATEGORY_COLOR = "bg-zinc-100 text-zinc-600";

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export function ReviewQueue({ items }: ReviewQueueProps) {
  const [list, setList] = useState<ReviewQueueItem[]>(items);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [errorId, setErrorId] = useState<string | null>(null);

  useEffect(() => {
    setList(items);
  }, [items]);

  async function handleAction(
    id: string,
    action: "approve_article" | "reject_article"
  ) {
    setLoadingId(id);
    setErrorId(null);
    try {
      const res = await fetch("/api/editor-Dashboard", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, id }),
      });
      if (res.ok) {
        setList((prev) => prev.filter((item) => item.id !== id));
      } else {
        setErrorId(id);
      }
    } catch {
      setErrorId(id);
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden">
      {/* header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-50">
        <div>
          <h2 className="text-sm font-semibold text-zinc-900">Review Queue</h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            {list.length} article{list.length !== 1 ? "s" : ""} awaiting review
          </p>
        </div>
        <button className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors">
          View all <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* list */}
      <div className="divide-y divide-zinc-50">
        {list.length === 0 ? (
          <div className="py-16 text-center">
            <CheckCheck className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-zinc-500">All caught up!</p>
            <p className="text-xs text-zinc-400 mt-1">
              No articles in the queue.
            </p>
          </div>
        ) : (
          list.map((item,i) => {
           const priority = (item.priority as Priority) || "normal";
            const pConf = PRIORITY_CONFIG[priority];
           const PriorityIcon = pConf.icon;

            // Fix: Author is an object — extract name and avatar from it
            const authorName =
              typeof item.author === "string"
                ? item.author
                : item.author?.name ?? "Unknown";

            const authorAvatar =
              typeof item.author === "string"
                ? item.authorAvatar
                : item.author?.avatar ?? item.authorAvatar ?? null;

            // Fix: Category is an object — extract name string from it
            const categoryName =
              typeof item.category === "string"
                ? item.category
                : item.category?.name ?? "";

            const catColor =
              CATEGORY_COLORS[categoryName] ?? DEFAULT_CATEGORY_COLOR;

            const isLoading = loadingId === item.id;
            const hasError = errorId === item.id;

            return (
              <div
                key={i}
                className={`px-5 py-4 flex items-start gap-3 transition-opacity duration-200 ${
                  isLoading ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                {/* avatar */}
                <div className="relative shrink-0">
                  {authorAvatar ? (
                    <img
                      src={authorAvatar}
                      alt={authorName} 
                      className="w-8 h-8 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-lg bg-zinc-200 flex items-center justify-center text-zinc-600 text-xs font-bold">
                      {authorName[0]} {/* ✅ now a string */}
                    </div>
                  )}
                </div>

                {/* content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-zinc-900 leading-snug truncate max-w-[340px]">
                    {item.title}
                  </p>

                  {hasError && (
                    <p className="text-[10px] text-red-500 mt-0.5">
                      Action failed. Please try again.
                    </p>
                  )}

                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${pConf.bg} ${pConf.color}`}
                    >
                      <PriorityIcon className="w-2.5 h-2.5" />
                      {pConf.label}
                    </span>

                    <span
                      className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${catColor}`}
                    >
                      {categoryName} {/* ✅ now a string */}
                    </span>

                    <span className="text-[11px] text-zinc-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {timeAgo(item.submittedAt)}
                    </span>
                    <span className="text-[11px] text-zinc-400">
                      {item.wordCount.toLocaleString()} words ·{" "}
                      {item.readingTime} min read
                    </span>
                    <span className="text-[11px] text-zinc-400">
                      by {authorName} {/* ✅ now a string */}
                    </span>
                  </div>
                </div>

                {/* actions */}
                <div className="flex items-center gap-1.5 shrink-0 ml-1">
                  <button
                    title="Preview"
                    className="w-7 h-7 flex items-center justify-center rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-500 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button
                    title="Reject"
                    onClick={() => handleAction(item.id, "reject_article")}
                    className="w-7 h-7 flex items-center justify-center rounded-lg bg-red-50 hover:bg-red-100 text-red-500 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                  <button
                    title="Approve"
                    onClick={() => handleAction(item.id, "approve_article")}
                    className="w-7 h-7 flex items-center justify-center rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-600 transition-colors"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}