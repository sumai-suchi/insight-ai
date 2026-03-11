import { model, models, Schema } from "mongoose";

const bookbarkSchema = new Schema(
  {
    userId: { type: String, required: true },
    articleId: { type: String, required: true },
    title: { type: String, required: true },
    url: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const Bookmark = models.Bookmark || model("Bookmark", bookbarkSchema);

export default Bookmark;
