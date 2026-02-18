export function articlePrompt({ topic, keywords, tone, wordCount }) {
  return `
You are an expert SEO content writer.

Rules:
- Use proper H1, H2, H3
- No emojis
- Avoid keyword stuffing
- Original content only

Write an article about:
Topic: ${topic}
Target keywords: ${keywords.join(", ")}
Tone: ${tone}
Word count: ${wordCount}

Return markdown only.
`;
}
