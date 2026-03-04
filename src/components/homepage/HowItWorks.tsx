"use client";
import React from "react";
import { motion } from "framer-motion";

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

const HowItWorks = () => {
  return (
    <section className="py-10 px-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
            How It <span className="text-purple-600">Works</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Get started in 4 simple steps and transform your workflow today.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              // FOCUS HERE: The background and border color change on hover
              className="group cursor-pointer p-8 bg-white border border-slate-100 rounded-3xl transition-all duration-300 ease-in-out hover:bg-purple-50 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-100/40 text-center"
            >
              {/* Icon / Number Container */}
              <div className="relative flex items-center justify-center w-16 h-16 mx-auto mb-8 transition-transform duration-300 group-hover:scale-110">
                <div className="absolute inset-0 bg-purple-600 rounded-2xl rotate-6 opacity-10 group-hover:rotate-12 transition-transform" />
                <div className="relative z-10 w-full h-full rounded-2xl bg-purple-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
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
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0 20px 25px -5px rgb(147 51 234 / 0.3)",
          }}
          whileTap={{ scale: 0.95 }}
          className="bg-purple-600 text-white font-bold py-4 px-12 rounded-2xl transition-all duration-200"
        >
          Start Creating Now
        </motion.button>
      </div>
    </section>
  );
};

export default HowItWorks;
