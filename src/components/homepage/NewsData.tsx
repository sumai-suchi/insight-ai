"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";
import CategoryTabs from "../CategoryTabs";
import NewsCard from "../NewsCard";
import { INews, NewsCategory } from "@/types/news";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

const container: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const cardAnim: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export default function NewsData() {
  const [category, setCategory] = useState<NewsCategory>("all");
  const [news, setNews] = useState<INews[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchNews = useCallback(async (cat: NewsCategory, pg: number, q: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        category: cat,
        page: String(pg),
        limit: "3",
        ...(q && { search: q }),
      });
      const res = await fetch(`/api/news?${params}`);
      const data = await res.json();
      if (data.success) setNews(data.data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews(category, 1, "");
  }, [category, fetchNews]);

  return (
    <section className="w-full py-24 overflow-hidden relative">
      {/* Background glow */}
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(28,77,141,0.2) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10"
        >
          <div>
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
              style={{
                background: "rgba(28,77,141,0.15)",
                border: "1px solid rgba(28,77,141,0.35)",
                color: "rgba(147,197,253,0.9)",
              }}
            >
              <TrendingUp className="w-3 h-3 text-cyan-400" />
              Live News
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-3">
              Trending News &{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg, #60a5fa, #a78bfa)" }}
              >
                Insights
              </span>
            </h2>
            <p className="text-white/45 text-base max-w-lg">
              Stay updated with the latest in technology, AI, and business.
            </p>
          </div>

          <Link href="/news">
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 0 24px rgba(28,77,141,0.5)" }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white shrink-0 transition-all group"
              style={{
                background: "linear-gradient(135deg, #1C4D8D 0%, #0F2854 100%)",
                border: "1px solid rgba(28,77,141,0.5)",
                boxShadow: "0 4px 20px rgba(28,77,141,0.3)",
              }}
            >
              View All News
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-8"
        >
          <CategoryTabs active={category} onChange={setCategory} />
        </motion.div>

        {/* News grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-72 rounded-3xl animate-pulse"
                style={{ background: "rgba(15,40,84,0.4)", border: "1px solid rgba(28,77,141,0.2)" }}
              />
            ))}
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {news.map((item) => (
              <motion.div key={item._id} variants={cardAnim}>
                <NewsCard news={item} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
