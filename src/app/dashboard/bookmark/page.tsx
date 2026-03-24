"use client";

import BookmarkCard from "@/components/BookmarkCard";
import { useAuth } from "@/Context/AuthContext";
import { authClient } from "@/lib/auth/auth-client";
import React, { useEffect, useState } from "react";
interface bookmarkData {
  userId: string;
  articleId: string;
  title: string;
  url: string;
  _id: string;
  createdAt: string;
}

const Bookmarks = () => {
  const { data: session } = authClient.useSession();
  console.log("data is ", session?.user.id);
  const [bookmarkData, setBookmarkData] = useState<bookmarkData[]>([]);

  useEffect(() => {
    fetch(`/api/bookmark?userId=${session?.user.id}`)
      .then((res) => res.json())
      .then((data) => setBookmarkData(data.data));
  }, [session]);

  const handleDelete = (deletedId: string) => {
    setBookmarkData((prev) => prev?.filter((item) => item._id !== deletedId));
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="my-5 text-4xl font-bold">Bookmarks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {bookmarkData.map((singleData, i) => (
          <BookmarkCard
            key={i}
            data={singleData}
            onDelete={handleDelete}
          ></BookmarkCard>
        ))}
      </div>
    </div>
  );
};

export default Bookmarks;
