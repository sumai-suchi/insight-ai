import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Accept either a raw prompt or a messages array for chat history
    const baseInstruction =
      "You are an AI chat bot. Reply in a short, conversational chat message rather than a long article.";

    let prompt: string | undefined;
    if (body.prompt) {
      prompt = `${baseInstruction} ${body.prompt}`;
    } else if (Array.isArray(body.messages)) {
      // build a simple conversation string from message history
      prompt =
        baseInstruction +
        "\n" +
        (body.messages
          .map((m: { role: string; content: string }) => {
            const role = m.role === "assistant" ? "Assistant" : "User";
            return `${role}: ${m.content}`;
          })
          .join("\n") +
          "\nAssistant:");
    }

    if (!prompt) {
      return new Response("Prompt or messages are required", { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is missing from environment variables");
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Use the streaming API from the Gemini SDK
          // Depending on SDK version, generateContentStream may accept a string or a config object.
          // Here we keep it simple and pass the prompt directly.
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const result: any = await (model as any).generateContentStream(
            prompt,
          );

          for await (const chunk of result.stream) {
            const chunkText = chunk?.text?.() ?? "";
            if (chunkText) {
              controller.enqueue(encoder.encode(chunkText));
            }
          }
        } catch (error) {
          console.error("Gemini streaming API Error:", error);
          controller.error(error);
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
  } catch (error) {
    console.error("Gemini streaming route error:", error);
    return new Response("Failed to start streaming response", { status: 500 });
  }
}
