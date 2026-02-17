import { articlePrompt } from "@/lib/ai/promptTemplates";
import { generateArticle } from "@/lib/ai/aiService";
import { rateLimit } from "@/lib/rateLimit";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") ?? "anon";

  if (!rateLimit(ip, 3)) {
    return new Response("Too many requests", { status: 429 });
  }

  const { topic, keywords, tone, wordCount } = await req.json();
  const prompt = articlePrompt({ topic, keywords, tone, wordCount });

  const stream = await generateArticle(prompt);
  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const text = chunk.text();
        if (text) controller.enqueue(encoder.encode(text));
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
