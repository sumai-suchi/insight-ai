"use client";

import { useState, useEffect, useCallback, use } from "react"; // Added 'use'
import { motion } from "framer-motion";
import { 
  FaEye, FaHeart, FaRegHeart, FaShareAlt, 
  FaQuoteLeft, FaThumbsDown, FaRegThumbsDown 
} from "react-icons/fa";
import { Article } from "@/types/editor";
import CommentSection from "@/components/CommentSection/CommentSection";

// Update the type to reflect that params is a Promise in Next.js 15
interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ArticleDetails({ params }: PageProps) {
  // 1. Unwrap the params using React's use() hook
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const fetchArticle = useCallback(async () => {
  try {
    const res = await fetch(`/api/all-article/${slug}`);
    
    // Check if the response is actually JSON/OK
    if (!res.ok) {
      const errorText = await res.text(); // Read as text to see the HTML error
      console.error(`Server returned ${res.status}:`, errorText);
      setLoading(false);
      return;
    }

    const json = await res.json();
    if (json.success) {
      setArticle(json.data);
      // ... rest of your logic
    }
  } catch (err) {
    console.error("Client-side error:", err);
  } finally {
    setLoading(false);
  }
}, [slug]); // Use the unwrapped slug as a dependency

  useEffect(() => {
    fetchArticle();
  }, [fetchArticle]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4f1ea] flex items-center justify-center font-serif text-2xl animate-pulse">
        Loading Dispatch...
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-[#f4f1ea] flex items-center justify-center font-serif text-xl">
        Article Not Found.
      </div>
    );
  }

  return (
    <div className="bg-[#f4f1ea] min-h-screen text-gray-900 font-serif pb-20">
      {/* 🚀 ARTICLE HEADER */}
      <header className="max-w-4xl mx-auto pt-16 px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <span className="text-red-600 font-black uppercase tracking-[0.3em] text-sm">
            {article.category?.name || "General"} — {article.contentType?.replace('_', ' ') || "Article"}
          </span>
          <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tighter text-gray-900">
            {article.title}
          </h1>
          <p className="text-xl text-gray-600 italic font-medium max-w-2xl mx-auto leading-relaxed">
            "{article.excerpt}"
          </p>
          
          <div className="flex items-center justify-center gap-6 pt-8 border-t border-black/10 mt-8">
            <div className="text-left">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Written By</p>
              <p className="font-bold text-lg uppercase">{article.author.name}</p>
            </div>
            <div className="h-10 w-[1px] bg-gray-300"></div>
            <div className="text-left">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Published</p>
              <p className="font-bold text-lg uppercase">
                {new Date(article.createdAt).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </motion.div>
      </header>

      {/* 🖼️ FEATURED IMAGE */}
      <section className="max-w-6xl mx-auto my-12 px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative aspect-[21/9] overflow-hidden border-[12px] border-white shadow-2xl"
        >
          <img 
            src={article.featuredImage} 
            className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-1000"
            alt={article.title}
          />
        </motion.div>
      </section>

      {/* 📖 ARTICLE CONTENT */}
      <main className="max-w-3xl mx-auto px-6 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 relative">
        
        {/* LEFT STICKY SOCIALS */}
        <aside className="hidden md:flex flex-col gap-6 sticky top-24 h-fit">
          <button 
            onClick={() => setLiked(!liked)} 
            className="group flex flex-col items-center gap-1"
          >
            <div className={`p-3 rounded-full border border-gray-300 group-hover:bg-red-50 transition ${liked ? 'bg-red-100 border-red-200' : ''}`}>
              {liked ? <FaHeart className="text-red-600" /> : <FaRegHeart />}
            </div>
            <span className="text-[10px] font-bold">{(article.likes || 0) + (liked ? 1 : 0)}</span>
          </button>

          <button 
            onClick={() => setDisliked(!disliked)} 
            className="group flex flex-col items-center gap-1"
          >
            <div className={`p-3 rounded-full border border-gray-300 group-hover:bg-gray-200 transition ${disliked ? 'bg-gray-800 border-gray-800 text-white' : ''}`}>
              {disliked ? <FaThumbsDown /> : <FaRegThumbsDown />}
            </div>
            <span className="text-[10px] font-bold">{article.dislikes || 0}</span>
          </button>

          <FaShareAlt className="text-gray-400 hover:text-black cursor-pointer ml-3 transition" />
        </aside>

        <article className="prose prose-lg max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-p:leading-relaxed prose-p:text-gray-800">
           {/* Dropcap Effect for first letter */}
           <div 
             className="first-letter:text-7xl first-letter:font-black first-letter:text-gray-900 first-letter:mr-3 first-letter:float-left first-letter:leading-[0.8] first-letter:mt-2"
             dangerouslySetInnerHTML={{ __html: article.content }} 
           />
           
           <div className="mt-12 p-8 bg-white border-l-4 border-red-600 italic text-xl text-gray-700 font-medium shadow-sm">
             <FaQuoteLeft className="text-red-600/20 text-4xl mb-2" />
             Thank you for reading this edition of Daily Insight. Our journalism is funded by readers like you.
           </div>
        </article>
      </main>

      {/* 💬 COMMENTS SECTION */}
      <section className="max-w-3xl mx-auto px-6 mt-20">
        <CommentSection articleId={article._id} initialCount={article.commentCount} />
      </section>
    </div>
  );
}