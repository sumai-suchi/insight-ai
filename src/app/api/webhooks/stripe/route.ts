 import Stripe from "stripe";

import { headers } from "next/headers";

import connectMongo from "@/lib/mongoose-connect/connect-db";
import { newpayment } from "@/lib/models/NewPayment";

// MongoDB connection
// async function connectMongo() {
//   if (mongoose.connection.readyState >= 1) return;
//   await mongoose.connect(process.env.MONGODB_URI!);
// }


 const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia" as any,
});

const endpointSecret=process.env.STRIPE_WEBHOOK_SECRET!;

// Payment Schema

export async function POST(req: Request) {
    console.log("Webhook hit");
  const body = await req.text();
  console.log("Webhook hit with body:", body);
const headersList = await headers();
const sig = headersList.get("stripe-signature")!;
await connectMongo()
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.log("Webhook verification failed.");
    return new Response("Webhook Error", { status: 400 });
  }
 if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    await newpayment.create({
      email: session.customer_email || "",
      customerId: session.customer as string,
      subscriptionId: session.subscription as string || "",
      sessionId: session.id,
      amount: session.amount_total ? session.amount_total / 100 : 0,
      status: session.payment_status,
    });

    console.log("Payment saved in MongoDB");
  } else {
    console.log(`Unhandled event type: ${event.type}`);
  }

  return new Response("Webhook received", { status: 200 });


}