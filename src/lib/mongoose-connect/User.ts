import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  bio?: string;
  image?: string | null;
  emailVerified?: Boolean;
  status?: string;
  isBlocked?: boolean;
  discount?: number;
  createdAt: Date;
  updatedAt: Date;
  
  plan?: string;
  article?: number;
  joinedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ["user", "admin", "editor"], default: "user" },
    isBlocked: { type: Boolean, default: false },
    discount: { type: Number, default: 0 },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    image: { type: String, default: "" },
    bio: { type: String, default: "" },
    emailVerified: { type: Boolean, default: false },
    plan: { type: String, enum: ["free", "pro"], default: "free" },
    article: { type: Number, default: 0 },
    joinedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Prevent model overwrite error in dev
export const UserCurd: Model<IUser> =
  mongoose.models.user || mongoose.model<IUser>("user", UserSchema,"user");