"use client";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion"; // motion import করা হয়েছে
import { INews, NewsCategory } from "@/types/news";
import NewsCard from "./NewsCard";
import CategoryTabs from "./CategoryTabs";
import SearchBar from "./ui/Searchbar";
import TrendingTopics from "./ui/TrendingTopics";
import FeaturedArticle from "./ui/FeaturedArticle";
import NewsArticleCart from "./ui/NewsArticleCard";
import { TrendingUp, UsersRound, RefreshCw } from "lucide-react";
import Newsletter from "./ui/NewsLetter";
import { useSearchParams } from "next/navigation";

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
  const [trendingNews, setTrendingNes] = useState<INews[]>();
  const featuredArticleData = news[0];
  console.log(trendingNews);
  const searchParams = useSearchParams();

  useEffect(() => {
    const trendingArticles = news.slice(2, 5);
    setTrendingNes(trendingArticles);
  }, [news]);
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

  useEffect(() => {
    const catFromParam = searchParams.get("category") as NewsCategory;
    if (catFromParam) {
      setCategory(catFromParam);
      setPage(1);
    }
  }, [searchParams]);

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
    <div className="min-h-screen w-full bg-[#4988C4] text-[#0F2854] pb-24">
      {/* Newspaper Masthead (full width, no top gap) */}
      <header className="w-full text-center py-12 sm:py-16 border-b-4 border-double border-[#0F2854] bg-linear-to-b from-[#4988C4] to-[#4988C4]/90">
        <div className="px-4 sm:px-8">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-[#0F2854]/50" />
            <span className="text-xs tracking-[0.35em] uppercase text-[#0F2854]/80 font-semibold">
              Daily Brief
            </span>
            <span className="h-px w-16 bg-[#0F2854]/50" />
          </div>
          <h1 className="mt-4 font-serif text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter text-[#0F2854] drop-shadow-lg">
            Insight News
          </h1>
          <p className="mt-4 text-sm sm:text-base font-semibold text-[#0F2854]/80">
            Clean reporting, modern editorial layout.
          </p>
        </div>
      </header>

      {/* Search hero (already full width) */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <SearchBar
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          clearSearch={() => {
            setSearchInput("");
            setSearch("");
          }}
        />
      </motion.div>

      {/* Category + Sync (full width bar) */}
      <div className="w-full border-b-2 border-[#0F2854]/30 bg-[#4988C4]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-5">
          <CategoryTabs active={category} onChange={handleCategoryChange} />
          <button
            onClick={handleSync}
            disabled={syncing}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-full font-bold
              transition-all duration-300 shadow-md
              ${syncing ? "bg-white/40 text-[#0F2854]/70 cursor-not-allowed" : "bg-[#0F2854] text-white hover:bg-[#1C4D8D] hover:scale-[1.02] active:scale-[0.98]"}
            `}
          >
            {syncing ? <RefreshCw className="animate-spin h-5 w-5" /> : "🔄"}
            {syncing ? "Syncing..." : "Sync News"}
          </button>
        </div>
      </div>

      {/* Main editorial area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main column */}
          <div className="lg:col-span-8 space-y-12">
                {/* Featured Article */}
                {featuredArticleData && (
                  <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="rounded-2xl border border-[#BDE8F5]/20 bg-[#0F2854] shadow-sm overflow-hidden"
                  >
                    <div className="px-5 sm:px-7 pt-6">
                      <div className="flex items-center gap-3">
                        <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
                          Featured
                        </span>
                        <span className="h-px flex-1 bg-primary/15" />
                      </div>
                    </div>
                    <div className="px-3 sm:px-4 pb-3 pt-2">
                      <FeaturedArticle data={featuredArticleData} />
                    </div>
                  </motion.section>
                )}

                {/* Search Status */}
                {search && !loading && (
                  <p className="text-center text-muted-foreground bg-muted/60 py-3 rounded-xl border border-primary/10">
                    Showing results for{" "}
                    <span className="font-semibold text-secondary">
                      &ldquo;{search}&rdquo;
                    </span>{" "}
                    (
                    {news.length === 0
                      ? "No news found"
                      : `${news.length} articles`}
                    )
                  </p>
                )}

                {/* Main News Grid */}
                <section className="space-y-7">
                  <div className="flex items-end justify-between gap-4">
                    <div className="w-full">
                      <div className="flex items-center gap-3">
                        <UsersRound className="text-secondary w-5 h-5" />
                        <h2 className="font-serif text-2xl sm:text-3xl tracking-tight text-primary">
                          Latest Updates
                        </h2>
                      </div>
                      <div className="mt-3 h-px bg-primary/15 w-full" />
                    </div>
                  </div>

                  {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-7">
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className="h-80 bg-[#0F2854]/40 border border-[#BDE8F5]/15 rounded-2xl animate-pulse"
                        />
                      ))}
                    </div>
                  ) : news.length === 0 ? (
                    <div className="text-center py-20 bg-[#0F2854]/35 rounded-3xl border border-[#BDE8F5]/20">
                      <p className="text-6xl mb-4">🗞️</p>
                      <p className="text-xl text-[#BDE8F5]/80">
                        No articles available at the moment.
                      </p>
                    </div>
                  ) : (
                    <motion.div
                      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-7"
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

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-3 pt-4">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1 || loading}
                      className="px-5 py-3 rounded-xl border border-primary/15 bg-white/95 disabled:opacity-50 hover:bg-white transition-colors font-medium"
                    >
                      ← Prev
                    </button>
                    <div className="px-6 py-3 bg-white/95 rounded-xl shadow-sm border border-primary/15 font-semibold text-primary">
                      {page} / {totalPages}
                    </div>
                    <button
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages || loading}
                      className="px-5 py-3 rounded-xl border border-primary/15 bg-white/95 disabled:opacity-50 hover:bg-white transition-colors font-medium"
                    >
                      Next →
                    </button>
                  </div>
                )}
          </div>

          {/* Sidebar column */}
          <aside className="lg:col-span-4 space-y-10">
                {/* Trending Topics Area */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="rounded-2xl border border-[#BDE8F5]/20 bg-[#0F2854] shadow-sm overflow-hidden"
                >
                  <div className="px-5 sm:px-6 pt-5">
                    <div className="flex items-center gap-3">
                      <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
                        Topics
                      </span>
                      <span className="h-px flex-1 bg-primary/15" />
                    </div>
                  </div>
                  <div className="px-2 sm:px-3 pb-3 pt-2">
                    <TrendingTopics />
                  </div>
                </motion.div>

                {/* Trending Articles Section */}
                <section className="space-y-5">
                  <div>
                    <div className="flex items-center gap-3">
                      <TrendingUp className="text-secondary w-5 h-5" />
                      <h2 className="font-serif text-xl sm:text-2xl tracking-tight text-primary">
                        Trending Now
                      </h2>
                    </div>
                    <div className="mt-3 h-px bg-primary/15 w-full" />
                  </div>

                  <motion.div
                    className="grid grid-cols-1 gap-5"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                  >
                    {trendingNews?.map((article) => (
                      <motion.div key={article._id} variants={fadeInUp}>
                        <NewsArticleCart article={article} />
                      </motion.div>
                    ))}
                  </motion.div>
                </section>

                {/* Newsletter Section */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="rounded-2xl border border-[#BDE8F5]/20 bg-[#0F2854] shadow-sm overflow-hidden"
                >
                  <div className="px-5 sm:px-6 pt-5">
                    <div className="flex items-center gap-3">
                      <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
                        Newsletter
                      </span>
                      <span className="h-px flex-1 bg-primary/15" />
                    </div>
                  </div>
                  <div className="px-2 sm:px-3 pb-3 pt-2">
                    <Newsletter />
                  </div>
                </motion.div>
          </aside>
        </div>
      </main>
    </div>
  );
}