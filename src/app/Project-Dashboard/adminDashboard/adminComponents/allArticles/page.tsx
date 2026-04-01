"use client";

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { FiSearch, FiTrash2, FiLoader } from "react-icons/fi";
import Swal from "sweetalert2";

const AllArticles = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [limit] = useState(8);

  const fetchArticles = useCallback(async () => {
    try {
      setIsLoading(true);
      // API call with current page, limit and search term
      const res = await axios.get(
        `/api/articles?page=${currentPage}&limit=${limit}&search=${searchTerm}`,
      );

      if (res.data?.success) {
        const newArticles = res.data.articles || [];
        setArticles(newArticles);

        if (newArticles.length === limit) {
          setHasMore(true);
        } else {
          setHasMore(false);
        }
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, limit, searchTerm]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const handleDelete = async (id: string, title: string) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete "${title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#3b82f6",
      confirmButtonText: "Yes, delete it!",
      background: "#0A1228",
      color: "#fff",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axios.delete(`/api/articles/${id}`);
        if (res.status === 200 || res.data?.success) {
          Swal.fire("Deleted!", "Article has been removed.", "success");
          fetchArticles();
        }
      } catch (err: any) {
        console.error("Delete Error:", err);
        Swal.fire("Error", "Could not delete the article", "error");
      }
    }
  };

  return (
    <div className="p-6 bg-[#0A1228] min-h-screen text-white font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tight">
              Manage Articles
            </h1>
            <p className="text-blue-400/50 text-[10px] font-bold tracking-[0.2em]">
              ADMIN PANEL
            </p>
          </div>

          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
            <input
              type="text"
              placeholder="Search all articles..."
              className="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        <div className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden relative">
          {isLoading && (
            <div className="absolute inset-0 bg-[#0A1228]/50 backdrop-blur-[2px] z-20 flex items-center justify-center">
              <FiLoader className="animate-spin text-blue-500" size={32} />
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02] text-[10px] uppercase font-black tracking-widest text-white/40">
                  <th className="px-6 py-5">Article Title</th>
                  <th className="px-6 py-5">Category</th>
                  <th className="px-6 py-5">Status</th>
                  <th className="px-6 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.length > 0 ? (
                  articles.map((article) => (
                    <tr
                      key={article._id}
                      className="border-b border-white/5 hover:bg-white/[0.03] transition-all group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-white group-hover:text-blue-400 truncate max-w-xs">
                            {article.title}
                          </span>
                          <span className="text-[10px] text-white/20 font-mono italic">
                            ID: {article._id.slice(-8).toUpperCase()}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-bold text-white/40 uppercase text-[10px]">
                        {article.category?.name || "General"}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                            article.status === "published"
                              ? "bg-emerald-500/10 text-emerald-500"
                              : "bg-amber-500/10 text-amber-500"
                          }`}
                        >
                          {article.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() =>
                            handleDelete(article._id, article.title)
                          }
                          className="p-2 hover:bg-red-500/10 rounded-lg text-white/40 hover:text-red-500 transition-all border border-transparent hover:border-red-500/20"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-10 text-center text-white/20 uppercase text-xs font-bold tracking-widest"
                    >
                      No articles found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 flex items-center justify-between border-t border-white/5 bg-white/[0.01]">
            <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">
              Page {currentPage}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1 || isLoading}
                className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest disabled:opacity-20 transition-all"
              >
                Prev
              </button>
              <button
                onClick={() => setCurrentPage((p) => p + 1)}
                disabled={!hasMore || isLoading}
                className="px-3 py-1.5 bg-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest disabled:opacity-20 transition-all text-white"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllArticles;
