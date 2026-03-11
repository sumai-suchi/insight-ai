"use client";

import React from "react";
import { Clock, Edit3, Save, ShieldCheck, Target } from "lucide-react";
import { motion } from "framer-motion";

const activities = [
  {
    id: 1,
    type: "Blog post edited",
    title: "AI in Marketing 2026",
    time: "10 mins ago",
    icon: Edit3,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    id: 2,
    type: "Draft saved",
    title: "SEO Best Practices",
    time: "1 hour ago",
    icon: Save,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    id: 3,
    type: "Plagiarism check",
    title: "Content Strategy Guide",
    time: "2 hours ago",
    icon: ShieldCheck,
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
  {
    id: 4,
    type: "SEO optimized",
    title: "Digital Transformation",
    time: "3 hours ago",
    icon: Target,
    color: "text-indigo-500",
    bg: "bg-indigo-50",
  },
];

export const RecentActivity = () => {
  return (
    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-sm border border-slate-100 w-full">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-2 text-[#2D31A6]">
          <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
          <h2 className="text-lg sm:text-xl font-bold">Recent Activity</h2>
        </div>

        <button className="text-[#8B5CF6] text-sm font-bold hover:opacity-80 transition self-start sm:self-auto">
          View All
        </button>
      </div>

      {/* Activity List */}
      <div className="space-y-3 sm:space-y-4">
        {activities.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#F8FAFF] hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-slate-100"
          >
            {/* Left Section */}
            <div className="flex items-center gap-3 sm:gap-5">
              <div className={`${item.bg} p-2 sm:p-3 rounded-xl shadow-sm`}>
                <item.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${item.color}`} />
              </div>

              <div>
                <p className="text-xs sm:text-[13px] text-slate-400 font-medium">
                  {item.type}
                </p>
                <h3 className="text-sm sm:text-[15px] font-bold text-slate-700">
                  {item.title}
                </h3>
              </div>
            </div>

            {/* Time */}
            <span className="text-xs sm:text-[13px] text-slate-400 sm:whitespace-nowrap">
              {item.time}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};