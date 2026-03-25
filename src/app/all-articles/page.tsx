"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaEye, FaHeart, FaRegHeart, FaComment, FaThumbsDown } from "react-icons/fa";

export type Article = {
  id: number;
  title: string;
  category: string;
  authorType: "Editor" | "User";
  image: string;
  views: number;
  comments: number;
  likes: number;
  dislikes: number;
  description: string;
};

const categories = ["Politics", "Technology", "Sports", "Health", "Entertainment"];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

const ArticleCard = ({ article }: { article: Article }) => {
  const [liked, setLiked] = useState(false);

  return (
    <motion.div
      variants={item}
      className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden hover:scale-[1.03] transition duration-300"
    >
      <img src={article.image} className="w-full h-48 object-cover" />

      <div className="p-4 space-y-3">
        <p className="text-xs text-gray-500 uppercase tracking-wide">
          {article.category} • {article.authorType}
        </p>

        <h2 className="text-lg font-bold leading-tight hover:text-red-600 cursor-pointer transition">
          {article.title}
        </h2>

        {/* ✅ short description */}
        <p className="text-sm text-gray-600 line-clamp-2">
          {article.description}
        </p>

        <div className="flex justify-between items-center text-sm text-gray-600 pt-2 border-t">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <FaEye /> {article.views}
            </span>
            <span className="flex items-center gap-1">
              <FaComment /> {article.comments}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setLiked(!liked)}>
              {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
            </button>
            <span>{article.likes}</span>

            <span className="flex items-center gap-1">
              <FaThumbsDown /> {article.dislikes}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function AllArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);

  // ✅ client-side data (no hydration issue)
  useEffect(() => {
    const data: Article[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      title: `Breaking News Headline ${i + 1}`,
      description: "This is a short preview of the article content to attract readers and improve engagement.",
      category: categories[i % categories.length],
      authorType: i % 2 === 0 ? "Editor" : "User",
      image: `https://picsum.photos/500/300?random=${i}`,
      views: Math.floor(Math.random() * 5000),
      comments: Math.floor(Math.random() * 200),
      likes: Math.floor(Math.random() * 1000),
      dislikes: Math.floor(Math.random() * 200),
    }));

    setArticles(data);
  }, []);

  const grouped: Record<string, Article[]> = categories.reduce((acc, cat) => {
    acc[cat] = articles.filter((a) => a.category === cat);
    return acc;
  }, {} as Record<string, Article[]>);

  const editors = articles.filter((a) => a.authorType === "Editor");
  const users = articles.filter((a) => a.authorType === "User");

  return (
    <div className="bg-gray-100 min-h-screen p-6 space-y-10">
      {/* 🔥 MARQUEE */}
      <div className="bg-black text-white py-2 overflow-hidden rounded-lg">
        <div className="animate-marquee whitespace-nowrap">
          {articles.map((a) => (
            <span key={a.id} className="mx-6 font-semibold">
              📰 {a.title}
            </span>
          ))}
        </div>
      </div>

      {/* HEADER */}
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Daily Insight Newspaper
        </h1>
        <p className="text-gray-500">Your trusted source of news</p>
      </div>

      {/* CATEGORY SECTIONS */}
      {categories.map((cat) => (
        <div key={cat} className="space-y-4">
          <h2 className="text-2xl font-bold border-l-4 border-red-500 pl-3">
            {cat}
          </h2>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid md:grid-cols-3 gap-6"
          >
            {grouped[cat]?.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </motion.div>
        </div>
      ))}

      {/* EDITOR SECTION */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold border-l-4 border-blue-500 pl-3">
          Editor Picks
        </h2>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-4 gap-6"
        >
          {editors.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </motion.div>
      </div>

      {/* USER SECTION */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold border-l-4 border-green-500 pl-3">
          Community Articles
        </h2>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-4 gap-6"
        >
          {users.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </motion.div>
      </div>

      {/* FOOTER */}
      <div className="text-center text-gray-500 pt-10 border-t">
        © 2026 Daily Insight • Premium News Experience
      </div>

      {/* MARQUEE ANIMATION */}
      <style jsx>{`
        .animate-marquee {
          display: inline-block;
          animation: marquee 20s linear infinite;
        }

        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}