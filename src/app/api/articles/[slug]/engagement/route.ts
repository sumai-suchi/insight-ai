
import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/mongoose-connect/connect-db";
// import NewArticle from "@/lib/models/NewArticle";
import EditorArticle from "@/lib/models/NewArticle"
import mongoose from "mongoose";

// === ADDED FOR DELETE START ===
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectMongo();
    const { slug } = await params; 


    const deletedArticle = await NewArticle.findByIdAndDelete(slug);

    if (!deletedArticle) {
      return NextResponse.json(
        { success: false, message: "Article not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: "Article deleted successfully" 
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message }, 
      { status: 500 }
    );
  }
}
// === ADDED FOR DELETE END ===

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectMongo();
    const { slug } = await params;
    const body = await request.json();
    const { action } = body;

    let update = {};

    // 1. Ensure fields exist or initialize them to 0 if they don't exist
    switch (action) {
      case "view":
        update = { $inc: { views: 1 } };
        break;
      case "like":
        update = { $inc: { likes: 1 } };
        break;
      case "unlike":
        // Prevent likes from going below 0 (optional but recommended)
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

    // 2. Use findOneAndUpdate with runValidators and setDefaultsOnInsert
    const updatedArticle = await EditorArticle.findOneAndUpdate(
      { slug: slug },
      update,
      { 
        new: true, 
        runValidators: true // Ensures schema logic is followed
      }
    ).exec(); // .exec() ensures the promise is handled correctly
    console.log(updatedArticle);
   
    if (!updatedArticle) {
      return NextResponse.json({ success: false, message: "Article not found" }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      data: {
        views: updatedArticle.views || 0,
        likes: updatedArticle.likes || 0,
        dislikes: updatedArticle.dislikes || 0
      } 
    });
  } catch (error: any) {
    console.error("Update Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}