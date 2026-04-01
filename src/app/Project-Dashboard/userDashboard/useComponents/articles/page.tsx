"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ArticleCard from "./components/ArticleCard";
import { useAuth } from "@/Context/AuthContext";

interface Article {
  _id: string;
  title: string;
  content: string;
  status: "draft" | "pending" | "published" | "rejected";
  createdAt: string;
}


const MyArticlesPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
    const {session}=useAuth()


 // 👉 replace with auth user id

  // ✅ Fetch user articles
  const fetchArticles = async (Id : any) => {
    try {
      const res = await fetch(`/api/user-article/user/${Id}`);
      const data = await res.json();
      console.log("this is article data",data)
      setArticles(data);
    } catch (error) {
      toast.error("Failed to load articles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
     const Id = session?.user?.id; 
    fetchArticles(Id);
  }, [session?.user?.id]);

  // ✅ Submit article (draft → pending)
  const handleSubmit = async (Id: string) => {
    try {
      const res = await fetch(`/api/user-article/user/${Id}`, {
        method: "PATCH",
      });
      console.log(res)

      if (res.ok) {
        toast.success("Submitted for review");
        fetchArticles(session?.user?.id); // refresh
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Articles</h1>

      {articles.length === 0 ? (
        <p>No articles found</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard 
              key={article._id}
              article={article}
              onSubmit={handleSubmit}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyArticlesPage;