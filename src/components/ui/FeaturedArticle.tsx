// import React from "react";
// import { INews } from "@/types/news";
// import {
//   Ribbon,
//   Clock,
//   BookOpen,
//   Eye,
//   Bookmark,
//   Share2,
//   ChevronRight,
// } from "lucide-react";
// import { formatDistanceToNow } from "date-fns"; // সময় দেখানোর জন্য এটি ব্যবহার করা ভালো
// import Image from "next/image";

// const FeaturedArticle = ({ data }: { data: INews }) => {
//   if (!data) return null;

//   // তারিখ ফরম্যাট করার জন্য (যেমন: 2 days ago)
//   const publishedDate = data.publishedAt
//     ? formatDistanceToNow(new Date(data.publishedAt), { addSuffix: true })
//     : "Recently";

//   return (
//     <div className="w-full max-w-7xl mx-auto py-10">
//       {/* Top Label */}
//       <div className="flex items-center gap-2 mb-4 text-purple-700">
//         <Ribbon size={20} className="fill-purple-100" />
//         <span className="font-bold text-lg">Featured Article</span>
//       </div>

//       {/* Main Card */}
//       <div className="bg-white rounded-[2rem] overflow-hidden shadow-xl border border-gray-100 flex flex-col md:flex-row">
//         {/* Image Section */}
//         <div className="relative w-full md:w-1/2 h-48 md:h-auto">
//           <Image
//             src={data.urlToImage}
//             alt={data.title}
//             className="w-full h-full object-cover"
//             width={600} // এখানে pixels দিন
//             height={400} // এখানে pixels দিন
//           />
//           {/* Badges on Image */}
//           <div className="absolute bottom-6 left-6 flex gap-2">
//             <span className="bg-purple-600/90 backdrop-blur-sm text-white text-xs font-semibold px-4 py-1.5 rounded-full flex items-center gap-1">
//               ✨ Featured
//             </span>
//             <span className="bg-pink-500/90 backdrop-blur-sm text-white text-xs font-semibold px-4 py-1.5 rounded-full flex items-center gap-1">
//               📈 Trending
//             </span>
//           </div>
//         </div>

//         {/* Content Section */}
//         <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-[#f9faff]">
//           <span className="text-purple-600 font-semibold text-sm mb-3 uppercase tracking-wider">
//             {data.category || "Technology"}
//           </span>

//           <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
//             {data.title}
//           </h2>

//           <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-8 line-clamp-3">
//             {data.description}
//           </p>

//           {/* Metadata */}
//           <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm mb-8">
//             <div className="flex items-center gap-1.5">
//               <Clock size={16} />
//               <span>{publishedDate}</span>
//             </div>
//             <div className="flex items-center gap-1.5">
//               <BookOpen size={16} />
//               <span>5 min read</span>{" "}
//               {/* আপনি চাইলে ডাটা থেকে ক্যালকুলেট করতে পারেন */}
//             </div>
//             <div className="flex items-center gap-1.5">
//               <Eye size={16} />
//               <span>{data.sourceName}</span>{" "}
//               {/* ডাটাতে ভিউ না থাকলে সোর্স নেম দেখানো ভালো */}
//             </div>
//           </div>

//           {/* Actions */}
//           <div className="flex items-center gap-4">
//             <a
//               href={data.url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-indigo-200"
//             >
//               Read Article <ChevronRight size={18} />
//             </a>

//             <button
//               className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
//               title="Save for later"
//             >
//               <Bookmark size={20} className="text-slate-600" />
//             </button>

//             <button
//               className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
//               title="Share"
//             >
//               <Share2 size={20} className="text-slate-600" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeaturedArticle;
import React from "react";
import { INews } from "@/types/news";
import {
  Ribbon,
  Clock,
  BookOpen,
  Eye,
  Bookmark,
  Share2,
  ChevronRight,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";

const FeaturedArticle = ({ data }: { data: INews }) => {
  if (!data) return null;

  const publishedDate = data.publishedAt
    ? formatDistanceToNow(new Date(data.publishedAt), { addSuffix: true })
    : "Recently";

  return (
    <div className="w-full max-w-7xl mx-auto py-10">
      {/* Top Label */}
      <div className="flex items-center gap-2 mb-4">
        <Ribbon size={20} className="fill-purple-100" />
        <span className="font-bold text-lg">Featured Article</span>
      </div>

      {/* Main Card */}
      <div className="group bg-white rounded-[2rem] overflow-hidden shadow-xl border border-gray-100 flex flex-col md:flex-row">
        {/* Image Section - Zoom Effect Container */}
        <div className="relative w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
          <Image
            src={data.urlToImage || "https://via.placeholder.com/800x600"}
            alt={data.title}
            fill // Responsive Layout-এর জন্য fill ব্যবহার করা ভালো
            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 50vw"
          />

          {/* Badges on Image */}
          <div className="absolute bottom-6 left-6 flex gap-2 z-10">
            <span className="bg-purple-600/90 backdrop-blur-sm text-white text-xs font-semibold px-4 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
              ✨ Featured
            </span>
            <span className="bg-pink-500/90 backdrop-blur-sm text-white text-xs font-semibold px-4 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
              📈 Trending
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-[#f9faff]">
          <span className="text-purple-600 font-semibold text-sm mb-3 uppercase tracking-wider">
            {data.category || "Technology"}
          </span>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight mb-4 group-hover:text-indigo-600 transition-colors duration-300">
            {data.title}
          </h2>

          <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-8 line-clamp-3">
            {data.description}
          </p>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm mb-8">
            <div className="flex items-center gap-1.5">
              <Clock size={16} />
              <span>{publishedDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BookOpen size={16} />
              <span>5 min read</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Eye size={16} />
              <span>{data.sourceName}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <a
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-purple-500 to-purple-700 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2 transition-all shadow-lg hover:shadow-indigo-300 active:scale-95"
            >
              Read Article <ChevronRight size={18} />
            </a>

            <button
              className="p-3 border border-gray-200 rounded-xl hover:bg-white hover:text-indigo-600 hover:border-indigo-200 transition-all shadow-sm active:scale-90"
              title="Save for later"
            >
              <Bookmark size={20} />
            </button>

            <button
              className="p-3 border border-gray-200 rounded-xl hover:bg-white hover:text-indigo-600 hover:border-indigo-200 transition-all shadow-sm active:scale-90"
              title="Share"
            >
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedArticle;
