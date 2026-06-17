import { NewsAPIArticle, CachedNews } from "@/types/news";

const STORAGE_KEY = "cached_news";
const CACHE_DURATION = 60 * 60 * 1000; // 1 ঘণ্টা

export function getFromCache(): NewsAPIArticle[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const cached: CachedNews = JSON.parse(raw);
    const isExpired = Date.now() - cached.timestamp > CACHE_DURATION;

    if (isExpired) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return cached.data;
  } catch {
    return null;
  }
}

export function saveToCache(articles: NewsAPIArticle[]): void {
  const payload: CachedNews = {
    data: articles,
    timestamp: Date.now(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export function clearCache(): void {
  localStorage.removeItem(STORAGE_KEY);
}
