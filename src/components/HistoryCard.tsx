import React from "react";
import { Calendar, Clock, Link as LinkIcon } from "lucide-react";

interface HistoryCardProps {
  data: {
    title: string;
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
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDelete = async () => {
    const res = await fetch(`/api/news_history?id=${data._id}`, {
      method: "DELETE",
    });
    const resData = await res.json();
    if (resData.success) onDelete(data._id);
  };

  return (
    <div className="flex flex-col sm:flex-row bg-white dark:bg-slate-900 rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-purple-200 dark:border-purple-700 max-w-4xl mx-auto">
      {/* Image */}
      <div className="h-64 sm:h-auto sm:w-1/3">
        <img
          src={data.urlToImage}
          alt={data.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-xs font-semibold text-purple-500 mb-1 uppercase">
            {data.sourceName}
          </p>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-3 line-clamp-2">
            {data.title}
          </h2>

          <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-purple-400" />
              <span>Published: {formatDate(data.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-purple-400" />
              <span>Read at: {formatDate(data.readAt)}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <a
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors"
          >
            Original Article <LinkIcon size={14} />
          </a>

          <button
            onClick={handleDelete}
            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white py-2 px-6 rounded-lg font-semibold transition-all duration-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
