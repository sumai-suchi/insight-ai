import mongoose, { Schema } from "mongoose";

const ARTICLE_STATUSES = [
  "draft",
  "in_review",
  "ai_review",
  "approved",
  "published",
  "scheduled",
  "rejected",
] as const;

const CONTENT_TYPES = ["manual", "ai_generated", "ai_assisted"] as const;

const AUTHOR_ROLES = ["editor", "writer", "admin"] as const;

const AuthorSchema = new Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    avatar: { type: String, default: "" },
    role: { type: String, enum: AUTHOR_ROLES, required: true },
  },
  { _id: false },
);

const CategorySchema = new Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    slug: { type: String, required: true },
  },
  { _id: false },
);

const TagSchema = new Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    slug: { type: String, required: true },
  },
  { _id: false },
);

const SeoMetaSchema = new Schema(
  {
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    focusKeyword: { type: String, default: "" },
    score: { type: Number, default: 0 },
  },
  { _id: false },
);

const AIIssueSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["factual", "tone", "grammar", "plagiarism", "hallucination"],
      required: true,
    },
    severity: { type: String, enum: ["low", "medium", "high"], required: true },
    description: { type: String, required: true },
    originalText: { type: String, required: true },
    suggestion: { type: String, required: true },
  },
  { _id: false },
);

const AIReviewResultSchema = new Schema(
  {
    overallScore: { type: Number, default: 0 },
    factualityScore: { type: Number, default: 0 },
    toneScore: { type: Number, default: 0 },
    grammarScore: { type: Number, default: 0 },
    issues: { type: [AIIssueSchema], default: [] },
    reviewedAt: { type: String, default: "" },
  },
  { _id: false },
);

const EditorArticleSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    content: { type: String, default: "" }, // HTML
    excerpt: { type: String, default: "" },
    featuredImage: { type: String, default: "" },
    author: { type: AuthorSchema, required: true },
    category: { type: CategorySchema, required: true },
    tags: { type: [TagSchema], default: [] },
    status: {
      type: String,
      enum: ARTICLE_STATUSES,
      required: true,
      default: "draft",
    },
    contentType: {
      type: String,
      enum: CONTENT_TYPES,
      required: true,
      default: "manual",
    },
    seo: {
      type: SeoMetaSchema,
      default: () => ({
        metaTitle: "",
        metaDescription: "",
        focusKeyword: "",
        score: 0,
      }),
    },
    aiReview: { type: AIReviewResultSchema, required: false },
    wordCount: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },

    
    readingTime: { type: Number, default: 0 }, // minutes
    submittedAt: { type: String, default: "" },
    publishedAt: { type: String, default: "" },
    scheduledFor: { type: String, default: "" },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        const r = ret as any;
        r._id = r._id?.toString?.() ?? r._id;
        return r;
      },
    }, 
  }
);

// Final Export: Use 'EditorArticle' uniformly
const  EditorArticle = mongoose.models.EditorArticle ||
  mongoose.model("EditorArticle", EditorArticleSchema);

  export default EditorArticle;


