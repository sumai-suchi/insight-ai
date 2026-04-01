"use client"

import React, { useEffect, useState, use, useRef } from 'react';
import { PenLine, Save, Globe, Settings, Image as ImageIcon, ChevronLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditArticlePage({ params }: PageProps) {
  // 1. Unwrap the params Promise using React.use()
   const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Refs for input fields
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const slugRef = useRef<HTMLInputElement>(null);
  const excerptRef = useRef<HTMLTextAreaElement>(null);

 useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/articles/drafts/${id}`);
        const data = await response.json();
        setArticle(data.data);
      } catch (error) {
        console.error("Failed to fetch article:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchArticle();
  }, [id]);

  // 2. Handle Loading State (Prevents "cannot read property of null" errors)
  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center gap-3 bg-white">
        <Loader2 className="animate-spin text-indigo-600" size={32} />
        <p className="text-slate-500 font-medium text-sm">Loading your masterpiece...</p>
      </div>
    );
  }

  // 3. Handle 404/Not Found
  if (!article) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white">
        <p className="text-slate-500">Article not found.</p>
      </div>
    );
  }
const handleSave = async () => {
  if (!article) return;

  const updatedArticle = {
    title: titleRef.current?.value,
    content: contentRef.current?.value,
    slug: slugRef.current?.value,
    excerpt: excerptRef.current?.value,
    status: (document.querySelector('select') as HTMLSelectElement)?.value, // from status dropdown
  };

  try {
    setSaving(true);
    const res = await fetch(`/api/articles/drafts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedArticle),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || 'Failed to save draft');

    setArticle(data.data); // update local state
    alert('Draft saved successfully!');
  } catch (error) {
    console.error(error);
    alert('Failed to save draft. Check console for details.');
  } finally {
    setSaving(false);
  }
};

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="flex items-center gap-4">
          <Link href="/Project-dashboard" className="p-2 hover:bg-slate-50 rounded-full transition-colors">
            <ChevronLeft size={20} className="text-slate-400" />
          </Link>
          <div className="h-4 w-[1px] bg-slate-200" />
          <h1 className="text-slate-900 font-semibold text-sm truncate max-w-[300px]">
            {article.title}
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-slate-600 hover:bg-slate-50 text-sm font-medium rounded-lg transition-all">
            Preview
          </button>
         <button
  onClick={handleSave}
  disabled={saving}
  className="flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-lg shadow-lg shadow-indigo-100 transition-all active:scale-95"
>
  {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
  {saving ? 'Saving...' : 'Save Changes'}
</button>
        </div>
      </header>

      <main className="flex max-w-[1400px] mx-auto">
        {/* Main Editor Area */}
        <section className="flex-1 px-12 lg:px-20 py-16">
          <div className="max-w-[850px] mx-auto">
            {/* Featured Image */}
            <div className="group relative w-full h-[450px] mb-12 bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 flex flex-col items-center justify-center cursor-pointer shadow-inner">
              {article.featuredImage ? (
                <img 
                  src={article.featuredImage} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  alt="Featured"
                />
              ) : (
                <ImageIcon size={40} className="text-slate-200" />
              )}
              <div className="relative z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur px-5 py-2.5 rounded-full shadow-xl flex items-center gap-2 text-slate-700 text-sm font-bold">
                <ImageIcon size={16} /> Update Cover Photo
              </div>
            </div>

            {/* Title Input */}
            <textarea
  ref={titleRef}
  defaultValue={article.title}
  placeholder="Article Title..."
  className="w-full text-6xl font-serif font-bold text-slate-900 placeholder:text-slate-100 border-none focus:ring-0 resize-none leading-[1.1] mb-8 tracking-tight"
  rows={2}
/>

            {/* Content Area */}
            <div className="prose prose-slate prose-lg max-w-none">
              <textarea
  ref={contentRef}
  defaultValue={article.content}
  placeholder="Once upon a time..."
  className="w-full min-h-[600px] text-xl font-serif text-slate-700 border-none focus:ring-0 resize-none leading-relaxed placeholder:text-slate-200"
/>
            </div>
          </div>
        </section>

        {/* Right Sidebar Settings */}
        <aside className="w-[380px] border-l border-slate-100 p-8 h-[calc(100vh-73px)] sticky top-[73px] overflow-y-auto bg-slate-50/30">
          <div className="space-y-10">
            <div>
              <h3 className="flex items-center gap-2 text-slate-400 font-bold text-[11px] uppercase tracking-[0.2em] mb-6">
                <Settings size={14} /> Publication
              </h3>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Status</label>
                  <select 
                    defaultValue={article.status}
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

           <div className="p-6 bg-white rounded-2xl shadow-md border border-slate-100">
  <h3 className="flex items-center gap-2 text-slate-500 font-semibold text-xs uppercase tracking-wider mb-4">
    <Globe size={16} /> SEO Optimization
  </h3>

  <div className="space-y-5">
    {/* URL Slug */}
    <div className="flex flex-col gap-2">
      <label className="text-xs font-medium text-slate-700">URL Slug</label>
      <input
        ref={slugRef}
        type="text"
        defaultValue={article.slug}
        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all placeholder:text-slate-300"
        placeholder="your-article-slug"
      />
    </div>

    {/* Search Excerpt */}
    <div className="flex flex-col gap-2">
      <label className="text-xs font-medium text-slate-700">Search Excerpt</label>
      <textarea
        ref={excerptRef}
        defaultValue={article.excerpt}
        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all placeholder:text-slate-300 min-h-[80px]"
        placeholder="How this appears in Google search..."
      />
    </div>
  </div>
</div>
          </div>
        </aside>
      </main>
    </div>
  );
}