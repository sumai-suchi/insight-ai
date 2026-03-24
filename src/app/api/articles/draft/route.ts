import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongoose-connect/connect-db";
import NewArticle from "@/lib/models/NewArticle";

export async function GET() {
  try {
    await connectMongo();

    const drafts = await NewArticle.find({ status: "draft" }).sort({ updatedAt: -1 });

    return NextResponse.json({ success: true, drafts });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch drafts" },
      { status: 500 }
    );
  }
}