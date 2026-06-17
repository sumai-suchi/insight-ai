import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/mongoose-connect/connect-db";
import UArticle from "@/lib/models/UserArticle";

export async function POST(req: NextRequest) {
  try {
    await connectMongo();

    const body = await req.json();
    console.log("Incoming:", body);

    const { title, content, authorId, image } = body;

    if (!title || !content || !authorId) {
      return NextResponse.json(
        { message: "Missing fields" },
        { status: 400 }
      );
    }

    const article = await UArticle.create({
      title,
      content,
      image,
      authorId,
      
      status: "draft",
    });

    return NextResponse.json(article, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}