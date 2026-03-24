import { auth } from "@/lib/auth/auth";
import { stripe } from "@/types/stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    console.log("📥 Checkout API hit");

    // ✅ Get user session
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    console.log("👤 Session:", session);

    const userId = session?.user?.id;

    // ❌ Not logged in
    if (!userId) {
      console.log("❌ No user session");
      return NextResponse.json(
        { error: "Unauthorized", redirect: "/auth/sign-in" },
        { status: 401 },
      );
    }

    const { plan, interval } = await req.json();

    console.log("📦 Plan:", plan, "Interval:", interval);

    const planConfig: Record<string, Record<string, number>> = {
      Premium: { monthly: 2900, yearly: 4900 },
      Business: { monthly: 49900, yearly: 49900 },
    };

    const price = planConfig[plan]?.[interval];

    if (!price) {
      console.log("❌ Invalid plan/interval");
      return NextResponse.json(
        { error: "Invalid plan or interval" },
        { status: 400 },
      );
    }

    // ✅ Create Stripe session
    const sessionStripe = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${plan} (${interval})`,
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],

      success_url: `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/pricing`,

      // 🔥 VERY IMPORTANT
      client_reference_id: userId,

      metadata: {
        userId,
        plan,
        interval,
      },
    });

    console.log("✅ Stripe session created:", sessionStripe.id);

    return NextResponse.json({ url: sessionStripe.url });
  } catch (error) {
    console.error("❌ Checkout error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
