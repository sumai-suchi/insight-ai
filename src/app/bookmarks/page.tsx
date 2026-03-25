"use client";
import BookmarkCard from "@/components/BookmarkCard";
import { authClient } from "@/lib/auth/auth-client";
import React, { useEffect, useState } from "react";

interface Bookmark {
  _id: string;
  articleId: string;
  title: string;
  url: string;
  userId: string;
  createdAt: string;
}

const Bookmarks = () => {
  const [bookmark, setBookmark] = useState<Bookmark[]>([]);
  const { data: session } = authClient.useSession();

  useEffect(() => {
    if (!session?.user?.id) return;

    fetch(`/api/bookmark?userId=${session.user.id}`)
      .then((res) => res.json())
      .then((data) => setBookmark(data.data));
  }, [session]);

  // ✅ DELETE HANDLER FUNCTION
  const handleDelete = (id: string) => {
    setBookmark((prev) => prev.filter((item) => item._id !== id));
  };

  return (
    <div>
      {bookmark.map((data) => (
        <BookmarkCard
          key={data._id}
          data={data}
          onDelete={handleDelete} // ✅ pass function
        />
      ))}
    </div>
  );
};

export default Bookmarks;