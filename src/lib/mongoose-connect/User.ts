import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: string;
  image?: string | null;
  emailVerified?: Boolean;
  status?: string;
  isBlocked?: boolean;
  discount?: number;
  createdAt: Date;
  updatedAt: Date;
}
const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    isBlocked: { type: Boolean, default: false },
    discount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Prevent model overwrite error in dev
export const UserCurd: Model<IUser> =
  mongoose.models.user || mongoose.model<IUser>("user", UserSchema,"user");