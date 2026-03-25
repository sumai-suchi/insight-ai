"use client";
import { useEffect, useState } from "react";

const CATEGORIES = [
  "AI",
  "Tech",
  "Marketing",
  "Business",
  "Health",
  "Science",
  "Politics",
  "Sports",
];
const TAGS = [
  "machine-learning",
  "startup",
  "productivity",
  "design",
  "coding",
  "finance",
  "climate",
  "crypto",
];

export default function Preferences() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/preferences")
      .then((res) => res.json())
      .then((data) => {
        setSelectedCategories(data.preferences?.categories || []);
        setSelectedTags(data.preferences?.tags || []);
      });
  }, []);

  const toggle = (
    item: string,
    list: string[],
    setList: (v: string[]) => void,
  ) => {
    setList(
      list.includes(item) ? list.filter((i) => i !== item) : [...list, item],
    );
  };

  const handleSave = async () => {
    setLoading(true);
    await fetch("/api/preferences", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        categories: selectedCategories,
        tags: selectedTags,
      }),
    });
    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Your Preferences
      </h1>
      <p className="text-gray-500 mb-8">
        Select topics and tags to personalize your feed.
      </p>

      {/* Categories */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Categories</h2>
        <div className="flex flex-wrap gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() =>
                toggle(cat, selectedCategories, setSelectedCategories)
              }
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                selectedCategories.includes(cat)
                  ? "bg-purple-600 text-white border-purple-600"
                  : "bg-white text-gray-700 border-gray-300 hover:border-purple-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Topics</h2>
        <div className="flex flex-wrap gap-3">
          {TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => toggle(tag, selectedTags, setSelectedTags)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                selectedTags.includes(tag)
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-gray-700 border-gray-300 hover:border-orange-400"
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={loading}
        className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50"
      >
        {loading ? "Saving..." : saved ? "✅ Saved!" : "Save Preferences"}
      </button>
    </div>
  );
}
