import { geminiModel } from "./geminiClient";

export async function generateArticle(prompt: string) {
  const result = await geminiModel.generateContentStream(prompt);
  return result.stream;
}
