// src/lib/models/Comments.ts
import mongoose, { Schema } from "mongoose";

const CommentSchema = new Schema({
    articleId: { type: Schema.Types.ObjectId, ref: "NewArticle", required: true, index: true },
    user: {
      name: { type: String, required: true },
      avatar: { type: String, default: "" },
      email: { type: String, required: true },
    },
    content: { type: String, required: true },
    parentId: { type: Schema.Types.ObjectId, ref: "Comment", default: null, index: true },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Comment = mongoose.models.Comment || mongoose.model("Comment", CommentSchema);
export default Comment;