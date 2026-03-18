import Bookmark from "@/lib/models/Bookmark";
import connectMongo from "@/lib/mongoose-connect/connect-db";
import { success } from "better-auth";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectMongo();

    const body = await req.json();
    const userId = body.userId;

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

export async function GET(req: NextRequest) {
  try {
    await connectMongo();

    //picing user id from search params
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    //find the user bookmark
    const bookmark = await Bookmark.find({ userId });

    return NextResponse.json({
      success: true,
      data: bookmark,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Error fetching bookmarks" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    await connectMongo();

    if (!id) {
      return NextResponse.json(
        { message: "History not found" },
        { status: 404 },
      );
    }

    await Bookmark.findByIdAndDelete(id);
    return NextResponse.json({
      success: true,
      message: "History deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to delete history" },
      { status: 500 },
    );
  }
}
