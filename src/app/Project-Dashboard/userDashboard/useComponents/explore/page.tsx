"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowUpRight, Bookmark, Sparkles, Search } from "lucide-react";

type Article = {
  _id: string;
  title: string;
  description: string | null;
  urlToImage: string | null;
  url: string;
  sourceName: string;
  author: string | null;
  publishedAt: string;
  category: string;
};

const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "technology", label: "Technology" },
  { value: "business", label: "Business" },
  { value: "marketing", label: "Marketing" },
  { value: "startups", label: "Startups" },
];

export default function Explore() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);


  const fetchNews = useCallback(async (cat: string, q: string, pg: number) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        category: cat,
        page: String(pg),
        limit: "9",
      });

      if (q.trim() !== "") {
        params.append("search", q.trim());
      }

      const res = await fetch(`/api/news?${params.toString()}`);
      const data = await res.json();

      if (data.success) {
        setArticles(data.data || data.articles || []);
        setTotalPages(data.pagination?.totalPages || 1);
        setTotal(data.pagination?.total || 0);
      } else {
        setArticles([]);
        setTotalPages(1);
        setTotal(0);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchInput]);

  
  useEffect(() => {
    fetchNews(category, search, page);
  }, [category, search, page, fetchNews]);

  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    setSearchInput("");
    setSearch("");
    setPage(1);
  };

  const handlePageChange = (pg: number) => {
    if (pg >= 1 && pg <= totalPages) {
      setPage(pg);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Explore News</h1>
          <p className="text-gray-500 text-sm mt-1">
            Discover {total} latest news from top sources
          </p>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search articles..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-purple-400 shadow-sm transition-all"
        />
        <div className="absolute right-3 top-2.5 text-gray-400">
          <Search size={18} />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => handleCategoryChange(cat.value)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              category === cat.value
                ? "bg-purple-600 text-white shadow-md shadow-purple-100"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* News Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-80 bg-gray-50 rounded-xl border border-gray-200 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <>
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <div
                  key={article._id}
                  className="group flex flex-col border border-gray-200 rounded-xl overflow-hidden hover:border-purple-300 hover:shadow-md transition-all bg-white"
                >
                  <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
                    {article.urlToImage ? (
                      <img
                        src={article.urlToImage}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-purple-200 text-4xl font-bold">
                        IA
                      </div>
                    )}
                  </div>

                  <div className="p-5 flex flex-col grow">
                    <div className="flex items-center gap-2 text-[11px] text-gray-400 mb-2 font-medium uppercase tracking-wide">
                      <span className="text-gray-500">
                        {article.sourceName}
                      </span>
                      <span>•</span>
                      <span>
                        {new Date(article.publishedAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )}
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

                    <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                      <Link
                        href={article.url}
                        target="_blank"
                        className="text-purple-600 text-sm font-bold flex items-center gap-1 group/link"
                      >
                        Read Full News
                        <ArrowUpRight
                          size={16}
                          className="group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform"
                        />
                      </Link>
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-all">
                          <Bookmark size={18} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-amber-500 hover:bg-amber-50 rounded-full transition-all">
                          <Sparkles size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
              <p className="text-gray-500">
                No news found for "{search || category}".
              </p>
            </div>
          )}
        </>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-12 mb-10">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium disabled:opacity-30 hover:bg-gray-50 transition-colors"
          >
            Previous
          </button>
          <span className="text-sm font-bold text-gray-600">
            {page} / {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium disabled:opacity-30 hover:bg-gray-50 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
