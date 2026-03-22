"use client";
import React from "react";
import { motion, Variants } from "framer-motion";

export interface Step {
  id: number;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    id: 1,
    title: "Sign Up & Create Account",
    description:
      "Create your free account in seconds. No credit card required to get started.",
  },
  {
    id: 2,
    title: "Enter Content Ideas",
    description:
      "Simply describe what you want to write about and let AI do the heavy lifting.",
  },
  {
    id: 3,
    title: "Review & Optimize",
    description:
      "Use SEO suggestions and plagiarism checker to perfect your content.",
  },
  {
    id: 4,
    title: "Explore News Feed",
    description:
      "Stay informed with personalized trending news and industry insights.",
  },
];

// Animation Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};
export default function HowItWorks() {
  return (
    <section className="mt-12 bg-white dark:bg-[#0F172A] max-w-7xl mx-auto overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-13"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How It <span className="text-purple-600">Works</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Get started in 4 simple steps
          </p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-20"
        >
          {steps.map((step) => (
            <motion.div
              key={step.id}
              variants={itemVariants}
              className="flex flex-col items-center text-center group"
            >
              {/* Number Circle - Exact Match to Image */}
              <div className="relative mb-8">
                <div className="w-14 h-14 bg-[#9333EA] text-white rounded-full flex items-center justify-center text-xl font-medium shadow-lg shadow-purple-200 dark:shadow-none transition-transform duration-300 group-hover:scale-110">
                  {step.id}
                </div>
              </div>

              {/* Text - Title also changes color on hover */}
              <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-purple-700 transition-colors">
                {step.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed group-hover:text-slate-600 transition-colors">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="flex justify-center"
        >
          <button className="bg-[#9333EA] hover:bg-[#7E22CE] text-white font-semibold py-4 px-10 rounded-xl transition-all duration-300 shadow-xl shadow-purple-100 dark:shadow-none hover:shadow-purple-200 active:scale-95">
            Start Creating Now
          </button>
        </motion.div>
      </div>
    </section>
  );
}
