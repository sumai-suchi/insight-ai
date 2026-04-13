import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema(
  {
    roleId: {
      type: String,
      required: true,
      unique: true,
    }, // e.g., "admin", "editor", "user"

    name: {
      type: String,
      required: true,
    }, // e.g., "Admin", "Editor"

    description: {
      type: String,
    }, // e.g., "Full system access"

    count: {
      type: Number,
      default: 0,
    }, // e.g., 2, 5, 142

    permissions: {
      articles: { type: [String], default: [] },
      users: { type: [String], default: [] },
      analytics: { type: [String], default: [] },
    },
  },
  { timestamps: true },
);

export const Role = mongoose.models.Role || mongoose.model("Role", RoleSchema);
