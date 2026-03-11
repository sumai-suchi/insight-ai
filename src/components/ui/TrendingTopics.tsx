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
    <div className="w-full max-w-7xl mx-auto my-8">
      <div className="bg-orange-50/50 border border-orange-200 rounded-2xl p-6 md:p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-br from-orange-400 to-pink-500 p-2 rounded-lg shadow-sm">
            <TrendingUp size={20} className="text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Trending Now</h2>
        </div>

        {/* Topics Grid/Flex */}
        <div className="flex flex-wrap gap-3">
          {topics.map((topic, index) => (
            <button
              key={index}
              className="flex items-center gap-2 bg-white border border-orange-200 hover:border-orange-400 
                         px-4 py-2 rounded-full transition-all duration-300 shadow-sm group"
            >
              <span className="text-lg group-hover:scale-110 transition-transform">
                🔥
              </span>
              <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600">
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
