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
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false } // because _id comes from BetterAuth
);

const UserProfile =
  models.UserProfile || model("UserProfile", userProfileSchema);

export default UserProfile;