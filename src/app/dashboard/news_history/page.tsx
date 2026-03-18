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
  const [history, setHistory] = useState<HistoryItem[]>();
  const { data: session } = authClient.useSession();

  console.log("new his", history);

  useEffect(() => {
    fetch(`/api/news_history?userId=${session?.user.id}`)
      .then((res) => res.json())
      .then((data) => setHistory(data.data))
      .catch((err) => console.error(err));
  }, [session]);

  const handleDelete = (deletedId: string) => {
    setHistory((prev) => prev?.filter((item) => item._id !== deletedId));
  };

  return (
    <div max-w-7xl mx-auto>
      <h2 className="text-4xl font-bold ">News History</h2>
      <div className="grid grid-cols-3">
        {history?.map((singleData: HistoryItem) => {
          return (
            <HistoryCard
              key={singleData._id.toString()}
              data={singleData}
              onDelete={handleDelete}
            ></HistoryCard>
          );
        })}
      </div>
    </div>
  );
};

export default NewsHistory;
