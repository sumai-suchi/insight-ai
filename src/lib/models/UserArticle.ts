import mongoose, { Schema, Document } from "mongoose";

export interface IArticle extends Document {
  title: string;
  content: string;
  authorId: string;
  image?: string; // 👈 added

  status: "draft" | "pending" | "published" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}

const ArticleSchema = new Schema<IArticle>(
  {
    title: { type: String },
    content: { type: String },
    authorId: { type: String, required: true },

    image: {
      type: String,
      default: "", // 👈 prevents undefined সমস্যা
    },

    status: {
      type: String,
      enum: ["draft", "pending", "published", "rejected"],
      default: "draft",
    },
  },
  { timestamps: true }
);
const UArticle =
  mongoose.models.UserArticle ||
  mongoose.model<IArticle>("UserArticle", ArticleSchema);

// 🔥 ADD THIS LINE (IMPORTANT)
if (mongoose.models.UserArticle) {
  delete mongoose.models.UserArticle;
}

export default UArticle;