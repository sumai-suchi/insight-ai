import { stripe } from "@/types/stripe";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Premium Subscription",
            },
            unit_amount: 2900, // $29
          },
          quantity: 1,
        },
      ],

      success_url: `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json({ error: "Stripe error" }, { status: 500 });
  }
}

// import Stripe from "stripe";
// import { NextResponse } from "next/server";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2024-04-10",
// });

// export async function POST(req: Request) {
//   const { plan } = await req.json();

//   let price = 0;

//   if (plan === "Analyst") price = 2400; // $24
//   if (plan === "Enterprise") price = 49900; // $499

//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     mode: "payment",
//     line_items: [
//       {
//         price_data: {
//           currency: "usd",
//           product_data: {
//             name: plan,
//           },
//           unit_amount: price,
//         },
//         quantity: 1,
//       },
//     ],
//     success_url: `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/success`,
//     cancel_url: `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/cancel`,
//   });

//   return NextResponse.json({ id: session.id });
// }
// import { stripe } from "@/types/stripe";
// import { NextResponse } from "next/server";


// export async function POST(req: Request) {
//   console.log("api heat here");
//   try {
//     const { plan } = await req.json();
//     console.log("Hello Plan",plan)

//     if (plan === "Explorer") {
//       return NextResponse.json({ redirect: "/signup" });
//     }

//     if (plan === "Professional") {
//       return NextResponse.json({ redirect: "/contact" });
//     }

//     const priceId = process.env.STRIPE_PREMIUM_PRICE_ID!;

//     const session = await stripe.checkout.sessions.create({
//       mode: "subscription",

//       payment_method_types: ["card"],

//       line_items: [
//         {
//           price: priceId,
//           quantity: 1,
//         },
//       ],

//       subscription_data: {
//         trial_period_days: 7,
//       },

//       success_url: `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/success`,
//       cancel_url: `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/pricing`,
//     });

//     return NextResponse.json({ id: session.id });
//   } catch (error) {
//     console.error("Stripe error:", error);

//     return NextResponse.json(
//       { error: "Stripe session failed" },
//       { status: 500 },
//     );
//   }
// }