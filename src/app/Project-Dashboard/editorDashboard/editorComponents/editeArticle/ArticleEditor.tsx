// ─────────────────────────────────────────────────────────────────
// FILE: components/EnterpriseArticleEditor.tsx
//
// This is your original component with all API calls wired in.
// Every section that changed is marked with ← CHANGED
// ─────────────────────────────────────────────────────────────────

"use client";

import { useState, useCallback } from "react";                     // ← CHANGED: added useCallback
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectTrigger, SelectContent, SelectItem, SelectValue,
} from "@/components/ui/select";
import {
  UploadCloud, Bold, Italic, List, Quote, Sparkles, Save, Send,
  ShieldCheck, Fingerprint, BrainCircuit, Loader2, ImageIcon, X,
  CheckCircle2, AlertCircle, RefreshCw,
} from "lucide-react";
import ResponsiveEditorNav from "./EditorNav";

// ← CHANGED: import all API hooks from the hooks file


import { useAiAudit } from "@/app/Project-dashboard/hooks/useAiAudite";
import { useSeoScore } from "@/app/Project-dashboard/hooks/useSeoScore";
import { useSaveArticle } from "@/app/Project-dashboard/hooks/useSaveArticle";

import { useuploadToCloudinary } from "@/app/Project-dashboard/hooks/useuploadToCloudinary";


import { type AuditIssue,
  type SeoCheck,
  type ArticleStatus} from "@/types/editor";

// ─── Inline sub-components (unchanged from your original) ─────────────────────

const CustomBadge = ({
  children,
  variant = "default",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "default" | "outline" | "success" | "warning" | "error";
  className?: string;
}) => {
  const variants = {
    default: "bg-slate-100 text-slate-600 border-slate-200",
    outline: "bg-transparent text-slate-500 border-slate-200",
    success: "bg-emerald-50 text-emerald-700 border-emerald-100",
    warning: "bg-amber-50 text-amber-700 border-amber-100",
    error:   "bg-rose-50 text-rose-700 border-rose-100",
  };
  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

const CustomProgress = ({
  value,
  colorClass = "bg-indigo-600",
  className = "",
}: {
  value: number;
  colorClass?: string;
  className?: string;
}) => (
  <div className={`w-full bg-slate-100 h-1.5 rounded-full overflow-hidden ${className}`}>
    <div
      className={`h-full transition-all duration-500 ${colorClass}`}
      style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
    />
  </div>
);

function ToolbarIcon({
  icon,
  onClick,
  title,
}: {
  icon: React.ReactNode;
  onClick?: () => void;
  title?: string;
}) {
  return (
    <button
      title={title}
      onClick={onClick}
      className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-600"
    >
      {icon}
    </button>
  );
}

function ScoreMini({
  label,
  score,
  color,
}: {
  label: string;
  score: number;
  color: string;
}) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px] font-bold uppercase text-slate-400">
        <span>{label}</span>
        <span className={color}>{score}%</span>
      </div>
      <div className="w-full bg-slate-100 h-1 rounded-full">
        <div
          className={`h-full rounded-full bg-current ${color}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

// ← CHANGED: issue card using real API data shape
const ISSUE_STYLES: Record<
  AuditIssue["type"],
  { wrap: string; badgeBg: string; label: string; sev: string; textColor: string }
> = {
  hallucination: {
    wrap: "bg-rose-50 border-rose-100",
    badgeBg: "bg-rose-500 text-white",
    label: "Hallucination",
    sev: "text-rose-400",
    textColor: "text-rose-900",
  },
  factual_error: {
    wrap: "bg-amber-50 border-amber-100",
    badgeBg: "bg-amber-500 text-white",
    label: "Factual Error",
    sev: "text-amber-400",
    textColor: "text-amber-900",
  },
  tone_issue: {
    wrap: "bg-blue-50 border-blue-100",
    badgeBg: "bg-blue-500 text-white",
    label: "Tone Issue",
    sev: "text-blue-400",
    textColor: "text-blue-900",
  },
  grammar_issue: {
    wrap: "bg-purple-50 border-purple-100",
    badgeBg: "bg-purple-500 text-white",
    label: "Grammar",
    sev: "text-purple-400",
    textColor: "text-purple-900",
  },
};

function IssueCard({ issue }: { issue: AuditIssue }) {
  const s = ISSUE_STYLES[issue.type];
  return (
    <div className={`p-3 border rounded-xl space-y-2 ${s.wrap}`}>
      <div className="flex items-center justify-between">
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${s.badgeBg}`}>
          {s.label}
        </span>
        <span className={`text-[10px] font-bold capitalize ${s.sev}`}>
          {issue.severity} severity
        </span>
      </div>
      <p className={`text-xs font-medium ${s.textColor}`}>{issue.description}</p>
      {issue.quote && (
        <div className={`text-[10px] italic bg-white/50 p-2 rounded-lg ${s.textColor}`}>
          "{issue.quote}"
        </div>
      )}
    </div>
  );
}

