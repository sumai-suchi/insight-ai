import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongoose-connect/connect-db";
import NewArticle from "@/lib/models/NewArticle";
import cloudinary from "@/lib/cloudinary";
import { auth } from "@/lib/auth/auth";
import User from "@/lib/models/User";

// Helper function to generate slug
export async function generateSlug(title: string): Promise<string> {
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[:]+/g, "") // remove colons
    .replace(/\s+/g, "-") // spaces → hyphens
    .replace(/[^\w-]+/g, "") // remove other special chars
    .replace(/--+/g, "-"); // remove multiple hyphens
  return slug;
}
export async function GET(req: Request) {
  try {
    await connectMongo();

    const session = await auth.api.getSession({ headers: req.headers });
    const userEmail = session?.user?.email;

    let articles;

    if (userEmail) {
      const userProfile = await User.findOne({ email: userEmail });
      const preferences = userProfile?.preferences?.categories || [];
      const readHistory = userProfile?.readingHistory || [];

      articles = await NewArticle.aggregate([
        {
          $addFields: {
            isPreferred: { $cond: [{ $in: ["$category", preferences] }, 1, 0] },
            isRead: { $cond: [{ $in: ["$_id", readHistory] }, 1, 0] },
          },
        },
        {
          $sort: {
            isPreferred: -1,
            isRead: 1,
            createdAt: -1,
          },
        },
      ]);
    } else {
      articles = await NewArticle.find({ status: "published" }).sort({
        createdAt: -1,
      });
    }

    return NextResponse.json({ success: true, articles });
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
    await connectMongo();

    const contentType = req.headers.get("content-type") || "";
    const normalizeTags = (tagsValue: unknown): string[] => {
      if (Array.isArray(tagsValue)) {
        return tagsValue.map((t) => String(t)).map((t) => t.trim()).filter(Boolean);
      }
      if (typeof tagsValue === "string") {
        return tagsValue
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);
      }
      return [];
    };

    // Support both:
    // - JSON (used by `useSaveArticle`)
    // - multipart/form-data (used by older editor flows)
    let title = "";
    let content = "";
    let category = "";
    let tags: string[] = [];
    let metaTitle = "";
    let metaDescription = "";
    let focusKeyword = "";
    let seoScore = 0;
    let articleContentType = "manual";
    let status = "published";
    let imageUrl = "";

    if (contentType.includes("application/json")) {
      const body = (await req.json()) as Partial<{
        title: string;
        content: string;
        category: string;
        tags: string | string[];
        metaTitle: string;
        metaDescription: string;
        focusKeyword: string;
        seoScore: number;
        contentType: "ai_generated" | "manual" | string;
        status: string;
        imageUrl: string;
      }>;

      title = body.title ?? "";
      content = body.content ?? "";
      category = body.category ?? "";
      tags = normalizeTags(body.tags);
      metaTitle = body.metaTitle ?? "";
      metaDescription = body.metaDescription ?? "";
      focusKeyword = body.focusKeyword ?? "";
      seoScore = typeof body.seoScore === "number" ? body.seoScore : 0;
      articleContentType = (body.contentType as string) || "manual";
      status = (body.status as string) ?? "published";
      imageUrl = body.imageUrl ?? "";
    } else {
      const formData = await req.formData();

      // Extract form fields
      title = (formData.get("title") as string) ?? "";
      content = (formData.get("content") as string) ?? "";
      category = (formData.get("category") as string) ?? "";
      tags = normalizeTags(formData.get("tags"));
      metaTitle = (formData.get("metaTitle") as string) ?? "";
      metaDescription = (formData.get("metaDescription") as string) ?? "";
      status = (formData.get("status") as string) || "published";
      articleContentType = (formData.get("contentType") as string) || "manual";
      focusKeyword = (formData.get("focusKeyword") as string) || "";
      seoScore = Number(formData.get("seoScore") as string) || 0;
      const imageFile = formData.get("image") as File | null;

      // Upload image if exists
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
    }

    if (!title.trim()) {
      return NextResponse.json({ error: "Title is required." }, { status: 400 });
    }
    if (!content.trim() && status === "published") {
      return NextResponse.json(
        { error: "Content is required before publishing." },
        { status: 400 }
      );
    }

    let slug = await generateSlug(title);

    let exists = await NewArticle.findOne({ slug });
    let counter = 1;

    while (exists) {
      const baseSlug = await generateSlug(title);
      slug = `${baseSlug}-${counter}`;
      counter++;
      exists = await NewArticle.findOne({ slug });
    }

    // Save to database
    const plainText = (content ?? "")
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const excerpt = plainText.slice(0, 200);
    const wordCount = plainText ? plainText.split(/\s+/).filter(Boolean).length : 0;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    const session = await auth.api.getSession({ headers: req.headers });
    const userEmail = session?.user?.email;
    const userProfile = userEmail ? await User.findOne({ email: userEmail }) : null;

    const authorRole =
      userProfile?.role === "admin"
        ? "admin"
        : userProfile?.role === "Author"
          ? "writer"
          : "editor";

    const author = userProfile
      ? {
          _id: userProfile._id.toString(),
          name: userProfile.name ?? "Unknown",
          email: userProfile.email ?? "unknown@example.com",
          avatar: userProfile.photoURL ?? "",
          role: authorRole,
        }
      : {
          _id: "unknown",
          name: "Unknown",
          email: "unknown@example.com",
          avatar: "",
          role: "editor",
        };

    const categorySlug = category ? await generateSlug(category) : "";
    const categoryObj = {
      _id: category || "uncategorized",
      name: category || "Uncategorized",
      slug: categorySlug || "uncategorized",
    };

    const tagObjs = await Promise.all(
      (tags || []).map(async (t) => {
        const trimmed = String(t).trim();
        const s = trimmed ? await generateSlug(trimmed) : "";
        return {
          _id: s || trimmed || "tag",
          name: trimmed || "Tag",
          slug: s || trimmed || "tag",
        };
      })
    );

    const newArticle = await NewArticle.create({
      title,
      slug,
      content,
      excerpt,
      featuredImage: imageUrl,
      author,
      category: categoryObj,
      tags: tagObjs,
      status,
      contentType: articleContentType,
      seo: {
        metaTitle,
        metaDescription,
        focusKeyword,
        score: seoScore,
      },
      wordCount,
      readingTime,
    });

    // `useSaveArticle` expects `{ id }`
    return NextResponse.json({ success: true, id: newArticle._id, article: newArticle });
  } catch (error: any) {
    console.error("Article Post Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Something went wrong" },
      { status: 500 },
    );
  }
}

