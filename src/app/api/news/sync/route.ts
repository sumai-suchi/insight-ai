import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongoose";

import { NewsAPIArticle, NewsCategory } from "@/types/news";
import News from "@/lib/db/models/News";

const NEWS_API_KEY = process.env.NEWS_API_KEY!;
const BASE_URL = "https://newsapi.org/v2";

// NewsAPI query map per category
const CATEGORY_QUERIES: Record<Exclude<NewsCategory, "all">, string> = {
  technology: "technology",
  business: "business",
  marketing: "marketing digital",
  startups: "startups funding",
};

async function fetchFromNewsAPI(
  category: Exclude<NewsCategory, "all">,
): Promise<NewsAPIArticle[]> {
  const query = CATEGORY_QUERIES[category];
  const url = `${BASE_URL}/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&pageSize=20&apiKey=${NEWS_API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.status !== "ok") {
    console.error(`NewsAPI error for ${category}:`, data.message);
    return [];
  }
  return data.articles as NewsAPIArticle[];
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const categories: Exclude<NewsCategory, "all">[] = [
      "technology",
      "business",
      "marketing",
      "startups",
    ];

    let totalSaved = 0;
    let totalDuplicates = 0;

    for (const category of categories) {
      const articles = await fetchFromNewsAPI(category);

      for (const article of articles) {
        // Skip removed articles
        if (article.title === "[Removed]") continue;

        try {
          await News.create({
            sourceId: article.source.id,
            sourceName: article.source.name,
            author: article.author,
            title: article.title,
            description: article.description,
            url: article.url,
            urlToImage: article.urlToImage,
            publishedAt: new Date(article.publishedAt),
            content: article.content,
            category,
          });
          totalSaved++;
        } catch (err: unknown) {
          if (
            err instanceof Error &&
            "code" in err &&
            (err as { code?: number }).code === 11000
          ) {
            totalDuplicates++;
          } else if (err instanceof Error) {
            console.error("Save error:", err.message);
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: `Synced: ${totalSaved} new, ${totalDuplicates} duplicates skipped`,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 },
    );
  }
}
