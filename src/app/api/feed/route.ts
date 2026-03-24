import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";
import connectDB from "@/lib/mongoose-connect/connect-db";
import Article from "@/lib/models/NewArticle";
import User from "@/lib/models/User";

interface UserPrefs {
  categories?: string[];
  tags?: string[];
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "9");
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const skip = (page - 1) * limit;

    let query: Record<string, any> = { status: "published" };

    if (category && category !== "All") {
      query.category = category;
    }
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    let userProfile = null;
    let userPrefs: UserPrefs = { categories: [], tags: [] };

    if (session?.user?.email) {
      userProfile = await User.findOne({ email: session.user.email })
        .select("preferences readingHistory")
        .lean();

      if (userProfile?.preferences) {
        userPrefs = userProfile.preferences as UserPrefs;
      }
    }

    if (userProfile && !category && !search) {
      const prefCategories = userPrefs.categories || [];
      const prefTags = userPrefs.tags || [];

      if (prefCategories.length > 0 || prefTags.length > 0) {
        query.$or = [
          { category: { $in: prefCategories } },
          { tags: { $in: prefTags } },
        ];
      }
    }

    const articlesRaw = await Article.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 3)
      .lean();

    const now = Date.now();

    const scoredArticles = articlesRaw.map((article: any) => {
      let score = 0;

      const hoursOld =
        (now - new Date(article.createdAt).getTime()) / (1000 * 60 * 60);
      const recencyWeight = Math.max(0.1, Math.exp(-hoursOld / 48)); 

 
      if (userPrefs.categories?.includes(article.category)) {
        score += 60; 
      }

      const matchedTags =
        article.tags?.filter((tag: string) => userPrefs.tags?.includes(tag))
          .length || 0;
      score += matchedTags * 20;

      const history = (userProfile as any)?.readingHistory || [];
      if (history.includes(article._id.toString())) {
        score -= 50;
      }

      const views = article.views || 0;
      score += Math.min(views * 2, 40);

      const finalScore = score * (0.4 + recencyWeight * 0.6);
      return { ...article, score: finalScore };
    });

    scoredArticles.sort((a: any, b: any) => b.score - a.score);
    const paginatedArticles = scoredArticles.slice(skip, skip + limit);

    const totalCount = await Article.countDocuments(query);

    return NextResponse.json({
      articles: paginatedArticles,
      total: totalCount,
      page,
      totalPages: Math.ceil(totalCount / limit),
      hasMore: skip + paginatedArticles.length < totalCount,
    });
  } catch (error: any) {
    console.error("Personalized Feed API Error:", error);
    return NextResponse.json(
      { error: "Server error", details: error.message },
      { status: 500 },
    );
  }
}
