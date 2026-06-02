"use client";
import { NewsCategory } from "@/types/news";

const CATEGORIES: { label: string; value: NewsCategory }[] = [
  { label: "🌐 All", value: "all" },
  { label: "💻 Technology", value: "technology" },
  { label: "💼 Business", value: "business" },
  { label: "📢 Marketing", value: "marketing" },
  { label: "🚀 Startups", value: "startups" },
];

interface Props {
  active: NewsCategory;
  onChange: (cat: NewsCategory) => void;
}

export default function CategoryTabs({ active, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onChange(cat.value)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            active === cat.value
              ? "bg-linear-to-r from-primary to-secondary text-primary-foreground shadow-md shadow-primary/10"
              : "bg-muted/70 text-gray-700 hover:bg-muted border border-primary/10"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
