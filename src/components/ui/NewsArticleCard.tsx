// import React from "react";

// import { TrendingUp, Clock, Eye } from "lucide-react";
// import { formatDistanceToNow } from "date-fns";
// import { INews } from "@/types/news";
// import Image from "next/image";

// const NewsArticleCart = ({ article }: { article: INews }) => {
//   const publishedDate = article.publishedAt
//     ? formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })
//     : "Recently";

//   console.log(article);

//   return (
//     <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col sm:flex-row h-full hover:shadow-md transition-shadow ">
//       {/* Image Section */}
//       <div className="relative w-full sm:w-2/5 h-48 sm:h-auto">
//         <img
//           src={article.urlToImage || "https://via.placeholder.com/400x300"}
//           alt={article.title}
//           className="w-full h-full object-cover"
//         />
//         {/* Hot Badge */}
//         <div className="absolute top-3 left-3 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1 uppercase">
//           <TrendingUp size={12} />
//           Hot
//         </div>
//       </div>

//       {/* Content Section */}
//       <div className="w-full sm:w-3/5 p-5 flex flex-col justify-between">
//         <div>
//           <span className="text-purple-600 bg-purple-50 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
//             {article.category}
//           </span>
//           <h3 className="text-lg font-bold text-slate-900 mt-3 leading-snug line-clamp-2">
//             {article.title}
//           </h3>
//           <p className="text-gray-500 text-xs mt-2 line-clamp-2">
//             {article.description}
//           </p>
//         </div>

//         {/* Footer Meta */}
//         <div className="flex items-center gap-4 mt-4 text-gray-400 text-[11px]">
//           <div className="flex items-center gap-1">
//             <Clock size={14} />
//             <span>{publishedDate}</span>
//           </div>
//           <div className="flex items-center gap-1">
//             <Eye size={14} />
//             <span>{article.sourceName}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewsArticleCart;
import React from "react";
import { TrendingUp, Clock, Eye } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { INews } from "@/types/news";
import Image from "next/image";

const NewsArticleCart = ({ article }: { article: INews }) => {
  const publishedDate = article.publishedAt
    ? formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })
    : "Recently";

  return (
    // 'group' ক্লাসটি এখানে যোগ করা হয়েছে যাতে পুরো কার্ডে হোভার করলে ইমেজ জুম হয়
    <div className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col sm:flex-row h-full hover:shadow-md transition-all duration-300">
      {/* Image Section */}
      <div className="relative w-full sm:w-2/5 h-48 sm:h-auto overflow-hidden">
        <Image
          src={article.urlToImage || "https://via.placeholder.com/400x300"}
          alt={article.title}
          fill
          sizes="(max-width: 640px) 100vw, 40vw"
          // 'group-hover:scale-110' দিয়ে জুম ইফেক্ট দেওয়া হয়েছে
          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        />

        {/* Hot Badge */}
        <div className="absolute top-3 left-3 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1 uppercase z-10 shadow-sm">
          <TrendingUp size={12} />
          Hot
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full sm:w-3/5 p-5 flex flex-col justify-between">
        <div>
          <span className="text-purple-600 bg-purple-50 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
            {article.category}
          </span>
          <h3 className="text-lg font-bold text-slate-900 mt-3 leading-snug line-clamp-2 group-hover:text-purple-600 transition-colors">
            {article.title}
          </h3>
          <p className="text-gray-500 text-xs mt-2 line-clamp-2">
            {article.description}
          </p>
        </div>

        {/* Footer Meta */}
        <div className="flex items-center gap-4 mt-4 text-gray-400 text-[11px]">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{publishedDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye size={14} />
            <span>{article.sourceName}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsArticleCart;
