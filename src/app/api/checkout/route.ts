// import { stripe } from "@/types/stripe";
// import { NextResponse } from "next/server";

// export async function POST() {
//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "payment",

//       line_items: [
//         {
//           price_data: {
//             currency: "usd",
//             product_data: {
//               name: "Premium Subscription",
//             },
//             unit_amount: 2900, // $29
//           },
//           quantity: 1,
//         },
//       ],

//       success_url: `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/success`,
//       cancel_url: `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/cancel`,
//     });

//     return NextResponse.json({ url: session.url });
//   } catch (error) {
//     return NextResponse.json({ error: "Stripe error" }, { status: 500 });
//   }
// }

// sk vie code

import { auth } from "@/lib/auth/auth";
import { stripe } from "@/types/stripe";
import { NextResponse } from "next/server";
import { Payments } from "@/lib/models/Payment";

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    const userId = session?.user?.id;

    // ❌ CHANGE HERE: return JSON instead of redirect
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized", redirect: "/auth/sign-in" },
        { status: 401 },
      );
    }

    const { plan } = await req.json();

    const planConfig: Record<string, { price: number; name: string }> = {
      Premium: { price: 2900, name: "Premium Plan" },
      Business: { price: 49900, name: "Business Plan" },
    };

    const selectedPlan = planConfig[plan];

    if (!selectedPlan) {
      return NextResponse.json(
        { error: "Invalid plan selected" },
        { status: 400 },
      );
    }

    const sessionStripe = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: selectedPlan.name },
            unit_amount: selectedPlan.price,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/pricing`,
      client_reference_id: userId,
      metadata: { plan, userId },
    });

    return NextResponse.json({ url: sessionStripe.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

// demo code
// import { auth } from "@/lib/auth/auth";
// import Payment from "@/lib/models/Payment";
// import connectMongo from "@/lib/mongoose-connect/connect-db";
// import { stripe } from "@/types/stripe";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   await connectMongo();
//   try {
//     // ✅ Get logged-in user
//     const session = await auth.api.getSession({ headers: req.headers });
//     const user = session?.user;

//     if (!user?.id) {
//       return NextResponse.json(
//         { error: "Unauthorized", redirect: "/auth/sign-in" },
//         { status: 401 },
//       );
//     }

//     // ✅ Get plan from request
//     const { plan } = await req.json();

//     const planConfig: Record<string, { price: number; name: string }> = {
//       Premium: { price: 2900, name: "Premium Plan" },
//       Business: { price: 49900, name: "Business Plan" },
//     };

//     const selectedPlan = planConfig[plan];

//     if (!selectedPlan) {
//       return NextResponse.json(
//         { error: "Invalid plan selected" },
//         { status: 400 },
//       );
//     }

//     // ✅ Create Stripe Checkout Session
//     const sessionStripe = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "payment",
//       line_items: [
//         {
//           price_data: {
//             currency: "usd",
//             product_data: { name: selectedPlan.name },
//             unit_amount: selectedPlan.price, // cents
//           },
//           quantity: 1,
//         },
//       ],
//       success_url: `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/success`,
//       cancel_url: `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/pricing`,

//       customer_email: user.email, // ✅ important
//       client_reference_id: user.id,

//       metadata: {
//         plan,
//         userId: user.id,
//       },
//     });

//     // ✅ Save to DB (PENDING)
//     await Payment.create({
//       userId: user.id,
//       email: user.email,
//       plan,
//       amount: selectedPlan.price,
//       stripeSessionId: sessionStripe.id,
//       status: "pending", // 🔥 key part
//     });

//     // ✅ Return checkout URL
//     return NextResponse.json({ url: sessionStripe.url });
//   } catch (error) {
//     console.error("Checkout error:", error);

//     return NextResponse.json(
//       { error: "Something went wrong" },
//       { status: 500 },
//     );
//   }
// }

// export async function GET(req: Request) {
//   try {
//     await connectMongo(); // ✅ DB connect

//     const { searchParams } = new URL(req.url);
//     const userId = searchParams.get("userId");

//     if (!userId) {
//       return NextResponse.json(
//         { error: "userId is required" },
//         { status: 400 },
//       );
//     }

//     const payments = await Payment.find({ userId }).sort({ createdAt: -1 });

//     return NextResponse.json({
//       success: true,
//       data: payments,
//     });
//   } catch (error) {
//     console.error("GET payments error:", error);

//     return NextResponse.json(
//       { error: "Something went wrong" },
//       { status: 500 },
//     );
//   }
// }
