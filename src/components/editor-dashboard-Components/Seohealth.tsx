"use client";

import { useState } from "react";
import {
  Search,
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ImageOff,
  FileText,
  BookOpen,
  Hash,
} from "lucide-react";
import type { ScheduledArticle } from "@/types/editor";

interface SeoHealthProps {
  articles: ScheduledArticle[];
}

function ScoreRing({
  score,
  size = 44,
}: {
  score: number;
  size?: number;
}) {
  const r = (size - 6) / 2;
  const circ = 2 * Math.PI * r;
  const filled = (score / 100) * circ;

  const color =
    score >= 80
      ? "#10b981"
      : score >= 60
      ? "#f59e0b"
      : "#ef4444";

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#f4f4f5"
          strokeWidth={5}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={5}
          strokeDasharray={`${filled} ${circ - filled}`}
          strokeLinecap="round"
        />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center text-[11px] font-bold"
        style={{ color }}
      >
        {score}
      </span>
    </div>
  );
}

function MiniBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="w-full bg-zinc-100 rounded-full h-1">
      <div
        className={`h-1 rounded-full transition-all duration-500 ${color}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function SeoCard({ article }: { article: ScheduledArticle }) {
  const [expanded, setExpanded] = useState(false);
  const seo = article.seo;
  if (!seo) return null;

  const issues: string[] = [];
  if (seo.missingMeta) issues.push("Missing meta description");
  if (seo.missingAlt)  issues.push("Images missing alt text");
  if (seo.keywordDensity < 50) issues.push("Low keyword density");
  if (seo.readabilityScore < 65) issues.push("Low readability score");

  const scoreColor =
    seo.score >= 80
      ? "text-emerald-600"
      : seo.score >= 60
      ? "text-amber-500"
      : "text-red-500";

  const barColor =
    seo.score >= 80
      ? "bg-emerald-400"
      : seo.score >= 60
      ? "bg-amber-400"
      : "bg-red-400";

  return (
    <div className="border border-zinc-100 rounded-xl overflow-hidden">
      {/* collapsed row */}
      <button
        onClick={() => setExpanded((p) => !p)}
        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-zinc-50 transition-colors text-left"
      >
        <ScoreRing score={seo.score} size={40} />

        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-zinc-800 truncate">
            {article.title}
          </p>
          <p className="text-[10px] text-zinc-400 mt-0.5 font-mono truncate">
            /{seo.slug}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {issues.length > 0 ? (
            <span className="flex items-center gap-1 text-[10px] text-red-500 font-semibold bg-red-50 px-2 py-0.5 rounded-full">
              <AlertCircle className="w-2.5 h-2.5" />
              {issues.length} issue{issues.length !== 1 ? "s" : ""}
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
              <CheckCircle2 className="w-2.5 h-2.5" />
              Healthy
            </span>
          )}
          {expanded ? (
            <ChevronUp className="w-3.5 h-3.5 text-zinc-400" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
          )}
        </div>
      </button>

      {/* expanded detail */}
      {expanded && (
        <div className="px-4 pb-4 border-t border-zinc-50 bg-zinc-50/50">
          {/* issues list */}
          {issues.length > 0 && (
            <div className="mt-3 space-y-1.5">
              {issues.map((issue) => (
                <div
                  key={issue}
                  className="flex items-center gap-2 text-xs text-red-600"
                >
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  {issue}
                </div>
              ))}
            </div>
          )}

          {/* metric bars */}
          <div className="mt-4 space-y-2.5">
            {[
              {
                label: "Overall Score",
                value: seo.score,
                icon: Search,
                color: barColor,
              },
              {
                label: "Keyword Density",
                value: seo.keywordDensity,
                icon: Hash,
                color: "bg-blue-400",
              },
              {
                label: "Readability",
                value: seo.readabilityScore,
                icon: BookOpen,
                color: "bg-purple-400",
              },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="flex items-center gap-1 text-[10px] text-zinc-500 font-medium">
                    <Icon className="w-2.5 h-2.5" />
                    {label}
                  </span>
                  <span className="text-[10px] font-bold text-zinc-700">
                    {value}%
                  </span>
                </div>
                <MiniBar value={value} color={color} />
              </div>
            ))}
          </div>

          {/* quick fixes */}
          {(seo.missingMeta || seo.missingAlt) && (
            <div className="mt-3 flex gap-2 flex-wrap">
              {seo.missingMeta && (
                <button className="flex items-center gap-1 text-[10px] text-blue-600 font-semibold bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg transition-colors">
                  <FileText className="w-2.5 h-2.5" />
                  Add meta description
                </button>
              )}
              {seo.missingAlt && (
                <button className="flex items-center gap-1 text-[10px] text-blue-600 font-semibold bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg transition-colors">
                  <ImageOff className="w-2.5 h-2.5" />
                  Fix alt text
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function SeoHealth({ articles }: SeoHealthProps) {
  const withSeo = articles.filter((a) => a.seo);
  const avgScore =
    withSeo.length > 0
      ? Math.round(withSeo.reduce((s, a) => s + (a.seo?.score ?? 0), 0) / withSeo.length)
      : 0;

  const healthy  = withSeo.filter((a) => (a.seo?.score ?? 0) >= 80).length;
  const warning  = withSeo.filter((a) => {
    const s = a.seo?.score ?? 0;
    return s >= 60 && s < 80;
  }).length;
  const critical = withSeo.filter((a) => (a.seo?.score ?? 0) < 60).length;

  return (
    <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden flex flex-col">
      {/* header */}
      <div className="px-5 py-4 border-b border-zinc-50">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-zinc-900 flex items-center gap-2">
              <Search className="w-4 h-4 text-zinc-400" />
              SEO Health
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Scheduled articles · avg score {avgScore}
            </p>
          </div>

          {/* summary pills */}
          <div className="flex gap-1.5">
            <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full">
              {healthy} healthy
            </span>
            {warning > 0 && (
              <span className="text-[10px] font-semibold bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full">
                {warning} warn
              </span>
            )}
            {critical > 0 && (
              <span className="text-[10px] font-semibold bg-red-50 text-red-500 px-2 py-0.5 rounded-full">
                {critical} crit
              </span>
            )}
          </div>
        </div>
      </div>

      {/* article list */}
      <div className="px-5 py-4 space-y-2 overflow-y-auto max-h-[340px]">
        {withSeo.length === 0 ? (
          <p className="text-xs text-zinc-400 text-center py-8">
            No SEO data available.
          </p>
        ) : (
          // sort: critical first
          [...withSeo]
            .sort((a, b) => (a.seo?.score ?? 0) - (b.seo?.score ?? 0))
            .map((article) => <SeoCard key={article.id} article={article} />)
        )}
      </div>
    </div>
  );
}