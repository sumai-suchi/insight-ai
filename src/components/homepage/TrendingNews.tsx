"use client";
import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
import { motion, AnimatePresence } from "framer-motion";
import { Variants } from "framer-motion";
import Image from "next/image";

// Types
type Category =
  | "All"
  | "AI"
  | "Technology"
  | "Business"
  | "World"
  | "Health"
  | "Science";

interface NewsItem {
  id: number;
  rank: number;
  title: string;
  description?: string;
  category: Category;
  source: string;
  sourceInitial: string;
  timeAgo: string;
  views: string;
  isHero?: boolean;
  emoji: string;
  image: string;
}

// Mock Data
const newsData: NewsItem[] = [
  {
    id: 1,
    rank: 1,
    title:
      "OpenAI's New Model Can Now Reason Like a Human Expert — Experts Are Stunned",
    description:
      "The latest breakthrough in AI reasoning capabilities is reshaping how we think about machine intelligence. Researchers say this changes everything.",
    category: "AI",
    source: "TechCrunch",
    sourceInitial: "T",
    timeAgo: "3 hours ago",
    views: "128k reads",
    isHero: true,
    emoji: "🤖",
    image: "https://i.ibb.co/W4chWrWX/openai.jpg",
  },
  {
    id: 2,
    rank: 2,
    title: "Apple Plans to Launch AI-Powered Search Engine to Challenge Google",
    category: "Business",
    source: "Bloomberg",
    sourceInitial: "B",
    timeAgo: "5 hours ago",
    views: "84k reads",
    emoji: "🍎",
    image: "https://i.ibb.co/pvwtPBQy/apple.jpg",
  },
  {
    id: 3,
    rank: 3,
    title:
      "Scientists Discover New Battery Tech That Charges Phones in 30 Seconds",
    category: "Technology",
    source: "Wired",
    sourceInitial: "W",
    timeAgo: "7 hours ago",
    views: "61k reads",
    emoji: "⚡",
    image: "https://i.ibb.co/sdQb9Ybg/scince.jpg",
  },
  {
    id: 4,
    rank: 4,
    title: "Global Stock Markets Hit Record Highs Amid AI Investment Surge",
    category: "Business",
    source: "Reuters",
    sourceInitial: "R",
    timeAgo: "9 hours ago",
    views: "47k reads",
    emoji: "📈",
    image: "https://i.ibb.co/RpGf2WGt/globla.jpg",
  },
  {
    id: 5,
    rank: 5,
    title:
      "WHO Warns of New Health Risks From Ultra-Processed Foods in Young Adults",
    category: "Health",
    source: "BBC Health",
    sourceInitial: "B",
    timeAgo: "12 hours ago",
    views: "39k reads",
    emoji: "🌿",
    image: "https://i.ibb.co/M5pzzqPs/health.jpg",
  },
];

const categories: Category[] = [
  "All",
  "AI",
  "Technology",
  "Business",
  "World",
  "Health",
  "Science",
];

const categoryEmoji: Record<Category, string> = {
  All: "🌐",
  AI: "🤖",
  Technology: "💻",
  Business: "📈",
  World: "🌍",
  Health: "⚕️",
  Science: "🔬",
};

// Animation Variants
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

// Hero Card Component
const HeroCard = ({ item }: { item: NewsItem }) => {
  return (
    <motion.div
      custom={2}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="h-full bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100 flex flex-col cursor-pointer group"
    >
      {/* Image Area */}
      <div className="relative w-full h-64 flex items-center justify-center overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          priority
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(251,191,36,0.1),transparent_50%)]" />
        <span className="absolute top-4 left-5 font-black text-8xl text-white/5 select-none leading-none">
          0{item.rank}
        </span>
        <span className="absolute top-4 right-4 bg-[#FBBF24] text-[#111827] text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full">
          Top Story
        </span>
      </div>

      {/* Content Area */}
      <div className="p-7 flex flex-col flex-1">
        <span className="text-[11px] font-bold tracking-[2px] uppercase text-[#3B82F6] mb-3">
          {item.category}
        </span>
        <h3 className="font-bold text-[#1F2937] text-2xl leading-snug mb-3 flex-1">
          {item.title}
        </h3>
        <p className="text-[#374151] text-sm leading-relaxed mb-6">
          {item.description}
        </p>

        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#10B981] flex items-center justify-center text-white text-xs font-bold">
              {item.sourceInitial}
            </div>
            <div>
              <p className="text-sm font-semibold text-[#1F2937]">
                {item.source}
              </p>
              <p className="text-xs text-gray-400">{item.timeAgo}</p>
            </div>
          </div>
          <span className="text-xs text-gray-400">👁 {item.views}</span>
        </div>

        <motion.button
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.97 }}
          className="w-fit flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-semibold px-6 py-3 rounded-full transition-colors duration-200"
        >
          Read Full Story
          <svg
            width="15"
            height="15"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
};

