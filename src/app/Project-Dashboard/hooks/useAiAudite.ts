import { AuditResult } from "@/types/editor";
import { useCallback, useState } from "react";

export function useAiAudit() {
  const [data, setData]       = useState<AuditResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);
 
  const run = useCallback(async (title: string, content: string) => {
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required before running the audit.");
      return;
    }
 
    setLoading(true);
    setError(null);
 
    try {
      const res = await fetch("/api/ai-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
 
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Audit failed.");
      setData(json as AuditResult

      );
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Audit failed.");
    } finally {
      setLoading(false);
    }
  }, []);
 
  return { data, loading, error, run };
} 