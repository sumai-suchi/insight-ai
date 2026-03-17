import React from "react";
import { ExternalLink, Calendar } from "lucide-react";

interface BookmarkData {
  _id: string;
  articleId: string;
  title: string;
  url: string;
  userId: string;
  createdAt: string;
}

const BookmarkCard = ({ data }: { data: BookmarkData }) => {
  return (
    <div className="bg-white border rounded-xl shadow-sm p-5 hover:shadow-md transition">
      <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
        {data.title}
      </h2>

      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
        <Calendar size={16} />
        <span>{new Date(data.createdAt).toLocaleDateString()}</span>
      </div>

      <a
        href={data.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-blue-600 hover:underline"
      >
        Read Article
        <ExternalLink size={16} />
      </a>
    </div>
  );
};

export default BookmarkCard;
