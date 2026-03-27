import connectMongo from "@/lib/mongoose-connect/connect-db";
import { generateSlug } from "../route";
import { NextResponse } from "next/server";
import NewArticle from "@/lib/models/NewArticle";

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
  
      const updated = await NewArticle.findByIdAndUpdate(
        id,
        {
          title,
          slug,
          content,
          category,
          tags,
          metaTitle,
          metaDescription,
          status,
          image: imageUrl,
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