"use client"; // কম্পোনেন্টটি ক্লায়েন্ট সাইড হলে এটি নিশ্চিত করুন

import React from "react";
import { INews } from "@/types/news";
import {
  Ribbon,
  Clock,
  BookOpen,
  Eye,
  Bookmark,
  ChevronRight,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { authClient } from "@/lib/auth/auth-client";


const FeaturedArticle = ({ data }: { data: INews }) => {
  if (!data) return null;
  const { data: session } = authClient.useSession();

  const publishedDate = data.publishedAt
    ? formatDistanceToNow(new Date(data.publishedAt), { addSuffix: true })
    : "Recently";

  const handleBookmark = async (article: INews) => {
    if (!session?.user) {
      alert("Please login to save bookmarks!");
      return;
    }

    try {
      const res = await fetch("/api/bookmark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: session.user.id,
          articleId: article._id,
          title: article.title,
          description: article.description,
          url: article.url,
          urlToImage: article.urlToImage, // ইমেজ URL পাঠাতে হবে
          sourceName: article.sourceName,
          author: article.author,
          category: article.category,
          publishedAt: article.publishedAt,
        }),
      });

      const result = await res.json(); // নাম পরিবর্তন করে 'result' রাখা হয়েছে

      if (res.ok) {
        alert("Bookmark saved successfully ✅");
      } else {
        alert(result.message || "Failed to save bookmark ❌");
      }
    } catch (err) {
      console.error("Bookmark Error:", err);
      alert("Error saving bookmark");
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-4">
        <Ribbon size={20} className="fill-[#BDE8F5]/25 text-[#BDE8F5]" />
        <span className="font-bold text-lg text-[#BDE8F5]">
          Featured Article
        </span>
      </div>

      <div className="group bg-[#0F2854] rounded-[2rem] overflow-hidden shadow-xl border border-[#BDE8F5]/20 flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="relative w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
          <Image
            src={data.urlToImage || "https://via.placeholder.com/800x600"}
            alt={data.title}
            fill
            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority // Featured ইমেজের জন্য priority দেয়া ভালো
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F2854]/95 via-[#0F2854]/35 to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6 flex gap-2 z-10">
            <span className="bg-blue-600/90 backdrop-blur-sm text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-lg">
              ✨ Featured
            </span>
            <span className="bg-indigo-600/90 backdrop-blur-sm text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-lg">
              📈 Trending
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-[#0F2854]">
          <span className="text-[#BDE8F5] font-semibold text-sm mb-3 uppercase tracking-wider">
            {data.category || "Technology"}
          </span>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#BDE8F5] leading-tight mb-4 group-hover:text-white transition-colors duration-300">
            {data.title}
          </h2>

          <p className="text-[#BDE8F5]/85 text-sm md:text-base leading-relaxed mb-8 line-clamp-3">
            {data.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-[#BDE8F5]/70 text-sm mb-8">
            <div className="flex items-center gap-1.5">
              <Clock size={16} />
              <span>{publishedDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BookOpen size={16} />
              <span>5 min read</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Eye size={16} />
              <span>{data.sourceName || "Source"}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2 transition-all shadow-lg active:scale-95"
            >
              Read Article <ChevronRight size={18} />
            </a>

            <button
              className="p-3 border border-[#BDE8F5]/20 rounded-xl text-[#BDE8F5]/70 hover:bg-[#BDE8F5]/10 hover:text-white transition-all active:scale-90"
              title="Save for later"
              onClick={() => handleBookmark(data)}
            >
              <Bookmark size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedArticle;