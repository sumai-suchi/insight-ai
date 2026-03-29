"use client";
import React, { useEffect, useState } from "react";
import { Bookmark, ExternalLink, Trash2, Clock } from "lucide-react";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    fetch("/api/bookmark")
      .then((res) => res.json())
      .then((data) => setBookmarks(data.data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center gap-3 mb-10">
          <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200">
            <Bookmark className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Bookmarks</h1>
            <p className="text-gray-500 text-sm">
              Saved articles and resources
            </p>
          </div>
        </div>

        {/* Grid Layout */}
        {bookmarks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarks.map((item, index) => (
              <div
                key={index}
                className="group relative bg-white border border-gray-100 rounded-3xl p-5 hover:shadow-2xl hover:shadow-gray-200 transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Image Placeholder or Icon */}
                <div className="aspect-video mb-4 rounded-2xl bg-gray-100 overflow-hidden flex items-center justify-center">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <Bookmark className="text-gray-300 w-12 h-12" />
                  )}
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-medium text-blue-600 uppercase tracking-wider">
                    <Clock className="w-3 h-3" />
                    {new Date(
                      item.createdAt || Date.now(),
                    ).toLocaleDateString()}
                  </div>

                  <h3 className="text-lg font-bold text-gray-800 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                    {item.title || "Untitled Bookmark"}
                  </h3>

                  <p className="text-sm text-gray-500 line-clamp-2">
                    {item.description ||
                      "No description available for this saved item."}
                  </p>
                </div>

                {/* Actions */}
                <div className="mt-6 flex items-center justify-between border-t border-gray-50 pt-4">
                  <button className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors">
                    Read More <ExternalLink className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
            <div className="inline-block p-4 bg-gray-50 rounded-full mb-4">
              <Bookmark className="w-10 h-10 text-gray-300" />
            </div>
            <h2 className="text-xl font-semibold text-gray-600">
              No bookmarks yet
            </h2>
            <p className="text-gray-400">
              Items you bookmark will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
