import mongoose, { Schema, model, models } from "mongoose";

const userProfileSchema = new Schema(
  {
    _id: { type: String, required: true }, // BetterAuth user ID
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, default: "user" },
    image: { type: String, default: "default.jpg" },
    bio: { type: String, default: "" },
    savedPosts: [{ type: String }], // array of post IDs
    // Progressive profiling (personalization context)
    industry: { type: String, default: "" },
    teamSize: { type: String, default: "" },
    workType: { type: String, default: "" },
    companyName: { type: String, default: "" },
    websiteUrl: { type: String, default: "" },
    profiling: {
      completedAt: { type: Date, default: null },
      dismissedCount: { type: Number, default: 0 },
      updatedAt: { type: Date, default: null },
      version: { type: Number, default: 1 },
    },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false } // because _id comes from BetterAuth
);

const UserProfile =
  models.UserProfile || model("UserProfile", userProfileSchema);

export default UserProfile;