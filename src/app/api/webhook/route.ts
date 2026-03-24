import Payment from "@/lib/models/Payment";
import connectMongo from "@/lib/mongoose-connect/connect-db";
import { stripe } from "@/types/stripe";
import { headers } from "next/headers";
import Stripe from "stripe";

// ✅ Required for Stripe
export const runtime = "nodejs";

export async function POST(req: Request) {
  console.log("🔥 Webhook route HIT");

  // ✅ Raw body
  const body = await req.text();

  // ✅ Correct headers usage
  const headerList = await headers();
  const sig = headerList.get("stripe-signature");

  if (!sig) {
    console.log("❌ Missing Stripe signature");
    return new Response("Missing signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );

    console.log("📩 Event received:", event.type);
  } catch (err) {
    console.error("❌ Signature verification failed:", err);
    return new Response("Webhook Error", { status: 400 });
  }

  await connectMongo();
  console.log("✅ MongoDB connected");

  try {
    /**
     * 🔥 1. CHECKOUT COMPLETED
     */
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      console.log("🧾 Metadata:", session.metadata);

      const userId = session.metadata?.userId;
      const plan = session.metadata?.plan;
      const interval =
        session.metadata?.interval === "yearly" ? "yearly" : "monthly";

      // ❗ Validation
      if (!userId || !plan) {
        console.log("❌ Missing metadata");
        return new Response("Missing metadata", { status: 400 });
      }

      // ❗ Prevent duplicate
      const exists = await Payment.findOne({
        stripeSessionId: session.id,
      });

      if (exists) {
        console.log("⚠️ Already saved:", session.id);
        return new Response("Already exists", { status: 200 });
      }

      // ✅ Save to DB
      await Payment.create({
        userId,
        plan,
        interval,
        stripeSessionId: session.id,
        stripePaymentIntentId:
          typeof session.payment_intent === "string"
            ? session.payment_intent
            : undefined,
        amount: session.amount_total ?? 0,
        currency: session.currency ?? "usd",
        status: "paid",
      });

      console.log("✅ Payment saved");
    }

    /**
     * 🔥 2. PAYMENT SUCCESS (backup)
     */
    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      console.log("💰 Payment success:", paymentIntent.id);

      await Payment.findOneAndUpdate(
        { stripePaymentIntentId: paymentIntent.id },
        { status: "paid" },
      );
    }

    /**
     * 🔥 3. PAYMENT FAILED
     */
    if (event.type === "payment_intent.payment_failed") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      console.log("❌ Payment failed:", paymentIntent.id);

      await Payment.findOneAndUpdate(
        { stripePaymentIntentId: paymentIntent.id },
        { status: "failed" },
      );
    }

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("❌ Webhook error:", error);
    return new Response("Webhook failed", { status: 500 });
  }
}
