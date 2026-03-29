"use client";

import { useState } from "react";
import { CheckCheck, X, Trash2, ThumbsUp, MessageSquare } from "lucide-react";
import type { Comment, CommentFlag } from "@/types/editor";

interface CommentsSnapshotProps {
  comments: Comment[];
}

const FLAG_CONFIG: Record<
  CommentFlag,
  { label: string; color: string; bg: string }
> = {
  none:           { label: "Clean",         color: "text-zinc-500",   bg: "bg-zinc-100" },
  spam:           { label: "Spam",          color: "text-amber-600",  bg: "bg-amber-50" },
  offensive:      { label: "Offensive",     color: "text-red-600",    bg: "bg-red-50" },
  misinformation: { label: "Misinfo",       color: "text-orange-600", bg: "bg-orange-50" },
  toxic:          { label: "Toxic",         color: "text-red-600",    bg: "bg-red-50" },
};

const FILTERS: { key: CommentFlag | "all"; label: string }[] = [
  { key: "all",           label: "All" },
  { key: "none",          label: "Clean" },
  { key: "spam",          label: "Spam" },
  { key: "offensive",     label: "Offensive" },
  { key: "misinformation",label: "Misinfo" },
];

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export function CommentsSnapshot({ comments }: CommentsSnapshotProps) {
  const [list, setList]         = useState<Comment[]>(comments);
  const [filter, setFilter]     = useState<CommentFlag | "all">("all");
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const filtered =
    filter === "all" ? list : list.filter((c) => c.flag === filter);

  async function handleAction(
    id: string,
    action: "approve_comment" | "reject_comment" | "delete_comment"
  ) {
    setLoadingId(id);
    try {
      const res = await fetch("/api/editor-Dashboard", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, id }),
      });
      if (res.ok) {
        setList((prev) => prev.filter((c) => c.id !== id));
      }
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden flex flex-col">
      {/* header */}
      <div className="px-5 py-4 border-b border-zinc-50">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-sm font-semibold text-zinc-900">
              Comments Snapshot
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              {list.filter((c) => c.flag !== "none").length} flagged · {list.length} total pending
            </p>
          </div>
          <MessageSquare className="w-4 h-4 text-zinc-300" />
        </div>

        {/* filter tabs */}
        <div className="flex gap-1.5 flex-wrap">
          {FILTERS.map(({ key, label }) => {
            const count =
              key === "all"
                ? list.length
                : list.filter((c) => c.flag === key).length;
            const active = filter === key;
            return (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                  active
                    ? "bg-zinc-900 text-white"
                    : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
                }`}
              >
                {label}{" "}
                <span
                  className={`ml-0.5 ${active ? "opacity-70" : "opacity-60"}`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* comment list */}
      <div className="divide-y divide-zinc-50 flex-1 overflow-y-auto max-h-[340px]">
        {filtered.length === 0 ? (
          <div className="py-12 text-center">
            <CheckCheck className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
            <p className="text-xs text-zinc-400">No comments in this filter.</p>
          </div>
        ) : (
          filtered.map((comment, i) => {
            const fConf = FLAG_CONFIG[comment.flag];
            const isLoading = loadingId === comment.id;

            return (
              <div
                key={i}
                className={`px-5 py-3.5 transition-opacity ${
                  isLoading ? "opacity-40 pointer-events-none" : ""
                }`}
              >
                {/* top row */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    {comment.authorAvatar ? (
                      <img
                        src={comment.authorAvatar}
                        alt={comment.author}
                        className="w-6 h-6 rounded-md object-cover shrink-0"
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-md bg-zinc-200 flex items-center justify-center text-zinc-600 text-[10px] font-bold shrink-0">
                        {comment.author}
                      </div>
                    )}
                    <span className="text-xs font-semibold text-zinc-700 truncate">
                      {comment.author}
                    </span>
                    <span className="text-[10px] text-zinc-400 shrink-0">
                      {timeAgo(comment.createdAt)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    {/* flag badge */}
                    {comment.flag !== "none" && (
                      <span
                        className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${fConf.bg} ${fConf.color}`}
                      >
                        {fConf.label}
                      </span>
                    )}

                    {/* actions */}
                    <button
                      title="Approve"
                      onClick={() => handleAction(comment.id, "approve_comment")}
                      className="w-6 h-6 flex items-center justify-center rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-600 transition-colors"
                    >
                      <CheckCheck className="w-3 h-3" />
                    </button>
                    <button
                      title="Reject"
                      onClick={() => handleAction(comment.id, "reject_comment")}
                      className="w-6 h-6 flex items-center justify-center rounded-md bg-red-50 hover:bg-red-100 text-red-500 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    <button
                      title="Delete"
                      onClick={() => handleAction(comment.id, "delete_comment")}
                      className="w-6 h-6 flex items-center justify-center rounded-md bg-zinc-100 hover:bg-zinc-200 text-zinc-400 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* body */}
                <p className="text-xs text-zinc-600 mt-2 leading-relaxed line-clamp-2">
                  {comment.body}
                </p>

                {/* article + likes */}
                <div className="flex items-center justify-between mt-2">
                  <p className="text-[10px] text-zinc-400 truncate max-w-[220px]">
                    on{" "}
                    <span className="text-zinc-500 font-medium">
                      {comment.articleTitle}
                    </span>
                  </p>
                  <span className="flex items-center gap-0.5 text-[10px] text-zinc-400 shrink-0">
                    <ThumbsUp className="w-2.5 h-2.5" /> {comment.likes}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}