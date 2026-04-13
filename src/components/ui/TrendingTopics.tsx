import React from "react";
import { TrendingUp } from "lucide-react";

const topics = [
  "#AI Content Creation",
  "#Marketing Automation",
  "#SEO Strategies",
  "#ChatGPT-4",
  "#Content Strategy",
  "#Digital Transformation",
];

const TrendingTopics = () => {
  return (
    <div className="w-full my-0">
      <div className="bg-[#0F2854] border border-[#BDE8F5]/20 rounded-2xl p-6 md:p-7">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-linear-to-br from-secondary to-primary p-2 rounded-lg shadow-sm">
            <TrendingUp size={20} className="text-white" />
          </div>
          <h2 className="text-xl font-bold text-[#BDE8F5]">Trending Now</h2>
        </div>

        {/* Topics Grid/Flex */}
        <div className="flex flex-wrap gap-3">
          {topics.map((topic, index) => (
            <button
              key={index}
              className="flex items-center gap-2 bg-[#0F2854] border border-[#BDE8F5]/20 hover:border-[#BDE8F5]/60 
                         px-4 py-2 rounded-full transition-all duration-300 shadow-sm group"
            >
              <span className="text-lg group-hover:scale-110 transition-transform">
                🔥
              </span>
              <span className="text-sm font-medium text-[#BDE8F5]/85 group-hover:text-white">
                {topic}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingTopics;
