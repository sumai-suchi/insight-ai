"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  History,
  RotateCcw,
  Clock,
  FileEdit,
  Search,
  Filter,
  ChevronDown,
  Eye,
  Trash2,
  BookOpen,
  Sparkles,
  X,
} from "lucide-react";
import { toast } from "sonner";

interface SearchHistory {
  id: string;
  query: string;
  timestamp: string;
  date: string;
  category: "article" | "blog" | "marketing" | "seo";
  wordCount: number;
  status: "completed" | "draft" | "archived";
  preview: string;
}

const historyData: SearchHistory[] = [
  {
    id: "1",
    query: "Future of Artificial Intelligence in Healthcare",
    timestamp: "02:30 PM",
    date: "Oct 24, 2023",
    category: "article",
    wordCount: 1240,
    status: "completed",
    preview:
      "In the rapidly evolving world of AI, healthcare stands at the forefront of transformation. Machine learning algorithms are now capable of...",
  },
  {
    id: "2",
    query: "Top 10 SEO Strategies for 2024",
    timestamp: "11:15 AM",
    date: "Oct 24, 2023",
    category: "blog",
    wordCount: 980,
    status: "completed",
    preview:
      "Search engine optimization continues to evolve at a breakneck pace. With Google's latest algorithm updates, content creators must adapt their...",
  },
  {
    id: "3",
    query: "Email Marketing Campaign for SaaS Products",
    timestamp: "04:45 PM",
    date: "Oct 23, 2023",
    category: "marketing",
    wordCount: 650,
    status: "draft",
    preview:
      "Crafting the perfect email campaign requires understanding your audience deeply. For SaaS products, the key lies in demonstrating value through...",
  },
  {
    id: "4",
    query: "How Blockchain is Changing Finance",
    timestamp: "09:20 AM",
    date: "Oct 22, 2023",
    category: "article",
    wordCount: 1560,
    status: "completed",
    preview:
      "Decentralized finance, or DeFi, represents one of the most significant shifts in the financial landscape since the introduction of the internet...",
  },
  {
    id: "5",
    query: "Sustainable Business Practices Guide",
    timestamp: "03:10 PM",
    date: "Oct 21, 2023",
    category: "blog",
    wordCount: 870,
    status: "archived",
    preview:
      "As climate change accelerates, businesses worldwide are recognizing the need to integrate sustainability into their core operations...",
  },
  {
    id: "6",
    query: "Product Launch Press Release Template",
    timestamp: "01:55 PM",
    date: "Oct 20, 2023",
    category: "marketing",
    wordCount: 420,
    status: "completed",
    preview:
      "FOR IMMEDIATE RELEASE — Introducing the next generation of productivity tools designed for modern teams who demand excellence...",
  },
];

const categoryColors = {
  article: { bg: "bg-blue-50", text: "text-blue-600", dot: "bg-blue-500" },
  blog: {
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    dot: "bg-emerald-500",
  },
  marketing: {
    bg: "bg-orange-50",
    text: "text-orange-600",
    dot: "bg-orange-500",
  },
  seo: { bg: "bg-purple-50", text: "text-purple-600", dot: "bg-purple-500" },
};

const statusStyles = {
  completed: { bg: "bg-green-50", text: "text-green-700", label: "Completed" },
  draft: { bg: "bg-yellow-50", text: "text-yellow-700", label: "Draft" },
  archived: { bg: "bg-gray-100", text: "text-gray-500", label: "Archived" },
};

