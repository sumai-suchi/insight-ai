import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const cache = new Map<string, string>();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text } = body;

    if (!text) {
      return NextResponse.json({ summary: "No Text Provided" });
    }

    // যদি আগে summary generate হয়ে থাকে
    if (cache.has(text)) {
      return NextResponse.json({ summary: cache.get(text) });
    }

    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(
      `Summarize this news article in 3 sentences:\n${text}`,
    );

    const summary = result.response.text();

    // cache এ save
    cache.set(text, summary);

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Summarize API Error:", error);

    return NextResponse.json(
      { summary: "Failed to generate summary" },
      { status: 500 },
    );
  }
}
