// FILE: app/Project-dashboard/drafts/page.tsx
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import {
  FileText, Search, Trash2, Send, RefreshCw, Loader2,
  AlertCircle, CheckCircle2, X, PenLine, ImageIcon,
  LayoutGrid, List, ChevronLeft, ChevronRight,
  Tag, Folder, Clock, BarChart2, BrainCircuit,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Tag {
  _id: string;
  name: string;
  slug: string;
}


interface DraftArticle {
  _id:             string;
  title:           string;
  metaDescription?: string;
  // ✅ FIX 1: category comes from MongoDB as an object e.g. { name: "design" }
  //           OR as a plain string — handle both
  category?:       string | { name?: string; [key: string]: unknown };
  // ✅ FIX 2: tags comes as a string[] array from MongoDB, not a comma string
    tags?: string[] | string | Tag[];
  featuredImage?:       string;
  seoScore?:       number;
  focusKeyword?:   string;
  contentType?:    "ai_generated" | "manual";
  updatedAt:       string;
  createdAt:       string;
}

interface Pagination {
  page:        number;
  limit:       number;
  total:       number;
  totalPages:  number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

type ToastType = "success" | "error" | "info";
type ViewMode  = "grid" | "list";

// ─── Safe field helpers ───────────────────────────────────────────────────────

// Safely extract category name whether it's a string or an object
function getCategoryName(category: DraftArticle["category"]): string {
  if (!category) return "";
  if (typeof category === "string") return category;
  // It's an object — try common field names
  return (
    category.name as string ??
    (category as Record<string, unknown>).title as string ??
    ""
  );
}

// Safely get tags as a string[] whether DB returns string[] or "a,b,c"
 function getTagsArray(tags: DraftArticle["tags"]): string[] {
  if (!tags) return [];

  if (Array.isArray(tags)) {
    return tags
      .map((t) => {
        if (typeof t === "string") return t.trim();
        if (typeof t === "object" && t !== null) return t.name?.trim();
        return "";
      })
      .filter(Boolean);
  }

  return tags.split(",").map((t) => t.trim()).filter(Boolean);
}
// ─── Helpers ──────────────────────────────────────────────────────────────────

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1)  return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 7)  return `${d}d ago`;
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function scoreColor(score = 0) {
  if (score >= 80) return { text: "text-emerald-600", bg: "bg-emerald-500", ring: "bg-emerald-100" };
  if (score >= 60) return { text: "text-amber-600",   bg: "bg-amber-500",   ring: "bg-amber-100"   };
  return                  { text: "text-rose-600",     bg: "bg-rose-500",    ring: "bg-rose-100"    };
}

// ─── Toast ────────────────────────────────────────────────────────────────────

