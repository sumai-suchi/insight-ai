import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IUser extends Document {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin" | "editor";
  bio?: string;
  image?: string;
  emailVerified?: boolean;

  status?: "active" | "blocked" | "pending";

  isBlocked?: boolean;
  discount?: number;

  createdAt: Date;
  updatedAt: Date;

  plan?: "free" | "pro";
  article?: number;
  joinedAt: Date;
}

export type AuthUser ={
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image?: string | null | undefined;
    }

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    role: {
      type: String,
      enum: ["user", "admin", "editor"],
      default: "user",
    },

    status: {
      type: String,
      enum: ["active", "blocked", "pending"],
      default: "pending",
    },

    isBlocked: { type: Boolean, default: false },

    discount: { type: Number, default: 0 },

    image: { type: String, default: "" },

    bio: { type: String, default: "" },

    emailVerified: { type: Boolean, default: false },

    plan: {
      type: String,
      enum: ["free", "pro"],
      default: "free",
    },

    article: { type: Number, default: 0 },

    joinedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const UserCurd: Model<IUser> =
  mongoose.models.user || mongoose.model<IUser>("user", UserSchema, "user");