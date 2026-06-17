"use client";

import { useState, useEffect } from "react";
import { Article } from "@/types/editor";
import { Clock, User, Search, ChevronLeft, ChevronRight, ExternalLink, Loader2 } from "lucide-react";
import Link from "next/link";

export default function PublishedArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // The Fetch Method
  const fetchArticles = async () => {
    setLoading(true);
    try {
      // We pass search and page as query parameters to the backend
      const response = await fetch(
        `/api/articles/published?page=${currentPage}&limit=6&search=${searchQuery}`
      );
      const result = await response.json();

      if (result.success) {
        setArticles(result.data);
        setTotalPages(result.pagination.totalPages);
      }
    } catch (error) {
      console.error("Failed to fetch articles:", error);
    } finally {
      setLoading(false);
    }
  };

  // Trigger fetch when page or search changes
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchArticles();
    }, 300); // 300ms debounce to avoid spamming the server while typing

    return () => clearTimeout(delayDebounceFn);
  }, [currentPage, searchQuery]);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Search Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Feed</h1>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search published articles..."
            className="w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset to page 1 on new search
            }}
          />
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          <Loader2 className="animate-spin mb-2" size={32} />
          <p>Loading your articles...</p>
        </div>
      ) : (
        <>
          {/* Article Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.length > 0 ? (
              articles.map((article) => (
                <div key={article._id} className="bg-white rounded-2xl shadow-sm border flex flex-col overflow-hidden">
                  <img
                    src={article.featuredImage || "/placeholder.jpg"}
                    className="h-48 w-full object-cover"
                    alt={article.title}
                  />
                  <div className="p-5 flex flex-col flex-grow">
                    <h2 className="text-lg font-bold mb-2 line-clamp-2">{article.title}</h2>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-grow">{article.excerpt}</p>
                    
                    <div className="pt-4 border-t flex items-center justify-between">
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <User size={12} /> {article.author?.name}
                      </span>
                      <Link 
                        href={`/Project-dashboard/editorDashboard/publishedArticle/${article.slug}`}
                        className="text-sm font-semibold text-purple-600 hover:underline flex items-center gap-1"
                      >
                        View Details <ExternalLink size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20 text-gray-400">
                No articles found matching your search.
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 pt-8">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 border rounded-md disabled:opacity-30"
            >
              <ChevronLeft />
            </button>
            <span className="text-sm font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 border rounded-md disabled:opacity-30"
            >
              <ChevronRight />
            </button>
          </div>
        </>
      )}
    </div>
  );
}