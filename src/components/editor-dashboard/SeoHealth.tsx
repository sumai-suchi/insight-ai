// components/dashboard/SeoHealth.tsx
"use client";

import { useRouter } from "next/navigation";
import { Card, CardHeader } from "@/components/ui/EditorCard";
import type { ScheduledArticle } from "@/types/editor";
import { getSeoColor } from "@/lib/utils/editor";
import { cn } from "@/lib/utils";

export function SeoHealth({ articles }: { articles: ScheduledArticle[] }) {
  const router = useRouter();
  const avg = Math.round(
    articles.reduce((sum, a) => sum + a.seoScore, 0) / articles.length
  );
  const good = articles.filter((a) => a.seoScore >= 80).length;

  return (
    <Card>
      <CardHeader
        title="SEO health" 
        action={
          <button
            onClick={() => router.push("/editor/seo")}
            className="text-[12px] text-blue-600 hover:text-blue-700"
          >
            Full report →
          </button>
        }
      />
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-[11px] text-gray-500 mb-1">Avg SEO score</p>
          <p className="text-[22px] font-medium text-gray-900">{avg}</p>
          <p className="text-[11px] text-amber-600 mt-1">
            {articles.filter((a) => a.seoScore < 70).length} need fixing
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-[11px] text-gray-500 mb-1">Good score (80+)</p>
          <p className="text-[22px] font-medium text-gray-900">{good}</p>
          <p className="text-[11px] text-green-600 mt-1">
            of {articles.length} scheduled
          </p>
        </div>
      </div>
      <p className="text-[11px] text-gray-400 uppercase tracking-wide mb-3">
        Articles needing attention
      </p>
      <div className="space-y-3">
        {[...articles]
          .sort((a, b) => a.seoScore - b.seoScore)
          .map((article) => {
            const seo = getSeoColor(article.seoScore);
            return (
              <div key={article._id} className="flex items-center gap-3">
                <p className="text-[12px] text-gray-700 flex-1 truncate">
                  {article.title}
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={cn("h-full rounded-full", seo.bar)}
                      style={{ width: `${article.seoScore}%` }}
                    />
                  </div>
                  <span className={cn("text-[12px] font-medium w-6 text-right", seo.text)}>
                    {article.seoScore}
                  </span>
                </div>
              </div>
            );
          })}
      </div>
    </Card>
  );
}