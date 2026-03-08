import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // 1. Parse the request body safely
    const body = await req.json();
    const { prompt } = body as { prompt: string };

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 },
      );
    }

    // 2. Ensure the API key exists
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      throw new Error("NEXT_PUBLIC_GEMINI_API_KEY is missing from environment variables");
    }

    // 3. Initialize the Gemini API client
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

    // 4. Choose the model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // 5. Generate the content
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // 6. Return the text to the frontend
    return NextResponse.json({ text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 },
    );
  }
}
