// components/dashboard/ScheduledToday.tsx
"use client";

import { useRouter } from "next/navigation";
import { Card, CardHeader } from "@/components/ui/EditorCard";
import type { ScheduledArticle } from "@//types/editor";
import { formatScheduled, getSeoColor } from "@/lib/utils/editor";
import { cn } from "@/lib/utils";

export function ScheduledToday({ items }: { items: ScheduledArticle[] }) {
  const router = useRouter();
  return (
    <Card>
      <CardHeader
        title="Scheduled today"
        action={
          <button
            onClick={() => router.push("/editor/scheduled")}
            className="text-[12px] text-blue-600 hover:text-blue-700"
          >
            See all →
          </button>
        }
      />
      <div className="space-y-0">
        {items.map((item, i) => {
          const seo = getSeoColor(item.seoScore);
          return (
            <div
              key={item._id}
              className={cn(
                "flex items-center gap-3 py-3",
                i < items.length - 1 && "border-b border-gray-50"
              )}
            >
              <span className="text-[11px] text-gray-400 min-w-[72px]">
                {formatScheduled(item.scheduledFor)}
              </span>
              <div
                className={cn("w-2 h-2 rounded-full flex-shrink-0", seo.bar)}
              />
              <div className="flex-1 min-w-0">
                <p className="text-[13px] text-gray-900 truncate">{item.title}</p>
                <p className="text-[11px] text-gray-400">{item.category.name}</p>
              </div>
              <span className={cn("text-[13px] font-medium", seo.text)}>
                {item.seoScore}
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}