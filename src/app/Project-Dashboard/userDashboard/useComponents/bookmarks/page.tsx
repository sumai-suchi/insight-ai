"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import authClient from "@/lib/auth/auth-client";

interface Article {
  _id: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  author?: string;
  sourceName?: string;
  category?: string;
  publishedAt: string;
  createdAt: string;
}

export default function NewsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = authClient.useSession();
  console.log("session is", session);
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(`/api/bookmark?userId=${session?.user.id}`);
        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setArticles(data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [session]);

  const handleDelete = async () => {
    try {
      const res = await fetch("/api/bookmark", {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete");
      }
      setArticles([]);
      console.log(data.message);

      // 👉 UI update (important)
      // example: setBookmarks([]);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  console.log("articles are", articles);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold mb-10 text-gray-800">
            奠 Bookmarks
          </h1>
          <button
            className="mb-10 hover:text-red-500 transition-colors"
            onClick={handleDelete}
          >
            <Trash2 size={26} />
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <motion.a
                key={article._id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group relative bg-[#0c234b] border border-white/5 rounded-3xl p-6 flex flex-col justify-between hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.2)] hover:-translate-y-1 block h-full"
              >
                <div>
                  {/* Header: Category & Date */}
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] uppercase tracking-wider bg-blue-600/20 px-3 py-1 rounded-full text-blue-300 font-bold">
                      {article.category || "General"}
                    </span>
                    <span className="text-[11px] text-gray-400 font-medium">
                      {new Date(article.publishedAt).toLocaleDateString(
                        "en-GB",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        },
                      )}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold mb-3 leading-tight text-white group-hover:text-blue-300 transition-colors line-clamp-3">
                    {article.title}
                  </h2>

                  {/* Description */}
                  <p className="text-sm text-gray-400 line-clamp-4 leading-relaxed">
                    {article.description ||
                      "No description available for this bookmarked article."}
                  </p>
                </div>

                {/* Footer */}
                <div className="mt-8 pt-5 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[11px] text-gray-500 uppercase tracking-tight">
                        Source
                      </span>
                      <span className="text-sm font-medium text-gray-300 truncate max-w-[150px]">
                        {article.sourceName || "Unknown"}
                      </span>
                    </div>

                    <div className="flex items-center text-blue-400 group-hover:text-white transition-colors">
                      <span className="text-sm font-semibold">Read Now</span>
                      <svg
                        className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="arrow-right"
                        />
                        <path
                          d="M13 5l7 7-7 7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Decorative Accent (Optional) */}
                <div className="absolute top-0 right-0 -mr-1 -mt-1 w-12 h-12 bg-blue-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
