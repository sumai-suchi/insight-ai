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
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
