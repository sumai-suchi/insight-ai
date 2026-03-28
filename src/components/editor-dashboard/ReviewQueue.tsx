// components/dashboard/ReviewQueue.tsx
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader } from "@/components/ui/EditorCard";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/EditorAvatar";
import type { ReviewQueueItem } from "@/types/editor";
import { timeAgo, getContentTypeStyle, getSeoColor } from "@/lib/utils/editor";
import { cn } from "@/lib/utils";

interface ReviewQueueProps {
  items: ReviewQueueItem[];
}

type Filter = "all" | "urgent" | "ai_draft";

export function ReviewQueue({ items }: ReviewQueueProps) {
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>("all");
  const [pending, startTransition] = useTransition();
  const [actionStates, setActionStates] = useState<Record<string, string>>({});

  const filtered = items.filter((item) => {
    if (filter === "urgent") {
      const ageHrs = (Date.now() - new Date(item.submittedAt).getTime()) / 3600000;
      return ageHrs >= 24;
    }
    if (filter === "ai_draft") return item.contentType === "ai_generated";
    return true;
  });

  async function handleAction(id: string, decision: "approve" | "reject") {
    setActionStates((prev) => ({ ...prev, [id]: decision }));
    try {
      await fetch(`/api/articles/${id}/review`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decision }),
      });
    } catch {
      setActionStates((prev) => ({ ...prev, [id]: "" }));
    }
  }

  const filters: { key: Filter; label: string }[] = [
    { key: "all",      label: `All (${items.length})` },
    { key: "urgent",   label: "Urgent" },
    { key: "ai_draft", label: "AI draft" },
  ];

  return (
    <Card padding={false} className="overflow-hidden">
      <div className="px-5 pt-5 pb-3">
        <CardHeader
          title="Review queue"
          action={
            <button
              onClick={() => router.push("/editor/review-queue")}
              className="text-[12px] text-blue-600 hover:text-blue-700"
            >
              View all →
            </button>
          }
        />
        <div className="flex gap-2 flex-wrap">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                "text-[11px] px-3 py-1 rounded-full border transition-all",
                filter === f.key
                  ? "bg-gray-900 text-white border-gray-900"
                  : "border-gray-200 text-gray-500 hover:border-gray-300"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-[12px]">
          <thead>
            <tr className="border-y border-gray-100 bg-gray-50">
              <th className="text-left px-5 py-2.5 font-medium text-gray-500 uppercase tracking-wide text-[10px]">Title</th>
              <th className="text-left px-3 py-2.5 font-medium text-gray-500 uppercase tracking-wide text-[10px]">Author</th>
              <th className="text-left px-3 py-2.5 font-medium text-gray-500 uppercase tracking-wide text-[10px]">Type</th>
              <th className="text-left px-3 py-2.5 font-medium text-gray-500 uppercase tracking-wide text-[10px]">SEO</th>
              <th className="text-left px-3 py-2.5 font-medium text-gray-500 uppercase tracking-wide text-[10px]">Age</th>
              <th className="text-right px-5 py-2.5 font-medium text-gray-500 uppercase tracking-wide text-[10px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => {
              const typeStyle = getContentTypeStyle(item.contentType);
              const seoColor = getSeoColor(item.seoScore);
              const ageHrs = (Date.now() - new Date(item.submittedAt).getTime()) / 3600000;
              const isUrgent = ageHrs >= 24;
              const actionState = actionStates[item._id];

              return (
                <tr
                  key={item._id}
                  className={cn(
                    "border-b border-gray-50 hover:bg-gray-50 transition-colors",
                    actionState && "opacity-50"
                  )}
                >
                  <td className="px-5 py-3">
                    <button
                      onClick={() => router.push(`/editor/articles/${item._id}`)}
                      className="text-gray-900 hover:text-blue-600 font-medium text-left max-w-[180px] truncate block"
                    >
                      {item.title}
                    </button>
                    <p className="text-gray-400 text-[10px] mt-0.5">
                      {item.wordCount.toLocaleString()} words
                    </p>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <Avatar name={item.author.name} size="sm" />
                      <span className="text-gray-600 max-w-[70px] truncate">
                        {item.author.name.split(" ")[0]}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <Badge className={typeStyle.className}>{typeStyle.label}</Badge>
                  </td>
                  <td className="px-3 py-3">
                    <span className={cn("font-medium", seoColor.text)}>
                      {item.seoScore}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <span className={cn(isUrgent ? "text-red-500" : "text-gray-400")}>
                      {timeAgo(item.submittedAt)}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    {actionState ? (
                      <span className="text-gray-400 capitalize">{actionState}d</span>
                    ) : (
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => handleAction(item._id, "approve")}
                          className="text-[11px] px-2.5 py-1 rounded-full border border-green-200 text-green-700 hover:bg-green-50 transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => router.push(`/editor/articles/${item._id}`)}
                          className="text-[11px] px-2.5 py-1 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                        >
                          Review
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="text-center text-gray-400 text-[13px] py-8">
            No articles match this filter
          </p>
        )}
      </div>
    </Card>
  );
}