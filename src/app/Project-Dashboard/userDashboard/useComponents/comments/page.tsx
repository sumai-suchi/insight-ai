"use client";
import React, { useEffect, useState } from "react";
import {
  MessageCircle,
  Trash2,
  Edit2,
  Heart,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const commentsData = [
  {
    id: 1,
    article: "AI is Changing the World",
    comment:
      "This article was very informative! I learned a lot about neural networks.",
    time: "5 min ago",
    likes: 3,
    liked: false,
  },
  {
    id: 2,
    article: "Latest Tech Trends 2026",
    comment:
      "I think AI will dominate everything, specifically in the MERN stack development.",
    time: "30 min ago",
    likes: 5,
    liked: true,
  },
  {
    id: 3,
    article: "Space Exploration Updates",
    comment:
      "Exciting discoveries ahead! Can't wait for the Mars mission details.",
    time: "2 hours ago",
    likes: 1,
    liked: false,
  },
];

export default function CommentsPage() {
  const [comments, setComments] = useState(commentsData);

<<<<<<< HEAD
  const [commentData, setCommentData] = useState([]);

  useEffect(() => {
    fetch("/api/comments")
      .then((res) => res.json())
      .then((data) => setCommentData(data));
  }, []);

  console.log("commentData is", commentData);

  const deleteComment = (id) => {
=======
  const deleteComment = (id : any) => {
>>>>>>> development
    setComments(comments.filter((c) => c.id !== id));
  };

  const toggleLike = (id : any) => {
    setComments(
      comments.map((c) =>
        c.id === id
          ? {
              ...c,
              likes: c.liked ? c.likes - 1 : c.likes + 1,
              liked: !c.liked,
            }
          : c,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 md:p-12 text-slate-900">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-200">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              My Comments
            </h1>
            <p className="text-slate-500 mt-2 font-medium">
              Manage your discussions and interactions
            </p>
          </div>
          <div className="hidden sm:block bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100">
            <span className="text-sm font-bold text-blue-600">
              {comments.length}
            </span>
            <span className="text-sm text-slate-500 ml-1 font-medium">
              Comments
            </span>
          </div>
        </div>

        {/* List */}
        <div className="grid gap-4">
          <AnimatePresence mode="popLayout">
            {comments.length > 0 ? (
              comments.map((c) => (
                <motion.div
                  key={c.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white border border-slate-100 p-6 rounded-[24px] shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group relative overflow-hidden"
                >
                  {/* Decorative element */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/50 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-110" />

                  <div className="relative">
                    {/* Article Title */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                        Article
                      </span>
                      <h4 className="text-sm font-bold text-slate-400 flex items-center gap-1 group-hover:text-slate-600 transition-colors">
                        {c.article} <ArrowRight className="w-3 h-3" />
                      </h4>
                    </div>

                    {/* Comment Content */}
                    <p className="text-slate-700 leading-relaxed font-medium mb-4 text-lg">
                      "{c.comment}"
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                      <div className="flex items-center gap-3 text-slate-400">
                        <Calendar className="w-4 h-4" />
                        <span className="text-xs font-semibold uppercase tracking-wider">
                          {c.time}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Like Button */}
                        <button
                          onClick={() => toggleLike(c.id)}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all active:scale-90 ${
                            c.liked
                              ? "bg-rose-50 text-rose-500 shadow-inner"
                              : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                          }`}
                        >
                          <Heart
                            className={`w-4 h-4 ${c.liked ? "fill-current" : ""}`}
                          />
                          <span className="text-xs font-bold">{c.likes}</span>
                        </button>

                        {/* Edit Button */}
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all active:scale-90">
                          <Edit2 className="w-4 h-4" />
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => deleteComment(c.id)}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-all active:scale-90"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-24 bg-white rounded-[32px] border border-dashed border-slate-200"
              >
                <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">
                  No comments found
                </h3>
                <p className="text-slate-400 mt-2">
                  Your discussion history is empty.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
