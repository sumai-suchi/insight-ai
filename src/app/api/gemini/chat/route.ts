import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest } from "next/server";

// POST /api/gemini/chat
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body as {
      messages: Array<{ role: string; content: string }>;
    };

    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      throw new Error("NEXT_PUBLIC_GEMINI_API_KEY missing from environment");
    }

    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "models/gemini-2.5-flash",
    });

    // build a text prompt from messages (similar to /stream endpoint)
    const baseInstruction =
      "You are an AI chat bot. Reply in a short chat message to my question; avoid sounding like a Wikipedia article.";

    const prompt =
      baseInstruction +
      "\n" +
      messages
        .map((m) => {
          const role = m.role === "assistant" ? "Assistant" : "User";
          return `${role}: ${m.content}`;
        })
        .join("\n") +
      "\nAssistant:";

    // create a streaming response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const result: any = await (model as any).generateContentStream(
            prompt,
          );

          for await (const chunk of result.stream) {
            const chunkText = chunk?.text?.() ?? "";
            if (chunkText) controller.enqueue(encoder.encode(chunkText));
          }
        } catch (err) {
          console.error("Gemini chat streaming error", err);
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err) {
    console.error("Chat API error", err);
    return Response.json(
      { error: "Failed to send chat message" },
      { status: 500 },
    );
  }
}
