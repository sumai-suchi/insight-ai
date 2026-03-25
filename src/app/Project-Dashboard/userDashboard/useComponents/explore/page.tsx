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
    const params = new URLSearchParams({
      category: cat,
      page: String(pg),
      limit: "9",
      ...(q && { search: q }),
    });

    try {
      const res = await fetch(`/api/news?${params}`);
      const data = await res.json();
      if (data.success) {
        setArticles(data.data || []);
        setTotalPages(data.pagination?.totalPages || 1);
        setTotal(data.pagination?.total || 0);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews(category, search, page);
  }, [category, search, page, fetchNews]);

  // ৩. Event Handlers
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    setSearch("");
    setSearchInput("");
    setPage(1);
  };

  const handlePageChange = (pg: number) => {
    setPage(pg);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Explore News</h1>
          <p className="text-gray-500 text-sm mt-1">
            Discover {total} latest articles from top sources
          </p>
        </div>
      </div>

      {/* Search Input - Fixed Functionality */}
      <form onSubmit={handleSearch} className="relative mb-6">
        <input
          type="text"
          placeholder="Search articles..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-purple-400 shadow-sm transition-all"
        />
        <button
          type="submit"
          className="absolute right-3 top-2.5 text-gray-400 hover:text-purple-600"
        >
          <Search size={18} />
        </button>
      </form>

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

      {/* Articles Grid - Matches Personalized Feed Design */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-80 bg-gray-50 rounded-xl border border-gray-200"
            />
          ))}
        </div>
      ) : (
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
                  <span className="text-gray-500">{article.sourceName}</span>
                  <span>•</span>
                  <span>
                    {new Date(article.publishedAt).toLocaleDateString("en-US", {
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
      )}

      {/* Pagination - Simplified UI */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-12 mb-10">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium disabled:opacity-30 hover:bg-gray-50"
          >
            Previous
          </button>
          <span className="text-sm font-bold text-gray-600">
            {page} / {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium disabled:opacity-30 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
