import mongoose, { Document, Schema, Model } from "mongoose";

export interface IPayment extends Document {
  userId: string;
  stripeSessionId: string;
  stripePaymentIntentId?: string;
  plan: string;
  interval: "monthly" | "yearly"; // ✅ better type
  amount: number;
  currency: string;
  status: "paid" | "pending" | "failed";
}

const PaymentSchema = new Schema<IPayment>(
  {
    userId: { type: String, required: true },

    stripeSessionId: {
      type: String,
      required: true,
      unique: true, // ✅ prevent duplicate
      index: true,
    },

    stripePaymentIntentId: {
      type: String,
      index: true,
    },

    plan: { type: String, required: true },

    interval: {
      type: String,
      enum: ["monthly", "yearly"], // ✅ enforce valid values
      required: true,
    },

    amount: { type: Number, required: true },

    currency: { type: String, required: true },

    status: {
      type: String,
      enum: ["paid", "pending", "failed"],
      default: "pending",
    },
  },
  { timestamps: true },
);

// ✅ Prevent model overwrite in Next.js
const Payment: Model<IPayment> =
  mongoose.models.Payment || mongoose.model<IPayment>("Payment", PaymentSchema);

export default Payment;
