import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { prompt } = await request.json();

  try {
<<<<<<< HEAD
    const key = process.env.NEXT_PUBLIC_GEMINI_API_KEY; // your API key in .env
=======
    const key = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
>>>>>>> bc1047ba25e6ee12727aa8ef3da0b75adf8620b7
    const url =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": key ?? "",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    });

    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    return NextResponse.json({ text });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 },
    );
  }
}
