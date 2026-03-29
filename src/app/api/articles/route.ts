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
    .replace(/[:]+/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
  return slug;
}
// export async function GET(req: Request) {
//   try {
//     await connectMongo();

//     const session = await auth.api.getSession({ headers: req.headers });
//     const userEmail = session?.user?.email;
//     const { searchParams } = new URL(req.url);
//     let articles;

//     if (userEmail) {
//       const userProfile = await User.findOne({ email: userEmail });
//       const preferences = userProfile?.preferences?.categories || [];
//       const readHistory = userProfile?.readingHistory || [];

//       const page = Number(searchParams.get("page")) || 1;
//       const limit = Number(searchParams.get("limit")) || 9;
//       const skip = (page - 1) * limit;

//       articles = await NewArticle.aggregate([
//         {
//           $addFields: {
//             isPreferred: { $cond: [{ $in: ["$category", preferences] }, 1, 0] },
//             isRead: { $cond: [{ $in: ["$_id", readHistory] }, 1, 0] },
//           },
//         },
//         {
//           $sort: {
//             isPreferred: -1,
//             isRead: 1,
//             createdAt: -1,
//           },
//         },
//         { $skip: skip },
//         { $limit: limit },
//       ]);
//     }

//     return NextResponse.json({ success: true, articles });
//   } catch (error: any) {
//     console.error("Fetch Articles Error:", error);
//     return NextResponse.json(
//       { success: false, error: error.message },
//       { status: 500 },
//     );
//   }
// }

export async function GET(req: Request) {
  try {
    await connectMongo();
    const session = await auth.api.getSession({ headers: req.headers });
    const userEmail = session?.user?.email;
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 9;
    const skip = (page - 1) * limit;

    let matchQuery: any = {};

    // if (category && category.toLowerCase() !== "all") {
    //   matchQuery["category.name"] = {
    //     $regex: new RegExp(`^${category}$`, "i"),
    //   };
    // }

    // if (search) {
    //   matchQuery.title = { $regex: search, $options: "i" };
    // }

    let articles;
    let total = 0;

    if (userEmail) {
      const userProfile = await User.findOne({ email: userEmail });
      const preferences = userProfile?.preferences?.categories || [];
      const readHistory = userProfile?.readingHistory || [];

      articles = await NewArticle.aggregate([
        { $match: matchQuery },
        {
          $addFields: {
            isPreferred: {
              $cond: [{ $in: ["$category.name", preferences] }, 1, 0],
            },
            isRead: { $cond: [{ $in: ["$_id", readHistory] }, 1, 0] },
          },
        },
        { $sort: { isPreferred: -1, isRead: 1, createdAt: -1 } },
        { $skip: skip },
        { $limit: limit },
      ]);

      total = await NewArticle.countDocuments();
    } else {
      // guest user
      total = await NewArticle.countDocuments({ status: "published" });
      articles = await NewArticle.find({ status: "published" })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
    }

    const hasMore = page * limit < total;

    return NextResponse.json({ success: true, articles, hasMore });
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
        return tagsValue.map((t) => String(t).trim()).filter(Boolean);
      }
      if (typeof tagsValue === "string") {
        return tagsValue
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);
      }
      return [];
    };

    let title = "",
      content = "",
      category = "",
      status = "published";
    let metaTitle = "",
      metaDescription = "",
      focusKeyword = "",
      seoScore = 0;
    let articleContentType = "manual",
      imageUrl = "",
      rawTags: any = "";

    // Support for both JSON and Multipart/Form-Data
    if (contentType.includes("application/json")) {
      const body = await req.json();
      title = body.title || "";
      content = body.content || "";
      category = body.category || "";
      rawTags = body.tags;
      metaTitle = body.metaTitle || "";
      metaDescription = body.metaDescription || "";
      focusKeyword = body.focusKeyword || "";
      seoScore = body.seoScore || 0;
      articleContentType = body.contentType || "manual";
      status = body.status || "published";
      imageUrl = body.imageUrl || "";
    } else {
      const formData = await req.formData();
      title = (formData.get("title") as string) || "";
      content = (formData.get("content") as string) || "";
      category = (formData.get("category") as string) || "";
      rawTags = formData.get("tags");
      metaTitle = (formData.get("metaTitle") as string) || "";
      metaDescription = (formData.get("metaDescription") as string) || "";
      focusKeyword = (formData.get("focusKeyword") as string) || "";
      seoScore = Number(formData.get("seoScore")) || 0;
      status = (formData.get("status") as string) || "published";
      articleContentType = (formData.get("contentType") as string) || "manual";

      const imageFile = formData.get("image") as File | null;
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

    const tags = normalizeTags(rawTags);

    if (!title.trim())
      return NextResponse.json(
        { error: "Title is required." },
        { status: 400 },
      );

    // Slug generation with uniqueness check
    let slug = await generateSlug(title);
    let exists = await NewArticle.findOne({ slug });
    let counter = 1;
    while (exists) {
      slug = `${await generateSlug(title)}-${counter}`;
      counter++;
      exists = await NewArticle.findOne({ slug });
    }

    // Analytics and Metadata calculation
    const plainText = (content ?? "")
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const excerpt = plainText.slice(0, 200);
    const wordCount = plainText
      ? plainText.split(/\s+/).filter(Boolean).length
      : 0;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    // Author Info from Session
    const session = await auth.api.getSession({ headers: req.headers });
    const userProfile = session?.user?.email
      ? await User.findOne({ email: session.user.email })
      : null;

    const author = {
      _id: userProfile?._id.toString() || "unknown",
      name: userProfile?.name || "Unknown",
      email: userProfile?.email || "unknown@example.com",
      avatar: userProfile?.photoURL || "",
      role:
        userProfile?.role === "admin"
          ? "admin"
          : userProfile?.role === "Author"
            ? "writer"
            : "editor",
    };

    // Construct Category and Tags objects
    const categoryObj = {
      _id: category || "uncategorized",
      name: category || "Uncategorized",
      slug: category ? await generateSlug(category) : "uncategorized",
    };

    const tagObjs = await Promise.all(
      tags.map(async (t) => ({
        _id: (await generateSlug(t)) || "tag",
        name: t,
        slug: (await generateSlug(t)) || "tag",
      })),
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
      seo: { metaTitle, metaDescription, focusKeyword, score: seoScore },
      wordCount,
      readingTime,
    });

    return NextResponse.json({
      success: true,
      id: newArticle._id,
      article: newArticle,
    });
  } catch (error: any) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

