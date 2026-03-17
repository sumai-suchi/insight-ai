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
import { authClient } from "@/lib/auth/auth-client";
import { Bookmark, Sparkles, ArrowUpRight } from "lucide-react"; // আইকনগুলো ইমপোর্ট করা হয়েছে

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
      const res = await fetch("/api/history", {
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
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
      {/* Image Section */}
      <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
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
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-purple-700 text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-sm">
          {news.category}
        </span>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-[11px] text-gray-400 mb-2">
          <span className="font-medium text-gray-500">{news.sourceName}</span>
          <span>•</span>
          <span>
            {new Date(news.publishedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>

        <h3 className="font-bold text-gray-800 leading-snug line-clamp-2 group-hover:text-purple-600 transition-colors mb-2">
          {news.title}
        </h3>

        {news.description && (
          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-4">
            {news.description}
          </p>
        )}

        {/* Action Bottom Bar */}
        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
          {/* Read More Link */}
          <Link
            href={news.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 text-sm font-bold flex items-center gap-1 hover:text-purple-700 transition-colors group/link"
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
              className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-all"
              title="Bookmark"
            >
              <Bookmark size={18} />
            </button>

            {/* Summarize Dialog Icon */}
            <Dialog>
              <DialogTrigger asChild>
                <button
                  className="p-2 text-gray-400 hover:text-amber-500 hover:bg-amber-50 rounded-full transition-all"
                  onClick={handleSummarize}
                  title="Summarize AI"
                >
                  <Sparkles size={18} />
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md rounded-2xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Sparkles size={18} className="text-amber-500" />
                    AI News Summary
                  </DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  {loading ? (
                    <div className="flex flex-col items-center gap-2 py-6">
                      <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-sm text-gray-500">Thinking...</p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600 leading-relaxed italic">
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
