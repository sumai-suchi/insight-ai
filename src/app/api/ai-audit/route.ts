// src/app/api/ai-audit/route.ts
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { AuditResult } from "@/types/editor";

const ISSUE_TYPES = ["hallucination", "factual_error", "tone_issue", "grammar_issue"] as const;
const SEVERITIES = ["high", "medium", "low"] as const;

function extractJsonObject(text: string): unknown {
  const trimmed = text.trim();

  const firstBrace = trimmed.indexOf("{");
  const lastBrace = trimmed.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    throw new Error("No JSON object found in model response.");
  }

  const jsonStr = trimmed.slice(firstBrace, lastBrace + 1);
  return JSON.parse(jsonStr);
}

function validateAuditResult(maybe: unknown): AuditResult {
  const obj = maybe as any;

  if (!obj || typeof obj !== "object") {
    throw new Error("Invalid response: not an object.");
  }
  if (typeof obj.summary !== "string") {
    throw new Error("Invalid response: summary must be a string.");
  }

  const scores = obj.scores;
  if (!scores || typeof scores !== "object") {
    throw new Error("Invalid response: scores must be an object.");
  }
  for (const k of ["factuality", "tone", "grammar", "overall"] as const) {
    if (typeof scores[k] !== "number" || !Number.isFinite(scores[k])) {
      throw new Error(`Invalid response: scores.${k} must be a number.`);
    }
  }

  const issues = obj.issues;
  if (!Array.isArray(issues)) {
    throw new Error("Invalid response: issues must be an array.");
  }

  for (const issue of issues) {
    if (!issue || typeof issue !== "object") {
      throw new Error("Invalid response: issue must be an object.");
    }
    if (!ISSUE_TYPES.includes(issue.type)) {
      throw new Error("Invalid response: issue.type is invalid.");
    }
    if (!SEVERITIES.includes(issue.severity)) {
      throw new Error("Invalid response: issue.severity is invalid.");
    }
    if (typeof issue.description !== "string") {
      throw new Error("Invalid response: issue.description must be a string.");
    }
    if (issue.quote !== undefined && typeof issue.quote !== "string") {
      throw new Error("Invalid response: issue.quote must be a string when provided.");
    }
  }

  return obj as AuditResult;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const title = typeof body?.title === "string" ? body.title : "";
    const content = typeof body?.content === "string" ? body.content : "";

    if (!title.trim() || !content.trim()) {
      return NextResponse.json(
        { error: "Title and content are required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY missing from environment." },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash" });

    const prompt = `
You are an expert content auditor.

Analyze the provided article for:
1) factuality (confidence/verification risk of claims; not real-world fact checking)
2) tone (matches the intended writing goal; clarity and consistency of voice)
3) grammar (grammar, punctuation, readability issues)

Return STRICT VALID JSON ONLY (no markdown, no code fences) matching this schema:

{
  "scores": {
    "factuality": number,
    "tone": number,
    "grammar": number,
    "overall": number
  },
  "issues": [
    {
      "type": "hallucination" | "factual_error" | "tone_issue" | "grammar_issue",
      "severity": "high" | "medium" | "low",
      "description": string,
      "quote": string?
    }
  ],
  "summary": string
}

Rules:
- scores are 0-100 integers or numbers
- overall should reflect a weighted combination of the three scores
- issues should list the most important problems you find
- quote should be a short excerpt from the content that supports the issue (omit if not needed)

Title:
${title}

Content:
${content}
`.trim();

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const parsed = extractJsonObject(text);
    const audit = validateAuditResult(parsed);

    return NextResponse.json(audit);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Audit failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

