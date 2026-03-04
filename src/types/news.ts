export type NewsCategory =
  | "all"
  | "technology"
  | "business"
  | "marketing"
  | "startups";

export interface INews {
  _id?: string;
  sourceId: string | null;
  sourceName: string;
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: Date;
  content: string | null;
  category: NewsCategory;
  createdAt?: Date;
}

export interface NewsAPIArticle {
  source: { id: string | null; name: string };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface CachedNews {
  data: NewsAPIArticle[];
  timestamp: number;
};