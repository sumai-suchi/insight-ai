"use client";
import BookmarkCard from "@/components/BookmarkCard";
import { authClient } from "@/lib/auth/auth-client";
import React, { useEffect, useState } from "react";

interface bookmarkData {
  userId: string;
  articleId: string;
  title: string;
  url: string;
}

const Bookmarks = () => {
  const [bookmark, setBookmark] = useState<bookmarkData[]>([]);
  const { data: session } = authClient.useSession();

  useEffect(() => {
    fetch(`/api/bookmark?userId=${session?.user.id}`)
      .then((res) => res.json())
      .then((data) => setBookmark(data.data));
  }, [session]);

  return (
    <div>
      {bookmark?.map((data, i) => (
        <BookmarkCard key={i} data={data}></BookmarkCard>
      ))}
    </div>
  );
};

export default Bookmarks;
