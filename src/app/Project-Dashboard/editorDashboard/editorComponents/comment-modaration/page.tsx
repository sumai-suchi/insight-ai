"use client";
import { useState, useEffect } from "react";

export default function ModerationDashboard() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState("pending");

  // Fetch comments whenever the tab changes
  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/comments/all?status=${currentTab}`);
      const json = await res.json();
      setComments(json.data || []);
   
    } catch (err) {
      console.error("Failed to load comments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [currentTab]);

  // Handle Approve/Remove actions
  const updateStatus = async (commentId: string, articleId: string, nextStatus: string) => {
    try {
      const res = await fetch("/api/comments/moderate", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentId, articleId, newStatus: nextStatus }),
      });

      if (res.ok) {
        // Remove from current list immediately for smooth UI
        setComments((prev) => prev.filter((c: any) => c._id !== commentId));
      }
    } catch (err) {
      alert("Failed to update status");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">AI Moderation Queue</h1>

        {/* Tab Navigation */}
        <div className="flex space-x-4 border-b mb-6">
          {["pending", "approved", "removed"].map((status) => (
            <button
              key={status}
              onClick={() => setCurrentTab(status)}
              className={`pb-3 px-4 capitalize transition-all ${
                currentTab === status 
                ? "border-b-2 border-blue-600 text-blue-600 font-semibold" 
                : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-center py-10 text-gray-500">Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="text-center py-10 text-gray-500">No comments found in this category.</p>
        ) : (
          <div className="space-y-4">
            {comments.map((comment: any) => (
              <div key={comment._id} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-gray-700">{comment.user.name}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold ${
                        comment.flag === 'toxic' ? 'bg-red-500 text-white' : 
                        comment.flag === 'spam' ? 'bg-yellow-500 text-white' : 'bg-blue-500 text-white'
                      }`}>
                        AI Flag: {comment.flag}
                      </span>
                    </div>
                    <p className="mt-2 text-gray-600 italic">"{comment.content}"</p>
                  </div>

                  <div className="flex flex-col space-y-2 ml-4">
                    {currentTab !== "approved" && (
                      <button 
                        onClick={() => updateStatus(comment._id, comment.articleId, "approved")}
                        className="px-4 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition"
                      >
                        Approve
                      </button>
                    )}
                    {currentTab !== "removed" && (
                      <button 
                        onClick={() => updateStatus(comment._id, comment.articleId, "removed")}
                        className="px-4 py-1.5 bg-red-100 text-red-600 text-sm rounded hover:bg-red-200 transition"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}