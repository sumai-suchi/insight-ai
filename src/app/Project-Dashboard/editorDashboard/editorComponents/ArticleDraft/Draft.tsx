"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";


type DraftArticle = {
  _id: string;
  title: string;
  category: string;
  tags: string[];
  image: string;
  updatedAt: string;
};

export default function Draft() {
  const [articles, setArticles] = useState<DraftArticle[]>([]);
  const [loading, setLoading] = useState(true);
  console.log(articles)
  
const router = useRouter();

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        const res = await fetch("/api/articles/draft");
        const data = await res.json();
        if (data.success) setArticles(data.drafts);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrafts();
  }, []);

  const handleDelete = async (id: string) => {
  if (!confirm("Are you sure you want to delete this draft?")) return;

  try {
    const res = await fetch(`/api/articles/draft/${id}`, { method: "DELETE" });
    const data = await res.json();

    if (data.success) {
      // Remove from local state
      setArticles((prev) => prev.filter((article) => article._id !== id));
      alert("Draft deleted!");
    } else {
      alert("Failed: " + data.message);
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  }
};

  if (loading)
    return <p className="p-6 text-center text-gray-500">Loading drafts...</p>;

  if (!articles.length)
    return <p className="p-6 text-center text-gray-500">No drafts found.</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Draft Articles</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <motion.div
            key={article._id}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl shadow-md overflow-hidden transition-shadow hover:shadow-xl"
          >
            {/* Image */}
            {article.image && (
              <img
                src={article.image}
                alt={article.title}
                className="h-40 w-full object-cover"
              />
            )}

            {/* Content */}
            <div className="p-5 space-y-3">
              <h2 className="font-semibold text-lg line-clamp-2">{article.title}</h2>

              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                {article.category}
              </span>

              <div className="flex flex-wrap gap-1">
                {article.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs bg-gray-100 px-2 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <p className="text-xs text-gray-500">
                Updated: {new Date(article.updatedAt).toLocaleDateString()}
              </p>

              <div className="flex gap-2 pt-2">
               <button
             onClick={() => router.push(`/Project-dashboard/editorDashboard/editor/${article._id}`)}
             className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition"
             >
         Edit
           </button>
                <button
                   onClick={() => handleDelete(article._id)}
                   className="px-3 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition"
                    >
               Delete
               </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}