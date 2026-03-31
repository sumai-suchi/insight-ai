import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: {
    type: String,
    enum: ["system", "security", "article", "support"],
    default: "system",
  },

  recipientRole: {
    type: String,
    enum: ["ADMIN", "EDITOR", "USER", "ALL"],
    default: "ALL",
  },
  recipientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  }, 

  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const Notification =
  mongoose.models.Notification ||
  mongoose.model("Notification", NotificationSchema);
