"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion"; // motion import করা হয়েছে
import { INews, NewsCategory } from "@/types/news";
import NewsCard from "./NewsCard";
import CategoryTabs from "./CategoryTabs";
import SearchBar from "./ui/Searchbar";
import TrendingTopics from "./ui/TrendingTopics";
import FeaturedArticle from "./ui/FeaturedArticle";
import NewsArticleCart from "./ui/NewsArticleCard";
import { TrendingUp, UsersRound, RefreshCw } from "lucide-react";
import Newsletter from "./ui/NewsLetter";

// অ্যানিমেশন ভ্যারিয়েন্ট
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export default function NewsFeed() {
  const [category, setCategory] = useState<NewsCategory>("all");
  const [news, setNews] = useState<INews[]>([]);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const featuredArticleData = news[0];
  const trendingArticles = news.slice(1, 4); // ৩টি ট্রেন্ডিং আর্টিকেল নিলে গ্রিড ভালো দেখায়

  const fetchNews = useCallback(
    async (cat: NewsCategory, pg: number, q: string) => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          category: cat,
          page: String(pg),
          limit: "12",
          ...(q && { search: q }),
        });
        const res = await fetch(`/api/news?${params}`);
        const data = await res.json();
        if (data.success) {
          setNews(data.data);
          setTotalPages(data.pagination.totalPages);
        }
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const handleCategoryChange = (cat: NewsCategory) => {
    setCategory(cat);
    setPage(1);
  };

  useEffect(() => {
    fetchNews(category, page, search);
  }, [category, page, search, fetchNews]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleSync = async () => {
    setSyncing(true);
    try {
      const res = await fetch("/api/news/sync", { method: "POST" });
      const data = await res.json();
      alert(data.message);
      fetchNews(category, page, search);
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 pb-20">
      {/* Search Bar Section */}
      <div className="max-w-7xl mx-auto px-4 pt-10 sm:pt-16">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <SearchBar
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            clearSearch={() => {
              setSearchInput("");
              setSearch("");
            }}
          />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 space-y-16 mt-8">
        {/* Category & Sync Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-gray-100 dark:border-gray-800 pb-6">
          <CategoryTabs active={category} onChange={handleCategoryChange} />

          <button
            onClick={handleSync}
            disabled={syncing}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-full font-medium text-white
              transition-all duration-300 shadow-lg
              ${syncing ? "bg-gray-400 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-700 hover:scale-105 active:scale-95"}
            `}
          >
            {syncing ? <RefreshCw className="animate-spin h-5 w-5" /> : "🔄"}
            {syncing ? "Syncing..." : "Sync News"}
          </button>
        </div>

        {/* Trending Topics Area */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <TrendingTopics />
        </motion.div>

        {/* Featured Article */}
        {featuredArticleData && (
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <FeaturedArticle data={featuredArticleData} />
          </motion.section>
        )}

        {/* Trending Articles Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-l-4 border-orange-500 pl-4">
            <TrendingUp className="text-orange-500 w-6 h-6" />
            <h2 className="text-2xl font-bold">Trending Now</h2>
          </div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {trendingArticles.map((article) => (
              <motion.div key={article._id} variants={fadeInUp}>
                <NewsArticleCart article={article} />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Search Status */}
        {search && !loading && (
          <p className="text-center text-gray-500 bg-gray-100 dark:bg-gray-800 py-3 rounded-lg">
            Showing results for{" "}
            <span className="font-bold text-emerald-600">"{search}"</span>(
            {news.length === 0 ? "No news found" : `${news.length} articles`})
          </p>
        )}

        {/* Main News Grid */}
        <section className="space-y-8">
          <div className="flex items-center gap-2 border-l-4 border-blue-600 pl-4">
            <UsersRound className="text-blue-600 w-6 h-6" />
            <h2 className="text-2xl font-bold">Latest Updates</h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-80 bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse"
                />
              ))}
            </div>
          ) : news.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-3xl">
              <p className="text-6xl mb-4">🗞️</p>
              <p className="text-xl text-gray-500">
                No articles available at the moment.
              </p>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={containerVariants}
            >
              {news.map((item) => (
                <motion.div key={item._id} variants={fadeInUp}>
                  <NewsCard news={item} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </section>

        {/* Newsletter Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <Newsletter />
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 pt-10">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1 || loading}
              className="p-4 rounded-xl border dark:border-gray-700 disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              ← Prev
            </button>
            <div className="px-6 py-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 font-bold">
              {page} / {totalPages}
            </div>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || loading}
              className="p-4 rounded-xl border dark:border-gray-700 disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
