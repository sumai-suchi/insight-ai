"use client";

import { useState, useEffect, useCallback, use } from "react";
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
const headerVariants : Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const imageVariants : Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: "easeOut", delay: 0.2 }
  }
};

const contentVariants : Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.3 }
  }
};

const sidebarVariants : Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut", delay: 0.4 }
  }
};

const buttonHoverVariants : Variants = {
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

  const fetchArticle = useCallback(async () => {
    try {
      const res = await fetch(`/api/all-article/${slug}`);

      if (!res.ok) {
        const errorText = await res.text();
        console.error(`Server returned ${res.status}:`, errorText);
        setLoading(false);
        return;
      }

      const json = await res.json();
      if (json.success) {
        setArticle(json.data);
        handleEngagement("view");
      }
    } catch (err) {
      console.error("Client-side error:", err);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  const handleEngagement = async (action: string) => {
    try {
      await fetch(`/api/articles/${slug}/engagement`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
    } catch (err) {
      console.error(`Failed to record ${action}`, err);
    }
  };

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
      {/* Back Button - Properly Positioned */}
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

      {/* ARTICLE HEADER */}
      <header className="max-w-5xl mx-auto pt-16 px-6 text-center">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Category Badge */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="inline-block"
          >
            <span className="bg-gradient-to-r from-[#4988C4] to-[#BDE8F5] text-[#0F2854] font-black uppercase tracking-[0.3em] text-sm px-6 py-2 rounded-full shadow-lg">
              {article.category?.name || "General"}
            </span>
          </motion.div>

          {/* Article Title */}
          <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tighter text-[#BDE8F5] drop-shadow-lg">
            {article.title}
          </h1>

          {/* Excerpt */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-xl md:text-2xl text-[#BDE8F5]/90 italic font-semibold max-w-3xl mx-auto leading-relaxed"
          >
            "{article.excerpt}"
          </motion.p>

          {/* Meta Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
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
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
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

      {/* FEATURED IMAGE */}
      <section className="max-w-6xl mx-auto my-16 px-6">
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          className="relative aspect-video overflow-hidden border-4 border-[#BDE8F5]/30 rounded-2xl shadow-2xl group"
          style={{
            boxShadow: "0 20px 60px rgba(189, 232, 245, 0.15)"
          }}
        >
          <img
            src={article.featuredImage}
            className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
            alt={article.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F2854]/40 via-transparent to-transparent pointer-events-none"></div>
        </motion.div>
      </section>

      {/* MAIN CONTENT */}
      <main className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-12">

        {/* LEFT STICKY SOCIALS */}
        <motion.aside
          variants={sidebarVariants}
          initial="hidden"
          animate="visible"
          className="hidden md:flex flex-col gap-8 sticky top-32 h-fit"
        >
          {/* Like Button */}
          <motion.button
            onClick={toggleLike}
            variants={buttonHoverVariants}
            whileHover="hover"
            whileTap="tap"
            className="group flex flex-col items-center gap-2"
          >
            <div
              className={`p-4 rounded-full border-2 transition ${
                liked
                  ? 'bg-[#BDE8F5] border-[#BDE8F5] text-[#0F2854]'
                  : 'border-[#BDE8F5]/40 text-[#BDE8F5] hover:border-[#BDE8F5] hover:bg-[#BDE8F5]/10'
              } shadow-lg`}
            >
              {liked ? <FaHeart className="text-xl" /> : <FaRegHeart className="text-xl" />}
            </div>
            <span className="text-xs font-black uppercase text-[#BDE8F5]/80">
              {(article?.likes || 0) + (liked ? 1 : 0)}
            </span>
          </motion.button>

          {/* Dislike Button */}
          <motion.button
            onClick={toggleDislike}
            variants={buttonHoverVariants}
            whileHover="hover"
            whileTap="tap"
            className="group flex flex-col items-center gap-2"
          >
            <div
              className={`p-4 rounded-full border-2 transition ${
                disliked
                  ? 'bg-[#4988C4] border-[#4988C4] text-[#0F2854]'
                  : 'border-[#BDE8F5]/40 text-[#BDE8F5] hover:border-[#4988C4] hover:bg-[#4988C4]/20'
              } shadow-lg`}
            >
              {disliked ? <FaThumbsDown className="text-xl" /> : <FaRegThumbsDown className="text-xl" />}
            </div>
            <span className="text-xs font-black uppercase text-[#BDE8F5]/80">
              {(article?.dislikes || 0) + (disliked ? 1 : 0)}
            </span>
          </motion.button>

          {/* Share Button */}
          <motion.button
            onClick={copyToClipboard}
            variants={buttonHoverVariants}
            whileHover="hover"
            whileTap="tap"
            className="flex flex-col items-center gap-2"
          >
            <div className="p-4 rounded-full border-2 border-[#BDE8F5]/40 text-[#BDE8F5] hover:border-[#BDE8F5] hover:bg-[#BDE8F5]/10 transition shadow-lg">
              <FaShareAlt className="text-xl" />
            </div>
            <span className="text-xs font-black uppercase text-[#BDE8F5]/80">Share</span>
          </motion.button>
        </motion.aside>

        {/* ARTICLE CONTENT */}
        <motion.article
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          className="max-w-none text-[#BDE8F5]"
        >
          <div
            className="leading-relaxed text-[#BDE8F5]/95 space-y-6 text-lg prose prose-headings:font-black prose-headings:uppercase prose-headings:text-[#BDE8F5] prose-headings:tracking-tighter prose-headings:text-2xl prose-p:text-[#BDE8F5] prose-strong:text-[#BDE8F5] prose-em:text-[#BDE8F5]/90"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Quote Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-16 p-8 md:p-12 bg-[#1C4D8D]/40 border-l-4 border-[#4988C4] rounded-lg italic text-xl text-[#BDE8F5]/95 font-semibold shadow-lg relative"
          >
            <FaQuoteLeft className="text-[#4988C4]/40 text-5xl mb-4 absolute top-6 left-6" />
            <p className="relative z-10 pl-8">
              Thank you for reading this edition of <span className="text-[#BDE8F5] font-black">Daily Insight</span>. Our journalism is powered by readers like you. Support quality content.
            </p>
          </motion.div>
        </motion.article>
      </main>

      {/* COMMENTS SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="max-w-5xl mx-auto px-4 mt-24"
      >
        <div className="border-t border-[#BDE8F5]/20 pt-16">
          <h2 className="text-4xl font-black uppercase text-[#BDE8F5] mb-8 tracking-tighter">
            Reader Discussion
          </h2>
          <CommentSection articleId={article._id} initialCount={article.commentCount} />
        </div>
      </motion.section>

      {/* Mobile Engagement Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0F2854]/95 backdrop-blur-md border-t border-[#BDE8F5]/20 p-4 flex gap-4 z-40"
      >
        <button
          onClick={toggleLike}
          className={`flex-1 py-3 px-4 rounded-lg font-black uppercase text-sm transition ${
            liked
              ? 'bg-[#BDE8F5] text-[#0F2854]'
              : 'bg-[#4988C4] text-[#0F2854] hover:bg-[#BDE8F5]'
          }`}
        >
          {liked ? '❤️' : '🤍'} Like
        </button>
        <button
          onClick={toggleDislike}
          className={`flex-1 py-3 px-4 rounded-lg font-black uppercase text-sm transition ${
            disliked
              ? 'bg-[#4988C4] text-[#0F2854]'
              : 'bg-[#4988C4]/50 text-[#BDE8F5] hover:bg-[#4988C4]'
          }`}
        >
          👎 Dislike
        </button>
        <button
          onClick={copyToClipboard}
          className="flex-1 py-3 px-4 rounded-lg font-black uppercase text-sm bg-[#1C4D8D] text-[#BDE8F5] hover:bg-[#4988C4] transition"
        >
          📤 Share
        </button>
      </motion.div>
    </div>
  );
}