"use client";

import { useNews } from "@/hooks/useNews";
import { useState, useEffect } from "react";
import ArticleCard from "@/components/ArticleCard";

type Category = "technology" | "sports" | "business" | "health" | "science";

const CATEGORIES: Category[] = [
  "technology",
  "sports",
  "business",
  "health",
  "science",
];

export default function NewsPage() {
  const { articles, loading, error, category, setCategory, refresh } =
    useNews();
  const [page, setPage] = useState(1);
  const [allArticles, setAllArticles] = useState(articles);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Update allArticles when articles change (category or refresh)
  useEffect(() => {
    setAllArticles(articles);
    setPage(1);
    setHasMore(true);
  }, [articles]);

  const loadMore = async () => {
    setLoadingMore(true);
    try {
      const res = await fetch(
        `/api/news?category=${category}&page=${page + 1}`,
      );
      if (!res.ok) throw new Error("Failed to load more news");
      const json = await res.json();
      const newArticles = json.articles ?? [];
      if (newArticles.length === 0) setHasMore(false);
      setAllArticles((prev) => [...prev, ...newArticles]);
      setPage((p) => p + 1);
    } catch {
      setHasMore(false);
    } finally {
      setLoadingMore(false);
    }
  };

  const trendingTopics = CATEGORIES;
  const featured = allArticles.length > 0 ? allArticles[0] : null;
  const others = allArticles.length > 1 ? allArticles.slice(1) : [];

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* --- Header & Categories --- */}
        <header className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-2">
                Discover
              </h2>
              <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">
                Latest News
              </h1>
            </div>
            <button
              onClick={refresh}
              className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95 text-slate-700 dark:text-slate-300 font-medium"
            >
              <span className={loading ? "animate-spin" : ""}>🔄</span> Refresh
              Feed
            </button>
          </div>

          <div className="flex flex-wrap gap-3 mt-8">
            {trendingTopics.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-6 py-2 rounded-full capitalize text-sm font-semibold transition-all duration-300 ${
                  category === cat
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200 ring-2 ring-blue-600 ring-offset-2"
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-blue-400 hover:text-blue-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        {/* --- Featured Article --- */}
        {featured && !loading && (
          <section className="mb-20 px-4">
            <div
              className="group relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden 
  shadow-lg hover:shadow-2xl transition-all duration-500 
  border border-slate-200 dark:border-slate-800 
  flex flex-col lg:flex-row"
            >
              {/* Image Side */}
              <div className="lg:w-3/5 relative overflow-hidden">
                {featured.urlToImage ? (
                  <img
                    src={featured.urlToImage}
                    alt={featured.title}
                    className="w-full h-[280px] sm:h-[350px] lg:h-[460px] 
          object-cover transition-transform duration-700 
          group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-[400px] bg-slate-200 animate-pulse" />
                )}
              </div>

              {/* Content Side */}
              <div className="lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
                {/* Badges */}
                <div className="flex gap-3 mb-6">
                  <span
                    className="bg-purple-100 text-purple-600 
        dark:bg-purple-900/40 dark:text-purple-400 
        px-4 py-1.5 rounded-full text-xs font-semibold"
                  >
                    Featured
                  </span>

                  <span
                    className="bg-orange-100 text-orange-600 
        dark:bg-orange-900/40 dark:text-orange-400 
        px-4 py-1.5 rounded-full text-xs font-semibold"
                  >
                    Trending
                  </span>
                </div>

                {/* Title */}
                <h2
                  className="text-2xl lg:text-4xl font-bold 
      text-slate-900 dark:text-white 
      mb-4 leading-tight 
      group-hover:text-blue-600 transition-colors"
                >
                  {featured.title}
                </h2>

                {/* Description */}
                <p
                  className="text-slate-600 dark:text-slate-400 
      text-lg mb-8 line-clamp-3"
                >
                  {featured.description}
                </p>

                {/* Meta + Button */}
                <div className="flex items-center justify-between mt-auto">
                  <div className="text-sm text-slate-500">
                    {new Date(featured.publishedAt).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      },
                    )}
                  </div>

                  <a
                    href={featured.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 
          bg-blue-600 hover:bg-blue-700 
          text-white px-6 py-3 rounded-xl 
          font-semibold transition-all duration-300 
          shadow-md hover:shadow-lg"
                  >
                    Read Full Article →
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* --- Loading & Error States --- */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-80 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-20 bg-red-50 rounded-3xl border border-red-100">
            <p className="text-red-600 font-medium mb-4">❌ {error}</p>
            <button
              onClick={refresh}
              className="text-blue-600 font-bold underline"
            >
              Try Refreshing
            </button>
          </div>
        )}

        {/* --- Articles Grid --- */}

        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {others.map((article, index) => (
                <div
                  key={index}
                  className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-200/70 dark:border-slate-800 flex flex-col h-full"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden aspect-[16/9]">
                    {article.urlToImage ? (
                      <img
                        src={article.urlToImage}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
                        <span className="text-slate-400 dark:text-slate-500 text-4xl">
                          📰
                        </span>
                      </div>
                    )}
                    {/* Source badge on image */}
                    <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
                      {article.source.name}
                    </span>
                    {/* Optional hot badge */}
                    {index % 4 === 0 && (
                      <span className="absolute top-3 right-3 bg-red-500/90 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                        HOT
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3">
                      <time dateTime={article.publishedAt}>
                        {new Date(article.publishedAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </time>
                      <span>•</span>
                      <span className="text-blue-600 dark:text-blue-400 font-medium">
                        {article.author || "Unknown"}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold leading-tight text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-3">
                      {article.title}
                    </h3>

                    <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-2 mb-4 flex-1">
                      {article.description || "No description available..."}
                    </p>

                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-sm hover:gap-3 transition-all group-hover:underline"
                    >
                      Read Full Article
                      <span className="text-lg">→</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {hasMore && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="px-10 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
                >
                  {loadingMore ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                      Loading...
                    </span>
                  ) : (
                    "Load More Articles"
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