export async function PUT(req: Request) {
  try {
    await connectMongo();

    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing `id` query param." }, { status: 400 });
    }

    const body = (await req.json()) as Partial<{
      title: string;
      content: string;
      category: string;
      tags: string | string[];
      metaTitle: string;
      metaDescription: string;
      focusKeyword: string;
      seoScore: number;
      contentType: "ai_generated" | "manual" | string;
      status: string;
      imageUrl: string;
    }>;

    const normalizeTags = (tagsValue: unknown): string[] => {
      if (Array.isArray(tagsValue)) {
        return tagsValue.map((t) => String(t)).map((t) => t.trim()).filter(Boolean);
      }
      if (typeof tagsValue === "string") {
        return tagsValue
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);
      }
      return [];
    };

    const title = body.title ?? "";
    const content = body.content ?? "";
    const category = body.category ?? "";
    const tags = normalizeTags(body.tags);
    const metaTitle = body.metaTitle ?? "";
    const metaDescription = body.metaDescription ?? "";
    const focusKeyword = body.focusKeyword ?? "";
    const seoScore = typeof body.seoScore === "number" ? body.seoScore : 0;
    const articleContentType = (body.contentType as string) || "manual";
    const status = body.status ?? "published";
    const imageUrl = body.imageUrl ?? "";

    if (!title.trim()) {
      return NextResponse.json({ error: "Title is required." }, { status: 400 });
    }
    if (!content.trim() && status === "published") {
      return NextResponse.json(
        { error: "Content is required before publishing." },
        { status: 400 }
      );
    }

    // Update slug based on title, ensuring uniqueness excluding this document.
    let slug = await generateSlug(title);
    let exists = await NewArticle.findOne({ slug, _id: { $ne: id } });
    let counter = 1;
    while (exists) {
      const baseSlug = await generateSlug(title);
      slug = `${baseSlug}-${counter}`;
      counter++;
      exists = await NewArticle.findOne({ slug, _id: { $ne: id } });
    }

    const plainText = (content ?? "")
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const excerpt = plainText.slice(0, 200);
    const wordCount = plainText ? plainText.split(/\s+/).filter(Boolean).length : 0;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    const session = await auth.api.getSession({ headers: req.headers });
    const userEmail = session?.user?.email;
    const userProfile = userEmail ? await User.findOne({ email: userEmail }) : null;

    const authorRole =
      userProfile?.role === "admin"
        ? "admin"
        : userProfile?.role === "Author"
          ? "writer"
          : "editor";

    const author = userProfile
      ? {
          _id: userProfile._id.toString(),
          name: userProfile.name ?? "Unknown",
          email: userProfile.email ?? "unknown@example.com",
          avatar: userProfile.photoURL ?? "",
          role: authorRole,
        }
      : {
          _id: "unknown",
          name: "Unknown",
          email: "unknown@example.com",
          avatar: "",
          role: "editor",
        };

    const categorySlug = category ? await generateSlug(category) : "";
    const categoryObj = {
      _id: category || "uncategorized",
      name: category || "Uncategorized",
      slug: categorySlug || "uncategorized",
    };

    const tagObjs = await Promise.all(
      (tags || []).map(async (t) => {
        const trimmed = String(t).trim();
        const s = trimmed ? await generateSlug(trimmed) : "";
        return {
          _id: s || trimmed || "tag",
          name: trimmed || "Tag",
          slug: s || trimmed || "tag",
        };
      })
    );

    const updated = await NewArticle.findByIdAndUpdate(
      id,
      {
        title,
        slug,
        content,
        excerpt,
        featuredImage: imageUrl,
        author,
        category: categoryObj,
        tags: tagObjs,
        status,
        contentType: articleContentType,
        seo: {
          metaTitle,
          metaDescription,
          focusKeyword,
          score: seoScore,
        },
        wordCount,
        readingTime,
      },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "Article not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, id: updated._id, article: updated });
  } catch (error: any) {
    console.error("Article Put Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
