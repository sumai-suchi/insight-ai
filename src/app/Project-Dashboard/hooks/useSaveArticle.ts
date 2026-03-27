import { ArticlePayload, ArticleStatus } from "@/types/editor";
import { useCallback, useState } from "react";

export function useSaveArticle() {
  const [saving, setSaving]     = useState(false);
  const [savedId, setSavedId]   = useState<string | null>(null);
  const [error, setError]       = useState<string | null>(null);
 
  const save = useCallback(
    async (payload: ArticlePayload, status: ArticleStatus): Promise<boolean> => {
      if (!payload.title.trim()) {
        setError("Title is required to save.");
        return false;
      }
      if (status === "published" && !payload.content.trim()) {
        setError("Content is required before publishing.");
        return false;
      }
 
      setSaving(true);
      setError(null);
 
      try {
        // First save → POST; subsequent saves → PUT with saved ID
        const method = savedId ? "PUT" : "POST";
        const url    = savedId ? `/api/articles?id=${savedId}` : "/api/articles";
 
        const res = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, status }),
        });
 
        const json = await res.json();
        if (!res.ok) throw new Error(json.error ?? "Save failed.");
 
        setSavedId(json.id);
        return true;
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Save failed.");
        return false;
      } finally {
        setSaving(false);
      }
    },
    [savedId]
  );
 
  return { save, saving, savedId, error };
}
 