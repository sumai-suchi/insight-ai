"use client";

import React from "react";
import { UserPlus, Sparkles, ShieldCheck, Newspaper } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Sign Up & Create Account",
    description: "Join our platform to unlock powerful AI tools tailored for you.",
    icon: <UserPlus className="w-8 h-8 text-primary" />,
  },
  {
    id: 2,
    title: "Enter Content Ideas",
    description: "Input your topics or keywords into our AI-powered editor.",
    icon: <Sparkles className="w-8 h-8 text-primary" />,
  },
  {
    id: 3,
    title: "Review & Optimize",
    description: "Use our SEO and plagiarism checker to perfect your content.",
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
  },
  {
    id: 4,
    title: "Explore News Feed",
    description: "Discover personalized news curated just for your interests.",
    icon: <Newspaper className="w-8 h-8 text-primary" />,
  },
];

function HowItWorks() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-zinc-900 w-full">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Get started with SynapseNews in 4 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-zinc-700 flex flex-col items-center text-center group"
            >
              <div className="mb-4 p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors duration-300">
                {step.icon}
              </div>
              <div className="w-8 h-8 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full flex items-center justify-center text-sm font-bold mb-4">
                {step.id}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;