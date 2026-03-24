"use client";

import { motion } from "framer-motion";

// Example data
const userArticles = [
  {
    _id: "1",
    title: "User: AI in Healthcare",
    content: "AI is transforming healthcare by enabling faster diagnosis, personalized treatment, and improved patient care...",
    category: "AI",
    tags: ["AI", "Healthcare", "Future"],
    image: "https://res.cloudinary.com/demo/image/upload/v1/articles/ai-healthcare",
    createdAt: "2026-03-21T06:00:00.000Z",
    status: "pending",
  },
];

const editorArticles = [
  {
    _id: "2",
    title: "Editor: AI in Education",
    content: "Artificial Intelligence is reshaping the education system by introducing personalized learning experiences...",
    category: "Education",
    tags: ["AI", "Learning", "Education"],
    image: "https://res.cloudinary.com/demo/image/upload/v1/articles/education-ai",
    createdAt: "2026-03-19T06:00:00.000Z",
    status: "pending",
  },
];

export default function ReviewArticles() {
  return (
    <div className="p-6 space-y-10">
      <h1 className="text-2xl font-bold">Review Articles</h1>

      {/* User Submitted Articles */}
      <section>
        <h2 className="text-xl font-semibold mb-4">User Submitted Articles</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userArticles.map((article, index) => (
            <motion.div
              key={article._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition duration-300 flex flex-col"
            >
              {/* Image */}
              {article.image ? (
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ) : (
                <div className="h-48 w-full bg-gray-100 flex items-center justify-center text-gray-400 font-semibold">
                  No Image
                </div>
              )}

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-bold mb-2 line-clamp-2">{article.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-3 mb-4">{article.content}</p>

                <div className="flex flex-wrap gap-2 items-center mb-4">
                  <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                    {article.category}
                  </span>
                  {article.tags.map((tag, i) => (
                    <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-auto">
                  <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition">
                    Approve
                  </button>
                  <button className="flex-1 bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition">
                    Reject
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Editor Submitted Articles */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Editor Submitted Articles</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {editorArticles.map((article, index) => (
            <motion.div
              key={article._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition duration-300 flex flex-col"
            >
              {/* Image */}
              {article.image ? (
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ) : (
                <div className="h-48 w-full bg-gray-100 flex items-center justify-center text-gray-400 font-semibold">
                  No Image
                </div>
              )}

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-bold mb-2 line-clamp-2">{article.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-3 mb-4">{article.content}</p>

                <div className="flex flex-wrap gap-2 items-center mb-4">
                  <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                    {article.category}
                  </span>
                  {article.tags.map((tag, i) => (
                    <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-auto">
                  <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition">
                    Approve
                  </button>
                  <button className="flex-1 bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition">
                    Reject
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}