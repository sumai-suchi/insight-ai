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

    let articles;
    let total = 0;

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
    const formData = await req.formData();
    await connectMongo();

    // Extract form fields
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const category = formData.get("category") as string;
    const tags = (formData.get("tags") as string) || "";
    const metaTitle = formData.get("metaTitle") as string;
    const metaDescription = formData.get("metaDescription") as string;
    const status = (formData.get("status") as string) || "published";
    const imageFile = formData.get("image") as File | null;

    let slug = await generateSlug(title);

    let exists = await NewArticle.findOne({ slug });
    let counter = 1;

    while (exists) {
      const baseSlug = await generateSlug(title);
      slug = `${baseSlug}-${counter}`;
      counter++;
      exists = await NewArticle.findOne({ slug });
    }

    // Upload image if exists
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

    // Save to database
    const newArticle = await NewArticle.create({
      title,
      slug,
      content,
      category,
      tags: tags ? tags.split(",").map((t) => t.trim()) : [],
      metaTitle,
      metaDescription,
      status,
      image: imageUrl,
    });

    return NextResponse.json({ success: true, article: newArticle });
  } catch (error: any) {
    console.error("Article Post Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Something went wrong" },
      { status: 500 },
    );
  }
}
