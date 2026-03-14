import { NextRequest, NextResponse } from "next/server";

const TONE_INSTRUCTIONS: Record<string, string> = {
  Professional:
    "Write in a professional, authoritative tone. Use formal language, industry-specific terminology, clear structure with headings, and data-driven insights. Avoid contractions and casual phrases.",
  Casual:
    "Write in a casual, conversational tone. Use everyday language, contractions, and a relaxed style — like you're talking to a friend. Keep it light and approachable.",
  Friendly:
    "Write in a warm, friendly, and encouraging tone. Be personable and supportive. Use 'you' and 'we' to create connection with the reader.",
  Formal:
    "Write in a strictly formal tone. Use precise, academic language. Avoid all contractions and slang. Structure the content with proper paragraphs and logical flow.",
  Enthusiastic:
    "Write in an energetic, enthusiastic, and motivating tone. Use exclamations, powerful action words, and convey genuine excitement about the topic!",
};

export async function POST(req: NextRequest) {
  try {
    const { prompt, tone } = await req.json();

    if (!prompt?.trim()) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 },
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenRouter API key not configured" },
        { status: 500 },
      );
    }

    const toneInstruction =
      TONE_INSTRUCTIONS[tone] || TONE_INSTRUCTIONS.Professional;

    const systemPrompt = `You are a professional AI content writer. Your writing style must strictly match the tone instruction below.

TONE INSTRUCTION (follow this exactly):
${toneInstruction}

STRICT RULES:
- If tone is Casual: use simple words, contractions (you're, let's, it's), friendly language, short sentences, like talking to a friend
- If tone is Professional: use formal language, industry terms, structured paragraphs, no contractions
- If tone is Friendly: use warm encouraging words, "you" and "we", supportive language
- If tone is Formal: use academic language, precise words, no slang, no contractions
- If tone is Enthusiastic: use exclamations, exciting words, high energy, motivating language
- Length: 250-400 words
- No markdown symbols like **, ##, or * 
- Plain text only
- The tone must be clearly noticeable and different for each style`;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "AI Content Editor",
        },
        body: JSON.stringify({
          model: "openrouter/auto",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: `Write content about: ${prompt}` },
          ],
        }),
      },
    );

    if (!response.ok) {
      const err = await response.text();
      console.error("OpenRouter API error:", err);
      return NextResponse.json(
        { error: "Failed to generate content" },
        { status: 500 },
      );
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        { error: "No content generated" },
        { status: 500 },
      );
    }

    return NextResponse.json({ content });
  } catch (error) {
    console.error("Generate content error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
