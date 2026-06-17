import mongoose, { Schema } from "mongoose";

const CommentSchema = new Schema(
  {
    articleId: { 
      type: Schema.Types.ObjectId, 
      ref: "NewArticle", 
      required: true, 
      index: true 
    },
    user: {
      name: { type: String, required: true },
      avatar: { type: String, default: "" },
      email: { type: String, required: true },
    },
    content: { type: String, required: true },
    parentId: { 
      type: Schema.Types.ObjectId, 
      ref: "Comment", 
      default: null, 
      index: true 
    },
    likes: { type: Number, default: 0 },

    // --- NEW MODERATION FIELDS ---
    status: {
      type: String,
     enum: ["approved", "pending", "removed", "rejected"],
      default: "pending",
      index: true, // Crucial for the Moderation Dashboard performance
    },
    flag: {
      type: String,
      enum: ["none", "spam", "toxic", "misinformation"],
      default: "none",
    },
  },
  { timestamps: true }
);

const Comment = mongoose.models.Comment || mongoose.model("Comment", CommentSchema);
export default Comment;