import React from "react";
import { INews } from "@/types/news";
import {
  Ribbon,
  Clock,
  BookOpen,
  Eye,
  Bookmark,
  Share2,
  ChevronRight,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";

const FeaturedArticle = ({ data }: { data: INews }) => {
  if (!data) return null;

  const publishedDate = data.publishedAt
    ? formatDistanceToNow(new Date(data.publishedAt), { addSuffix: true })
    : "Recently";

  return (
    <div className="w-full">
      {/* Top Label */}
      <div className="flex items-center gap-2 mb-4">
        <Ribbon size={20} className="fill-[#BDE8F5]/25 text-[#BDE8F5]" />
        <span className="font-bold text-lg text-[#BDE8F5]">
          Featured Article
        </span>
      </div>

      {/* Main Card */}
      <div className="group bg-[#0F2854] rounded-[2rem] overflow-hidden shadow-xl border border-[#BDE8F5]/20 flex flex-col md:flex-row">
        {/* Image Section - Zoom Effect Container */}
        <div className="relative w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
          <Image
            src={data.urlToImage || "https://via.placeholder.com/800x600"}
            alt={data.title}
            fill // Responsive Layout-এর জন্য fill ব্যবহার করা ভালো
            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 50vw"
          />

          {/* Dark overlay for editorial readability */}
          <div className="absolute inset-0 bg-linear-to-t from-[#0F2854]/95 via-[#0F2854]/35 to-transparent pointer-events-none" />

          {/* Badges on Image */}
          <div className="absolute bottom-6 left-6 flex gap-2 z-10">
            <span className="bg-primary/90 backdrop-blur-sm text-white text-xs font-semibold px-4 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
              ✨ Featured
            </span>
            <span className="bg-secondary/90 backdrop-blur-sm text-white text-xs font-semibold px-4 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
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

          {/* Metadata */}
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
              <span>{data.sourceName}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <a
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-linear-to-r from-primary to-secondary text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-primary/15 hover:shadow-primary/25 active:scale-95"
            >
              Read Article <ChevronRight size={18} />
            </a>

            <button
              className="p-3 border border-[#BDE8F5]/20 rounded-xl text-gray-400 hover:bg-[#BDE8F5]/10 hover:text-white hover:border-[#BDE8F5]/30 transition-all shadow-sm active:scale-90"
              title="Save for later"
            >
              <Bookmark size={20} />
            </button>

            <button
              className="p-3 border border-[#BDE8F5]/20 rounded-xl text-gray-400 hover:bg-[#BDE8F5]/10 hover:text-white hover:border-[#BDE8F5]/30 transition-all shadow-sm active:scale-90"
              title="Share"
            >
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedArticle;