// ← CHANGED: helper to pick progress colour based on score
function scoreProgressColor(score: number) {
  if (score >= 80) return "bg-emerald-500";
  if (score >= 60) return "bg-amber-500";
  return "bg-rose-500";
}
function scoreTextColor(score: number) {
  if (score >= 80) return "text-emerald-500";
  if (score >= 60) return "text-amber-500";
  return "text-rose-500";
}

// ─── Toast ────────────────────────────────────────────────────────────────────

type ToastType = "success" | "error" | "info";

function Toast({
  message,
  type,
  onClose,
}: {
  message: string;
  type: ToastType;
  onClose: () => void;
}) {
  const bg: Record<ToastType, string> = {
    success: "bg-emerald-600",
    error:   "bg-rose-600",
    info:    "bg-indigo-600",
  };
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl text-sm font-semibold text-white ${bg[type]}`}
    >
      {type === "success" ? <CheckCircle2 size={15} /> : <AlertCircle size={15} />}
      {message}
      <button onClick={onClose}>
        <X size={13} className="opacity-70 hover:opacity-100" />
      </button>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function EnterpriseArticleEditor() {

  // ── Form state ────────────────────────────────────────────────────────────
  // ← CHANGED: unified, controlled form state (was split / partially uncontrolled)
  const [form, setForm] = useState({
    title:           "Understanding Neumorphism in 2026 Web Design",
    content:         "The soft-UI trend is making a sophisticated comeback...",
    contentType:     "ai_generated" as "ai_generated" | "manual",
    metaTitle:       "Neumorphism in 2026",
    metaDescription: "Is Neumorphism back? Let's look at the data.",
    focusKeyword:    "neumorphism",
    tags:            "",
    category:        "design",
    imageUrl:        "",
  });

  const patch = (update: Partial<typeof form>) =>
    setForm((prev) => ({ ...prev, ...update }));

  // ── Image upload state ────────────────────────────────────────────────────
  const [isUploading, setIsUploading] = useState(false);       // ← CHANGED: now uses uploadToCloudinary

  // ── AI content generation state ─────────────────────────────────────────
  const [isGeneratingContent, setIsGeneratingContent] = useState(false);
  const [activeSaveAction, setActiveSaveAction] = useState<ArticleStatus | null>(null);

  // ── Toast ─────────────────────────────────────────────────────────────────
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  const showToast = useCallback((message: string, type: ToastType = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  }, []);

  // ── API hooks ─────────────────────────────────────────────────────────────
  // ← CHANGED: all three hooks replace the manual fetch logic
  const audit   = useAiAudit();
  const seo     = useSeoScore({                                 // auto-recalcs on change
    title:           form.title,
    content:         form.content,
    metaTitle:       form.metaTitle,
    metaDescription: form.metaDescription,
    focusKeyword:    form.focusKeyword,
    tags:            form.tags,
  });
  const article = useSaveArticle();

  // ── Image upload handler ──────────────────────────────────────────────────
  // ← CHANGED: uses uploadToCloudinary() helper
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const url = await useuploadToCloudinary(file);
      patch({ imageUrl: url });
      showToast("Image uploaded successfully!", "success");
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : "Upload failed.", "error");
    } finally {
      setIsUploading(false);
    }
  };

  // ── Run audit ─────────────────────────────────────────────────────────────
  // ← CHANGED: calls audit.run() from the hook
  const handleRunAudit = async () => {
    if (!form.title.trim() || !form.content.trim()) {
      showToast("Add a title and content before running the audit.", "info");
      return;
    }
    await audit.run(form.title, form.content);
    if (audit.error) showToast(audit.error, "error");
    else showToast("AI audit complete!", "success");
  };

  // ── Content generation (AI Generated mode) ───────────────────────────────
  const handleGenerateAiContent = async () => {
    if (!form.title.trim()) {
      showToast("Add a title first to generate AI content.", "info");
      return;
    }

    setIsGeneratingContent(true);
    try {
      const prompt = `Write an article titled "${form.title}".

Category: ${form.category || "general"}
Focus keyword: ${form.focusKeyword || "content"}

Meta title: ${form.metaTitle || form.title}
Meta description: ${form.metaDescription || ""}

Create a clear structure with short sections/headings and plain text output (no markdown symbols like **, ##, or *).`;

      const res = await fetch("/api/generate-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "AI generation failed.");

      const generated = (data.text ?? data.content ?? "").toString();
      if (!generated.trim()) throw new Error("AI returned empty content.");

      patch({ contentType: "ai_generated", content: generated });
      showToast("AI content generated.", "success");
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : "AI generation failed.", "error");
    } finally {
      setIsGeneratingContent(false);
    }
  };

  // ── Save / publish ────────────────────────────────────────────────────────
  // ← CHANGED: calls article.save() from the hook
  const handleSave = async (status: ArticleStatus) => {
    setActiveSaveAction(status);
    try {
      const ok = await article.save(
        { ...form, seoScore: seo.data?.score ?? 0 },
        status
      );
      if (ok) {
        const message =
          status === "published"
            ? "Article published! 🎉"
            : status === "in_review"
              ? "Article submitted for review."
              : "Draft saved.";
        showToast(message, "success");
      } else if (article.error) {
        showToast(article.error, "error");
      }
    } finally {
      setActiveSaveAction(null);
    }
  };

  const handleNavAction = (status: string) => {
    // EditorNav uses "review", while API/schema expect "in_review".
    if (status === "review") {
      void handleSave("in_review");
      return;
    }
    if (status === "draft" || status === "published") {
      void handleSave(status);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">

      {/* Toast */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}

      {/* Top nav — ← CHANGED: onAction now calls handleSave */}
      <ResponsiveEditorNav onAction={handleNavAction} />

      <main className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0">

        {/* ── LEFT: Main Editor ──────────────────────────────────────────── */}
        <section className="lg:col-span-8 p-12 border-r border-slate-200 bg-white min-h-screen">
          <div className="max-w-3xl mx-auto space-y-10">

            {/* Content type toggle — ← CHANGED: controlled */}
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Content Source:
              </span>
              <div className="flex bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => patch({ contentType: "manual" })}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    form.contentType === "manual"
                      ? "bg-white shadow-sm text-indigo-600"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  Manual
                </button>
                <button
                  onClick={handleGenerateAiContent}
                  disabled={isGeneratingContent}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    form.contentType === "ai_generated"
                      ? "bg-white shadow-sm text-indigo-600"
                      : "text-slate-500 hover:text-slate-700"
                  } ${isGeneratingContent ? "opacity-60 cursor-not-allowed" : ""}`}
                >
                  {isGeneratingContent ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <BrainCircuit size={14} />
                  )}
                  AI Generated
                </button>
              </div>
              {/* ← CHANGED: show saved indicator */}
              {article.savedId && (
                <CustomBadge variant="success">Saved</CustomBadge>
              )}
            </div>

            {/* Title — ← CHANGED: controlled value */}
            <textarea
              className="w-full text-2xl font-black border-none focus:ring-0 placeholder:text-slate-200 leading-tight resize-none bg-transparent"
              placeholder="Article Title"
              rows={2}
              value={form.title}
              onChange={(e) => patch({ title: e.target.value })}
            />

            {/* Featured Image — ← CHANGED: uses form.imageUrl and handleUpload */}
            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                <ImageIcon size={16} /> Featured Image
              </label>

              {form.imageUrl ? (
                <div className="relative group rounded-[32px] overflow-hidden border border-slate-200 h-80 shadow-md">
                  <img
                    src={form.imageUrl}
                    alt="Featured"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => patch({ imageUrl: "" })}
                      className="bg-white text-rose-600 p-3 rounded-full shadow-xl hover:bg-rose-50 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
              ) : (
                <label className="relative group rounded-[32px] overflow-hidden bg-slate-50 border-2 border-dashed border-slate-200 h-80 flex flex-col items-center justify-center transition-all hover:bg-slate-100/50 hover:border-indigo-300 cursor-pointer">
                  {isUploading ? (
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 className="animate-spin text-indigo-600" size={40} />
                      <p className="text-sm font-bold text-indigo-600 animate-pulse">
                        Uploading to Cloud...
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="p-4 bg-white rounded-2xl shadow-sm mb-4 group-hover:scale-110 transition-transform duration-300">
                        <UploadCloud size={40} className="text-indigo-500" />
                      </div>
                      <p className="text-sm font-bold text-slate-700">
                        Click to upload featured image
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        High resolution PNG or JPG (Max 10MB)
                      </p>
                    </>
                  )}
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleUpload}
                    disabled={isUploading}
                  />
                </label>
              )}
            </div>

            {/* Rich Text Editor */}
            <div className="space-y-6">
              <div className="sticky top-[72px] flex items-center gap-2 p-2 bg-white border border-slate-100 shadow-xl shadow-slate-200/50 rounded-2xl z-20">
                <ToolbarIcon icon={<Bold size={18} />} title="Bold" />
                <ToolbarIcon icon={<Italic size={18} />} title="Italic" />
                <ToolbarIcon icon={<Quote size={18} />} title="Quote" />
                <ToolbarIcon icon={<List size={18} />} title="List" />
                <div className="h-6 w-px bg-slate-200 mx-1" />
                {/* ← CHANGED: AI Refine button triggers audit */}
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-xs font-bold text-indigo-600"
                  disabled={audit.loading}
                  onClick={handleRunAudit}
                >
                  {audit.loading ? (
                    <Loader2 size={14} className="mr-2 animate-spin" />
                  ) : (
                    <Sparkles size={14} className="mr-2" />
                  )}
                  AI Audit
                </Button>
              </div>

              {/* ← CHANGED: controlled value */}
              <Textarea
                className="w-full min-h-[800px] border-none focus:ring-0 text-xl leading-relaxed font-serif placeholder:text-slate-200"
                placeholder="Start writing..."
                value={form.content}
                onChange={(e) => patch({ content: e.target.value })}
              />

              {/* ← CHANGED: live word count */}
              <p className="text-xs text-slate-400 text-right">
                {form.content.trim().split(/\s+/).filter(Boolean).length} words
              </p>
            </div>

            {/* ← CHANGED: save/publish buttons at bottom of editor */}
            <div className="flex gap-3 pt-4 border-t border-slate-100">
              <Button
                variant="outline"
                disabled={article.saving}
                onClick={() => handleSave("draft")}
                className="rounded-xl"
              >
                {article.saving && activeSaveAction === "draft" ? (
                  <Loader2 size={14} className="mr-2 animate-spin" />
                ) : (
                  <Save size={14} className="mr-2" />
                )}
                Save Draft
              </Button>
              <Button
                variant="outline"
                disabled={article.saving}
                onClick={() => handleSave("in_review")}
                className="rounded-xl border-indigo-200 text-indigo-700 hover:bg-indigo-50"
              >
                {article.saving && activeSaveAction === "in_review" ? (
                  <Loader2 size={14} className="mr-2 animate-spin" />
                ) : (
                  <Sparkles size={14} className="mr-2" />
                )}
                Send for Review
              </Button>
              <Button
                disabled={article.saving}
                onClick={() => handleSave("published")}
                className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                {article.saving && activeSaveAction === "published" ? (
                  <Loader2 size={14} className="mr-2 animate-spin" />
                ) : (
                  <Send size={14} className="mr-2" />
                )}
                Publish
              </Button>
            </div>
          </div>
        </section>

        {/* ── RIGHT: Intelligence & SEO ──────────────────────────────────── */}
        <aside className="lg:col-span-4 bg-[#F8FAFC] h-[calc(100vh-65px)] sticky top-[65px] overflow-y-auto p-8 space-y-8">

          {/* 1. AI Audit Panel — ← CHANGED: fully dynamic */}
          <div className="space-y-4">
            <h3 className="flex items-center justify-between font-bold text-slate-800 tracking-tight">
              <span className="flex items-center gap-2">
                <BrainCircuit size={20} className="text-indigo-600" /> AI Content Audit
              </span>
              <button
                onClick={handleRunAudit}
                disabled={audit.loading}
                className="flex items-center gap-1 text-[11px] font-bold text-indigo-500 hover:text-indigo-700 disabled:opacity-40"
              >
                {audit.loading ? (
                  <Loader2 size={12} className="animate-spin" />
                ) : (
                  <RefreshCw size={12} />
                )}
                Run
              </button>
            </h3>

            <Card className="rounded-[24px] border-none shadow-sm bg-white overflow-hidden">
              <CardContent className="p-6 space-y-6">

                {/* Loading state */}
                {audit.loading && (
                  <div className="flex flex-col items-center gap-3 py-8 text-slate-400">
                    <Loader2 size={30} className="animate-spin text-indigo-400" />
                    <p className="text-xs font-semibold">Analyzing with Gemini…</p>
                  </div>
                )}

                {/* Error state */}
                {!audit.loading && audit.error && (
                  <p className="text-xs text-rose-600 bg-rose-50 border border-rose-100 rounded-xl p-3">
                    {audit.error}
                  </p>
                )}

                {/* Results */}
                {!audit.loading && audit.data && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <ScoreMini
                        label="Factuality"
                        score={audit.data.scores.factuality}
                        color={scoreTextColor(audit.data.scores.factuality)}
                      />
                      <ScoreMini
                        label="Tone"
                        score={audit.data.scores.tone}
                        color={scoreTextColor(audit.data.scores.tone)}
                      />
                      <ScoreMini
                        label="Grammar"
                        score={audit.data.scores.grammar}
                        color={scoreTextColor(audit.data.scores.grammar)}
                      />
                      <ScoreMini
                        label="Overall"
                        score={audit.data.scores.overall}
                        color={scoreTextColor(audit.data.scores.overall)}
                      />
                    </div>

                    {audit.data.summary && (
                      <p className="text-xs text-slate-500 bg-slate-50 rounded-xl p-3 leading-relaxed">
                        {audit.data.summary}
                      </p>
                    )}

                    {audit.data.issues.length > 0 ? (
                      <div className="space-y-3">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Issues ({audit.data.issues.length})
                        </p>
                        {audit.data.issues.map((issue, i) => (
                          <IssueCard key={i} issue={issue} />
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-emerald-600 text-xs font-semibold bg-emerald-50 rounded-xl p-3">
                        <CheckCircle2 size={15} /> No issues found — great work!
                      </div>
                    )}
                  </>
                )}

                {/* Empty state */}
                {!audit.loading && !audit.data && !audit.error && (
                  <div className="flex flex-col items-center gap-2 py-8 text-slate-300">
                    <BrainCircuit size={30} />
                    <p className="text-xs font-semibold text-center text-slate-400">
                      Click <span className="text-indigo-400">Run</span> to audit your content.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* 2. SEO Panel — ← CHANGED: inputs are controlled, score is live */}
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 font-bold text-slate-800 tracking-tight">
              <ShieldCheck size={20} className="text-emerald-600" /> SEO Optimization
              {seo.loading && (
                <Loader2 size={13} className="animate-spin text-slate-400 ml-auto" />
              )}
            </h3>

            <Card className="rounded-[24px] border-none shadow-sm bg-white p-6 space-y-5">

              {/* Focus keyword */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase text-slate-400">
                  Focus Keyword
                </label>
                <Input
                  value={form.focusKeyword}
                  onChange={(e) => patch({ focusKeyword: e.target.value })}
                  placeholder="e.g. neumorphism"
                  className="rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Meta title */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-[11px] font-bold uppercase text-slate-400">
                    Meta Title
                  </label>
                  <span
                    className={`text-[10px] font-semibold ${
                      form.metaTitle.length > 60 ? "text-rose-500" : "text-slate-400"
                    }`}
                  >
                    {form.metaTitle.length}/60
                  </span>
                </div>
                <Input
                  value={form.metaTitle}
                  onChange={(e) => patch({ metaTitle: e.target.value })}
                  className="rounded-xl bg-slate-50 border-none"
                />
              </div>

              {/* Meta description */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-[11px] font-bold uppercase text-slate-400">
                    Meta Description
                  </label>
                  <span
                    className={`text-[10px] font-semibold ${
                      form.metaDescription.length > 160 ? "text-rose-500" : "text-slate-400"
                    }`}
                  >
                    {form.metaDescription.length}/160
                  </span>
                </div>
                <Textarea
                  value={form.metaDescription}
                  onChange={(e) => patch({ metaDescription: e.target.value })}
                  className="rounded-xl bg-slate-50 border-none min-h-[80px]"
                />
              </div>

              {/* Live SEO score */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm font-semibold text-slate-600">SEO Health Score</span>
                <span className={`text-sm font-bold ${scoreTextColor(seo.data?.score ?? 0)}`}>
                  {seo.data?.score ?? "—"}/100
                </span>
              </div>
              <CustomProgress
                value={seo.data?.score ?? 0}
                colorClass={scoreProgressColor(seo.data?.score ?? 0)}
              />

              {/* SEO checklist */}
              {seo.data?.checks && (
                <div className="space-y-2 pt-3 border-t border-slate-50">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Checklist
                  </p>
                  {seo.data.checks.map((check: SeoCheck, i: number) => (
                    <div key={i} className="flex items-start gap-2">
                      {check.passed ? (
                        <CheckCircle2 size={13} className="text-emerald-500 mt-0.5 shrink-0" />
                      ) : (
                        <AlertCircle size={13} className="text-amber-400 mt-0.5 shrink-0" />
                      )}
                      <div>
                        <p className="text-xs font-semibold text-slate-700">{check.label}</p>
                        {!check.passed && check.tip && (
                          <p className="text-[10px] text-slate-400 mt-0.5">{check.tip}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>

          {/* 3. Classification — ← CHANGED: fully controlled */}
          <div className="space-y-4 pb-12">
            <h3 className="flex items-center gap-2 font-bold text-slate-800 tracking-tight">
              <Fingerprint size={20} className="text-slate-400" /> Classification
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <Select
                value={form.category}
                onValueChange={(v) => patch({ category: v })}
              >
                <SelectTrigger className="rounded-2xl bg-white border-none shadow-sm h-12">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {["design", "technology", "business", "marketing", "development"].map((c) => (
                    <SelectItem key={c} value={c} className="capitalize">
                      {c.charAt(0).toUpperCase() + c.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                placeholder="Tags (comma separated)"
                value={form.tags}
                onChange={(e) => patch({ tags: e.target.value })}
                className="rounded-2xl bg-white border-none shadow-sm h-12"
              />
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
