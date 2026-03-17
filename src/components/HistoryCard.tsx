// import React from "react";
// import Image from "next/image";
// import {
//   Calendar,
//   Clock,
//   Link as LinkIcon,
//   Briefcase,
//   User,
// } from "lucide-react";

// interface HistoryCardProps {
//   data: {
//     title: string;
//     category: string;
//     sourceName: string;
//     publishedAt: string;
//     readAt: string;
//     url: string;
//     urlToImage: string;
//     articleId: string;
//     userId: string;
//     _id: string;
//   };
// }

// const HistoryCard = ({ data, onDelete }: HistoryCardProps) => {
//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleString("bn-BD", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const handleDelete = async () => {
//     const res = await fetch(`/api/history?id=${data._id}`, {
//       method: "DELETE",
//     });

//     const resData = await res.json();

//     console.log("resData", resData);

//     if (resData.success) {
//       alert("history deleted");
//       onDelete(data._id);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-2xl transition-shadow duration-300">
//       {/* Article Image */}
//       <div className="relative h-48 w-full">
//         <img
//           src={data.urlToImage}
//           alt={data.title}
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute top-3 left-3">
//           <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full uppercase tracking-wider flex items-center gap-1">
//             <Briefcase size={12} /> {data.category}
//           </span>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="p-5">
//         <p className="text-xs font-semibold text-blue-500 mb-1 uppercase tracking-tighter">
//           {data.sourceName}
//         </p>
//         <h2 className="text-xl font-bold text-slate-800 dark:text-white leading-snug mb-4 line-clamp-2">
//           {data.title}
//         </h2>

//         {/* Info Grid */}
//         <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
//           <div className="flex items-center gap-3">
//             <Calendar size={16} className="text-slate-400" />
//             <span>প্রকাশিত: {formatDate(data.publishedAt)}</span>
//           </div>
//           <div className="flex items-center gap-3">
//             <Clock size={16} className="text-slate-400" />
//             <span>পড়া হয়েছে: {formatDate(data.readAt)}</span>
//           </div>
//           <div className="flex items-center gap-3">
//             <User size={16} className="text-slate-400" />
//             <span className="truncate">ইউজার আইডি: {data.userId}</span>
//           </div>
//         </div>

//         <hr className="my-4 border-slate-100 dark:border-slate-800" />

//         {/* Footer Actions */}
//         <div className="flex items-center justify-between">
//           <div className="text-[10px] text-slate-400 font-mono">
//             ID: {data.articleId.slice(-8)}
//           </div>
//           <a
//             href={data.url}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
//           >
//             মূল আর্টিকেল <LinkIcon size={14} />
//           </a>
//         </div>
//         <button
//           className="mt-2 bg-red-500 p-1 rounded-md text-white"
//           onClick={handleDelete}
//         >
//           Delete
//         </button>
//       </div>
//     </div>
//   );
// };

// export default HistoryCard;
import React from "react";
import {
  Calendar,
  Clock,
  Link as LinkIcon,
  Briefcase,
  User,
} from "lucide-react";

interface HistoryCardProps {
  data: {
    title: string;
    category: string;
    sourceName: string;
    publishedAt: string;
    readAt: string;
    url: string;
    urlToImage: string;
    articleId: string;
    userId: string;
    _id: string;
  };
  onDelete: (id: string) => void;
}

const HistoryCard = ({ data, onDelete }: HistoryCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("bn-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDelete = async () => {
    const res = await fetch(`/api/history?id=${data._id}`, {
      method: "DELETE",
    });
    const resData = await res.json();
    if (resData.success) onDelete(data._id);
  };

  return (
    <div className="flex flex-col sm:flex-row max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-lg overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-2xl transition-all duration-300">
      {/* Left: Image */}
      <div className="relative sm:w-1/3 h-48 sm:h-auto">
        <img
          src={data.urlToImage}
          alt={data.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-full flex items-center gap-1 text-xs shadow-md">
          <Briefcase size={12} /> {data.category}
        </div>
      </div>

      {/* Right: Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-xs font-semibold text-blue-500 mb-1 uppercase tracking-wider">
            {data.sourceName}
          </p>
          <h2 className="text-lg font-bold text-slate-800 dark:text-white leading-snug mb-3 line-clamp-2">
            {data.title}
          </h2>

          <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-slate-400" />
              <span>প্রকাশিত: {formatDate(data.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-slate-400" />
              <span>পড়া হয়েছে: {formatDate(data.readAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <User size={16} className="text-slate-400" />
              <span className="truncate">ইউজার: {data.userId}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-[10px] text-slate-400 font-mono">
            ID: {data.articleId.slice(-8)}
          </div>
          <a
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            মূল আর্টিকেল <LinkIcon size={14} />
          </a>
        </div>

        <button
          onClick={handleDelete}
          className="mt-3 w-full sm:w-auto bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white py-2 px-6 rounded-xl font-semibold transition-all duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default HistoryCard;
