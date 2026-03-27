import mongoose, { Document, Model } from "mongoose";

export interface ITicket extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  category: "billing" | "technical" | "general";
  status: "open" | "closed";
  createdAt: Date;
}

const TicketSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  category: {
    type: String,
    enum: ["billing", "technical", "general"],
    default: "general",
  },
  status: { type: String, enum: ["open", "closed"], default: "open" },
  createdAt: { type: Date, default: Date.now },
});

const Ticket: Model<ITicket> =
  mongoose.models.Ticket || mongoose.model<ITicket>("Ticket", TicketSchema);
export default Ticket;
