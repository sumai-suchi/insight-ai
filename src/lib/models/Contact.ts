import mongoose, { Schema, Document } from "mongoose";

export interface Icontact extends Document {
  name: string;
  email: string;
  message: string;
  status: "new" | "seen" | "replied";
  createdAt: Date;
}

const ContactSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["new", "seen", "replied"],
      default: "new",
    },
  },
  {
    timestamps: true, // createdAt, updatedAt auto add করবে
  },
);

export default mongoose.models.Contact || mongoose.model<Icontact>("Contact" , ContactSchema)