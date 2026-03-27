// lib/types/editor.ts

export type ArticleStatus =
  | "draft"
  | "in_review"
  | "ai_review"
  | "approved"
  | "published"
  | "scheduled"
  | "rejected";

export type ContentType = "manual" | "ai_generated" | "ai_assisted";

export type ReviewDecision = "approve" | "reject" | "request_changes";

export interface Author {
  _id: string;
  name: string;
  email: string;
  avatar?: string; // initials fallback if missing
  role: "editor" | "writer" | "admin";
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
}

export interface Tag {
  _id: string;
  name: string;
  slug: string;
}

export interface SeoMeta {
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  score: number; // 0–100
}

export interface AIReviewResult {
  overallScore: number; // 0–100
  factualityScore: number;
  toneScore: number;
  grammarScore: number;
  issues: AIIssue[];
  reviewedAt: string;
}

export interface AIIssue {
  type: "factual" | "tone" | "grammar" | "plagiarism" | "hallucination";
  severity: "low" | "medium" | "high";
  description: string;
  originalText: string;
  suggestion: string;
}

export interface Article {
  _id: string;
  title: string;
  slug: string;
  content: string; // HTML from rich text editor
  excerpt: string;
  featuredImage?: string;
  author: Author;
  category: Category;
  tags: Tag[];
  status: ArticleStatus;
  contentType: ContentType;
  seo: SeoMeta;
  aiReview?: AIReviewResult;
  wordCount: number;
  readingTime: number; // minutes
  submittedAt?: string;
  publishedAt?: string;
  scheduledFor?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewQueueItem {
  _id: string;
  title: string;
  author: Author;
  category: Category;
  contentType: ContentType;
  status: ArticleStatus;
  wordCount: number;
  submittedAt: string;
  seoScore: number;
  aiReview?: AIReviewResult;
}

export interface DashboardStats {
  inReview: number;
  urgentReview: number;
  drafts: number;
  aiDrafts: number;
  publishedToday: number;
  publishedYesterday: number;
  scheduled: number;
  nextScheduledIn: string;
  flaggedComments: number;
}

export interface ScheduledArticle {
  _id: string;
  title: string;
  category: Category;
  scheduledFor: string;
  seoScore: number;
  status: "scheduled";
}

export interface ActivityItem {
  _id: string;
  type: "published" | "submitted" | "flagged" | "scheduled" | "approved" | "rejected";
  message: string;
  createdAt: string;
  article?: { _id: string; title: string };
  user?: Author;
}

export interface Comment {
  _id: string;
  body: string;
  authorName: string;
  authorEmail: string;
  article: { _id: string; title: string };
  flag: "none" | "spam" | "toxic" | "misinformation";
  status: "pending" | "approved" | "removed";
  createdAt: string;
}

// API response wrappers
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}


// ─── Shared types ─────────────────────────────────────────────────────────────
 
export type IssueType = "hallucination" | "factual_error" | "tone_issue" | "grammar_issue";
export type Severity  = "high" | "medium" | "low";
 
export interface AuditIssue {
  type: IssueType;
  severity: Severity;
  description: string;
  quote?: string;
}
 
export interface AuditResult {
  scores: { factuality: number; tone: number; grammar: number; overall: number };
  issues: AuditIssue[];
  summary: string;
}
 
export interface SeoCheck {
  label: string;
  passed: boolean;
  weight: number;
  tip?: string;
}
 
export interface SeoResult {
  score: number;
  checks: SeoCheck[];
}
 


 
export interface ArticlePayload {
  title: string;
  content: string;
  contentType: "ai_generated" | "manual";
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  tags: string;
  category: string;
  imageUrl: string;
  seoScore?: number;
}