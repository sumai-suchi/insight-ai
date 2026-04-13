import connectMongo from "@/lib/mongoose-connect/connect-db";
import { NextRequest, NextResponse } from "next/server";
import UArticle from "@/lib/models/UserArticle";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ Id: string }> }
) {
  await connectMongo();

  // ✅ Await params
  const { Id } = await context.params;

  console.log("UserId:", Id);

  const articles = await UArticle.find({ authorId: Id });

  return NextResponse.json(articles);
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ Id: string }> }
) {
  await connectMongo();

  const { Id } = await context.params;

  if (!Id) {
    return NextResponse.json(
      { error: "Article ID is required" },
      { status: 400 }
    );
  }

  try {
    const article = await UArticle.findById(Id);

    if (!article) {
      return NextResponse.json(
        { error: "Article not found" },
        { status: 404 }
      );
    }

    article.status = "pending";
    await article.save();

    return NextResponse.json({
      message: "Article submitted for review",
      article,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}