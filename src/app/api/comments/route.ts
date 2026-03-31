import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectMongo from "@/lib/mongoose-connect/connect-db";
import Comment from "@/lib/models/Comments";
import NewArticle from "@/lib/models/NewArticle";
import {
  GoogleGenerativeAI,
  SchemaType,
  ResponseSchema,
} from "@google/generative-ai";

// 1. Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

async function moderateWithGemini(
  content: string,
): Promise<{ status: string; flag: string }> {
  try {
    // UPDATED: Using Gemini 3 Flash (current 2026 standard)
    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
    });

    const schema: ResponseSchema = {
      type: SchemaType.OBJECT,
      properties: {
        status: {
          type: SchemaType.STRING,
          enum: ["approved", "pending", "removed"],
          description: "Moderation status",
          format: "enum", // Correct format for strict TS
        },
        flag: {
          type: SchemaType.STRING,
          enum: ["none", "spam", "toxic", "misinformation"],
          description: "Safety flag",
          format: "enum", // Correct format for strict TS
        },
      },
      required: ["status", "flag"],
    };

    const prompt = `Classify this user comment for a blog: "${content}"`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    return JSON.parse(result.response.text());
  } catch (error) {
    console.error("Gemini Moderation Error:", error);
    return { status: "pending", flag: "none" };
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectMongo();
    const { searchParams } = new URL(request.url);
    const articleId = searchParams.get("articleId");

    if (!articleId || !mongoose.Types.ObjectId.isValid(articleId)) {
      return NextResponse.json(
        { success: false, message: "Valid ID required" },
        { status: 400 },
      );
    }
    const comments = await Comment.find({
      articleId: new mongoose.Types.ObjectId(articleId),
    }).sort({ createdAt: -1 });

    // const comments = await Comment.find({ articleId: new mongoose.Types.ObjectId(articleId) ,  status: "approved" // <--- CRITICAL FILTER})
    //   .sort({ createdAt: -1 })
    //   .lean();

    return NextResponse.json({ success: true, data: comments });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectMongo();
    const body = await request.json();
    const { articleId, content, user, parentId } = body;

    if (!articleId || !content || !user) {
      return NextResponse.json(
        { success: false, message: "Missing fields" },
        { status: 400 },
      );
    }

    // 1. Moderate with AI
    const { status, flag } = await moderateWithGemini(content);
    console.log("Moderation Result:", { status, flag });

    // 2. Prepare Data
    const commentData = {
      articleId: new mongoose.Types.ObjectId(articleId),
      content,
      user,
      parentId: parentId ? new mongoose.Types.ObjectId(parentId) : null,
      status,
      flag,
    };

    // 3. Save Comment
    const newComment = await Comment.create(commentData);

    // 4. Update Article Count if Approved
    if (status === "approved") {
      await NewArticle.findByIdAndUpdate(articleId, {
        $inc: { commentCount: 1 },
      });
    }

    return NextResponse.json({
      success: true,
      data: newComment,
      moderated: { status, flag },
    });
  } catch (error: any) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
