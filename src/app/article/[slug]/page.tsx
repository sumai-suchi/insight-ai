"use client";

import { useState, useEffect, useCallback, use, useRef } from "react";
import { motion, Variants } from "framer-motion";
import {
  FaEye, FaHeart, FaRegHeart, FaShareAlt,
  FaQuoteLeft, FaThumbsDown, FaRegThumbsDown,
  FaArrowLeft, FaClock
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Article } from "@/types/editor";
import CommentSection from "@/components/CommentSection/CommentSection";

// Animation Variants
const headerVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: "easeOut", delay: 0.2 }
  }
};

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.3 }
  }
};

const sidebarVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut", delay: 0.4 }
  }
};

const buttonHoverVariants: Variants = {
  hover: {
    scale: 1.15,
    boxShadow: "0 8px 24px rgba(189, 232, 245, 0.4)",
    transition: { duration: 0.3 }
  },
  tap: { scale: 0.95 }
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ArticleDetails({ params }: PageProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  // FIX: This Ref prevents double-triggering the view count
  const viewProcessed = useRef(false);

  const handleEngagement = async (action: string) => {
    try {
      const res = await fetch(`/api/articles/${slug}/engagement`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });

      // Update local state so UI reflects the change immediately
      if (res.ok && article) {
        const json = await res.json();
        if (json.success) {
          setArticle(prev => prev ? {
            ...prev,
            views: json.data.views,
            likes: json.data.likes,
            dislikes: json.data.dislikes
          } : null);
        }
      }
    } catch (err) {
      console.error(`Failed to record ${action}`, err);
    }
  };

  const fetchArticle = useCallback(async () => {
    try {
      const res = await fetch(`/api/all-article/${slug}`);

      if (!res.ok) {
        setLoading(false);
        return;
      }

      const json = await res.json();
      if (json.success) {
        setArticle(json.data);
        
        // FIX: Only trigger view if it hasn't been processed yet
        if (!viewProcessed.current) {
          handleEngagement("view");
          viewProcessed.current = true;
        }
      }
    } catch (err) {
      console.error("Client-side error:", err);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  const toggleLike = () => {
    if (disliked) setDisliked(false);
    const action = liked ? "unlike" : "like";
    setLiked(!liked);
    handleEngagement(action);
  };

  const toggleDislike = () => {
    if (liked) setLiked(false);
    const action = disliked ? "undislike" : "dislike";
    setDisliked(!disliked);
    handleEngagement(action);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  useEffect(() => {
    fetchArticle();
  }, [fetchArticle]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F2854] flex items-center justify-center font-serif text-3xl font-black text-[#BDE8F5] animate-pulse">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Loading Dispatch...
        </motion.div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-[#0F2854] flex flex-col items-center justify-center font-serif text-[#BDE8F5] gap-8">
        <h1 className="text-5xl font-black">Article Not Found</h1>
        <button
          onClick={() => router.back()}
          className="px-8 py-3 bg-[#4988C4] text-[#0F2854] font-black rounded-lg hover:bg-[#BDE8F5] transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F2854] text-[#BDE8F5] font-serif pb-20 relative">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-[#0F2854]/80 backdrop-blur-md border-b border-[#BDE8F5]/10 py-4"
      >
        <div className="max-w-5xl mx-auto px-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 bg-[#4988C4] text-[#0F2854] rounded-lg font-black uppercase text-sm hover:bg-[#BDE8F5] hover:shadow-lg transition duration-300"
          >
            <FaArrowLeft /> Back to Articles
          </button>
        </div>
      </motion.div>

      <header className="max-w-5xl mx-auto pt-16 px-6 text-center">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <motion.div whileHover={{ scale: 1.1 }} className="inline-block">
            <span className="bg-gradient-to-r from-[#4988C4] to-[#BDE8F5] text-[#0F2854] font-black uppercase tracking-[0.3em] text-sm px-6 py-2 rounded-full shadow-lg">
              {article.category?.name || "General"}
            </span>
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tighter text-[#BDE8F5] drop-shadow-lg">
            {article.title}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-xl md:text-2xl text-[#BDE8F5]/90 italic font-semibold max-w-3xl mx-auto leading-relaxed"
          >
            "{article.excerpt}"
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-6 pt-8 border-t border-[#BDE8F5]/20 mt-8"
          >
            <div className="text-left">
              <p className="text-xs font-bold uppercase tracking-widest text-[#BDE8F5]/60">Written By</p>
              <p className="font-black text-lg uppercase text-[#BDE8F5]">{article.author.name}</p>
            </div>
            <div className="h-12 w-[1px] bg-gradient-to-b from-[#4988C4] to-transparent"></div>
            <div className="text-left">
              <p className="text-xs font-bold uppercase tracking-widest text-[#BDE8F5]/60 flex items-center gap-1">
                <FaClock className="text-sm" /> Published
              </p>
              <p className="font-black text-lg uppercase text-[#BDE8F5]">
                {new Date(article.createdAt).toLocaleDateString('en-US', {
                  month: 'short', day: 'numeric', year: 'numeric'
                })}
              </p>
            </div>
            <div className="h-12 w-[1px] bg-gradient-to-b from-[#4988C4] to-transparent"></div>
            <div className="text-left">
              <p className="text-xs font-bold uppercase tracking-widest text-[#BDE8F5]/60 flex items-center gap-1">
                <FaEye className="text-sm" /> Views
              </p>
              <p className="font-black text-lg uppercase text-[#BDE8F5]">{article.views}</p>
            </div>
          </motion.div>
        </motion.div>
      </header>

      <section className="max-w-6xl mx-auto my-16 px-6">
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          className="relative aspect-video overflow-hidden border-4 border-[#BDE8F5]/30 rounded-2xl shadow-2xl group"
        >
          <img
            src={article.featuredImage}
            className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
            alt={article.title}
          />
        </motion.div>
      </section>

      <main className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-12">
        <motion.aside
          variants={sidebarVariants}
          initial="hidden"
          animate="visible"
          className="hidden md:flex flex-col gap-8 sticky top-32 h-fit"
        >
          <motion.button onClick={toggleLike} variants={buttonHoverVariants} whileHover="hover" whileTap="tap" className="group flex flex-col items-center gap-2">
            <div className={`p-4 rounded-full border-2 transition ${liked ? 'bg-[#BDE8F5] border-[#BDE8F5] text-[#0F2854]' : 'border-[#BDE8F5]/40 text-[#BDE8F5] hover:border-[#BDE8F5] hover:bg-[#BDE8F5]/10'} shadow-lg`}>
              {liked ? <FaHeart className="text-xl" /> : <FaRegHeart className="text-xl" />}
            </div>
            <span className="text-xs font-black uppercase text-[#BDE8F5]/80">{article.likes}</span>
          </motion.button>

          <motion.button onClick={toggleDislike} variants={buttonHoverVariants} whileHover="hover" whileTap="tap" className="group flex flex-col items-center gap-2">
            <div className={`p-4 rounded-full border-2 transition ${disliked ? 'bg-[#4988C4] border-[#4988C4] text-[#0F2854]' : 'border-[#BDE8F5]/40 text-[#BDE8F5] hover:border-[#4988C4] hover:bg-[#4988C4]/20'} shadow-lg`}>
              {disliked ? <FaThumbsDown className="text-xl" /> : <FaRegThumbsDown className="text-xl" />}
            </div>
            <span className="text-xs font-black uppercase text-[#BDE8F5]/80">{article.dislikes}</span>
          </motion.button>

          <motion.button onClick={copyToClipboard} variants={buttonHoverVariants} whileHover="hover" whileTap="tap" className="flex flex-col items-center gap-2">
            <div className="p-4 rounded-full border-2 border-[#BDE8F5]/40 text-[#BDE8F5] hover:border-[#BDE8F5] hover:bg-[#BDE8F5]/10 transition shadow-lg">
              <FaShareAlt className="text-xl" />
            </div>
            <span className="text-xs font-black uppercase text-[#BDE8F5]/80">Share</span>
          </motion.button>
        </motion.aside>

        <motion.article variants={contentVariants} initial="hidden" animate="visible" className="max-w-none text-[#BDE8F5]">
          <div
            className="leading-relaxed text-[#BDE8F5]/95 space-y-6 text-lg prose prose-headings:font-black prose-headings:uppercase prose-headings:text-[#BDE8F5] prose-headings:tracking-tighter prose-p:text-[#BDE8F5]"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          <div className="mt-16 p-8 md:p-12 bg-[#1C4D8D]/40 border-l-4 border-[#4988C4] rounded-lg italic text-xl relative shadow-lg">
            <FaQuoteLeft className="text-[#4988C4]/40 text-5xl mb-4 absolute top-6 left-6" />
            <p className="relative z-10 pl-8">
              Thank you for reading this edition of <span className="text-[#BDE8F5] font-black">Daily Insight</span>.
            </p>
          </div>
        </motion.article>
      </main>

      <motion.section initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto px-4 mt-24">
        <div className="border-t border-[#BDE8F5]/20 text-blue-400 pt-16">
          <h2 className="text-4xl font-black uppercase text- text mb-8 tracking-tighter">Reader Discussion</h2>
          <CommentSection articleId={article._id} initialCount={article.commentCount} />
        </div>
      </motion.section>

      {/* Mobile Footer */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0F2854]/95 backdrop-blur-md border-t border-[#BDE8F5]/20 p-4 flex gap-4 z-40">
        <button onClick={toggleLike} className={`flex-1 py-3 px-4 rounded-lg font-black uppercase text-sm ${liked ? 'bg-[#BDE8F5] text-[#0F2854]' : 'bg-[#4988C4] text-[#0F2854]'}`}>
          {liked ? '❤️' : '🤍'} {article.likes}
        </button>
        <button onClick={toggleDislike} className={`flex-1 py-3 px-4 rounded-lg font-black uppercase text-sm ${disliked ? 'bg-[#4988C4] text-[#0F2854]' : 'bg-[#4988C4]/50 text-[#BDE8F5]'}`}>
          👎 {article.dislikes}
        </button>
        <button onClick={copyToClipboard} className="flex-1 py-3 px-4 rounded-lg font-black uppercase text-sm bg-[#1C4D8D] text-[#BDE8F5]">📤 Share</button>
      </div>
    </div>
  );
}