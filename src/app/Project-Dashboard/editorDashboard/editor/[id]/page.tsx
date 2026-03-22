"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditDraftPage() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState<any>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    const fetchDraft = async () => {
      try {
        const res = await fetch(`/api/articles/draft/${id}`);
        const data = await res.json();
        if (data.success) {
          setForm(data.article);
          setPreview(data.article.image || null);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchDraft();
  }, [id]);

  if (!form) return <p>Loading draft...</p>;

  const handleChange = (field: string, value: any) => setForm({ ...form, [field]: value });

  const handleImage = (file: File) => {
    setForm({ ...form, image: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleSave = async (status: string) => {
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) formData.append(key, value as any);
    });
    formData.append("status", status);

    const res = await fetch(`/api/articles/draft/${id}`, {
      method: "PATCH",
      body: formData,
    });

    const data = await res.json();
    if (data.success) {
      alert("Draft updated!");
      router.push("/Project-dashboard/editorDashboard/editorComponents/pendingArticle"); // go back or wherever
    } else {
      alert("Failed to update draft");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Edit Draft: {form.title}</h1>

      <input
        type="text"
        value={form.title}
        onChange={(e) => handleChange("title", e.target.value)}
        placeholder="Title"
        className="w-full p-2 border rounded"
      />

      <textarea
        value={form.content}
        onChange={(e) => handleChange("content", e.target.value)}
        placeholder="Content"
        className="w-full p-2 border rounded h-64"
      />

      <input
        type="text"
        value={form.tags.join(", ")}
        onChange={(e) => handleChange("tags", e.target.value.split(","))}
        placeholder="Tags"
        className="w-full p-2 border rounded"
      />

      <button
        onClick={() => handleSave("draft")}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Save Draft
      </button>
      <button
        onClick={() => handleSave("review")}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 ml-2"
      >
        Submit Review
      </button>
    </div>
  );
}