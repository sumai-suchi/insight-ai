// lib/utils/editor.ts

// These helpers are used across every component.

import type { ArticleStatus, ContentType } from "@/types/editor";

// Format relative time — "2h ago", "just now", "1d ago"
export function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

// Format scheduled time — "Today, 6:00 PM" or "Tomorrow, 9:00 AM"
export function formatScheduled(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  const isTomorrow = date.toDateString() === tomorrow.toDateString();
  const time = date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  if (isToday) return `Today, ${time}`;
  if (isTomorrow) return `Tomorrow, ${time}`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// Get initials from full name — "Sadia Rahman" → "SR"
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// SEO score → color classes (Tailwind)
export function getSeoColor(score: number): {
  text: string;
  bg: string;
  bar: string;
} {
  if (score >= 80) return { text: "text-green-700", bg: "bg-green-50", bar: "bg-green-500" };
  if (score >= 60) return { text: "text-amber-700", bg: "bg-amber-50", bar: "bg-amber-500" };
  return { text: "text-red-700", bg: "bg-red-50", bar: "bg-red-500" };
}

// Status → badge styles
export function getStatusStyle(status: ArticleStatus): {
  label: string;
  className: string;
} {
  const map: Record<ArticleStatus, { label: string; className: string }> = {
    draft:       { label: "Draft",       className: "bg-gray-100 text-gray-600" },
    in_review:   { label: "In review",   className: "bg-blue-50 text-blue-700" },
    ai_review:   { label: "AI review",   className: "bg-purple-50 text-purple-700" },
    approved:    { label: "Approved",    className: "bg-green-50 text-green-700" },
    published:   { label: "Published",   className: "bg-teal-50 text-teal-700" },
    scheduled:   { label: "Scheduled",   className: "bg-indigo-50 text-indigo-700" },
    rejected:    { label: "Rejected",    className: "bg-red-50 text-red-700" },
  };
  return map[status];
}

// Content type → badge styles
export function getContentTypeStyle(type: ContentType): {
  label: string;
  className: string;
} {
  const map: Record<ContentType, { label: string; className: string }> = {
    manual:        { label: "Manual",       className: "bg-gray-100 text-gray-600" },
    ai_generated:  { label: "AI draft",     className: "bg-violet-50 text-violet-700" },
    ai_assisted:   { label: "AI assisted",  className: "bg-indigo-50 text-indigo-700" },
  };
  return map[type];
}

// Word count → reading time
export function readingTime(wordCount: number): string {
  const mins = Math.ceil(wordCount / 200);
  return `${mins} min read`;
}

// AI severity → color
export function getSeverityStyle(severity: "low" | "medium" | "high") {
  const map = {
    low:    { className: "bg-green-50 text-green-700",  label: "Low" },
    medium: { className: "bg-amber-50 text-amber-700",  label: "Medium" },
    high:   { className: "bg-red-50 text-red-700",      label: "High" },
  };
  return map[severity];
}


