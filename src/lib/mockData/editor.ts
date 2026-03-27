// lib/mockData/editor.ts

import type {
  Article, ReviewQueueItem, DashboardStats,
  ScheduledArticle, ActivityItem, Comment
} from "@/types/editor"

export const mockStats: DashboardStats = {
  inReview: 12,
  urgentReview: 4,
  drafts: 7,
  aiDrafts: 3,
  publishedToday: 5,
  publishedYesterday: 3,
  scheduled: 9,
  nextScheduledIn: "2h",
  flaggedComments: 6,
};

export const mockAuthors = {
  sadia: { _id: "u1", name: "Sadia Rahman", email: "sadia@insightai.com", role: "writer" as const },
  karim: { _id: "u2", name: "Karim Hossain", email: "karim@insightai.com", role: "writer" as const },
  nadia: { _id: "u3", name: "Nadia Malik", email: "nadia@insightai.com", role: "writer" as const },
  rana:  { _id: "u4", name: "Rana Biswas", email: "rana@insightai.com", role: "writer" as const },
  ai:    { _id: "u5", name: "AI Bot", email: "ai@insightai.com", role: "writer" as const },
};

export const mockCategories = {
  tech:     { _id: "c1", name: "Technology", slug: "technology" },
  finance:  { _id: "c2", name: "Finance", slug: "finance" },
  business: { _id: "c3", name: "Business", slug: "business" },
  world:    { _id: "c4", name: "World", slug: "world" },
};

export const mockReviewQueue: ReviewQueueItem[] = [
  {
    _id: "a1",
    title: "OpenAI releases new reasoning model",
    author: mockAuthors.sadia,
    category: mockCategories.tech,
    contentType: "ai_generated",
    status: "in_review",
    wordCount: 820,
    submittedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    seoScore: 74,
  },
  {
    _id: "a2",
    title: "Bangladesh budget 2025 full analysis",
    author: mockAuthors.karim,
    category: mockCategories.finance,
    contentType: "manual",
    status: "in_review",
    wordCount: 1450,
    submittedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    seoScore: 61,
  },
  {
    _id: "a3",
    title: "Tech startups reshaping Dhaka",
    author: mockAuthors.nadia,
    category: mockCategories.business,
    contentType: "manual",
    status: "in_review",
    wordCount: 1100,
    submittedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    seoScore: 55,
  },
  {
    _id: "a4",
    title: "IPCC climate report key findings",
    author: mockAuthors.ai,
    category: mockCategories.world,
    contentType: "ai_generated",
    status: "ai_review",
    wordCount: 950,
    submittedAt: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
    seoScore: 42,
    aiReview: {
      overallScore: 58,
      factualityScore: 52,
      toneScore: 70,
      grammarScore: 88,
      reviewedAt: new Date().toISOString(),
      issues: [
        {
          type: "factual",
          severity: "high",
          description: "Temperature figure may be inaccurate",
          originalText: "global temperature rose by 2.1°C",
          suggestion: "Verify against latest IPCC data — reported figure is 1.1°C",
        },
        {
          type: "hallucination",
          severity: "medium",
          description: "Citation does not exist",
          originalText: "According to Dr. James Walsh (2024)",
          suggestion: "Remove or replace with a verified source",
        },
      ],
    },
  },
  {
    _id: "a5",
    title: "EV market outlook for South Asia 2026",
    author: mockAuthors.rana,
    category: mockCategories.business,
    contentType: "manual",
    status: "in_review",
    wordCount: 1280,
    submittedAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    seoScore: 88,
  },
];

export const mockScheduled: ScheduledArticle[] = [
  {
    _id: "s1",
    title: "Weekly AI roundup — March 2026",
    category: mockCategories.tech,
    scheduledFor: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    seoScore: 88,
    status: "scheduled",
  },
  {
    _id: "s2",
    title: "Global markets update",
    category: mockCategories.finance,
    scheduledFor: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
    seoScore: 61,
    status: "scheduled",
  },
  {
    _id: "s3",
    title: "Interview: local entrepreneur building in Dhaka",
    category: mockCategories.business,
    scheduledFor: new Date(Date.now() + 20 * 60 * 60 * 1000).toISOString(),
    seoScore: 92,
    status: "scheduled",
  },
];

export const mockActivity: ActivityItem[] = [
  {
    _id: "ac1",
    type: "published",
    message: "Article \"AI in healthcare\" was published",
    createdAt: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
  },
  {
    _id: "ac2",
    type: "submitted",
    message: "Sadia submitted a new draft for review",
    createdAt: new Date(Date.now() - 34 * 60 * 1000).toISOString(),
    user: mockAuthors.sadia,
  },
  {
    _id: "ac3",
    type: "flagged",
    message: "6 comments flagged for moderation",
    createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "ac4",
    type: "scheduled",
    message: "3 articles scheduled for tomorrow",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
];

export const mockComments: Comment[] = [
  {
    _id: "cm1",
    body: "You should be completely ashamed of this coverage. This is pure propaganda and nothing else.",
    authorName: "Anonymous",
    authorEmail: "",
    article: { _id: "a4", title: "IPCC climate report key findings" },
    flag: "toxic",
    status: "pending",
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
  {
    _id: "cm2",
    body: "This is completely wrong, visit my site for the real story — link in bio.",
    authorName: "Jamal K.",
    authorEmail: "jamal@example.com",
    article: { _id: "a1", title: "OpenAI releases new reasoning model" },
    flag: "spam",
    status: "pending",
    createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
  },
  {
    _id: "cm3",
    body: "Great analysis on the budget! Would love to see a follow-up on the IT sector impact.",
    authorName: "Priya S.",
    authorEmail: "priya@example.com",
    article: { _id: "a2", title: "Bangladesh budget 2025 full analysis" },
    flag: "none",
    status: "pending",
    createdAt: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
  },
];


