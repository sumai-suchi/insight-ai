import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin" | "Author";
  photoURL?: string;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
    },
    role: {
      type: String,
      enum: ["user", "admin", "Author"],
      default: "user",
    },
    photoURL: {
      type: String,
      default: "",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false, // We're using createdAt manually
  },
);

// Pre-save hook to hash password if modified
// Return a Promise instead of using the callback `next` to avoid runtime issues
UserSchema.pre("save", function (this: any) {
  const doc = this as any;

  // Only hash password if it's new or modified
  if (!doc.isModified("password")) {
    return undefined;
  }

  // If password already looks hashed, skip
  if (typeof doc.password === "string" && doc.password.startsWith("$2")) {
    return undefined;
  }

  const saltRounds = 10;
  return bcrypt.hash(doc.password, saltRounds).then((hashed: string) => {
    doc.password = hashed;
  });
});

// Prevent re-compilation during development
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