const HistoryPage = () => {
  const [history, setHistory] = useState(historyData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [previewItem, setPreviewItem] = useState<SearchHistory | null>(null);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const filtered = history.filter((item) => {
    const matchSearch = item.query
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  const handleDelete = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
    toast.error("History deleted", {
      description: "This item has been removed from your history.",
    });
  };

  const handleRestore = (item: SearchHistory) => {
    toast.success("Version restored!", {
      description: `"${item.query}" restored from ${item.date} • ${item.timestamp}`,
    });
    setPreviewItem(null);
  };

  return (
    <section className="max-w-6xl mx-auto my-12 px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-200">
            <History size={22} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Search History</h1>
            <p className="text-base text-gray-500">
              {history.length} total generations
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
      >
        {[
          {
            label: "Total Generated",
            value: history.length,
            icon: <Sparkles size={18} />,
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            label: "Completed",
            value: history.filter((h) => h.status === "completed").length,
            icon: <BookOpen size={18} />,
            color: "text-green-600",
            bg: "bg-green-50",
          },
          {
            label: "Drafts",
            value: history.filter((h) => h.status === "draft").length,
            icon: <FileEdit size={18} />,
            color: "text-yellow-600",
            bg: "bg-yellow-50",
          },
          {
            label: "Total Words",
            value: history
              .reduce((a, b) => a + b.wordCount, 0)
              .toLocaleString(),
            icon: <BookOpen size={18} />,
            color: "text-purple-600",
            bg: "bg-purple-50",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-3"
          >
            <div className={`p-2 rounded-xl ${stat.bg} ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Search & Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-4 flex flex-col md:flex-row gap-3"
      >
        <div className="flex-1 relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search your history..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>
        <div className="relative">
          <button
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition"
          >
            <Filter size={15} />
            {selectedCategory === "all"
              ? "All Types"
              : selectedCategory.charAt(0).toUpperCase() +
                selectedCategory.slice(1)}
            <ChevronDown
              size={14}
              className={`transition-transform ${showFilterDropdown ? "rotate-180" : ""}`}
            />
          </button>
          {showFilterDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-xl shadow-lg z-10 overflow-hidden">
              {["all", "article", "blog", "marketing", "seo"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setShowFilterDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition hover:bg-blue-50 hover:text-blue-600 ${selectedCategory === cat ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-700"}`}
                >
                  {cat === "all"
                    ? "All Types"
                    : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* History List */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            {filtered.length} results
          </span>
          <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
            Recent First
          </span>
        </div>

        <AnimatePresence>
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-16 text-center"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <History size={28} className="text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium text-lg">
                No history found
              </p>
              <p className="text-gray-400 text-base mt-1">
                Try a different search term
              </p>
            </motion.div>
          ) : (
            filtered.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="group px-6 py-5 hover:bg-blue-50/30 transition-colors duration-200 border-b border-gray-50 last:border-b-0"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className="mt-0.5 p-2 bg-gray-50 rounded-xl group-hover:bg-white transition-colors">
                      <FileEdit
                        size={18}
                        className="text-gray-400 group-hover:text-blue-500 transition-colors"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <h3 className="text-base font-semibold text-gray-800 group-hover:text-blue-700 transition-colors truncate">
                          {item.query}
                        </h3>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-bold uppercase ${categoryColors[item.category].bg} ${categoryColors[item.category].text}`}
                        >
                          {item.category}
                        </span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusStyles[item.status].bg} ${statusStyles[item.status].text}`}
                        >
                          {statusStyles[item.status].label}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center gap-1 text-sm text-gray-400">
                          <Clock size={12} />
                          <span>
                            {item.date} • {item.timestamp}
                          </span>
                        </div>
                        <span className="text-sm text-gray-400">•</span>
                        <span className="text-sm text-gray-400">
                          {item.wordCount.toLocaleString()} words
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm truncate max-w-md leading-relaxed">
                        {item.preview}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start md:self-center shrink-0">
                    <button
                      onClick={() => setPreviewItem(item)}
                      className="p-2 rounded-xl border border-gray-200 text-gray-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all"
                      title="Preview"
                    >
                      <Eye size={15} />
                    </button>
                    <button
                      onClick={() => handleRestore(item)}
                      className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:border-blue-200 hover:text-blue-600 hover:bg-white active:scale-95 transition-all"
                    >
                      <RotateCcw size={13} /> Restore
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 rounded-xl border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all"
                      title="Delete"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>

        <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
          <span className="text-sm text-gray-400">Showing last 30 days</span>
          <button className="text-blue-600 text-sm font-bold hover:underline">
            View Full Version History
          </button>
        </div>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setPreviewItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-gray-900 text-xl leading-tight">
                    {previewItem.query}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock size={12} className="text-gray-400" />
                    <span className="text-sm text-gray-400">
                      {previewItem.date} • {previewItem.timestamp}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setPreviewItem(null)}
                  className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <p className="text-base text-gray-600 leading-relaxed">
                  {previewItem.preview}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-bold uppercase ${categoryColors[previewItem.category].bg} ${categoryColors[previewItem.category].text}`}
                  >
                    {previewItem.category}
                  </span>
                  <span className="text-sm text-gray-400">
                    {previewItem.wordCount.toLocaleString()} words
                  </span>
                </div>
                <button
                  onClick={() => handleRestore(previewItem)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition active:scale-95"
                >
                  <RotateCcw size={14} /> Restore
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HistoryPage;
