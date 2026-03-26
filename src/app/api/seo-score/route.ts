import { NextRequest, NextResponse } from "next/server";
import { SeoCheck, SeoResult } from "@/types/editor";

interface SeoInput {
  title: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  tags: string;
}

function normalize(str: string): string {
  return (str ?? "").toLowerCase().trim();
}

function charLen(str: string): number {
  // Keep it simple: count characters as users typically expect.
  return (str ?? "").length;
}

function wordCount(text: string): number {
  const t = text ?? "";
  const m = t.match(/\b[\w']+\b/g);
  return m ? m.length : 0;
}

function parseTags(tags: string): string[] {
  if (!tags) return [];
  return tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

function includesKeyword(text: string, keyword: string): boolean {
  const kw = normalize(keyword);
  if (!kw) return false;
  return normalize(text).includes(kw);
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<SeoInput>;

    const input: SeoInput = {
      title: body.title ?? "",
      content: body.content ?? "",
      metaTitle: body.metaTitle ?? "",
      metaDescription: body.metaDescription ?? "",
      focusKeyword: body.focusKeyword ?? "",
      tags: body.tags ?? "",
    };

    // Checklist weights sum to 100.
    const checks: SeoCheck[] = [];

    const kwProvided = normalize(input.focusKeyword).length > 0;

    // 1) Title contains focus keyword
    const titleHasKw = kwProvided && includesKeyword(input.title, input.focusKeyword);
    checks.push({
      label: "Focus keyword in title",
      passed: titleHasKw,
      weight: 20,
      tip: kwProvided ? "Include your focus keyword in the title." : "Add a focus keyword first.",
    });

    // 2) Meta title contains focus keyword
    const metaTitleHasKw =
      kwProvided && includesKeyword(input.metaTitle, input.focusKeyword);
    checks.push({
      label: "Focus keyword in meta title",
      passed: metaTitleHasKw,
      weight: 15,
      tip: kwProvided
        ? "Include your focus keyword in the meta title."
        : "Add a focus keyword first.",
    });

    // 3) Meta title length (rough best practice)
    const metaTitleLen = charLen(input.metaTitle);
    const metaTitleLenOk = metaTitleLen >= 50 && metaTitleLen <= 60;
    checks.push({
      label: "Meta title length (50–60 chars)",
      passed: metaTitleLenOk,
      weight: 10,
      tip: metaTitleLenOk
        ? undefined
        : "Aim for a concise meta title between 50 and 60 characters.",
    });

    // 4) Meta description length (rough best practice)
    const metaDescLen = charLen(input.metaDescription);
    const metaDescLenOk = metaDescLen >= 120 && metaDescLen <= 160;
    checks.push({
      label: "Meta description length (120–160 chars)",
      passed: metaDescLenOk,
      weight: 15,
      tip: metaDescLenOk
        ? undefined
        : "Aim for a meta description between 120 and 160 characters.",
    });

    // 5) Meta description contains focus keyword
    const metaDescHasKw =
      kwProvided && includesKeyword(input.metaDescription, input.focusKeyword);
    checks.push({
      label: "Focus keyword in meta description",
      passed: metaDescHasKw,
      weight: 10,
      tip: kwProvided
        ? "Include your focus keyword in the meta description."
        : "Add a focus keyword first.",
    });

    // 6) Content contains focus keyword
    const contentHasKw =
      kwProvided && includesKeyword(input.content, input.focusKeyword);
    checks.push({
      label: "Focus keyword appears in content",
      passed: contentHasKw,
      weight: 20,
      tip: kwProvided
        ? "Mention your focus keyword somewhere in the content."
        : "Add a focus keyword first.",
    });

    // 7) Tags count
    const tags = parseTags(input.tags);
    const tagsOk = tags.length >= 3;
    checks.push({
      label: "At least 3 tags",
      passed: tagsOk,
      weight: 10,
      tip: tagsOk ? undefined : "Add at least 3 comma-separated tags.",
    });

    const totalWeight = checks.reduce((sum, c) => sum + c.weight, 0);
    const earnedWeight = checks.reduce((sum, c) => sum + (c.passed ? c.weight : 0), 0);
    const score = totalWeight > 0 ? Math.round((earnedWeight / totalWeight) * 100) : 0;

    // Optional sanity: if content is very small, slightly penalize score.
    // (Keeps the route functional even without external APIs.)
    const wc = wordCount(input.content);
    const finalScore = wc > 0 ? score : Math.min(score, 20);

    const result: SeoResult = { score: finalScore, checks };
    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "SEO score failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

