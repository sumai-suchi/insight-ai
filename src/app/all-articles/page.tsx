"use client";

import { motion, Variants } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  FaEye,
  FaHeart,
  FaRegHeart,
  FaComment,
  FaShareAlt,
  FaRegBookmark,
} from "react-icons/fa";
import { Article } from "@/types/editor";
import authClient from "@/lib/auth/auth-client";

// ---- Color Utility for Categories ----
const COLOR_PALETTE: string[] = ["#FFD700", "#FF6B6B", "#4ECDC4", "#45B7D1"];
function pickAccent(cat: string, i = 0) {
  return (
    COLOR_PALETTE[cat.length % COLOR_PALETTE.length] ||
    COLOR_PALETTE[i % COLOR_PALETTE.length]
  );
}

// ---- Animation Variants ----
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
  hover: {
    y: -12,
    boxShadow: "0 20px 40px rgba(189, 232, 245, 0.3)",
    transition: { duration: 0.4 },
  },
};

const trendingVariants: Variants = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const trendingItemVariants: Variants = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0 },
  hover: { x: 8, transition: { duration: 0.3 } },
};

// ---- Article Card ----
const ArticleCard = ({
  article,
  priority = false,
}: {
  article: Article;
  priority?: boolean;
}) => {
  const [liked, setLiked] = useState(false);
  const { data: session } = authClient.useSession();

  const handleBookmark = async (article: Article) => {
    console.log(article);
    try {
      const res = await fetch("/api/bookmark", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user.id,
          title: article.title,
          articleId: article._id,
          createdAt: new Date(),
          description: article.excerpt,
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert("Bookmark saved successfully ✅");
      } else {
        alert("Failed to save bookmark ❌");
      }
    } catch (err) {
      alert("Error saving bookmark");
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="show"
      whileHover="hover"
      className={`
        group rounded-2xl flex flex-col bg-[#0F2854] border-2 border-[#BDE8F5]/20
        shadow-[0_8px_32px_rgba(15,40,84,0.4)] relative overflow-hidden cursor-pointer
        transition-all duration-400 hover:border-[#BDE8F5]/60
        ${priority ? "md:col-span-2 md:row-span-2" : "col-span-1"}
      `}
    >
      {/* Image Container */}
      <Link
        href={`/article/${article.slug}`}
        className="block h-56 relative overflow-hidden group/image rounded-t-2xl"
      >
        <img
          src={
            article.featuredImage ||
            "https://via.placeholder.com/800x600?text=Daily+Insight"
          }
          className="w-full h-full object-cover group-hover/image:scale-110 transition duration-700"
          alt={article.title}
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F2854]/95 via-[#0F2854]/40 to-transparent" />

        {/* Category Ribbon */}
        <span
          className="absolute top-4 left-4 font-black px-4 py-2 rounded-lg uppercase tracking-wider shadow-xl text-xs text-[#0F2854]"
          style={{
            background: pickAccent(article.category.name),
          }}
        >
          {article.category.name}
        </span>

        {/* Editor Pick Badge */}
        {article.author.role === "editor" && (
          <span className="absolute top-4 right-4 bg-[#BDE8F5] text-[#0F2854] px-3 py-1 rounded-lg font-extrabold uppercase text-xs shadow-lg">
            Editor's Pick
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 justify-between px-6 py-5 relative z-10">
        <div>
          <span className="text-xs font-bold text-[#BDE8F5]/80 uppercase tracking-widest">
            {new Date(article.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>

          <Link href={`/article/${article.slug}`}>
            <h2
              className={`
              mt-3 mb-3 font-bold leading-snug cursor-pointer transition text-[#BDE8F5]
              group-hover:text-white group-hover:underline group-hover:underline-offset-4
              ${priority ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"}
            `}
            >
              {article.title}
            </h2>
          </Link>

          <p className="line-clamp-3 text-[#BDE8F5]/90 text-xs md:text-sm leading-relaxed mb-4">
            {article.excerpt}
          </p>
        </div>

        {/* Stats & Actions */}
        <div className="flex justify-between items-center pt-5 border-t border-[#BDE8F5]/20">
          <div className="flex gap-5 text-[#BDE8F5] text-xs font-bold">
            <span className="flex items-center gap-2 hover:text-white transition">
              <FaEye className="text-sm" />
              {article.views}
            </span>
            <span className="flex items-center gap-2 hover:text-white transition">
              <FaComment className="text-sm" />
              {article.commentCount}
            </span>
          </div>

          <div className="flex items-center gap-4 text-[#BDE8F5]">
            <button
              onClick={(e) => {
                e.preventDefault();
                setLiked(!liked);
              }}
              className="hover:scale-125 hover:text-white transition active:scale-90"
              aria-label="Like"
            >
              {liked ? <FaHeart className="text-[#BDE8F5]" /> : <FaRegHeart />}
            </button>

            <FaRegBookmark
              onClick={() => handleBookmark(article)}
              className="cursor-pointer hover:text-white hover:scale-110 transition"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ---- Trending Card ----
function TrendingCard({ article, i }: { article: Article; i: number }) {
  return (
    <motion.div
      variants={trendingItemVariants}
      initial="initial"
      whileHover="hover"
      className="group"
    >
      <Link href={`/article/${article.slug}`}>
        <div className="flex items-start gap-4 py-4 border-b border-[#0F2854]/20 last:border-0 hover:bg-[#0F2854]/30 transition cursor-pointer rounded-lg px-2">
          <span className="text-4xl font-black text-[#BDE8F5]/40 group-hover:text-[#BDE8F5]/60 transition">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="flex-1">
            <h4 className="font-bold text-sm group-hover:text-white text-[#BDE8F5] leading-tight transition">
              {article.title}
            </h4>
            <div className="flex gap-3 mt-2 text-xs text-[#BDE8F5]/70 font-bold">
              <span className="flex items-center gap-1">
                <FaEye className="text-xs" /> {article.views}
              </span>
              <span className="text-white/50">•</span>
              <span style={{ color: pickAccent(article.category.name) }}>
                {article.category.name}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ---- Main Page ----
export default function AllArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState("");

  const fetchArticles = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/articles/published");
      const json = await res.json();
      if (json.success) setArticles(json.data);
    } catch (err) {
      console.error("Failed to load articles", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setCurrentDate(
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    );
    fetchArticles();
  }, [fetchArticles]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#4988C4] font-serif text-[#0F2854] text-3xl tracking-wider animate-pulse">
        Loading the Daily Edition...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#4988C4] text-[#BDE8F5] font-serif">
      {/* Top Bar */}
      <div className="border-b-2 border-[#0F2854]/30 bg-[#4988C4]/80 backdrop-blur-sm py-4 px-4 md:px-8 flex justify-between items-center text-xs font-bold uppercase tracking-widest text-[#0F2854]">
        <span>Edition No. 442</span>
        <span className="hidden md:block">World Wide Web Edition</span>
        <span>{currentDate}</span>
      </div>

      {/* Masthead */}
      <header className="text-center py-16 md:py-24 relative border-b-4 border-double border-[#0F2854] bg-gradient-to-b from-[#4988C4] to-[#4988C4]/90">
        <motion.h1
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="font-serif text-6xl md:text-8xl xl:text-9xl font-black uppercase leading-tight text-[#0F2854] tracking-tighter drop-shadow-lg"
        >
          Daily Insight
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-lg md:text-2xl font-bold text-[#0F2854]/80"
        >
          "The Truth is rarely pure, and never simple."
        </motion.p>
      </header>

      {/* Breaking News Bar */}
      <div className="bg-[#0F2854] text-[#4988C4] py-3 font-black tracking-wide border-y-2 border-[#BDE8F5]/30 flex items-center">
        <span className="px-4 uppercase animate-pulse bg-red-600 text-white text-xs font-black">
          Breaking
        </span>
        <div className="overflow-hidden flex-1 relative h-8 flex items-center">
          <div className="animate-marquee whitespace-nowrap absolute flex items-center">
            {articles.map((a) => (
              <Link key={a._id} href={`/article/${a.slug}`}>
                <span className="mx-8 text-xs font-bold uppercase hover:text-[#BDE8F5] cursor-pointer transition text-[#BDE8F5]">
                  {a.title} <span className="text-[#4988C4]/50">•</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Editorial Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-20">
        {/* FRONT PAGE: Grid of articles */}
        <section>
          <div className="flex items-end justify-between border-b-4 border-[#0F2854] pb-4 mb-12">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-[#0F2854]">
              Front Page
            </h2>
            <p className="text-sm font-bold text-[#0F2854]/80">
              Latest Stories &darr;
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {articles.slice(0, 8).map((article, idx) => (
              <ArticleCard
                key={article._id}
                article={article}
                priority={idx === 0}
              />
            ))}
          </motion.div>
        </section>

        {/* Divider */}
        <div className="h-16 border-y-2 border-[#0F2854]/30 bg-gradient-to-r from-[#4988C4] via-[#4988C4]/80 to-[#4988C4] flex items-center justify-center">
          <span className="text-xs font-black text-[#0F2854] uppercase tracking-[0.5em]">
            More Stories Below
          </span>
        </div>

        {/* Editor's Picks + Trending */}
        <section className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-8">
            <div className="flex items-end justify-between border-b-4 border-[#0F2854] pb-3 mb-8">
              <h2 className="text-4xl font-black uppercase text-[#0F2854] tracking-tighter">
                Editor's Picks
              </h2>
              <span className="text-xs font-bold text-[#0F2854]/80">
                Curated Selection
              </span>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid md:grid-cols-2 gap-8"
            >
              {articles
                .filter((a) => a.author.role === "editor")
                .slice(0, 4)
                .map((article) => (
                  <ArticleCard key={article._id} article={article} />
                ))}
            </motion.div>
          </div>

          {/* Trending Sidebar */}
          <div className="lg:col-span-4">
            <motion.div
              variants={trendingVariants}
              initial="initial"
              animate="animate"
              className="bg-[#0F2854] rounded-2xl p-7 shadow-lg border-2 border-[#BDE8F5]/20 sticky top-24"
            >
              <h3 className="text-xl font-black uppercase text-[#BDE8F5] mb-2 pb-3 border-b-2 border-[#BDE8F5]/30">
                🔥 Trending Now
              </h3>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="space-y-1"
              >
                {articles
                  .slice()
                  .sort((a, b) => (b.views || 0) - (a.views || 0))
                  .slice(0, 6)
                  .map((a, i) => (
                    <TrendingCard article={a} key={a._id} i={i} />
                  ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* All Remaining Articles List */}
        {articles.length > 8 && (
          <section>
            <div className="flex items-end justify-between border-b-4 border-[#0F2854] pb-3 mb-8">
              <h2 className="text-4xl font-black uppercase text-[#0F2854] tracking-tighter">
                All Articles
              </h2>
              <span className="text-xs font-bold text-[#0F2854]/80">
                {articles.length - 8} more stories
              </span>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {articles.slice(8).map((article) => (
                <ArticleCard key={article._id} article={article} />
              ))}
            </motion.div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#0F2854] text-[#BDE8F5] py-16 px-4 mt-20 border-t-4 border-[#4988C4]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 border-b border-[#BDE8F5]/20 pb-12 mb-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-black uppercase tracking-tighter text-[#4988C4]">
              Daily Insight
            </h2>
            <p className="text-[#BDE8F5]/70 text-sm leading-relaxed">
              Premium news coverage. Global perspectives. Trusted by informed
              citizens worldwide.
            </p>
          </div>

          <div className="flex flex-col gap-3 uppercase text-xs font-bold tracking-widest">
            <p className="text-[#4988C4] mb-2">Categories</p>
            {[
              "Politics",
              "Technology",
              "Sports",
              "Health",
              "Entertainment",
            ].map((s) => (
              <span
                key={s}
                className="hover:text-[#4988C4] cursor-pointer transition text-[#BDE8F5]"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold uppercase text-[#4988C4] tracking-widest">
              Newsletter
            </p>
            <div className="flex border-2 border-[#BDE8F5]/30 rounded-xl overflow-hidden focus-within:border-[#4988C4] transition">
              <input
                type="email"
                placeholder="Your Email"
                className="bg-[#0F2854] border-none p-3 text-xs w-full focus:ring-0 text-[#BDE8F5] placeholder-[#BDE8F5]/40"
              />
              <button className="bg-[#4988C4] text-[#0F2854] font-black px-6 text-xs uppercase hover:bg-[#BDE8F5] transition">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="text-center pt-8 text-xs text-[#BDE8F5]/60 uppercase tracking-widest">
          © 2026 Daily Insight • All Rights Reserved
        </div>
      </footer>

      {/* Marquee animation */}
      <style jsx>{`
        .animate-marquee {
          display: inline-block;
          animation: marquee 50s linear infinite;
        }
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
}
