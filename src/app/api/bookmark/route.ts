import Bookmark from "@/lib/models/Bookmark";
import connectMongo from "@/lib/mongoose-connect/connect-db";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectMongo();

    const body = await req.json();
    const userId = body.userId || "demo-user-123";

    const newBookmark = new Bookmark({
      userId,
      articleId: body.articleId,
      title: body.title,
      url: body.url,
    });

    await newBookmark.save();

    return NextResponse.json({
      success: true,
      message: "Bookmark saved seccessfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Error saving bookmark" },
      { status: 500 },
    );
  }
}
