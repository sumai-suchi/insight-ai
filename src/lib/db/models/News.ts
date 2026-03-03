import mongoose, { Model, Schema } from "mongoose";
import { INews, NewsCategory } from "@/types/news";

const NewsSchema = new Schema<INews>(
  {
    sourceId: { type: String, default: null },
    sourceName: { type: String, required: true },
    author: { type: String, default: null },
    title: { type: String, required: true },
    description: { type: String, default: null },
    url: { type: String, required: true, unique: true }, // unique → duplicate block
    urlToImage: { type: String, default: null },
    publishedAt: { type: Date, required: true },
    content: { type: String, default: null },
    category: {
      type: String,
      enum: [
        "all",
        "technology",
        "business",
        "marketing",
        "startups",
      ] as NewsCategory[],
      required: true,
    },
  },
  { timestamps: true },
);

// Fast queries for category + date
NewsSchema.index({ category: 1, publishedAt: -1 });

const News: Model<INews> =
  mongoose.models.News || mongoose.model<INews>("News", NewsSchema);

export default News;
