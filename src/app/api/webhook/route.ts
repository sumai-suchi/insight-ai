// import Payment from "@/lib/models/Payment";
// import connectMongo from "@/lib/mongoose-connect/connect-db";
// import { stripe } from "@/types/stripe";
// import { headers } from "next/headers";
// import Stripe from "stripe";

// export async function POST(req: Request) {
//   const body = await req.text();
//   const sig = (await headers()).get("stripe-signature");
//   if (!sig) {
//     return new Response("Missing signature", { status: 400 });
//   }

//   let event: Stripe.Event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       body,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET!,
//       10000 // timeout in milliseconds to prevent hanging
      
//     );
//     console.log("Webhook received:", event.type)
//   } catch (err) {
//     console.error("❌ Webhook signature error:", err);
//     return new Response("Webhook Error", { status: 400 });
//   }

//   await connectMongo();
//   console.log("Mongo Conneted SK")

//   try {
//     // ✅ 1. Checkout completed
//     if (event.type === "checkout.session.completed") {
//       const session = event.data.object as Stripe.Checkout.Session;

//       const userId = session.metadata?.userId;
//       const plan = session.metadata?.plan;

//       // 🔥 Validate required fields
//       if (!userId || !plan) {
//         console.error("❌ Missing metadata");
//         return new Response("Missing metadata", { status: 400 });
//       }

//       // 🔥 Prevent duplicate insert
//       const existing = await Payment.findOne({
//         stripeSessionId: session.id,
//       });

//       if (!existing) {
//         await Payment.create({
//           userId,
//           plan,
//           stripeSessionId: session.id,
//           stripePaymentIntentId:
//             typeof session.payment_intent === "string"
//               ? session.payment_intent
//               : undefined,
//           amount: session.amount_total ?? 0,
//           currency: session.currency ?? "usd",
//           status: "paid",
//         });

//         console.log("✅ Payment saved");
//       } else {
//         console.log("⚠️ Payment already exists");
//       }
//     }

//     // ✅ 2. Payment success
//     if (event.type === "payment_intent.succeeded") {
//       const paymentIntent = event.data.object as Stripe.PaymentIntent;

//       await Payment.findOneAndUpdate(
//         { stripePaymentIntentId: paymentIntent.id },
//         { status: "paid" },
//       );

//       console.log("✅ Payment confirmed");
//     }

//     // ❌ 3. Payment failed
//     if (event.type === "payment_intent.payment_failed") {
//       const paymentIntent = event.data.object as Stripe.PaymentIntent;

//       await Payment.findOneAndUpdate(
//         { stripePaymentIntentId: paymentIntent.id },
//         { status: "failed" },
//       );

//       console.log("❌ Payment failed");
//     }

//     return new Response("OK", { status: 200 });
//   } catch (error) {
//     console.error("❌ Webhook handler error:", error);
//     return new Response("Webhook handler failed", { status: 500 });
//   }
// }
