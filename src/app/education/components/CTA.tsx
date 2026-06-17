"use client";

import Link from "next/link";

export default function CTA() {
  return (
    <section className="bg-blue-600 text-white py-16 px-4 text-center">
      <h2 className="text-3xl font-bold mb-4">
        Start Your Smarter Learning Journey Today
      </h2>

      <p className="text-blue-100 mb-8">
        Join InsightAI and explore the future of education with AI.
      </p>

      <Link
        href="/auth/sign-up"
        className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
      >
        Get Started Now
      </Link>
    </section>
  );
}