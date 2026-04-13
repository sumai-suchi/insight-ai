"use client";

import { useState } from "react";
import { Sparkles, Plus, FileText, ImagePlus } from "lucide-react";
import { useAuth } from "@/Context/AuthContext";
import { toast } from "react-toastify";

export default function Blog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const { session } = useAuth();

  // ✅ Generate Content
  const handleGenerateContent = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/generate-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: title || "Write a blog" }),
      });

      const data = await res.json();
      if (data.text) {
        setContent((prev) => prev + "\n\n" + data.text);
      }
    } catch {
      toast.error("Failed to generate content");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Upload Image
  const handleImageUpload = async (file: File) => {
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "insight_blog_92x7Kp");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dioemps3f/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (!data.secure_url) {
        throw new Error("Upload failed");
      }

      setImage(data.secure_url);
      toast.success("Image uploaded!");
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  // ✅ Save Blog
  const handleSaveBlog = async () => {
    if (!title || !content) {
      return toast.error("Title & content required");
    }

    if (!image) {
      return toast.error("Upload image first");
    }

    try {
      const res = await fetch("/api/user-article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          image,
          authorId: session?.user?.id,
        }),
      });

      if (res.ok) {
        alert("Blog saved as draft!");
        // setTitle("");
        // setContent("");
        // setImage("");
      } else {
        toast.error("Failed to save blog");
      }
    } catch (err) {
      toast.error("Error saving blog");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 px-6 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-3xl p-8 space-y-6">

        <h1 className="text-3xl font-bold flex items-center gap-2">
          <FileText className="text-purple-600" />
          Create Blog
        </h1>

        {/* Title */}
        <input
          type="text"
          placeholder="Blog Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500"
        />

        {/* Image Upload */}
        <div className="border-2 border-dashed p-6 rounded-xl text-center">
          {image ? (
            <img
              src={image}
              className="w-full h-48 object-cover rounded-lg mb-3"
            />
          ) : (
            <div className="text-gray-500">
              <ImagePlus className="mx-auto mb-2" />
              Upload Image
            </div>
          )}

          <input
            type="file"
            hidden
            id="fileUpload"
            onChange={(e) =>
              e.target.files && handleImageUpload(e.target.files[0])
            }
          />

          <label
            htmlFor="fileUpload"
            className="cursor-pointer bg-purple-600 text-white px-4 py-2 rounded mt-3 inline-block"
          >
            {uploading ? "Uploading..." : "Choose Image"}
          </label>
        </div>

        {/* Content */}
        <textarea
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your blog..."
          className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500"
        />

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleGenerateContent}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {loading ? "Generating..." : "Generate AI"}
          </button>

          <button
            onClick={handleSaveBlog}
            disabled={uploading}
            className="bg-purple-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Save Draft
          </button>
        </div>
      </div>
    </div>
  );
}