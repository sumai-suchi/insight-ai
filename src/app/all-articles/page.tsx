"use client";

import { motion, Variants } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link"; // ✅ Correct import for navigation
import { 
  FaEye, FaHeart, FaRegHeart, FaComment, 
  FaShareAlt, FaRegBookmark 
} from "react-icons/fa";
import { Article } from "@/types/editor";

// --- Animation Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  },
};

// --- Sub-Component: ArticleCard ---
const ArticleCard = ({ article, priority = false }: { article: Article, priority?: boolean }) => {
  const [liked, setLiked] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      className={`group relative bg-white border-b-4 border-gray-200 hover:border-red-600 transition-all duration-500 overflow-hidden flex flex-col ${
        priority ? "md:col-span-2 md:row-span-2" : "col-span-1"
      }`}
    >
      {/* 1. Wrap Image in Link for redirection */}
      <Link href={`/article/${article.slug}`} className="cursor-pointer overflow-hidden aspect-video block">
        <img 
          src={article.featuredImage || "https://via.placeholder.com/800x600?text=Daily+Insight"} 
          className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-110 transition duration-700" 
          alt={article.title}
        />
        <div className="absolute top-4 left-4 pointer-events-none">
          <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-tighter shadow-lg">
            {article.author.role === "editor" ? "Editor" : "Staff"} Picks
          </span>
        </div>
      </Link>

      <div className="p-5 flex-grow flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-red-600 font-black text-xs uppercase tracking-widest italic">
              {article.category.name}
            </span>
            <span className="text-[10px] text-gray-400 font-serif">
              {new Date(article.createdAt).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              }).toUpperCase()}
            </span>
          </div>

          {/* 2. Wrap Title in Link */}
          <Link href={`/article/${article.slug}`}>
            <h2 className={`font-serif font-black leading-tight text-gray-900 group-hover:text-red-700 transition duration-300 mb-3 cursor-pointer ${
              priority ? "text-3xl" : "text-xl"
            }`}>
              {article.title}
            </h2>
          </Link>

          <p className="text-sm text-gray-600 font-serif leading-relaxed line-clamp-3 mb-4">
            {article.excerpt}
          </p>
        </div>

        {/* Engagement Stats - Making the card look "Busy" and premium */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="flex gap-4 text-gray-400 text-xs font-bold">
            <span className="flex items-center gap-1"><FaEye className="text-[10px]" /> {article.views /2}</span>
            <span className="flex items-center gap-1"><FaComment className="text-[10px]" /> {article.commentCount}</span>
          </div>

          <div className="flex items-center gap-4 text-gray-500">
            <button 
              onClick={(e) => { e.preventDefault(); setLiked(!liked); }} 
              className="hover:scale-125 transition active:scale-90"
            >
              {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
            </button>
            <FaShareAlt className="cursor-pointer hover:text-blue-500 transition" />
            <FaRegBookmark className="cursor-pointer hover:text-yellow-600 transition" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Page Component ---
export default function AllArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState("");

  const fetchArticles = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/articles/published'); 
      const json = await res.json();
      if (json.success) {
        setArticles(json.data);
      }
    } catch (err) {
      console.error("Failed to load articles", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString('en-US', { 
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
    }));
    fetchArticles();
  }, [fetchArticles]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4f1ea] flex items-center justify-center font-serif text-2xl animate-pulse">
        Fetching the Morning Edition...
      </div>
    );
  }

  return (
    <div className="bg-[#f4f1ea] min-h-screen text-gray-900 font-serif">
      {/* TOP BAR */}
      <div className="border-b border-black py-2 px-6 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
        <span>Edition No. 442</span>
        <span className="hidden md:block">World Wide Web Edition</span>
        <span>{currentDate}</span>
      </div>

      {/* MASTER HEADER */}
      <header className="py-10 border-b-4 border-double border-black text-center px-4">
        <motion.h1 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none"
        >
          Daily Insight
        </motion.h1>
        <p className="mt-4 text-sm md:text-lg italic font-medium text-gray-700">
          "The truth is rarely pure and never simple."
        </p>
      </header>

      {/* BREAKING NEWS MARQUEE */}
      <div className="bg-red-600 text-white py-2 flex items-center border-y border-red-800">
        <span className="px-4 font-black uppercase text-xs animate-pulse bg-red-700 h-full py-1">Breaking</span>
        <div className="overflow-hidden flex-1 relative h-6">
          <div className="animate-marquee whitespace-nowrap absolute flex items-center">
            {articles.map((a) => (
              <Link key={a._id} href={`/article/${a.slug}`}>
                <span className="mx-10 text-xs font-bold uppercase italic hover:underline cursor-pointer">
                  {a.title} •
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-10 space-y-20">
        
        {/* FRONT PAGE GRID */}
        <section className="space-y-8">
          <div className="flex items-end justify-between border-b-2 border-black pb-2">
            <h2 className="text-3xl font-black uppercase tracking-tighter">Front Page</h2>
            <p className="text-xs font-bold text-red-600">LATEST DISPATCHES ↓</p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {articles.slice(0, 9).map((article, idx) => (
              <ArticleCard 
                key={article._id} 
                article={article} 
                priority={idx === 0} 
              />
            ))}
          </motion.div>
        </section>

        {/* SECTION DIVIDER */}
        <div className="h-10 border-y border-gray-300 bg-gray-50 flex items-center justify-center">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.5em]">Classifieds & Opinions</span>
        </div>

        {/* EDITOR'S PICKS */}
        <section className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            <h2 className="text-3xl font-black uppercase border-b-2 border-black inline-block">Editor's Perspective</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {articles.filter(a => a.author.role === "editor").slice(0, 4).map(article => (
                <ArticleCard key={article._id} article={article} />
              ))}
            </div>
          </div>
          
          {/* TRENDING SIDEBAR */}
          <div className="lg:col-span-4 space-y-6 bg-white p-6 border-l-2 border-black/5 shadow-sm">
            <h3 className="text-xl font-black uppercase underline decoration-red-600 decoration-4 underline-offset-8 mb-8">Trending Now</h3>
            {articles.sort((a,b) => (b.views || 0) - (a.views || 0)).slice(0, 5).map((a, i) => (
              <Link key={a._id} href={`/article/${a.slug}`}>
                <div className="group border-b border-gray-100 pb-4 cursor-pointer flex gap-4">
                  <span className="text-4xl font-serif text-gray-200 font-black group-hover:text-red-100 transition tracking-tighter self-start">0{i+1}</span>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm leading-tight group-hover:text-red-600 transition">{a.title}</h4>
                    <div className="flex gap-4 mt-2 text-[9px] text-gray-400 uppercase font-black">
                      <span>{a.views} Views</span>
                      <span className="text-red-600">{a.category.name}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-black text-white py-20 px-6 mt-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 border-b border-gray-800 pb-10">
          <div className="space-y-4">
            <h2 className="text-4xl font-black uppercase tracking-tighter">Daily Insight</h2>
            <p className="text-gray-400 text-sm max-w-xs">Uncompromising coverage. Global perspective. Providing news for the informed citizen since 2026.</p>
          </div>
          <div className="flex flex-col gap-2 uppercase text-[10px] font-bold tracking-[0.2em]">
            <p className="text-gray-500 mb-2">Sections</p>
            {["Politics", "Technology", "Sports", "Health", "Entertainment"].map(s => (
              <span key={s} className="hover:text-red-500 cursor-pointer transition w-fit">{s}</span>
            ))}
          </div>
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase text-gray-500 tracking-widest">Subscribe to the Courier</p>
            <div className="flex border border-gray-800 focus-within:border-red-600 transition">
              <input type="text" placeholder="EMAIL ADDRESS" className="bg-transparent border-none p-3 text-xs w-full focus:ring-0" />
              <button className="bg-white text-black font-black px-6 text-[10px] uppercase hover:bg-red-600 hover:text-white transition">Join</button>
            </div>
          </div>
        </div>
        <div className="text-center pt-10 text-[9px] text-gray-600 uppercase tracking-[0.5em]">
          © 2026 Daily Insight Newspaper • No reproduction without permission
        </div>
      </footer>

      <style jsx>{`
        .animate-marquee {
          display: inline-block;
          animation: marquee 50s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(5vw); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}