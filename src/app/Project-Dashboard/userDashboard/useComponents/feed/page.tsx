"use client";
import { useEffect, useState, useCallback } from "react";

import Image from "next/image";
import { ArrowUpRight, Bookmark, Sparkles } from "lucide-react";
import Link from "next/link";

interface Article {
  _id: string;
  title: string;
  category: string;
  description?: string;
  sourceName?: string;
  urlToImage?: string;
  url: string;
  slug: string;
  createdAt: string;
  publishedAt: string;
}

const CATEGORIES = ["All", "AI", "Tech", "Marketing", "Business", "Health"];

export default function PersonalizedFeed() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const trackHistory = async (articleId: string) => {
    try {
      await fetch("/api/user/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ articleId }),
      });
    } catch (err) {
      console.error("Failed to track history:", err);
    }
  };

  const fetchFeed = useCallback(async (cat: string, q: string, pg: number) => {
    setLoading(true);
    const params = new URLSearchParams({
      page: String(pg),
      limit: "9",
      ...(cat !== "All" && { category: cat.toLowerCase() }),
      ...(q && { search: q }),
    });

    try {
      const res = await fetch(`/api/articles?${params}`);
      if (!res.ok) throw new Error("Failed to fetch feed");
      const data = await res.json();

      if (pg === 1) {
        setArticles(data.articles || []);
      } else {
        setArticles((prev) => [...prev, ...(data.articles || [])]);
      }
      console.log("hasMMMMM is", data.hasMore);
      setHasMore(data.hasMore || false);
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setPage(1);
      fetchFeed(activeCategory, search, 1);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [activeCategory, search, fetchFeed]);

  const loadMore = () => {
    const next = page + 1;
    setPage(next);
    fetchFeed(activeCategory, search, next);
  };
  console.log("has more is", hasMore);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header & Filters Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Your Feed</h1>
          <p className="text-gray-500 text-sm mt-1">
            Discover news based on your interests
          </p>
        </div>
        <Link
          href="/Project-Dashboard/userDashboard/useComponents/preferences"
          className="text-sm text-purple-600 hover:underline font-medium"
        >
          ⚙️ Edit Preferences
        </Link>
      </div>

      <input
        type="text"
        placeholder="Search articles..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-purple-400"
      />

      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat
                ? "bg-purple-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div
            key={article._id}
            className="group flex flex-col border border-gray-200 rounded-xl overflow-hidden hover:border-purple-300 hover:shadow-md transition-all bg-white"
          >
            {/* Image Section */}
            {article.urlToImage && (
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={article.urlToImage}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}

            {/* Content Section */}
            <div className="p-5 flex flex-col grow">
              <div className="flex items-center gap-2 text-[11px] text-gray-400 mb-2">
                <span className="font-medium text-gray-500">
                  {article.sourceName || "InsightAI"}
                </span>
                <span>•</span>
                <span>
                  {new Date(
                    article.publishedAt || article.createdAt,
                  ).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>

              <h3 className="font-bold text-gray-800 leading-snug line-clamp-2 group-hover:text-purple-600 transition-colors mb-2">
                {article.title}
              </h3>

              {article.description && (
                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-4">
                  {article.description}
                </p>
              )}

              {/* Action Bottom Bar */}
              <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                <Link
                  href={article?.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 text-sm font-bold flex items-center gap-1 hover:text-purple-700 transition-colors group/link"
                  onClick={() => trackHistory(article._id)}
                >
                  Read Full News
                  <ArrowUpRight
                    size={16}
                    className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"
                  />
                </Link>

                <div className="flex items-center gap-2">
                  <button
                    className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-all"
                    title="Bookmark"
                  >
                    <Bookmark size={18} />
                  </button>
                  <button
                    className="p-2 text-gray-400 hover:text-amber-500 hover:bg-amber-50 rounded-full transition-all"
                    title="Summarize AI"
                  >
                    <Sparkles size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* {hasMore && (
        <div className="text-center mt-12">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )} */}

      {articles.length > 0 && (
        <div className="text-center mt-12">
          <button
            onClick={loadMore}
            disabled={loading || !hasMore}
            className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
          >
            {loading ? "Loading..." : hasMore ? "Load More" : "No More Data"}
          </button>
        </div>
      )}
    </div>
  );
}
