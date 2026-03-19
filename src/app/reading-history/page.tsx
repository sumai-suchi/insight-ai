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
const ReadingHistory = () => {
  const [history, setHistory] = useState<HistoryItem[]>();
  const { data: session } = authClient.useSession();

  useEffect(() => {
    fetch(`/api/history?userId=${session?.user.id}`)
      .then((res) => res.json())
      .then((data) => setHistory(data.data))
      .catch((err) => console.error(err));
  }, [session]);

  const handleDelete = (deletedId: string) => {
    setHistory((prev) => prev?.filter((item) => item._id !== deletedId));
  };

  return (
    <div className="flex flex-col gap-4 p-10">
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
  );
};

export default ReadingHistory;
