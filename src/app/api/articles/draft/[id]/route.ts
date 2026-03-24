// /app/api/articles/draft/[id]/route.ts
import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongoose-connect/connect-db";
import NewArticle from "@/lib/models/NewArticle";

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await connectMongo();

    // ✅ Await params
    const { id } = await context.params;
    console.log("Deleting draft with id:", id);

    const deleted = await NewArticle.findByIdAndDelete(id);

    if (!deleted)
      return NextResponse.json(
        { success: false, message: "Draft not found" },
        { status: 404 }
      );

    return NextResponse.json({ success: true, message: "Draft deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to delete draft" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await connectMongo();
    const { id } = await context.params;

    const draft = await NewArticle.findById(id);

    if (!draft)
      return NextResponse.json({ success: false, message: "Draft not found" }, { status: 404 });

    return NextResponse.json({ success: true, article: draft });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Failed to fetch draft" }, { status: 500 });
  }
}

export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await connectMongo();
    const { id } = await context.params;

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const category = formData.get("category") as string;
    const tags = (formData.get("tags") as string) || "";
    const metaTitle = formData.get("metaTitle") as string;
    const metaDescription = formData.get("metaDescription") as string;
    const status = formData.get("status") as string;
    const imageFile = formData.get("image") as Blob | null;

    const updateData: any = {
      title,
      content,
      category,
      tags: tags.split(",").map((t) => t.trim()),
      metaTitle,
      metaDescription,
      status,
    };

    // ✅ Handle image correctly
    if (imageFile && imageFile.size > 0) {
      const arrayBuffer = await imageFile.arrayBuffer(); // works for Blob in Node.js
      const buffer = Buffer.from(arrayBuffer);

      const cloudinary = (await import("@/lib/cloudinary")).default;

      const uploadRes = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "articles" }, (err, result) => {
            if (err) reject(err);
            else resolve(result);
          })
          .end(buffer);
      });

      updateData.image = uploadRes.secure_url;
    }

    const updatedDraft = await NewArticle.findByIdAndUpdate(id, updateData, { new: true });

    return NextResponse.json({ success: true, article: updatedDraft });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Failed to update draft" }, { status: 500 });
  }
}