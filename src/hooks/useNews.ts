import { useState, useEffect, useCallback } from "react";
<<<<<<< HEAD
import {NewsAPIArticle} from "@/types/news";
=======
import { Article } from "@/types/news";
>>>>>>> a56ed66d779f646390a604e106be8e704d2e0431
import { getFromCache, saveToCache, clearCache } from "./useNewsCache";

type Category = "technology" | "sports" | "business" | "health" | "science";

interface UseNewsReturn {
<<<<<<< HEAD
  articles: NewsAPIArticle[];
=======
  articles: Article[];
>>>>>>> a56ed66d779f646390a604e106be8e704d2e0431
  loading: boolean;
  error: string | null;
  category: Category;
  setCategory: (category: Category) => void;
  refresh: () => void;
}

export function useNews(
  initialCategory: Category = "technology",
): UseNewsReturn {
<<<<<<< HEAD
  const [articles, setArticles] = useState<NewsAPIArticle[]>([]);
=======
  const [articles, setArticles] = useState<Article[]>([]);
>>>>>>> a56ed66d779f646390a604e106be8e704d2e0431
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<Category>(initialCategory);

  const fetchNews = useCallback(
    async (forceRefresh = false) => {
      setLoading(true);
      setError(null);

      // Force refresh না হলে cache চেক করো
      if (!forceRefresh) {
        const cached = getFromCache();
        if (cached) {
          setArticles(cached);
          setLoading(false);
          return;
        }
      }

      // API থেকে আনো
      try {
        const res = await fetch(`/api/news?category=${category}`);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const json = await res.json();
<<<<<<< HEAD
        const newsArticles: NewsAPIArticle[] = json.articles ?? [];
=======
        const newsArticles: Article[] = json.articles ?? [];
>>>>>>> a56ed66d779f646390a604e106be8e704d2e0431

        saveToCache(newsArticles);
        setArticles(newsArticles);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Something went wrong";
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [category],
  );

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const refresh = () => {
    clearCache();
    fetchNews(true);
  };

  // নতুন setCategory ফাংশন
  const setCategoryAndFetch = (cat: Category) => {
    setCategory(cat);
    clearCache();
    fetchNews(true);
  };

  return {
    articles,
    loading,
    error,
    category,
    setCategory: setCategoryAndFetch,
    refresh,
  };
}
