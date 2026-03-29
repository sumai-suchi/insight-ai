"use client";
import { useState, useEffect } from "react";
import { FaReply, FaUserCircle, FaPaperPlane } from "react-icons/fa";

export default function CommentSection({ articleId, initialCount }: { articleId: string, initialCount: number }) {
  const [comments, setComments] = useState<any[]>([]);
  const [text, setText] = useState(""); // Main comment
  const [replyText, setReplyText] = useState(""); // Reply text
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/comments?articleId=${articleId}`);
      const data = await res.json();
      if (data.success) setComments(data.data || []);
   
  console.log(comments);
    } catch (err) {
      console.error("Failed to fetch comments", err);
    }
  };

  useEffect(() => { 
    if (articleId) fetchComments(); 
  }, [articleId]);

  const submitComment = async (parentId: string | null = null) => {
    const contentToSend = parentId ? replyText : text;
    if (!contentToSend.trim() || loading) return;

    setLoading(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          articleId,
          content: contentToSend,
          parentId: parentId || null,
          user: { 
            name: "Reader", 
            email: "reader@insight.com",
            avatar: "" 
          }
        })
      });

      const data = await res.json();
      console.log(data)
      if (data.success) {
              // If AI approved it immediately, refresh list
  // if (comments?.status === "approved") {
  //   await fetchComments();
  // } else {
  //   // If AI flagged it, tell the user!
  //   alert("Your message is under review by our AI safety system and will appear shortly.");
  // }
        setText("");
        setReplyText("");
        setReplyingTo(null);
        await fetchComments();
      } else {
        alert(data.message || "Error posting comment");
      }
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      setLoading(false);
    }
  };
  
  const rootComments = comments.filter(c => !c.parentId);
  const getReplies = (id: string) => comments.filter(c => c.parentId === id);

  return (
    <div className="border-t-2 border-black pt-12">
      <div className="flex items-center justify-between mb-10">
        <h3 className="text-3xl font-black uppercase tracking-tighter">The Public Ledger</h3>
        <span className="bg-black text-white px-3 py-1 text-xs font-bold">{comments.length || initialCount} COMMENTS</span>
      </div>

      {/* Main Input */}
      <div className="mb-12 group">
        <textarea 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Join the debate..."
          className="w-full bg-transparent border-b-2 border-gray-300 focus:border-black transition-all outline-none py-4 text-lg font-medium resize-none"
        />
        <div className="flex justify-end mt-2">
          <button 
            disabled={loading}
            onClick={() => submitComment(null)}
            className="flex items-center gap-2 bg-black text-white px-8 py-3 uppercase font-black text-xs hover:bg-red-600 transition disabled:opacity-50"
          >
            {loading ? "Posting..." : "Post Message"} <FaPaperPlane />
          </button>
        </div>
      </div>

      {/* Comment List */}
      <div className="space-y-12">
        {rootComments.map(comment => (
          <div key={comment._id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-start gap-4">
              <FaUserCircle size={40} className="text-gray-300" />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-black uppercase text-sm tracking-widest">{comment.user.name}</span>
                  <span className="text-[10px] text-gray-400 font-bold">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">{comment.content}</p>
                
                <button 
                  onClick={() => {
                    setReplyingTo(replyingTo === comment._id ? null : comment._id);
                    setReplyText(""); 
                  }}
                  className="mt-3 flex items-center gap-1 text-[10px] font-black uppercase text-red-600 hover:text-black transition"
                >
                  <FaReply /> {replyingTo === comment._id ? "Cancel" : "Reply"}
                </button>

                {/* Nested Replies */}
                <div className="ml-8 mt-6 border-l-2 border-gray-200 pl-6 space-y-8">
                  {getReplies(comment._id).map(reply => (
                    <div key={reply._id}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-black uppercase text-xs">{reply.user.name}</span>
                      </div>
                      <p className="text-gray-600 text-base">{reply.content}</p>
                    </div>
                  ))}
                  
                  {replyingTo === comment._id && (
                    <div className="mt-4 flex gap-2">
                      <input 
                        autoFocus
                        value={replyText}
                        className="flex-1 bg-white border border-gray-300 p-2 text-sm outline-none focus:border-black"
                        placeholder="Write a reply..."
                        onChange={(e) => setReplyText(e.target.value)}
                      />
                      <button 
                        onClick={() => submitComment(comment._id)} 
                        className="bg-black text-white px-4 py-1 text-[10px] font-bold uppercase"
                      >
                        Send
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}