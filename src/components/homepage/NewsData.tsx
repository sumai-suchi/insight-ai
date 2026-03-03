"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useNews } from "@/hooks/useNews";

type Category = "technology" | "sports" | "business" | "health" | "science";

const CATEGORIES: Category[] = [
  "technology",
  "sports",
  "business",
  "health",
  "science",
];

export default function NewsSection() {
  const { articles, loading, category, setCategory } = useNews();

  const [allArticles, setAllArticles] = useState(articles);

  useEffect(() => {
    setAllArticles(articles);
  }, [articles]);

  const trendingTopics = CATEGORIES;

  const featured = allArticles.length > 0 ? allArticles[0] : null;
  const others = allArticles.length > 1 ? allArticles.slice(1) : [];

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 font-sans">
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Trending News & Insights
          </h2>

          <p className="text-gray-500 mt-2">
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

      {/* Category Buttons */}
      <div className="flex flex-wrap gap-3 mt-8 mb-12">
        {trendingTopics.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-6 py-2 rounded-full capitalize text-sm font-semibold transition-all duration-300 ${
              category === cat
                ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                : "bg-white text-slate-600 border border-slate-200 hover:border-blue-400 hover:text-blue-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured Article */}
      {featured && !loading && (
        <section className="mb-20">
          <div className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition border flex flex-col lg:flex-row">
            {/* Image */}
            <div className="lg:w-3/5">
              {featured.urlToImage ? (
                <img
                  src={featured.urlToImage}
                  alt={featured.title}
                  className="w-full h-[350px] lg:h-[460px] object-cover group-hover:scale-105 transition duration-700"
                />
              ) : (
                <div className="w-full h-[400px] bg-gray-200 animate-pulse" />
              )}
            </div>

            {/* Content */}
            <div className="lg:w-2/5 p-10 flex flex-col justify-center">
              <div className="flex gap-3 mb-6">
                <span className="bg-purple-100 text-purple-600 px-4 py-1 rounded-full text-xs font-semibold">
                  Featured
                </span>

                <span className="bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-xs font-semibold">
                  Trending
                </span>
              </div>

              <h2 className="text-2xl lg:text-4xl font-bold mb-4 leading-tight">
                {featured.title}
              </h2>

              <p className="text-gray-600 text-lg mb-8 line-clamp-3">
                {featured.description}
              </p>

              <div className="flex justify-between items-center mt-auto">
                <span className="text-sm text-gray-500">
                  {new Date(featured.publishedAt).toLocaleDateString()}
                </span>

                <a
                  href={featured.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
                >
                  Read Article →
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Trending News Grid (3 Cards) */}

      {!loading && others.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {others.slice(0, 3).map((post, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition border"
            >
              {/* Image */}
              <div className="w-full h-52 overflow-hidden">
                {post.urlToImage ? (
                  <img
                    src={post.urlToImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 animate-pulse" />
                )}
              </div>

              {/* Content */}

              <div className="p-6 flex flex-col h-full">
                <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full w-fit mb-3 capitalize">
                  {category}
                </span>

                <h3 className="text-lg font-bold mb-3 line-clamp-2 group-hover:text-blue-600 transition">
                  {post.title}
                </h3>

                <p className="text-sm text-gray-600 line-clamp-2 mb-6">
                  {post.description}
                </p>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-gray-500">
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString()
                      : "Latest"}
                  </span>

                  {post.url && (
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 font-semibold text-sm hover:underline"
                    >
                      Read →
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}