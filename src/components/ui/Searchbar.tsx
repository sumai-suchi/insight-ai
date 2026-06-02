// "use client";

// type Props = {
//   searchInput: string;
//   setSearchInput: (value: string) => void;
//   clearSearch: () => void;
// };

// export default function SearchBar({
//   searchInput,
//   setSearchInput,
//   clearSearch,
// }: Props) {
//   return (
//     <div className="relative max-w-2xl mx-auto mb-8">
//       <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//         <svg
//           className="h-5 w-5 text-gray-400"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//           />
//         </svg>
//       </div>

//       <input
//         type="text"
//         value={searchInput}
//         onChange={(e) => setSearchInput(e.target.value)}
//         placeholder="Search news..."
//         className="w-full pl-11 pr-12 py-4 bg-white border rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500"
//       />

//       {searchInput && (
//         <button
//           onClick={clearSearch}
//           className="absolute inset-y-0 right-0 pr-4 flex items-center"
//         >
//           ✕
//         </button>
//       )}
//     </div>
//   );
// }

"use client";

import React from "react";
import { Sparkles, Search, X } from "lucide-react"; // X আইকন যোগ করা হয়েছে

type NewsHeroProps = {
  searchInput: string;
  setSearchInput: (value: string) => void;
  clearSearch: () => void;
};

const NewsHero = ({
  searchInput,
  setSearchInput,
  clearSearch,
}: NewsHeroProps) => {
  return (
    <section className="w-full bg-[#0F2854] py-20 px-6 md:px-12 lg:px-24 mt-[-16]">
      <div className="max-w-7xl mx-auto flex flex-col items-start gap-4">
        {/* Badge/Small Heading */}
        <div className="flex items-center gap-2 text-white/80">
          <Sparkles size={18} className="text-white/80" />
          <span className="text-sm font-medium tracking-wide">
            Stay Informed
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl md:text-5xl font-bold text-white">
          Latest News & Insights
        </h1>

        {/* Subtitle */}
        <p className="text-white/85 text-sm md:text-base max-w-xl leading-relaxed">
          Discover the latest trends, updates, and expert insights in AI-powered
          content creation and digital marketing.
        </p>

        {/* Search Bar Implementation */}
        <div className="mt-6 w-full max-w-lg relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search size={18} className="text-white/70" />
          </div>

          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search articles, topics, or categories..."
            className="w-full bg-white/10 border border-white/25 text-white placeholder:text-white/60 
                       rounded-xl py-3.5 pl-12 pr-12 outline-none transition-all
                       focus:bg-white/15 focus:border-white/40 focus:ring-2 focus:ring-white/20"
          />

          {/* Clear Button (Show only when there is input) */}
          {searchInput && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-4 flex items-center text-white/70 hover:text-white transition-colors"
              title="Clear search"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsHero;
