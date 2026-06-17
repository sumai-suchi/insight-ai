"use client";
import AppCard from "@/components/AppCard";
import React, { useEffect, useState } from "react";
import { App } from "@/types/appType";
import CardSlider from "@/components/CardSlider";

const AppPage = () => {
  const [apps, setApps] = useState<App[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "Featured",
    "Productivity",
    "Design",
    "Communication",
    "Development",
  ];

  useEffect(() => {
    fetch("/api/apps")
      .then((res) => res.json())
      .then((data) => setApps(data));
  }, []);

  // ফিল্টারিং লজিক
  const getFilteredApps = () => {
    if (activeCategory === "All") {
      // All সিলেক্ট থাকলে সব ডাটা থেকে প্রথম ৮টি দেখাবে
      return apps.slice(0, 8);
    } else if (activeCategory === "Featured") {
      // Featured সিলেক্ট থাকলে যাদের featured: true তাদের দেখাবে
      return apps.filter((app) => app.featured);
    } else {
      // অন্য ক্যাটাগরি হলে সেই ক্যাটাগরির সব ডাটা দেখাবে
      return apps.filter((app) => app.category === activeCategory);
    }
  };

  const filteredApps = getFilteredApps();

  return (
    <div className="mt-20 mb-10 max-w-7xl mx-auto px-4">
      {/* ক্যাটাগরি বাটন সমূহ */}

      <h2 className="text-4xl font-bold mb-7">Apps</h2>
      <CardSlider></CardSlider>

      <div className="flex flex-wrap gap-4 my-10 ">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full transition-all duration-300 ${
              activeCategory === cat
                ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold" // Active Style
                : "bg-white text-gray-800 hover:text-purple-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* অ্যাপস গ্রিড ডিসপ্লে */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredApps.length > 0 ? (
          filteredApps.map((app, i) => <AppCard key={i} app={app}></AppCard>)
        ) : (
          <p className="text-gray-500">No apps found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default AppPage;
