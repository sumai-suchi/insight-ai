import React from "react";
import Image from "next/image";

const categories = [
  "All",
  "Technology",
  "AI",
  "Business",
  "Marketing",
  "Startups",
];

const newsData = [
  {
    id: 1,
    category: "Technology",
    title: "AI-Powered Content Creation Reaches New Heights in 2026",
    description:
      "The latest advancements in artificial intelligence are transforming how businesses create and distribute...",
    time: "2 hours ago",
    readTime: "5 min read",
    image: "/robot-arm.jpg", // Replace with your assets
  },
  {
    id: 2,
    category: "Marketing",
    title: "How Top Marketers are Using AI to 10x Their Content Output",
    description:
      "Leading marketing teams share their strategies for leveraging AI tools to dramatically increase content...",
    time: "5 hours ago",
    readTime: "7 min read",
    image: "/phone-hand.jpg",
  },
  {
    id: 3,
    category: "Business",
    title: "The Future of Content: Predictions for the Next Decade",
    description:
      "Industry experts weigh in on how content creation will evolve over the next ten years with AI and automation.",
    time: "1 day ago",
    readTime: "10 min read",
    image: "/laptop-code.jpg",
  },
];

export default function NewsSection() {
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
        <button className="border-2 border-purple-600 text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-purple-50 transition">
          View All News
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-3 mb-10 overflow-x-auto pb-2">
        {categories.map((cat, i) => (
          <button
            key={cat}
            className={`px-5 py-2 rounded-full text-sm font-medium transition ${
              i === 0
                ? "bg-purple-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {newsData.map((post) => (
          <div
            key={post.id}
            className="group cursor-pointer bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition"
          >
            <div className="relative h-52 w-full">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition duration-300 group-hover:scale-105"
              />
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-md uppercase tracking-wide">
                  {post.category}
                </span>
                <span className="text-orange-400">↗</span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 leading-tight mb-3 line-clamp-2">
                {post.title}
              </h3>

              <p className="text-gray-500 text-sm mb-6 line-clamp-2">
                {post.description}
              </p>

              <div className="flex items-center text-gray-400 text-xs gap-4 border-t pt-4">
                <div className="flex items-center gap-1">
                  <span>🕒</span> {post.time}
                </div>
                <div className="flex items-center gap-1">
                  <span>•</span> {post.readTime}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
