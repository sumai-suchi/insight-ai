import mongoose, { Schema, Document } from "mongoose";

export interface IPayment extends Document {
  userId: string;
  stripeSessionId: string;
  stripePaymentIntentId?: string;
  plan: string;
  amount: number;
  currency: string;
  status: "paid" | "pending" | "failed";
}

const PaymentSchema = new Schema(
  {
    userId: { type: String, required: true },

    stripeSessionId: { type: String, required: true },

    stripePaymentIntentId: { type: String },

    plan: { type: String, required: true },

    amount: { type: Number, required: true },

    currency: { type: String, required: true },

    status: {
      type: String,
      enum: ["paid", "pending", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Payment ||
  mongoose.model<IPayment>("Payment", PaymentSchema);