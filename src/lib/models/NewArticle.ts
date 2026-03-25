import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    category: String,
    tags: [String],
    metaTitle: String,
    metaDescription: String,
    status: String,
    image: String,
    slug: { type: String, unique: true },
  },
  { timestamps: true },
);

const Article =
  mongoose.models.Article || mongoose.model("Article", ArticleSchema, "news");

export default Article;
