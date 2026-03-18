"use client";
import HistoryCard from "@/components/HistoryCard";
import { authClient } from "@/lib/auth/auth-client";
import React, { useEffect, useState } from "react";

interface HistoryItem {
  _id: string;
  title: string;
  category: string;
  sourceName: string;
  publishedAt: string;
  readAt: string;
  url: string;
  urlToImage: string;
  articleId: string;
  userId: string;
}
const NewsHistory = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const { data: session } = authClient.useSession();

  // Fetch history when session is ready
  useEffect(() => {
    if (!session?.user.id) return;

    fetch(`/api/news_history?userId=${session.user.id}`)
      .then((res) => res.json())
      .then((data) => setHistory(data.data))
      .catch((err) => console.error(err));
  }, [session]);

  const handleDelete = (deletedId: string) => {
    setHistory((prev) => prev?.filter((item) => item._id !== deletedId));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold mb-6 text-center sm:text-left">
        News History
      </h2>

      {history?.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No news history found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {history.map((singleData) => (
            <HistoryCard
              key={singleData._id}
              data={singleData}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default NewsHistory;
