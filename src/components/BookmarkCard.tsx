"use client";
import { Trash2 } from "lucide-react";
import React from "react";

interface BookmarkCardProps {
  data: {
    _id: string;
    articleId: string;
    title: string;
    url: string;
    userId: string;
    createdAt: string;
  };
  onDelete: (id: string) => void;
}

const BookmarkCard = ({ data, onDelete }: BookmarkCardProps) => {
  const handleDelete = async () => {
    const res = await fetch(`/api/bookmark?id=${data._id}`, {
      method: "DELETE",
    });

    const resData = await res.json();

    if (resData.success) {
      onDelete(data._id); // ✅ call parent function
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow hover:shadow-lg transition-shadow duration-300 w-full max-w-xl">
      {/* Content */}
      <div className="flex-1 mb-3 md:mb-0">
        <a
          href={data.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-500 font-semibold text-lg hover:underline"
        >
          {data.title}
        </a>

        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          Added on: {new Date(data.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Delete Button */}
      <button
        onClick={handleDelete}
        className="flex items-center justify-center p-2 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-600 transition-colors"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
};

export default BookmarkCard;