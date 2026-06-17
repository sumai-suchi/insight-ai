import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  email: String,
  customerId: String,
  subscriptionId: String,
  sessionId: String,
  amount: Number,
  status: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const newpayment =
  mongoose.models.newpayment || mongoose.model("newpayment", PaymentSchema);
