"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Check, Zap, BarChart3 } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

type Plan = {
  name: string;
  price: number;
  description: string;
  features: string[];
  buttonText: string;
  highlighted: boolean;
  credits: string;
};

export default function PricingPage() {
  const router = useRouter();
  const [isAnnual, setIsAnnual] = useState(true);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

  useEffect(() => {
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    }
  }, [checkoutUrl]);

  const plans: Plan[] = [
    {
      name: "Explorer",
      price: 0,
      description: "Stay informed with basic AI summaries.",
      credits: "5 Insight Credits / mo",
      features: [
        "Standard AI Briefing",
        "Public news sources",
        "2 Real-time alerts",
        "Basic sentiment analysis",
      ],
      buttonText: "Get Started",
      highlighted: false,
    },
    {
      name: "Premium",
      price: isAnnual ? 29 : 49,
      description: "Deep-dive tools for market professionals.",
      credits: "100 Insight Credits / mo",
      features: [
        "Deep-dive Smart Briefs",
        "Global paywalled access",
        "Unlimited Smart Alerts",
        "Narrative & Bias tracking",
        "Export to PDF/CSV",
      ],
      buttonText: "Purchase Plan",
      highlighted: true,
    },
    {
      name: "Business",
      price: 499,
      description: "Custom intelligence for elite teams.",
      credits: "Unlimited Credits",
      features: [
        "Custom API Integrations",
        "Predictive Trend Modeling",
        "Slack & Webhook alerts",
        "Dedicated Account Manager",
        "Custom Model Fine-tuning",
      ],
      buttonText: "Contact Sales",
      highlighted: false,
    },
  ];

  const handleCheckout = async (planName: string) => {
    if (planName === "Explorer") {
      router.push("/signup");
      return;
    }

    if (planName === "Enterprise") {
      router.push("/contact");
      return;
    }

    try {
      setLoadingPlan(planName);

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan: planName }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Stripe error:", data.error);
        setLoadingPlan(null);
        return;
      }

      const stripe = await stripePromise;

      if (!stripe) {
        console.error("Stripe failed to initialize");
        setLoadingPlan(null);
        return;
      }

      setCheckoutUrl(data.url);
    } catch (error) {
      console.error("Checkout error:", error);
      setLoadingPlan(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-base font-semibold text-blue-600 uppercase">
          Pricing
        </h2>

        <p className="mt-2 text-4xl font-bold text-slate-900 sm:text-5xl">
          Choose the plan that fuels your edge.
        </p>

        {/* Billing Toggle */}
        <div className="mt-10 flex justify-center items-center gap-4">
          <span className={!isAnnual ? "font-bold" : "text-slate-500"}>
            Monthly
          </span>

          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative w-14 h-7 bg-blue-600 rounded-full"
          >
            <div
              className={`absolute top-1 left-1 bg-white w-5 h-5 rounded-full transition-transform ${
                isAnnual ? "translate-x-7" : ""
              }`}
            />
          </button>

          <span className={isAnnual ? "font-bold" : "text-slate-500"}>
            Annual <span className="text-green-600">(Save 20%)</span>
          </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative p-8 bg-white border rounded-2xl shadow-sm flex flex-col ${
              plan.highlighted
                ? "border-blue-500 ring-2 ring-blue-500/50"
                : "border-slate-200"
            }`}
          >
            {plan.highlighted && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm">
                Most Popular
              </span>
            )}

            <h3 className="text-2xl font-bold">{plan.name}</h3>

            <p className="text-slate-500 text-sm mt-2">{plan.description}</p>

            <div className="mt-6 text-4xl font-extrabold">
              ${plan.price}
              <span className="text-lg text-slate-500">{!isAnnual ? " /Yearly" : "/Month"}</span>
            </div>

            <div className="mt-2 flex items-center text-blue-600 text-sm italic">
              <Zap size={14} className="mr-1" />
              {plan.credits}
            </div>

            <ul className="space-y-3 my-8 flex-1">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-sm text-slate-600">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleCheckout(plan.name)}
              disabled={loadingPlan === plan.name}
              className={`w-full py-3 rounded-xl font-bold ${
                plan.highlighted
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-slate-100 hover:bg-slate-200"
              }`}
            >
              {loadingPlan === plan.name ? "Loading..." : plan.buttonText}
            </button>
          </div>
        ))}
      </div>

      {/* Credit Info */}
      <div className="mt-20 max-w-3xl mx-auto p-6 bg-blue-50 rounded-2xl border flex items-center gap-6">
        <BarChart3 className="text-blue-600 h-12 w-12 hidden sm:block" />

        <div>
          <h4 className="font-bold text-blue-900">How do credits work?</h4>

          <p className="text-sm text-blue-800">
            Credits are consumed when AI performs deep research. One credit
            covers a full narrative analysis or custom report.
          </p>
        </div>
      </div>
    </div>
  );
}
