"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import CategoryTabs from "../CategoryTabs";
import NewsCard from "../NewsCard";
import { INews, NewsCategory } from "@/types/news";

export default function NewsData() {
  const [category, setCategory] = useState<NewsCategory>("all");
  const [news, setNews] = useState<INews[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchNews = useCallback(
    async (cat: NewsCategory, pg: number, q: string) => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          category: cat,
          page: String(pg),
          limit: "3",
          ...(q && { search: q }),
        });

        const res = await fetch(`/api/news?${params}`);
        const data = await res.json();

        if (data.success) {
          setNews(data.data);
        }
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const handleCategoryChange = (cat: NewsCategory) => {
    setCategory(cat);
  };

  useEffect(() => {
    fetchNews(category, 1, "");
  }, [category, fetchNews]);

  return (
    <section className="max-w-7xl mx-auto px-20 py-10 font-sans mt-12">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Trending News & Insights
          </h2>

          <p className="text-slate-500 dark:text-slate-400">
            Stay updated with the latest in technology and AI
          </p>
        </div>

        <Link
          href="/news"
          className="border-2 border-purple-600 text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-purple-50 transition"
        >
          View All News
        </Link>
      </div>

      <CategoryTabs active={category} onChange={handleCategoryChange} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {news.map((item) => (
          <NewsCard key={item._id} news={item} />
        ))}
      </div>
    </section>
  );
}
