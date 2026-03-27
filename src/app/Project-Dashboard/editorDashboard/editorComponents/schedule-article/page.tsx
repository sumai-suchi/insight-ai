"use client";

import React, { useEffect, useState } from 'react';
import { Calendar, Clock, User, Timer, AlertCircle } from 'lucide-react';
import { Article as ArticleType } from "@/types/editor";

const ScheduleArticle = () => {
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScheduled = async () => {
      try {
        const res = await fetch('/api/articles/scheduled');
        const json = await res.json();
        if (json.success) setArticles(json.data);
      } catch (err) {
        console.error("Failed to load scheduled articles", err);
      } finally {
        setLoading(false);
      }
    };
    fetchScheduled();
  }, []);
  console.log(articles);

  if (loading) return <div className="p-10 text-center">Loading schedule...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl">
          <Timer size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Content Queue</h1>
          <p className="text-gray-500 text-sm">Articles set to go live automatically.</p>
        </div>
      </div>

      {articles.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-20 border-2 border-dashed rounded-3xl text-gray-400">
          <AlertCircle size={48} className="mb-4" />
          <p>No articles currently scheduled.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <div key={article._id} className="bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <div className="p-6">
                {/* Badge */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-full border border-amber-100 flex items-center gap-1">
                    <Clock size={12} /> Scheduled
                  </span>
                </div>

                <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                  {article.title}
                </h2>

                {/* Release Date Card */}
                <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">Goes Live On</p>
                  <div className="flex items-center gap-2 text-gray-700 font-semibold">
                    <Calendar size={16} className="text-amber-500" />
                    {article.scheduledFor 
                      ? new Date(article.scheduledFor).toLocaleDateString('en-US', { 
                          month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' 
                        })
                      : "Date not set"}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-2">
                    <img 
                      src={article.author?.avatar || "https://i.pravatar.cc/150"} 
                      className="w-8 h-8 rounded-full border" 
                      alt="" 
                    />
                    <span className="text-sm font-medium text-gray-600">{article.author?.name}</span>
                  </div>
                  <button className="text-sm font-bold text-purple-600 hover:text-purple-700">
                    Edit Link
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScheduleArticle;