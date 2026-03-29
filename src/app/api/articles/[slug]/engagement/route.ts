import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/mongoose-connect/connect-db";
import NewArticle from "@/lib/models/NewArticle";
import mongoose from "mongoose";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectMongo();
    const { slug } = await params;
    console.log("Slug:", slug);
    const { action } = await request.json(); // actions: 'view', 'like', 'unlike', 'dislike', 'undislike'

    let update = {};

    switch (action) {
      case "view":
        update = { $inc: { views: 1 } };
        break;
      case "like":
        update = { $inc: { likes: 1 } };
        break;
      case "unlike":
        update = { $inc: { likes: -1 } };
        break;
      case "dislike":
        update = { $inc: { dislikes: 1 } };
        break;
      case "undislike":
        update = { $inc: { dislikes: -1 } };
        break;
      default:
        return NextResponse.json({ success: false, message: "Invalid action" }, { status: 400 });
    }

    const updatedArticle = await NewArticle.findOneAndUpdate(
      { slug },
      update,
      { new: true }
    );

    if (!updatedArticle) {
      return NextResponse.json({ success: false, message: "Article not found" }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      data: {
        views: updatedArticle.views,
        likes: updatedArticle.likes,
        dislikes: updatedArticle.dislikes
      } 
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}