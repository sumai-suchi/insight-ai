"use client";

import { motion } from "framer-motion";

const articles = [
  {
    _id: "1",
    title: "The Rise of Artificial Intelligence in Healthcare",
    content: "AI is transforming healthcare by enabling faster diagnosis, personalized treatment, and improved patient care...",
    category: "AI",
    tags: ["AI", "Healthcare", "Future"],
    image: "https://res.cloudinary.com/demo/image/upload/v1/articles/ai-healthcare",
    createdAt: "2026-03-21T06:00:00.000Z",
  },
  {
    _id: "2",
    title: "How AI is Changing Education",
    content: "Artificial Intelligence is reshaping the education system by introducing personalized learning experiences...",
    category: "Education",
    tags: ["AI", "Learning", "Education"],
    image: "https://res.cloudinary.com/demo/image/upload/v1/articles/education-ai",
    createdAt: "2026-03-19T06:00:00.000Z",
  },
];

export default function NewReview() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Review Articles</h1>

      <div className="space-y-5">
        {articles.map((article, index) => (
          <motion.div
            key={article._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition"
          >
            <div className="p-5 flex gap-4">
              {/* Image */}
              <img
                src={article.image}
                alt={article.title}
                className="w-32 h-24 object-cover rounded-lg"
              />

              {/* Content */}
              <div className="flex-1 space-y-2">
                <h2 className="font-semibold text-lg">{article.title}</h2>

                <p className="text-sm text-gray-600 line-clamp-2">{article.content}</p>

                <div className="flex flex-wrap gap-2 items-center">
                  <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                    {article.category}
                  </span>

                  {article.tags.map((tag, i) => (
                    <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>

                <p className="text-xs text-gray-500">
                  Submitted: {new Date(article.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2">
                <button className="px-3 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition">
                  Approve
                </button>
                <button className="px-3 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition">
                  Reject
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}