"use client";

import { useState } from "react";
import { Sparkles, Plus, FileText } from "lucide-react";

export default function Blog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateContent = async () => {
    setLoading(true);
   setLoading(true);
  try {
    const response = await fetch("/api/generate-blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: title || "Write a blog" }),
    });

    const data = await response.json();
    if (data.text) {
      setContent((prev) => prev + "\n\n" + data.text);
    }
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
  }
  const handleSaveBlog = () => {
    console.log({ title, content });
    alert("Blog saved successfully!");
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-purple-50 via-white to-purple-50 pt-20 px-4 sm:px-8 lg:px-16">
      {/* Page Header */}
      <div className="max-w-6xl mx-auto mb-12 text-center lg:text-left">
        <h1 className="text-4xl font-extrabold text-gray-900 flex items-center justify-center lg:justify-start gap-3">
          <FileText className="text-purple-600" size={32} />
          Create New Blog
        </h1>
        <p className="text-gray-600 mt-3 text-lg">
          Write your blog manually or generate content using{" "}
          <span className="font-semibold text-purple-600">Gemini AI</span>.
        </p>
      </div>

      {/* Blog Form Card */}
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-3xl p-10 space-y-10">
        {/* Blog Title */}
        <div>
          <label className="block text-gray-700 font-semibold mb-3 text-lg">Blog Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your blog title..."
            className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition text-gray-800 font-medium text-lg"
          />
        </div>

        {/* Blog Content */}
        <div>
          <label className="block text-gray-700 font-semibold mb-3 text-lg">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={14}
            placeholder="Write your blog content here..."
            className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition resize-none text-gray-800 font-medium text-lg"
          ></textarea>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 mt-4 justify-center lg:justify-start">
          <button
            onClick={handleGenerateContent}
            disabled={loading}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-linear-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-2xl shadow-lg hover:scale-105 transition text-lg"
          >
            <Sparkles size={22} />
            {loading ? "Generating..." : "Generate with Gemini"}
          </button>

          <button
            onClick={handleSaveBlog}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:scale-105 transition text-lg"
          >
            <Plus size={22} />
            Save Blog
          </button>
        </div>
      </div>

      {/* Tips Section */}
      <div className="max-w-6xl mx-auto mt-12 bg-purple-50 p-6 rounded-2xl border-l-4 border-purple-500">
        <h3 className="text-purple-700 font-semibold mb-3 text-lg">Tips for a better blog:</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 text-base">
          <li>Use a descriptive and catchy title to attract readers.</li>
          <li>Break your content into smaller paragraphs for readability.</li>
          <li>Use headings and subheadings to organize your content.</li>
          <li>Let Gemini AI help you generate ideas or sections of your blog.</li>
          <li>Review and edit generated content for clarity and style.</li>
        </ul>
      </div>
    </div>
  );
}