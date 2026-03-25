"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { UploadCloud } from "lucide-react";

const initialForm = {
  title: "",
  content: "",
  category: "",
  tags: "",
  metaTitle: "",
  metaDescription: "",
  image: null as File | null,
};

export default function ArticleEditor() {
  const [form, setForm] = useState(initialForm);
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (field: string, value: any) => {
    setForm({ ...form, [field]: value });
  };

  // 📸 Handle image
  const handleImage = (file: File) => {
    setForm({ ...form, image: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (status: string) => {
    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (value) formData.append(key, value as any);
    });

    formData.append("status", status);

    const res = await fetch("/api/articles", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log(data)

    if (data.success) {
    //   setForm(initialForm);
    //   setPreview(null);
      alert("Saved!");
    }
  };

  return (
    <div className="p-6 lg:p-10 min-h-screen bg-linear-to-br from-gray-50 to-gray-100 grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* LEFT - EDITOR */}
      <div className="lg:col-span-2">
        <Card className="rounded-3xl shadow-xl border-0 bg-white/80 backdrop-blur">
          <CardContent className="p-8 space-y-6">

            <h2 className="text-3xl font-bold tracking-tight">
              ✍️ Write Your Story
            </h2>

            {/* IMAGE UPLOAD */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Cover Image</label>

              <div className="border-2 border-dashed rounded-xl p-6 text-center hover:bg-gray-50 transition cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  id="imageUpload"
                  onChange={(e) =>
                    e.target.files && handleImage(e.target.files[0])
                  }
                />

                <label htmlFor="imageUpload" className="cursor-pointer">
                  <UploadCloud className="mx-auto mb-2 text-gray-500" />
                  <p className="text-sm text-gray-600">
                    Click to upload or drag image
                  </p>
                </label>
              </div>

              {preview && (
                <img
                  src={preview}
                  alt="preview"
                  className="rounded-xl w-full h-60 object-cover shadow"
                />
              )}
            </div>

            {/* TITLE */}
            <Input
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Article Title..."
              className="text-lg h-12"
            />

            {/* CONTENT */}
            <Textarea
              value={form.content}
              onChange={(e) => handleChange("content", e.target.value)}
              placeholder="Start writing your masterpiece..."
              className="h-100 text-base leading-relaxed"
            />

            {/* BUTTONS */}
            <div className="flex gap-3 pt-4">
              <Button onClick={() => handleSubmit("draft")}>
                Save Draft
              </Button>
              <Button
                variant="secondary"
                onClick={() => handleSubmit("review")}
              >
                Submit Review
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* RIGHT SIDE */}
      <div className="space-y-6">

        {/* CATEGORY */}
        <Card className="rounded-3xl shadow-md bg-white/80 backdrop-blur">
          <CardContent className="p-5 space-y-4">
            <h3 className="font-semibold">Category</h3>

            <Select
              value={form.category}
              onValueChange={(v) => handleChange("category", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tech">Tech</SelectItem>
                <SelectItem value="health">Health</SelectItem>
                <SelectItem value="ai">AI</SelectItem>
                <SelectItem value="crime">Crime</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* TAGS */}
        <Card className="rounded-3xl shadow-md bg-white/80 backdrop-blur">
          <CardContent className="p-5 space-y-4">
            <h3 className="font-semibold">Tags</h3>
            <Input
              value={form.tags}
              onChange={(e) => handleChange("tags", e.target.value)}
              placeholder="AI, Tech, Future..."
            />
          </CardContent>
        </Card>

        {/* SEO */}
        <Card className="rounded-3xl shadow-md bg-white/80 backdrop-blur">
          <CardContent className="p-5 space-y-4">
            <h3 className="font-semibold">SEO</h3>

            <Input
              value={form.metaTitle}
              onChange={(e) =>
                handleChange("metaTitle", e.target.value)
              }
              placeholder="Meta Title"
            />

            <Textarea
              value={form.metaDescription}
              onChange={(e) =>
                handleChange("metaDescription", e.target.value)
              }
              placeholder="Meta Description"
            />
          </CardContent>
        </Card>

        {/* PUBLISH */}
        <Card className="rounded-3xl shadow-md bg-white/80 backdrop-blur">
          <CardContent className="p-5 space-y-4">
            <h3 className="font-semibold">Publish</h3>

            <Button
              className="w-full text-base"
              onClick={() => handleSubmit("published")}
            >
              🚀 Publish Now
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}