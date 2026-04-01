import mongoose from "mongoose";

const SettingsSchema = new mongoose.Schema(
  {
    // General
    siteName: { type: String, default: "InSight-AI" },
    supportEmail: { type: String, default: "admin@insightai.com" },
    isMaintenanceMode: { type: Boolean, default: false },

    // AI
    defaultAIModel: { type: String, default: "Gemini 1.5 Pro" },
    aiApiKey: { type: String, default: "" },

    // Security
    allowRegistration: { type: Boolean, default: true },
    allowSocialLogin: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Settings =
  mongoose.models.Settings || mongoose.model("Settings", SettingsSchema);
