import { SeoResult } from "@/types/editor";
import { useEffect, useRef, useState } from "react";

export interface SeoInput {
  title: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  tags: string;
}
 
export function useSeoScore(input: SeoInput, debounceMs = 1500) {
  const [data, setData]       = useState<SeoResult | null>(null);
  const [loading, setLoading] = useState(false);
 
  // Stable ref so the effect below always sees the latest input
  const inputRef = useRef(input);
  inputRef.current = input;
 
  useEffect(() => {
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/seo-score", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(inputRef.current),
        });
        if (res.ok) setData(await res.json());
      } catch {
        // silent — SEO score is non-critical
      } finally {
        setLoading(false);
      }
    }, debounceMs);
 
    return () => clearTimeout(timer);
    // Re-run whenever any of the input values change
  }, [
    input.title,
    input.content,
    input.metaTitle,
    input.metaDescription,
    input.focusKeyword,
    input.tags,
    debounceMs,
  ]);
 
  return { data, loading };
}