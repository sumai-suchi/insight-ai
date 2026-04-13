import { IHistory } from "@/types/hostory";
import mongoose, { Schema } from "mongoose";

const HistorySchema = new Schema<IHistory>({
  userId: { type: String, required: true },
  articleId: { type: String, required: true },
  title: String,
  url: String,
  urlToImage: String,
  sourceName: String,
  category: String,
  publishedAt: Date,

  readAt: { type: Date, default: Date.now() },
});

export default mongoose.models.History ||
  mongoose.model("History", HistorySchema);
