"use client";

import { useState } from "react";
import {
  FileText,
  Mail,
  Share2,
  ShoppingBag,
  Clock,
  Zap,
  Copy,
  Download,
  Save,
  RotateCcw,
  CheckCircle,
  TrendingUp,
  History,
  Sparkles,
  ChevronRight,
  BarChart2,
  AlignLeft,
  AlertCircle,
} from "lucide-react";

type Tone = "Professional" | "Casual" | "Friendly" | "Formal" | "Enthusiastic";

const TONES: Tone[] = [
  "Professional",
  "Casual",
  "Friendly",
  "Formal",
  "Enthusiastic",
];

const templates = [
  { icon: FileText, label: "Blog Post" },
  { icon: Mail, label: "Email" },
  { icon: Share2, label: "Social Media" },
  { icon: ShoppingBag, label: "Product Description" },
];

const recentDrafts = [
  { title: "AI in Marketing 2026", time: "2 hours ago", words: 850 },
  { title: "SEO Best Practices", time: "1 day ago", words: 1200 },
  { title: "Content Strategy Guide", time: "2 days ago", words: 950 },
];

const aiSuggestions = [
  "Add more subheadings for better structure",
  "Include relevant keywords in first paragraph",
  "Consider adding a call-to-action",
];

const revisionHistory = [
  { time: "10:45 AM", label: "Initial generation" },
  { time: "10:47 AM", label: "Added SEO keywords" },
  { time: "10:50 AM", label: "Tone adjusted to professional" },
];

const recommendedKeywords = [
  "AI writing",
  "content tools",
  "automation",
  "SEO",
];

const quickActions = [
  "Expand Content",
  "Shorten Content",
  "Improve Grammar",
  "Change Tone",
];

const seoMetrics = [
  { label: "Keyword Density", value: "2.3%", color: "text-emerald-600" },
  { label: "Heading Structure", value: "Good ✓", color: "text-emerald-600" },
  { label: "Content Length", value: "Add 200 words", color: "text-amber-500" },
];