function Toast({ message, type, onClose }: { message: string; type: ToastType; onClose: () => void }) {
  const bg = { success: "bg-emerald-600", error: "bg-rose-600", info: "bg-indigo-600" }[type];
  const Icon = type === "success" ? CheckCircle2 : AlertCircle;
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl text-sm font-semibold text-white ${bg}`}>
      <Icon size={15} />
      {message}
      <button onClick={onClose} className="opacity-70 hover:opacity-100 ml-1"><X size={13} /></button>
    </div>
  );
}

// ─── Skeleton card ────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="bg-white rounded-[24px] overflow-hidden animate-pulse">
      <div className="h-44 bg-slate-100" />
      <div className="p-5 space-y-3">
        <div className="h-3 bg-slate-100 rounded-full w-1/3" />
        <div className="h-5 bg-slate-100 rounded-full w-4/5" />
        <div className="h-4 bg-slate-100 rounded-full w-full" />
        <div className="h-4 bg-slate-100 rounded-full w-2/3" />
        <div className="flex gap-2 pt-2">
          <div className="h-8 bg-slate-100 rounded-xl flex-1" />
          <div className="h-8 bg-slate-100 rounded-xl flex-1" />
        </div>
      </div>
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState({ hasQuery }: { hasQuery: boolean }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-28 gap-5 text-slate-300">
      <div className="p-6 bg-slate-50 rounded-[28px]">
        <FileText size={48} strokeWidth={1.2} />
      </div>
      <div className="text-center space-y-2">
        <p className="text-base font-bold text-slate-400">
          {hasQuery ? "No drafts match your search" : "No drafts yet"}
        </p>
        <p className="text-sm text-slate-300">
          {hasQuery ? "Try a different keyword" : "Articles you save as drafts will appear here"}
        </p>
      </div>
      {!hasQuery && (
        <Link
          href="/Project-dashboard/editor"
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-2xl transition-colors"
        >
          <PenLine size={15} /> New Article
        </Link>
      )}
    </div>
  );
}

// ─── Draft Card (Grid) ────────────────────────────────────────────────────────
// ✅ FIX 3: prop renamed from "drafts" → "draft" to match the type definition

function DraftCard({
  draft,
  onDelete,
  onPublish,
  deleting,
  publishing,
}: {
  draft:      DraftArticle;
  onDelete:   (id: string) => void;
  onPublish:  (id: string) => void;
  deleting:   boolean;
  publishing: boolean;
}) {
  const sc           = scoreColor(draft.seoScore);
  const categoryName = getCategoryName(draft.category);   // ✅ safe category
  const tagsArray    = getTagsArray(draft.tags);          // ✅ safe tags

  return (
    <article className="group bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col border border-slate-100/60">

      {/* Thumbnail */}
      <div className="relative h-44 bg-slate-50 overflow-hidden shrink-0">
        {draft.featuredImage ? (
          <img
            src={draft.featuredImage}
            alt={draft.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon size={32} className="text-slate-200" strokeWidth={1.2} />
          </div>
        )}

        {/* Content type badge */}
        <div className="absolute top-3 left-3">
          {draft.contentType === "ai_generated" ? (
            <span className="flex items-center gap-1 px-2.5 py-1 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow">
              <BrainCircuit size={10} /> AI
            </span>
          ) : (
            <span className="flex items-center gap-1 px-2.5 py-1 bg-slate-700 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow">
              <PenLine size={10} /> Manual
            </span>
          )}
        </div>

        {/* SEO score pill */}
        {typeof draft.seoScore === "number" && (
          <div className={`absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 ${sc.ring} rounded-full`}>
            <div className={`w-1.5 h-1.5 rounded-full ${sc.bg}`} />
            <span className={`text-[10px] font-bold ${sc.text}`}>{draft.seoScore}</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1 gap-3">

        {/* Meta */}
        <div className="flex items-center gap-3 text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
          {categoryName && (
            <span className="flex items-center gap-1">
              <Folder size={9} /> {categoryName}    {/* ✅ now a plain string */}
            </span>
          )}
          <span className="flex items-center gap-1 ml-auto">
            <Clock size={9} /> {timeAgo(draft.updatedAt)}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-sm font-black text-slate-800 leading-snug line-clamp-2 group-hover:text-indigo-600 transition-colors">
          {draft.title || <span className="text-slate-300 italic">Untitled draft</span>}
        </h2>

        {/* Description */}
        {draft.metaDescription && (
          <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
            {draft.metaDescription}
          </p>
        )}

        {/* Tags ✅ now always a string[] — no more .split crash */}
        {tagsArray.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tagsArray.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 px-2 py-0.5 bg-slate-50 border border-slate-100 rounded-full text-[10px] text-slate-500 font-medium"
              >
                <Tag size={8} /> {tag}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 mt-auto pt-2 border-t border-slate-50">
         <Link
  href={`/Project-dashboard/editorDashboard/editor/${draft._id}`}
  className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-slate-50 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 text-xs font-bold rounded-xl transition-colors"
>
  <PenLine size={13} /> Edit
</Link>

          <button
            onClick={() => onPublish(draft._id)}
            disabled={publishing}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-xs font-bold rounded-xl transition-colors disabled:opacity-50"
          >
            {publishing ? <Loader2 size={13} className="animate-spin" /> : <Send size={13} />}
            Publish
          </button>

          <button
            onClick={() => onDelete(draft._id)}
            disabled={deleting}
            className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors disabled:opacity-50"
            title="Delete draft"
          >
            {deleting ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
          </button>
        </div>
      </div>
    </article>
  );
}

// ─── Draft Row (List) ─────────────────────────────────────────────────────────

function DraftRow({
  draft,
  onDelete,
  onPublish,
  deleting,
  publishing,
}: {
  draft:      DraftArticle;
  onDelete:   (id: string) => void;
  onPublish:  (id: string) => void;
  deleting:   boolean;
  publishing: boolean;
}) {
  const sc           = scoreColor(draft.seoScore);
  const categoryName = getCategoryName(draft.category);   // ✅ safe

  return (
    <div className="group flex items-center gap-4 bg-white rounded-2xl px-5 py-4 border border-slate-100/60 hover:shadow-md transition-all duration-200">

      {/* Thumbnail */}
      <div className="w-14 h-14 rounded-xl bg-slate-50 overflow-hidden shrink-0">
        {draft.featuredImage ? (
          <img src={draft.featuredImage} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon size={18} className="text-slate-200" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-0.5">
        <p className="text-sm font-black text-slate-800 truncate group-hover:text-indigo-600 transition-colors">
          {draft.title || <span className="text-slate-300 italic">Untitled draft</span>}
        </p>
        <div className="flex items-center gap-3 text-[10px] text-slate-400 font-semibold">
          {categoryName && (
            <span className="flex items-center gap-1">
              <Folder size={9} />{categoryName}    {/* ✅ plain string */}
            </span>
          )}
          {draft.focusKeyword && (
            <span className="flex items-center gap-1">
              <Tag size={9} />{draft.focusKeyword}
            </span>
          )}
          <span className="flex items-center gap-1 ml-auto">
            <Clock size={9} />{timeAgo(draft.updatedAt)}
          </span>
        </div>
      </div>

      {/* SEO score */}
      {typeof draft.seoScore === "number" && (
        <div className={`hidden sm:flex items-center gap-1.5 px-3 py-1 ${sc.ring} rounded-full shrink-0`}>
          <BarChart2 size={10} className={sc.text} />
          <span className={`text-xs font-bold ${sc.text}`}>{draft.seoScore}</span>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0">
        <Link
          href={`/Project-dashboard/editor?id=${draft._id}`}
          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"
          title="Edit"
        >
          <PenLine size={15} />
        </Link>
        <button
          onClick={() => onPublish(draft._id)}
          disabled={publishing}
          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors disabled:opacity-50"
          title="Publish"
        >
          {publishing ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
        </button>
        <button
          onClick={() => onDelete(draft._id)}
          disabled={deleting}
          className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors disabled:opacity-50"
          title="Delete"
        >
          {deleting ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
        </button>
      </div>
    </div>
  );
}

// ─── Delete Confirmation Modal ────────────────────────────────────────────────

function ConfirmModal({
  title,
  onConfirm,
  onCancel,
  loading,
}: {
  title:     string;
  onConfirm: () => void;
  onCancel:  () => void;
  loading:   boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-[28px] shadow-2xl p-8 max-w-sm w-full mx-4 space-y-5">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="p-4 bg-rose-50 rounded-2xl">
            <Trash2 size={28} className="text-rose-500" />
          </div>
          <div>
            <p className="font-black text-slate-800 text-base">Delete this draft?</p>
            <p className="text-sm text-slate-400 mt-1 leading-relaxed line-clamp-2">
              "<span className="font-semibold text-slate-500">{title || "Untitled draft"}</span>" will be permanently removed.
            </p>
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-2xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 size={14} className="animate-spin" />}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function DraftsPage() {

  const [drafts,        setDrafts]        = useState<DraftArticle[]>([]);
  const [pagination,    setPagination]    = useState<Pagination | null>(null);
  const [loading,       setLoading]       = useState(true);
  const [error,         setError]         = useState<string | null>(null);
  const [query,         setQuery]         = useState("");
  const [page,          setPage]          = useState(1);
  const [viewMode,      setViewMode]      = useState<ViewMode>("grid");
  const [deletingId,    setDeletingId]    = useState<string | null>(null);
  const [publishingId,  setPublishingId]  = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<DraftArticle | null>(null);
  const [toast,         setToast]         = useState<{ message: string; type: ToastType } | null>(null);

  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((message: string, type: ToastType = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  }, []);

  const fetchDrafts = useCallback(async (p: number, q: string) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ page: String(p), limit: "12" });
      if (q) params.set("q", q);
      const res  = await fetch(`/api/articles/drafts?${params}`);
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error ?? "Failed to load drafts.");
      setDrafts(data.data.drafts);
      setPagination(data.data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDrafts(page, query);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleSearch = (value: string) => {
    setQuery(value);
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      setPage(1);
      fetchDrafts(1, value);
    }, 400);
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    setConfirmDelete(null);
    try {
      const res  = await fetch(`/api/articles/drafts/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error ?? "Delete failed.");
      setDrafts((prev) => prev.filter((d) => d._id !== id));
      setPagination((prev) => prev ? { ...prev, total: prev.total - 1 } : prev);
      showToast("Draft deleted.", "success");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Delete failed.", "error");
    } finally {
      setDeletingId(null);
    }
  };

  const handlePublish = async (id: string) => {
    setPublishingId(id);
    try {
       const res = await fetch(`/api/articles/drafts/${id}`, {
     method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "published" }),
    });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error ?? "Publish failed.");
      setDrafts((prev) => prev.filter((d) => d._id !== id));
      setPagination((prev) => prev ? { ...prev, total: prev.total - 1 } : prev);
      showToast("Article published! 🎉", "success");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Publish failed.", "error");
    } finally {
      setPublishingId(null);
    }
  };

  const SKELETON_COUNT = 6;

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {confirmDelete && (
        <ConfirmModal
          title={confirmDelete.title}
          loading={deletingId === confirmDelete._id}
          onConfirm={() => handleDelete(confirmDelete._id)}
          onCancel={() => setConfirmDelete(null)}
        />
      )}

      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 rounded-xl">
              <FileText size={20} className="text-indigo-600" />
            </div>
            <div>
              <h1 className="text-base font-black text-slate-800 leading-none">Drafts</h1>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {pagination ? `${pagination.total} article${pagination.total !== 1 ? "s" : ""}` : "Loading…"}
              </p>
            </div>
          </div>

          {/* <div className="flex-1 min-w-[200px] max-w-sm relative ml-auto sm:ml-0">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
            <input
              type="text"
              placeholder="Search drafts…"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            {query && (
              <button onClick={() => handleSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500">
                <X size={13} />
              </button>
            )}
          </div> */}

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => fetchDrafts(page, query)}
              disabled={loading}
              className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors disabled:opacity-40"
              title="Refresh"
            >
              <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
            </button>
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg transition-all ${viewMode === "grid" ? "bg-white shadow-sm text-indigo-600" : "text-slate-400 hover:text-slate-600"}`}
              >
                <LayoutGrid size={15} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-lg transition-all ${viewMode === "list" ? "bg-white shadow-sm text-indigo-600" : "text-slate-400 hover:text-slate-600"}`}
              >
                <List size={15} />
              </button>
            </div>
            <Link
              href="/Project-dashboard/editor"
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-2xl transition-colors shadow-sm"
            >
              <PenLine size={14} /> New Article
            </Link>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-8">

        {error && !loading && (
          <div className="flex items-center gap-3 bg-rose-50 border border-rose-100 text-rose-700 rounded-2xl px-5 py-4 mb-8 text-sm font-semibold">
            <AlertCircle size={16} />
            {error}
            <button onClick={() => fetchDrafts(page, query)} className="ml-auto text-rose-500 hover:text-rose-700 underline text-xs font-bold">
              Retry
            </button>
          </div>
        )}

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {loading
              ? Array.from({ length: SKELETON_COUNT }).map((_, i) => <SkeletonCard key={i} />)
              : drafts.length === 0
                ? <EmptyState hasQuery={!!query} />
                : drafts.map((draft) => (
                    <DraftCard
                      key={draft._id}
                      draft={draft}                             // ✅ correct prop name
                      onDelete={(id) => setConfirmDelete(drafts.find((d) => d._id === id)!)}
                      onPublish={handlePublish}
                      deleting={deletingId   === draft._id}
                      publishing={publishingId === draft._id}
                    />
                  ))
            }
          </div>
        ) : (
          <div className="space-y-3">
            {loading
              ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                  <div key={i} className="h-20 bg-white rounded-2xl animate-pulse" />
                ))
              : drafts.length === 0
                ? <EmptyState hasQuery={!!query} />
                : drafts.map((draft) => (
                    <DraftRow
                      key={draft._id}
                      draft={draft}                             // ✅ correct prop name
                      onDelete={(id) => setConfirmDelete(drafts.find((d) => d._id === id)!)}
                      onPublish={handlePublish}
                      deleting={deletingId   === draft._id}
                      publishing={publishingId === draft._id}
                    />
                  ))
            }
          </div>
        )}

        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-100">
            <p className="text-xs text-slate-400 font-semibold">
              Page {pagination.page} of {pagination.totalPages} · {pagination.total} total
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={!pagination.hasPrevPage || loading}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={14} /> Prev
              </button>
              <div className="flex gap-1">
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                  .filter((p) => Math.abs(p - pagination.page) <= 1 || p === 1 || p === pagination.totalPages)
                  .reduce<(number | "…")[]>((acc, p, idx, arr) => {
                    if (idx > 0 && typeof arr[idx - 1] === "number" && (p as number) - (arr[idx - 1] as number) > 1) acc.push("…");
                    acc.push(p);
                    return acc;
                  }, [])
                  .map((p, i) =>
                    p === "…" ? (
                      <span key={`ellipsis-${i}`} className="px-2 py-2 text-xs text-slate-300">…</span>
                    ) : (
                      <button
                        key={p}
                        onClick={() => setPage(p as number)}
                        className={`w-9 h-9 rounded-xl text-xs font-bold transition-colors ${p === pagination.page ? "bg-indigo-600 text-white" : "text-slate-500 hover:bg-slate-100"}`}
                      >
                        {p}
                      </button>
                    )
                  )
                }
              </div>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={!pagination.hasNextPage || loading}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}