"use client";

import { useState } from "react";

// Define the shape of our API response for better type safety
interface GeminiResponse {
  text?: string;
  error?: string;
}

export default function AiDemoChat() {
  const [prompt, setPrompt] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Type the form event properly
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setResponse(""); // Clear previous response

    try {
      // Send the prompt to our Next.js API Route
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data: GeminiResponse = await res.json();

      if (data.text) {
        setResponse(data.text);
      } else if (data.error) {
        setResponse(`Error: ${data.error}`);
      } else {
        setResponse("Error: Could not get a response.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setResponse("An error occurred while fetching the response.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-8 font-sans">
      <h1 className="text-3xl font-bold mb-6">Ask Gemini</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your prompt here..."
          rows={4}
          className="w-full p-3 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition"
        >
          {isLoading ? "Thinking..." : "Generate Response"}
        </button>
      </form>

      {response && (
        <div className="mt-8 p-6 bg-gray-100 text-gray-800 rounded-md border border-gray-200 shadow-sm">
          {/* pre-wrap preserves line breaks from the AI's response */}
          <p className="whitespace-pre-wrap">{response}</p>
        </div>
      )}
    </main>
  );
}
