import { NextRequest, NextResponse } from "next/server";
import { isValidObjectId } from "mongoose";
import connectMongo from "@/lib/mongoose-connect/connect-db"; 
import EditorArticle from "@/lib/models/NewArticle"

// ─── DELETE /api/articles/drafts/[id] ────────────────────────────────────────
export async function DELETE(_req: NextRequest, context: { params: Promise<{ id: string }> }) {
  // Await the params first
  const { id } = await context.params;

  if (!isValidObjectId(id)) {
    return NextResponse.json(
      { success: false, error: "Invalid article ID." },
      { status: 400 }
    );
  }

  try {
    await connectMongo();

    const deleted = await EditorArticle.findOneAndDelete({
      _id: id,
      status: "draft",
    });

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Draft not found or already published." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, deletedId: id });
  } catch (error) {
    console.error("[DELETE /api/articles/drafts/[id]]", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete draft." },
      { status: 500 }
    );
  }
}

// ─── PATCH /api/articles/drafts/[id] ────────────────────────────────────────
// export async function PATCH(_req: NextRequest, context: { params: Promise<{ id: string }> }) {
//   const { id } = await context.params;

//   if (!isValidObjectId(id)) {
//     return NextResponse.json(
//       { success: false, error: "Invalid article ID." },
//       { status: 400 }
//     );
//   }

//   try {
//     await connectMongo();

//     const updated = await EditorArticle.findOneAndUpdate(
//       { _id: id, status: "draft" },
//       { $set: { status: "published", updatedAt: new Date() } },
//       { new: true, select: "_id title status updatedAt" }
//     );

//     if (!updated) {
//       return NextResponse.json(
//         { success: false, error: "Draft not found or already published." },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ success: true, data: updated });
//   } catch (error) {
//     console.error("[PATCH /api/articles/drafts/[id]]", error);
//     return NextResponse.json(
//       { success: false, error: "Failed to publish article." },
//       { status: 500 }
//     );
//   }
// }

// ─── Get /api/articles/drafts/[id] ────────────────────────────────────────
export async function GET(_req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  if (!isValidObjectId(id)) {
    return NextResponse.json(
      { success: false, error: "Invalid article ID." },
      { status: 400 }
    );
  }

  try {
    await connectMongo();

    const article = await EditorArticle.findById(id);

    if (!article) {
      return NextResponse.json(
        { success: false, error: "Article not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: article });
  } catch (error) {
    console.error("[GET /api/articles/drafts/[id]]", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch article." },
      { status: 500 }
    );
  }
}

// ─── PATCH /api/articles/drafts/[id] ────────────────────────────────────────
export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  if (!isValidObjectId(id)) {
    return NextResponse.json(
      { success: false, error: "Invalid article ID." },
      { status: 400 }
    );
  }

  try {
    await connectMongo();

    // Get the updated fields from request body
    const body = await req.json();
    const { title, content, slug, excerpt, status } = body;

    const updated = await EditorArticle.findOneAndUpdate(
      { _id: id, status: "draft" },
      {
        $set: {
          ...(title && { title }),
          ...(content && { content }),
          ...(slug && { slug }),
          ...(excerpt && { excerpt }),
          ...(status && { status }),
          updatedAt: new Date(),
        },
      },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Draft not found or already published." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("[PATCH /api/articles/drafts/[id]]", error);
    return NextResponse.json(
      { success: false, error: "Failed to update draft." },
      { status: 500 }
    );
  }
}