export default function AIEditorPage() {
  const [prompt, setPrompt] = useState("");
  const [selectedTone, setSelectedTone] = useState<Tone>("Professional");
  const [generatedContent, setGeneratedContent] = useState("");
  const [primaryKeyword, setPrimaryKeyword] = useState("AI content creation");
  const [metaDescription, setMetaDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [savedDraft, setSavedDraft] = useState(false);
  const [error, setError] = useState("");

  const wordCount = generatedContent.trim()
    ? generatedContent.trim().split(/\s+/).length
    : 0;
  const charCount = generatedContent.length;

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setError("");

    const toneInstructions: Record<string, string> = {
      Professional:
        "Write in a professional, authoritative tone using formal language and clear structure.",
      Casual:
        "Write in a casual, conversational tone like you're talking to a friend.",
      Friendly:
        "Write in a warm, friendly and encouraging tone. Be personable and supportive.",
      Formal:
        "Write in a strictly formal, academic tone with precise language and logical flow.",
      Enthusiastic:
        "Write in an energetic, enthusiastic and motivating tone with excitement!",
    };

    const fullPrompt = `${toneInstructions[selectedTone]}\n\nWrite content about: ${prompt}\n\nUse plain text only, no markdown symbols like **, ##, or *.`;

    try {
      const response = await fetch("/api/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: fullPrompt }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Failed to generate content.");
        return;
      }

      setGeneratedContent(data.content);
      setSavedDraft(false);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };
  const handleRewrite = async () => {
    if (!generatedContent.trim() && !prompt.trim()) return;
    setIsGenerating(true);
    setError("");

    const rewritePrompt = generatedContent
      ? `Rewrite the following content in a ${selectedTone} tone, keeping the same topic but with fresh wording:\n\n${generatedContent}`
      : prompt;

    try {
      const response = await fetch("/api/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: rewritePrompt }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Failed to rewrite content.");
        return;
      }

      setGeneratedContent(data.content);
      setSavedDraft(false);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!generatedContent) return;
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveDraft = () => {
    setSavedDraft(true);
    setTimeout(() => setSavedDraft(false), 2500);
  };

  // LEFT SIDEBAR CONTENT 
  const LeftSidebarContent = () => (
    <div className="flex flex-col gap-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center gap-2 mb-3">
          <FileText size={14} className="text-violet-500" />
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
            Templates
          </span>
        </div>
        <ul className="space-y-0.5">
          {templates.map(({ icon: Icon, label }) => (
            <li key={label}>
              <button className="w-full flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm text-gray-600 hover:bg-violet-50 hover:text-violet-700 transition-all group text-left">
                <Icon
                  size={14}
                  className="text-gray-400 group-hover:text-violet-500 transition-colors shrink-0"
                />
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Clock size={14} className="text-violet-500" />
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
            Recent Drafts
          </span>
        </div>
        <ul className="space-y-1.5">
          {recentDrafts.map((d) => (
            <li
              key={d.title}
              className="group cursor-pointer px-2 py-2 rounded-lg hover:bg-gray-50 transition"
            >
              <p className="text-xs font-medium text-gray-800 group-hover:text-violet-700 transition truncate">
                {d.title}
              </p>
              <div className="flex justify-between mt-0.5">
                <span className="text-[10px] text-gray-400">{d.time}</span>
                <span className="text-[10px] text-gray-400">
                  {d.words} words
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Zap size={14} className="text-amber-500" />
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
            AI Suggestions
          </span>
        </div>
        <ul className="space-y-2">
          {aiSuggestions.map((s) => (
            <li key={s} className="flex items-start gap-2">
              <CheckCircle
                size={12}
                className="text-emerald-500 mt-0.5 shrink-0"
              />
              <span className="text-xs text-gray-600 leading-relaxed">{s}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center gap-2 mb-3">
          <BarChart2 size={14} className="text-violet-500" />
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
            Statistics
          </span>
        </div>
        <dl className="space-y-2.5">
          {[
            { label: "Words", value: wordCount || 0, color: "text-gray-800" },
            { label: "Characters", value: charCount, color: "text-gray-800" },
            { label: "Readability", value: "Good", color: "text-emerald-600" },
            { label: "SEO Score", value: "82/100", color: "text-amber-500" },
          ].map(({ label, value, color }) => (
            <div key={label} className="flex items-center justify-between">
              <dt className="text-sm text-gray-500">{label}</dt>
              <dd className={`text-sm font-semibold ${color}`}>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );

  // RIGHT SIDEBAR CONTENT 
  const RightSidebarContent = () => (
    <div className="flex flex-col gap-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
            <TrendingUp size={11} className="text-emerald-600" />
          </div>
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
            SEO Optimization
          </span>
        </div>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Primary Keyword
            </label>
            <input
              value={primaryKeyword}
              onChange={(e) => setPrimaryKeyword(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Meta Description
            </label>
            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="Enter meta description..."
              rows={3}
              className="w-full px-2.5 py-1.5 text-xs text-gray-700 bg-gray-50 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent placeholder:text-gray-400 transition"
            />
          </div>
          <div className="bg-violet-50 border border-violet-100 rounded-xl p-2.5">
            <p className="text-[10px] font-bold text-violet-700 mb-2 uppercase tracking-wide">
              Recommended Keywords
            </p>
            <div className="flex flex-wrap gap-1.5">
              {recommendedKeywords.map((kw) => (
                <span
                  key={kw}
                  className="px-2 py-0.5 text-[10px] font-medium rounded-full border bg-white text-violet-700 border-violet-200 hover:bg-violet-100 transition-all cursor-default"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
          <dl className="space-y-2 pt-1">
            {seoMetrics.map(({ label, value, color }) => (
              <div key={label} className="flex justify-between items-center">
                <dt className="text-xs text-gray-500">{label}</dt>
                <dd className={`text-xs font-semibold ${color}`}>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center gap-2 mb-3">
          <History size={14} className="text-violet-500" />
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
            Revision History
          </span>
        </div>
        <ul className="space-y-3">
          {revisionHistory.map((r, i) => (
            <li key={i} className="flex items-start gap-2 group cursor-pointer">
              <div className="flex flex-col items-center mt-0.5 shrink-0">
                <div className="w-2 h-2 rounded-full bg-violet-400 group-hover:bg-violet-600 transition-colors" />
                {i < revisionHistory.length - 1 && (
                  <div className="w-px h-5 bg-gray-200 mt-1" />
                )}
              </div>
              <div>
                <p className="text-[10px] text-gray-400">{r.time}</p>
                <p className="text-xs text-gray-700 group-hover:text-violet-700 transition-colors">
                  {r.label}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Zap size={14} className="text-violet-500" />
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
            Quick Actions
          </span>
        </div>
        <ul className="space-y-1.5">
          {quickActions.map((action) => (
            <li key={action}>
              <button className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 hover:bg-violet-50 border border-gray-200 hover:border-violet-200 rounded-lg text-xs text-gray-700 hover:text-violet-700 transition-all group active:scale-[0.98]">
                {action}
                <ChevronRight
                  size={12}
                  className="text-gray-400 group-hover:text-violet-500 transition-colors"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F2F4F8] py-6 md:py-10 lg:py-20 px-3 md:px-4">
      <div className="max-w-7xl mx-auto flex gap-5 items-start">
        {/* LEFT SIDEBAR */}
        <aside className="hidden lg:flex w-62.5 shrink-0 flex-col gap-4">
          <LeftSidebarContent />
        </aside>

        {/* CENTER*/}
        <main className="flex-1 flex flex-col gap-4 min-w-0">
          {/* Generator Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
            <div className="flex items-center gap-2.5 mb-4 md:mb-5">
              <div className="w-8 h-8 rounded-xl bg-violet-100 flex items-center justify-center">
                <Sparkles size={16} className="text-violet-600" />
              </div>
              <h1 className="text-base md:text-lg font-semibold text-gray-900">
                AI Content Generator
              </h1>
            </div>

            <label className="block text-sm font-medium text-gray-600 mb-2">
              What do you want to write about?
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="E.g., Write a blog post about the benefits of AI in content marketing..."
              rows={3}
              className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent placeholder:text-gray-400 transition leading-relaxed"
            />

            <div className="mt-4 md:mt-5">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Tone & Style
              </label>
              <div className="flex flex-wrap gap-2">
                {TONES.map((tone) => (
                  <button
                    key={tone}
                    onClick={() => setSelectedTone(tone)}
                    className={`px-3 md:px-4 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all border ${
                      selectedTone === tone
                        ? "bg-violet-600 text-white border-violet-600 shadow-sm shadow-violet-200"
                        : "bg-white text-gray-600 border-gray-200 hover:border-violet-300 hover:text-violet-600"
                    }`}
                  >
                    {tone}
                  </button>
                ))}
              </div>
            </div>
            {error && (
              <div className="mt-3 flex items-start gap-2 px-3 py-2.5 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle
                  size={14}
                  className="text-red-500 mt-0.5 shrink-0"
                />
                <p className="text-xs text-red-600">{error}</p>
              </div>
            )}

            <div className="flex gap-3 mt-4 md:mt-5">
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 md:py-3 bg-violet-600 hover:bg-violet-700 disabled:bg-violet-300 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-all shadow-sm shadow-violet-200 active:scale-[0.98]"
              >
                {isGenerating ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles size={15} />
                    Generate Content
                  </>
                )}
              </button>
              <button
                onClick={handleRewrite}
                disabled={isGenerating}
                className="flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 border border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50 text-sm font-medium rounded-xl transition-all active:scale-[0.98]"
              >
                <RotateCcw size={15} />
                <span className="hidden sm:inline">Rewrite</span>
              </button>
            </div>
          </div>

          {/* Generated Content Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <div className="flex items-center gap-2">
                <AlignLeft size={16} className="text-gray-500" />
                <h2 className="text-sm md:text-base font-semibold text-gray-900">
                  Generated Content
                </h2>
                {generatedContent && (
                  <span className="ml-1 px-2 py-0.5 bg-emerald-50 text-emerald-600 text-xs font-semibold rounded-full border border-emerald-200">
                    Ready
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5 md:gap-2">
                <button
                  onClick={handleCopy}
                  title="Copy"
                  className={`p-1.5 rounded-lg transition-all ${
                    copied
                      ? "bg-emerald-100 text-emerald-600"
                      : "text-gray-400 hover:text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {copied ? <CheckCircle size={15} /> : <Copy size={15} />}
                </button>
                <button
                  title="Download"
                  onClick={() => {
                    const blob = new Blob([generatedContent], {
                      type: "text/plain",
                    });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "content-draft.txt";
                    a.click();
                  }}
                  className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition"
                >
                  <Download size={15} />
                </button>
                <button
                  onClick={handleSaveDraft}
                  className={`flex items-center gap-1.5 px-3 md:px-4 py-1.5 text-xs md:text-sm font-semibold rounded-lg transition-all shadow-sm active:scale-[0.97] ${
                    savedDraft
                      ? "bg-emerald-600 text-white shadow-emerald-200"
                      : "bg-violet-600 hover:bg-violet-700 text-white shadow-violet-200"
                  }`}
                >
                  {savedDraft ? <CheckCircle size={13} /> : <Save size={13} />}
                  {savedDraft ? "Saved!" : "Save Draft"}
                </button>
              </div>
            </div>

            <textarea
              value={generatedContent}
              onChange={(e) => setGeneratedContent(e.target.value)}
              placeholder="Your generated content will appear here. You can edit it directly..."
              className="w-full min-h-60 md:min-h-80 px-3 md:px-4 py-3 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent placeholder:text-gray-400 transition leading-relaxed"
            />

            {wordCount > 0 && (
              <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-400">{wordCount} words</span>
                <span className="text-xs text-gray-400">
                  {charCount} characters
                </span>
                <span className="text-xs text-emerald-500 ml-auto">
                  ● Auto-saved
                </span>
              </div>
            )}
          </div>

          {/* TABLET */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
            <div>
              <LeftSidebarContent />
            </div>
            <div>
              <RightSidebarContent />
            </div>
          </div>
        </main>

        {/*  RIGHT SIDEBAR desktop */}
        <aside className="hidden lg:flex w-62.5 shrink-0 flex-col gap-4">
          <RightSidebarContent />
        </aside>
      </div>
    </div>
  );
}
