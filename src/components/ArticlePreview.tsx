"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Hash, ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";

interface PreviewProps {
  article: {
    title: string;
    excerpt: string;
    content: string; // Added for the full story
    featuredImage: string;
    author: { name: string; avatar?: string };
    category: { name: string; slug: string };
    createdAt: string;
    readingTime: number;
    slug: string;
  };
}

export default function ArticlePreview({ article }: PreviewProps) {
  if (!article) return (
    <div className="min-h-screen flex items-center justify-center bg-[#050B18]">
      <div className="animate-pulse text-[#4988C4] font-black tracking-widest">LOADING PREVIEW...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050B18] text-[#BDE8F5] selection:bg-[#4988C4] selection:text-white">
      {/* 1. CINEMATIC HERO SECTION */}
      <header className="relative h-[70vh] w-full overflow-hidden">
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 1.5 }}
          src={article.featuredImage || "/placeholder.jpg"}
          className="absolute inset-0 w-full h-full object-cover"
          alt={article.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050B18] via-[#050B18]/60 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 px-4 text-center">
          <motion.span 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="px-4 py-1.5 rounded-full bg-[#4988C4]/20 border border-[#4988C4]/40 text-[#4988C4] text-[10px] font-black uppercase tracking-[0.3em] mb-6"
          >
            {article.category?.name}
          </motion.span>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-7xl font-black max-w-5xl leading-[1.1] mb-8 text-white"
          >
            {article.title}
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-8 text-sm font-bold uppercase tracking-widest text-[#BDE8F5]/60"
          >
            <div className="flex items-center gap-2"><Calendar size={16} className="text-[#4988C4]" /> {new Date(article.createdAt).toLocaleDateString()}</div>
            <div className="flex items-center gap-2"><Clock size={16} className="text-[#4988C4]" /> {article.readingTime} Min Read</div>
            <div className="flex items-center gap-2"><User size={16} className="text-[#4988C4]" /> {article.author.name}</div>
          </motion.div>
        </div>
      </header>

      {/* 2. MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 pb-24 -mt-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* SIDEBAR (Sticky Metadata) */}
          <aside className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-24 space-y-8 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div>
                <h4 className="text-[10px] font-black text-[#4988C4] uppercase tracking-widest mb-4">The Author</h4>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#4988C4] flex items-center justify-center text-[#050B18] font-black italic">
                    {article.author.name.charAt(0)}
                  </div>
                  <span className="text-sm font-bold text-white">{article.author.name}</span>
                </div>
              </div>
              <div className="h-px bg-white/10" />
              <div>
                <h4 className="text-[10px] font-black text-[#4988C4] uppercase tracking-widest mb-2">Exerpt</h4>
                <p className="text-xs leading-relaxed text-[#BDE8F5]/60 italic">"{article.excerpt}"</p>
              </div>
            </div>
          </aside>

          {/* ARTICLE BODY */}
          <article className="lg:col-span-8 bg-white/[0.02] border border-white/5 p-8 md:p-16 rounded-[2.5rem] shadow-2xl">
            {/* Render the full story content */}
            <div 
              className="prose prose-invert prose-blue max-w-none 
              prose-p:text-[#BDE8F5]/80 prose-p:text-lg prose-p:leading-relaxed 
              prose-headings:text-white prose-headings:font-black 
              prose-strong:text-[#4988C4] prose-blockquote:border-[#4988C4]
              prose-img:rounded-3xl"
              dangerouslySetInnerHTML={{ __html: article.content }} 
            />
            
            {/* FOOTER OF ARTICLE */}
            <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap justify-between items-center gap-6">
               <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-[#4988C4] uppercase tracking-tighter">Share this story</span>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-full bg-white/5 hover:bg-[#4988C4] transition-colors"><Share2 size={16} /></button>
                  </div>
               </div>
               <Link href="/project-dashboard" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#BDE8F5] hover:text-[#4988C4] transition-colors">
                 <ArrowLeft size={16} /> Back to Dashboard
               </Link>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}