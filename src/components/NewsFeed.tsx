"use client";
import { useState, useEffect, useCallback } from "react";
import { INews, NewsCategory } from "@/types/news";
import NewsCard from "./NewsCard";
import CategoryTabs from "./CategoryTabs";

export default function NewsFeed() {
  const [category, setCategory] = useState<NewsCategory>("all");
  const [news, setNews] = useState<INews[]>([]);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const fetchNews = useCallback(
    async (cat: NewsCategory, pg: number, q: string) => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          category: cat,
          page: String(pg),
          limit: "12",
          ...(q && { search: q }),
        });
        const res = await fetch(`/api/news?${params}`);
        const data = await res.json();
        if (data.success) {
          setNews(data.data);
          setTotalPages(data.pagination.totalPages);
        }
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const handleCategoryChange = (cat: NewsCategory) => {
    setCategory(cat);
    setPage(1);
  };

  useEffect(() => {
    fetchNews(category, page, search);
  }, [category, page, search, fetchNews]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleSync = async () => {
    setSyncing(true);
    try {
      const res = await fetch("/api/news/sync", { method: "POST" });
      const data = await res.json();
      alert(data.message);
      fetchNews(category, page, search);
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 my-20 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              📰 News Feed
            </span>
          </h1>

          <button
            onClick={handleSync}
            disabled={syncing}
            className={`
              px-6 py-3 rounded-full font-medium text-white
              transition-all duration-300 shadow-lg
              ${
                syncing
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 hover:shadow-xl hover:scale-105 active:scale-95"
              }
            `}
          >
            {syncing ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                </svg>
                Syncing...
              </span>
            ) : (
              "🔄 Sync from NewsAPI"
            )}
          </button>
        </div>

        {/* Search Bar - Modern & Clean */}
        <div className="relative max-w-2xl mx-auto mb-8">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400 dark:text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search news by title, source, keyword..."
            className={`
              w-full pl-11 pr-12 py-4 bg-white dark:bg-gray-800 
              border border-gray-200 dark:border-gray-700 
              rounded-2xl shadow-sm 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500
              transition-all duration-200
            `}
          />
          {searchInput && (
            <button
              onClick={() => {
                setSearchInput("");
                setSearch("");
              }}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <CategoryTabs active={category} onChange={handleCategoryChange} />

        {/* Search result count */}
        {search && !loading && (
          <p className="text-center sm:text-left text-sm text-gray-500 dark:text-gray-400 mt-4 mb-6 font-medium">
            "{search}" এর জন্য{" "}
            {news.length === 0
              ? "কোনো খবর পাওয়া যায়নি"
              : `${news.length}টি খবর দেখানো হচ্ছে (মোট ~${totalPages * 12}টি)`}
          </p>
        )}

        {/* News Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-80 bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse shadow-md"
              />
            ))}
          </div>
        ) : news.length === 0 ? (
          <div className="text-center py-24 text-gray-400 dark:text-gray-500">
            <p className="text-6xl mb-6">🗞️</p>
            <p className="text-xl font-medium">
              {search
                ? `"${search}" এর সাথে মিলে এমন কোনো খবর পাওয়া যায়নি`
                : "কোনো খবর নেই। 'Sync from NewsAPI' বাটনে ক্লিক করে খবর লোড করুন!"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {news.map((item) => (
              <NewsCard key={item._id} news={item} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1 || loading}
              className={`
                px-6 py-3 rounded-xl font-medium
                ${
                  page === 1 || loading
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-800"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm border border-gray-200 dark:border-gray-700 transition-all"
                }
              `}
            >
              ← Previous
            </button>

            <span className="px-6 py-3 font-semibold text-lg text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              {page} / {totalPages}
            </span>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || loading}
              className={`
                px-6 py-3 rounded-xl font-medium
                ${
                  page === totalPages || loading
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-800"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm border border-gray-200 dark:border-gray-700 transition-all"
                }
              `}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
