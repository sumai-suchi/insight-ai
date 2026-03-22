import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongoose-connect/connect-db";
import NewArticle from "@/lib/models/NewArticle";
import cloudinary from "@/lib/cloudinary";

// Helper function to generate slug
export async function generateSlug(title: string): Promise<string> {
  return new Promise((resolve) => {
    const slug = title
    .toLowerCase()
    .trim()
    .replace(/[:]+/g, "")        // remove colons
    .replace(/\s+/g, "-")        // spaces → hyphens
    .replace(/[^\w-]+/g, "")     // remove other special chars
    .replace(/--+/g, "-");  // remove special chars
    resolve(slug);
  });
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
    const status = formData.get("status") as string;
    const imageFile = formData.get("image") as File | null;

    // Generate slug
 let slug = await generateSlug(title);
  console.log({
  title,
  content,
  category,
  tags: tags.split(",").map((t) => t.trim()),
  slug,
});

    // Check for duplicates
    let exists = await NewArticle.findOne({ slug });
    console.log(exists)
    let counter = 1;
    while (exists) {
      console.log(exists)
      slug = generateSlug(title) + "-" + counter;
      counter++;
      exists = await NewArticle.findOne({ slug });
    }

    // Upload image if exists
    let imageUrl = "";
    if (imageFile) {
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
      tags: tags.split(",").map((t) => t.trim()),
      metaTitle,
      metaDescription,
      status,
      image: imageUrl,
       // ✅ Save slug here!
    });

    return NextResponse.json({ success: true, article: newArticle });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 }
    );
  }
}