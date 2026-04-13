"use client";

import React, { useState } from "react";
import { Copy, Target, Globe, Image as ImageIcon, CheckCircle2, LucideIcon } from "lucide-react";

// 1. Define the Interface for the Wrapper props
interface InputWrapperProps {
  icon: LucideIcon; // Specifically types it as a Lucide icon
  children: React.ReactNode;
}

export default function SEOToolsPage() {
  const [title, setTitle] = useState("My Awesome Web Page");
  const [description, setDescription] = useState("A comprehensive guide to building amazing modern web applications. Check out our latest tools.");
  const [image, setImage] = useState("https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600");
  const [keywords, setKeywords] = useState("web, nextjs, react, tools, development");
  const [copied, setCopied] = useState(false);

  const generateMetaTags = (): string => {
    return `
<title>${title || "Your Page Title"}</title>
<meta name="description" content="${description || "Your meta description here."}" />
<meta name="keywords" content="${keywords}" />
<meta property="og:title" content="${title || "Your Page Title"}" />
<meta property="og:description" content="${description || "Your meta description here."}" />
<meta property="og:image" content="${image || "URL to your image"}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="robots" content="index, follow" />
    `.trim();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateMetaTags());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 2. Apply the interface to the sub-component
  const InputWrapper = ({ icon: Icon, children }: InputWrapperProps) => (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#4988C4]">
        <Icon className="w-5 h-5" />
      </div>
      {children}
    </div>
  );

  const styles = {
    input: "w-full border border-gray-200 rounded-xl pl-12 pr-4 py-3 bg-white focus:border-[#4988C4] focus:ring-2 focus:ring-[#BDE8F5] transition duration-150 outline-none text-[#0F2854]",
    label: "text-sm font-medium text-[#1C4D8D] mb-1.5 block",
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-10 text-[#0F2854]">
      <header className="flex items-center justify-between pb-8 mb-8 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Target className="w-10 h-10 text-[#1C4D8D] bg-[#BDE8F5] p-2 rounded-xl" />
          <h1 className="text-4xl font-extrabold text-[#0F2854]">
            SEO<span className="text-[#4988C4]">Studio</span>
          </h1>
        </div>
        <p className="text-[#4988C4] hidden md:block">Generate optimized meta tags in seconds</p>
      </header>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-10">
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-[#0F2854] mb-8">Metadata Editor</h2>

            <div className="space-y-6">
              <div>
                <label className={styles.label}>Page Title</label>
                <InputWrapper icon={Globe}>
                  <input
                    type="text"
                    placeholder="e.g., Best Web Tools 2024"
                    className={styles.input}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </InputWrapper>
              </div>

              <div>
                <label className={styles.label}>Meta Description</label>
                <div className="relative">
                  <div className="absolute top-4 left-4 pointer-events-none text-[#4988C4]">
                    <Target className="w-5 h-5" />
                  </div>
                  <textarea
                    placeholder="e.g., A brief summary of your page..."
                    className={`${styles.input} pl-12 h-32 resize-none`}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className={styles.label}>Image URL (Open Graph)</label>
                <InputWrapper icon={ImageIcon}>
                  <input
                    type="text"
                    placeholder="https://example.com/image.jpg"
                    className={styles.input}
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </InputWrapper>
              </div>

              <div>
                <label className={styles.label}>Keywords</label>
                <InputWrapper icon={Target}>
                  <input
                    type="text"
                    placeholder="e.g., tools, web, optimization"
                    className={styles.input}
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                  />
                </InputWrapper>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-10">
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-[#0F2854] mb-8">Live Previews</h2>
            <div className="grid md:grid-cols-1 gap-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-[#4988C4]">Google Search Result</p>
                <div className="border border-gray-100 p-6 rounded-2xl bg-[#F8FAFC]">
                  <p className="text-sm text-gray-500 mb-1">www.yoursite.com</p>
                  <p className="text-xl text-[#1C4D8D] font-medium hover:underline cursor-pointer mb-1 line-clamp-1">{title || "Your Page Title"}</p>
                  <p className="text-sm text-gray-700 line-clamp-2">{description || "Your meta description will appear here."}</p>
                </div>
              </div>

              {image && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-[#4988C4]">Social Media (Open Graph)</p>
                  <div className="border border-gray-100 rounded-2xl overflow-hidden bg-[#F8FAFC]">
                    <img src={image} alt="Preview" className="w-full h-48 object-cover" />
                    <div className="p-5">
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">yoursite.com</p>
                      <p className="text-lg font-semibold text-[#0F2854] line-clamp-1">{title || "Your Page Title"}</p>
                      <p className="text-sm text-gray-600 line-clamp-2 mt-1">{description || "Description preview..."}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-[#0F2854] rounded-3xl shadow-xl p-8 text-[#BDE8F5]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Generated Meta Tags</h2>
              <button
                onClick={handleCopy}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-semibold transition duration-150 ${copied ? 'bg-emerald-500 text-white' : 'bg-[#1C4D8D] hover:bg-[#4988C4] text-white'}`}
              >
                {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy Code"}
              </button>
            </div>
            <textarea
              readOnly
              className="w-full border border-[#1C4D8D] rounded-2xl px-5 py-4 h-64 font-mono text-sm bg-[#0a1e3f] text-[#BDE8F5] focus:outline-none focus:ring-1 focus:ring-[#4988C4] resize-none"
              value={generateMetaTags()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}