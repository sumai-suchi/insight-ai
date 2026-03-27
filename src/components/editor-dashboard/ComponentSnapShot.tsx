// components/dashboard/CommentsSnapshot.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader } from "@/components/ui/EditorCard";
import { Badge } from "@/components/ui/Badge";
import type { Comment } from "@/types/editor";
import { cn } from "@/lib/utils";

const flagStyle: Record<Comment["flag"], string> = {
  none:          "bg-green-50 text-green-700",
  spam:          "bg-amber-50 text-amber-700",
  toxic:         "bg-red-50 text-red-700",
  misinformation:"bg-orange-50 text-orange-700",
};

export function CommentsSnapshot({ comments }: { comments: Comment[] }) {
  const router = useRouter();
  const [states, setStates] = useState<Record<string, "approved" | "removed">>({});

  async function handleAction(id: string, action: "approved" | "removed") {
    setStates((prev) => ({ ...prev, [id]: action }));
    await fetch(`/api/comments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: action }),
    });
  }

  return (
    <Card>
      <CardHeader
        title="Comments moderation"
        action={
          <button
            onClick={() => router.push("/editor/comments")}
            className="text-[12px] text-blue-600 hover:text-blue-700"
          >
            See all →
          </button>
        }
      />
      <div className="space-y-0">
        {comments.map((c, i) => (
          <div
            key={c._id}
            className={cn(
              "py-3",
              i < comments.length - 1 && "border-b border-gray-50",
              states[c._id] && "opacity-40"
            )}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[12px] font-medium text-gray-900">
                {c.authorName}
              </span>
              <Badge className={flagStyle[c.flag]}>
                {c.flag === "none" ? "Clean" : c.flag}
              </Badge>
            </div>
            <p className="text-[12px] text-gray-500 leading-relaxed line-clamp-2 mb-2">
              {c.body}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-gray-300 truncate max-w-[150px]">
                on: {c.article.title}
              </span>
              {!states[c._id] ? (
                <div className="flex gap-2">
                  {c.flag === "none" ? (
                    <button
                      onClick={() => handleAction(c._id, "approved")}
                      className="text-[11px] px-2.5 py-1 rounded-full border border-green-200 text-green-700 hover:bg-green-50"
                    >
                      Approve
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAction(c._id, "removed")}
                      className="text-[11px] px-2.5 py-1 rounded-full border border-red-200 text-red-600 hover:bg-red-50"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ) : (
                <span className="text-[11px] text-gray-400 capitalize">
                  {states[c._id]}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}