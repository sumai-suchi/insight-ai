"use client";
import { INews } from "@/types/news";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Bookmark, Sparkles, ArrowUpRight } from "lucide-react"; // আইকনগুলো ইমপোর্ট করা হয়েছে
import authClient from "@/lib/auth/auth-client";

export default function NewsCard({ news }: { news: INews }) {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session } = authClient.useSession();

  const handleSummarize = async () => {
    setLoading(true);
    setSummary("Generating summary...");
    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: news.content || news.description || news.title,
        }),
      });
      const data = await res.json();
      setSummary(data.summary || "No Summary Found");
    } catch (error) {
      console.error(error);
      setSummary("Failed to generate Summary.");
    } finally {
      setLoading(false);
    }
  };

  const handleBookmark = async () => {
    try {
      const res = await fetch("/api/bookmark", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user.id,
          title: news.title,
          articleId: news._id,
          url: news.url,
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

  const handleReadHistory = async () => {
    try {
      const res = await fetch("/api/news_history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          userId: session?.user.id,
          article: news,
        }),
      });

      if (res) {
        console.log("successful");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="group bg-[#0F2854] rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-[#BDE8F5]/20 flex flex-col h-full">
      {/* Image Section */}
      <div className="relative h-48 w-full bg-[#0F2854] overflow-hidden">
        {news.urlToImage ? (
          <Image
            src={news.urlToImage}
            alt={news.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-4xl">
            📰
          </div>
        )}
        {/* Dark overlay for editorial readability */}
        <div className="absolute inset-0 bg-linear-to-t from-[#0F2854]/95 via-[#0F2854]/35 to-transparent pointer-events-none" />

        <span className="absolute top-3 left-3 z-10 bg-[#BDE8F5] text-[#0F2854] text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-sm">
          {news.category}
        </span>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col grow">
        <div className="flex items-center gap-2 text-[11px] text-[#BDE8F5]/70 mb-2">
          <span className="font-medium text-[#BDE8F5]/70">
            {news.sourceName}
          </span>
          <span>•</span>
          <span>
            {new Date(news.publishedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>

        <h3 className="font-bold text-[#BDE8F5] leading-snug line-clamp-2 group-hover:text-white transition-colors mb-2">
          {news.title}
        </h3>

        {news.description && (
          <p className="text-xs text-[#BDE8F5]/85 line-clamp-2 leading-relaxed mb-4">
            {news.description}
          </p>
        )}

        {/* Action Bottom Bar */}
        <div className="mt-auto pt-4 border-t border-[#BDE8F5]/20 flex items-center justify-between">
          {/* Read More Link */}
          <Link
            href={news.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#BDE8F5] text-sm font-bold flex items-center gap-1 hover:text-white transition-colors group/link"
            onClick={handleReadHistory}
          >
            Read Full News
            <ArrowUpRight
              size={16}
              className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"
            />
          </Link>

          {/* Icon Actions */}
          <div className="flex items-center gap-2">
            {/* Bookmark Icon */}
            <button
              onClick={handleBookmark}
              className="p-2 text-[#BDE8F5]/70 hover:text-white hover:bg-[#BDE8F5]/10 rounded-full transition-all"
              title="Bookmark"
            >
              <Bookmark size={18} />
            </button>

            {/* Summarize Dialog Icon */}
            <Dialog>
              <DialogTrigger asChild>
                <button
                  className="p-2 text-[#BDE8F5]/70 hover:text-white hover:bg-[#BDE8F5]/10 rounded-full transition-all"
                  onClick={handleSummarize}
                  title="Summarize AI"
                >
                  <Sparkles size={18} />
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md rounded-2xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Sparkles size={18} className="text-[#BDE8F5]" />
                    AI News Summary
                  </DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  {loading ? (
                    <div className="flex flex-col items-center gap-2 py-6">
                      <div className="w-6 h-6 border-2 border-[#BDE8F5] border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-sm text-[#BDE8F5]/70">Thinking...</p>
                    </div>
                  ) : (
                    <p className="text-sm text-slate-700 leading-relaxed italic">
                      {summary || "No summary available."}
                    </p>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}
