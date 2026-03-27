import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongoose-connect/connect-db";
import Article from "@/lib/models/NewArticle";
import cloudinary from "@/lib/cloudinary";
import { auth } from "@/lib/auth/auth";
import User from "@/lib/models/User";

// Helper function to generate slug
export async function generateSlug(title: string): Promise<string> {
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[:]+/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
  return slug;
}

export async function GET(req: Request) {
  try {
    await connectMongo();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "9");
    const skip = (page - 1) * limit;

    const session = await auth.api.getSession({ headers: req.headers });
    const userEmail = session?.user?.email;

  
    let matchQuery: any = {};



    if (category && category.toLowerCase() !== "all") {
      matchQuery.category = { $regex: new RegExp(`^${category}$`, "i") };
    }

    if (search) {
      matchQuery.title = { $regex: search, $options: "i" };
    }

    let articles;
    let totalArticles;

    if (userEmail) {
      const userProfile = await User.findOne({ email: userEmail });
      const preferences = userProfile?.preferences?.categories || [];
      const readHistory = userProfile?.readingHistory || [];

      articles = await Article.aggregate([
        { $match: matchQuery },
        {
          $addFields: {
            isPreferred: { $cond: [{ $in: ["$category", preferences] }, 1, 0] },
            isRead: { $cond: [{ $in: ["$_id", readHistory] }, 1, 0] },
          },
        },
        { $sort: { isPreferred: -1, isRead: 1, createdAt: -1 } },
        { $skip: skip },
        { $limit: limit },
      ]);
      totalArticles = await Article.countDocuments(matchQuery);
    } else {
      articles = await Article.find(matchQuery)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
      totalArticles = await Article.countDocuments(matchQuery);
    }

    return NextResponse.json({
      success: true,
      articles,
      hasMore: totalArticles > skip + articles.length,
    });
  } catch (error: any) {
    console.error("Fetch Articles Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    await connectMongo();

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const category = formData.get("category") as string;
    const tags = (formData.get("tags") as string) || "";
    const metaTitle = formData.get("metaTitle") as string;
    const metaDescription = formData.get("metaDescription") as string;
    const status = (formData.get("status") as string) || "published";
    const imageFile = formData.get("image") as File | null;

    let slug = await generateSlug(title);
    let exists = await Article.findOne({ slug });
    let counter = 1;

    while (exists) {
      const baseSlug = await generateSlug(title);
      slug = `${baseSlug}-${counter}`;
      counter++;
      exists = await Article.findOne({ slug });
    }

    let imageUrl = "";
    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadRes = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "articles" }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          })
          .end(buffer);
      });
      imageUrl = uploadRes.secure_url;
    }

    const newArticle = await Article.create({
      title,
      slug,
      content,
      category,
      tags: tags ? tags.split(",").map((t: string) => t.trim()) : [],
      metaTitle,
      metaDescription,
      status,
      image: imageUrl,
    });

    return NextResponse.json({ success: true, article: newArticle });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