// Small Card Component
const SmallCard = ({ item, index }: { item: NewsItem; index: number }) => {
  return (
    <motion.div
      custom={index + 3}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{ x: 5, transition: { duration: 0.2 } }}
      className="relative bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-4 items-start cursor-pointer group overflow-hidden"
    >
      <div className="absolute left-0 top-0 w-[3px] h-0 bg-[#3B82F6] rounded-r group-hover:h-full transition-all duration-300" />
      <Image
        src={item.image}
        alt={item.title}
        width={80}
        height={80}
        className="rounded-lg object-cover"
      />
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-[#1F2937] text-[15px] leading-snug mb-3 line-clamp-2">
          {item.title}
        </h4>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-bold uppercase tracking-[1.5px] text-[#FBBF24]">
            {item.category}
          </span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span className="text-xs text-gray-400">{item.timeAgo}</span>
          <span className="ml-auto text-xs text-gray-400 shrink-0">
            👁 {item.views}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const TrendingNews = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered = newsData.filter(
    (n) => activeCategory === "All" || n.category === activeCategory,
  );
  const hero = filtered.find((n) => n.isHero) ?? filtered[0];
  const smalls = filtered.filter((n) => n.id !== hero?.id).slice(0, 4);

  return (
    <section className="py-20 min-h-screen max-w-7xl mx-auto">
      <div className="w-full">
        {/* Header */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex items-end justify-between flex-wrap gap-5 mb-10"
        >
          <div>
            <p className="text-xs font-bold tracking-[3px] uppercase text-[#FBBF24] flex items-center gap-2 mb-2">
              <motion.span
                animate={{ rotate: [-5, 5, -5] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.4,
                  ease: "easeInOut",
                }}
                className="text-lg"
              >
                🔥
              </motion.span>
              What&apos;s Hot Right Now
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#1F2937] leading-tight">
              Trending <span className="text-[#3B82F6] italic">Stories</span>
            </h2>
          </div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="text-sm font-medium text-gray-500 border border-gray-200 hover:border-[#3B82F6] hover:text-[#3B82F6] px-5 py-2.5 rounded-full transition-colors duration-200"
          >
            View All →
          </motion.button>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex gap-2 flex-wrap mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-[#3B82F6] text-white border-[#3B82F6] shadow-md"
                  : "bg-white text-gray-500 border-gray-200 hover:border-[#3B82F6] hover:text-[#3B82F6]"
              }`}
            >
              {categoryEmoji[cat]} {cat}
            </button>
          ))}
        </motion.div>

        {/* News Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {hero ? (
              <>
                <div className="h-full">
                  <HeroCard item={hero} />
                </div>
                <div className="flex flex-col gap-5">
                  {smalls.map((item, i) => (
                    <SmallCard key={item.id} item={item} index={i} />
                  ))}
                  {smalls.length === 0 && (
                    <div className="flex items-center justify-center h-full text-gray-400 text-sm border-2 border-dashed border-gray-200 rounded-2xl p-10">
                      No more stories in this category.
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="col-span-full py-20 text-center text-gray-400">
                No trending stories in this category yet.
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* CTA Section */}
        <motion.div
          custom={8}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-r from-[#1F2937] to-[#111827] rounded-3xl p-8 flex items-center justify-between flex-wrap gap-5"
        >
          <div>
            <h3 className="text-white text-xl font-bold mb-1">
              Want to read more stories?
            </h3>
            <p className="text-gray-400 text-sm">
              Login to access full articles, personalized feed & breaking news
              alerts.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.04, backgroundColor: "#2563EB" }}
            whileTap={{ scale: 0.97 }}
            className="bg-[#3B82F6] text-white text-sm font-semibold px-7 py-3.5 rounded-full transition-colors duration-200 shadow-lg shadow-blue-900/30"
          >
            Login to Read More →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default TrendingNews;
