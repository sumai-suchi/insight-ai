"use client";
import { useState, useEffect } from "react";
import { FaEye, FaCheckCircle, FaTimesCircle, FaClock, FaNewspaper, FaShieldAlt } from "react-icons/fa";
import { Article } from "@/types/editor";
import { router } from "better-auth/api";
import Link from "next/link";

export default function ArticleReviewQueue() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/articles/review")
      .then((res) => res.json())
      .then((json) => {
        setArticles(json.data || []);
        setLoading(false);
      });
  }, []);


  // const handlePreview = (slug: string) => {
  //  router.push(`/Project-dashboard/editorDashboard/preview/${slug}`);
  // }

  const handleStatusChange = async (articleId: string, action: string) => {
    const res = await fetch("/api/articles/review", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ articleId, action }),
    });

    if (res.ok) {
      setArticles((prev) => prev.filter((a) => a._id !== articleId));
    }
  };

  return (
    <div className="min-h-screen text-[#BDE8F5] p-6 md:p-12 font-sans  selection:bg-[#4988C4] selection:text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Navigation Bar */}
        <div className="flex justify-between items-center mb-16 border-b border-[#1C4D8D] pb-6">
          <div className="flex items-center gap-3">
            <div className="bg-[#4988C4] p-2 rounded-lg shadow-lg shadow-[#1C4D8D]">
              <FaShieldAlt className="text-[#0F2854] text-2xl" />
            </div>
            <h2 className="font-black tracking-[0.2em] uppercase text-sm text-[#4988C4]">
              Insight AI / Sec-Ops
            </h2>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-widest text-[#4988C4] font-bold">System Time</p>
            <p className="font-mono text-xs">{new Date().toLocaleTimeString()}</p>
          </div>
        </div>

        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-xl md:text-3xl font-black uppercase tracking-tighter leading-none text-[#0F2854]">
            Review <span className="text-[#4988C4]">Queue</span>
          </h1>
          <div className="flex items-center gap-4 mt-4">
             <div className="h-[2px] w-24 bg-[#4988C4]"></div>
             <p className="text-lg font-light tracking-widest text-[#BDE8F5] uppercase">
               Pending Editorial Clearance
             </p>
             <span className="ml-auto bg-[#1C4D8D] text-white px-4 py-1 rounded-full text-sm font-bold animate-pulse">
               {articles.length} Incoming Signals
             </span>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <div className="w-16 h-16 border-4 border-[#4988C4] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="font-mono tracking-widest uppercase text-[#4988C4]">Decrypting database...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {articles.map((article) => (
              <div 
                key={article._id} 
                className="group relative bg-[#1C4D8D] border border-[#030e1b] rounded-2xl overflow-hidden backdrop-blur-md transition-all hover:bg-[#030e1b] hover:border-[#0a4175] shadow-xl hover:shadow-[#4988C4]/10"
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Thumbnail with Gradient Overlay */}
                  <div className="w-full lg:w-80 h-80 relative overflow-hidden group-hover:scale-105 transition-transform duration-700">
                    {article.featuredImage ? (
                      <img src={article.featuredImage} alt="" className="w-full h-full object-cover brightness-75 group-hover:brightness-100 transition-all" />
                    ) : (
                      <div className="w-full h-full bg-[#0F2854] flex items-center justify-center text-[#4988C4]"><FaNewspaper size={48}/></div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F2854] to-transparent opacity-60"></div>
                  </div>

                  {/* Content Area */}
                  <div className="p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap gap-3 mb-4">
                        <span className="bg-[#4988C4] text-[#0F2854] px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider">
                          {article.category.name}
                        </span>
                        <span className="text-[#BDE8F5]/60 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                          <FaClock className="text-[#4988C4]" /> {article.readingTime} MIN READ
                        </span>
                      </div>

                      <h2 className="text-3xl font-bold text-white mb-3 leading-tight group-hover:text-[#BDE8F5] transition-colors">
                        {article.title}
                      </h2>
                      
                      <p className="text-[#BDE8F5]/70 font-light mb-6 line-clamp-2 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-[#1C4D8D] pt-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#4988C4] flex items-center justify-center font-bold text-[#0F2854]">
                          {article.author.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white uppercase tracking-tight">{article.author.name}</p>
                          <p className="text-[10px] text-[#4988C4] font-mono">{new Date(article.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>

                      {/* Professional Glass Actions */}
                      <div className="flex gap-2">
                        <Link 
                      href={`/Project-dashboard/editorDashboard/preview/${article.slug}`}
                    className="px-4 py-2 bg-blue-600 rounded-lg"
                       >
                       <button 
                          
                          className="p-3 bg-[#0F2854] border border-[#4988C4]/30 rounded-xl text-[#4988C4] hover:bg-[#4988C4] hover:text-[#0F2854] transition-all"
                          title="View Preview"
                        >
                          
                          <FaEye />
                        </button>
                      </Link>
                        
                        <button 
                          onClick={() => handleStatusChange(article._id, "published")}
                          className="p-3 bg-[#0F2854] border border-green-500/30 rounded-xl text-green-400 hover:bg-green-500 hover:text-[#0F2854] transition-all"
                          title="Approve & Publish"
                        >
                          <FaCheckCircle />
                        </button>
                        <button 
                          onClick={() => handleStatusChange(article._id, "rejected")}
                          className="p-3 bg-[#0F2854] border border-red-500/30 rounded-xl text-red-400 hover:bg-red-500 hover:text-white transition-all"
                          title="Reject Article"
                        >
                          <FaTimesCircle />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {articles.length === 0 && (
              <div className="text-center py-32 rounded-3xl border-2 border-dashed border-[#1C4D8D] bg-[#1C4D8D]/10">
                <FaShieldAlt className="mx-auto text-6xl text-[#1C4D8D] mb-4" />
                <h3 className="text-2xl font-bold text-[#4988C4] uppercase tracking-widest">Sector Clear</h3>
                <p className="text-[#BDE8F5]/40 text-sm mt-2">All articles have been processed for today.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}