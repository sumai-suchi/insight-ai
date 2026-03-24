"use client";

import { useState } from "react";

export default function SEOToolsPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [keywords, setKeywords] = useState("");

  const generateMetaTags = () => {
    return `
<title>${title}</title>
<meta name="description" content="${description}" />
<meta name="keywords" content="${keywords}" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:image" content="${image}" />
<meta name="twitter:card" content="summary_large_image" />
    `.trim();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateMetaTags());
    alert("Meta tags copied to clipboard!");
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold text-center">SEO Tools</h1>

      {/* Form Inputs */}
      <div className="bg-white rounded-2xl shadow p-6 space-y-4">
        <h2 className="text-2xl font-semibold">Enter SEO Details</h2>

        <input
          type="text"
          placeholder="Page Title"
          className="w-full border rounded-lg px-3 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Meta Description"
          className="w-full border rounded-lg px-3 py-2"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="text"
          placeholder="Image URL (OG Image)"
          className="w-full border rounded-lg px-3 py-2"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <input
          type="text"
          placeholder="Keywords (comma separated)"
          className="w-full border rounded-lg px-3 py-2"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        />
      </div>

      {/* Google Preview */}
      <div className="bg-white rounded-2xl shadow p-6 space-y-4">
        <h2 className="text-2xl font-semibold">Preview</h2>
        <div className="border p-4 rounded-lg space-y-2 bg-gray-50">
          <p className="text-blue-600 font-medium text-lg">{title || "Page Title"}</p>
          <p className="text-gray-700">{description || "Meta description will appear here."}</p>
          {image && <img src={image} alt="Preview" className="w-full h-48 object-cover rounded-md mt-2" />}
        </div>
      </div>

      {/* Meta Tags Output */}
      <div className="bg-white rounded-2xl shadow p-6 space-y-4">
        <h2 className="text-2xl font-semibold">Generated Meta Tags</h2>
        <textarea
          readOnly
          className="w-full border rounded-lg px-3 py-2"
          rows={8}
          value={generateMetaTags()}
        />
        <button
          onClick={handleCopy}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Copy Meta Tags
        </button>
      </div>
    </div>
  );
}