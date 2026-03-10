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
            unit_amount: 2000, // $20
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
