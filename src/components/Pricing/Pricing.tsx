"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Zap, BarChart3 } from "lucide-react";

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
      // 🔥 Logic only applies here
      price: isAnnual ? 49 : 29,
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
      // 🔥 Hardcoded static price
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

  // 🔥 FIXED CHECKOUT
  const handleCheckout = async (planName: string) => {
    if (planName === "Explorer") {
      router.push("/signup");
      return;
    }

    if (planName === "Business") {
      router.push("/contact");
      return;
    }

    try {
      setLoadingPlan(planName);

      console.log("🚀 Checkout start:", planName);

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 🔥 REQUIRED
        body: JSON.stringify({
          plan: planName,
          interval: isAnnual ? "yearly" : "monthly", // 🔥 IMPORTANT
        }),
      });

      const data = await res.json();

      console.log("📦 Response:", data);

      // 🔥 Redirect if not logged in
      if (res.status === 401 && data.redirect) {
        console.log("❌ Not logged in → redirect");
        router.push(data.redirect);
        return;
      }

      if (!res.ok) {
        console.error("❌ Error:", data.error);
        return;
      }

      if (data.url) {
        console.log("➡️ Redirecting to Stripe");
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("❌ Checkout error:", error);
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4">
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

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 items-start">
        {plans.map((plan) => {
          // 🔥 Define specific logic per card
          const isBusiness = plan.name === "Business";
          const isExplorer = plan.name === "Explorer";

          return (
            <div
              key={plan.name}
              className={`p-8 bg-white border rounded-2xl transition-all duration-300 ${
                plan.highlighted
                  ? "border-blue-500 ring-4 ring-blue-500/10 scale-105 shadow-xl"
                  : "border-slate-200"
              }`}
            >
              <h3 className="text-2xl font-bold text-slate-900">{plan.name}</h3>
              <p className="text-slate-500 mt-2 text-sm leading-relaxed">
                {plan.description}
              </p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-slate-900">
                  ${plan.price}
                </span>
                <span className="text-slate-500 font-medium text-sm">
                  {plan.name === "Explorer"
                    ? " /month"
                    : plan.name === "Business"
                      ? " /one-time"
                      : isAnnual
                        ? " /year"
                        : " /month"}
                </span>
              </div>

              {/* ... Rest of the card (Credits, Features, Button) stays the same */}
              <div className="mt-4 text-blue-600 text-xs font-bold flex items-center bg-blue-50 w-fit px-2 py-1 rounded">
                <Zap size={12} className="mr-1 fill-blue-600" />
                {plan.credits}
              </div>

              <ul className="my-8 space-y-3">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start text-sm text-slate-600"
                  >
                    <Check className="w-4 h-4 text-green-500 mr-3 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleCheckout(plan.name)}
                disabled={loadingPlan === plan.name}
                className={`w-full py-4 rounded-xl font-bold transition-all ${
                  plan.highlighted
                    ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200"
                    : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                }`}
              >
                {loadingPlan === plan.name ? "Processing..." : plan.buttonText}
              </button>
            </div>
          );
        })}
      </div>
      {/* ... Footer Info */}
    </div>
  );
}
