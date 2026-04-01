"use client";

import { motion, Variants } from "framer-motion";
import { UserPlus, Lightbulb, SearchCheck, Newspaper, ArrowRight } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    id: 1,
    icon: UserPlus,
    title: "Sign Up Free",
    description: "Create your account in seconds. No credit card required to get started.",
    accent: "rgba(96,165,250,0.8)",
  },
  {
    id: 2,
    icon: Lightbulb,
    title: "Enter Your Idea",
    description: "Describe what you want to write about and let AI do the heavy lifting.",
    accent: "rgba(167,139,250,0.8)",
  },
  {
    id: 3,
    icon: SearchCheck,
    title: "Review & Optimize",
    description: "Use SEO suggestions and plagiarism checker to perfect your content.",
    accent: "rgba(52,211,153,0.8)",
  },
  {
    id: 4,
    icon: Newspaper,
    title: "Explore News Feed",
    description: "Stay informed with personalized trending news and industry insights.",
    accent: "rgba(251,191,36,0.8)",
  },
];

const container: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.18 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

export default function HowItWorks() {
  return (
    <section className="w-full py-24 overflow-hidden relative">
      {/* Background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(28,77,141,0.4) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-20"
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-5"
            style={{
              background: "rgba(28,77,141,0.15)",
              border: "1px solid rgba(28,77,141,0.35)",
              color: "rgba(147,197,253,0.9)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Simple Process
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Get Started in{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg, #60a5fa, #a78bfa)" }}
            >
              4 Simple Steps
            </span>
          </h2>
          <p className="text-white/45 text-base sm:text-lg max-w-xl mx-auto">
            From idea to published content in minutes — no experience needed.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              variants={item}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="relative flex flex-col items-center text-center p-7 rounded-3xl group cursor-default"
              style={{
                background: "linear-gradient(145deg, rgba(10,18,40,0.9) 0%, rgba(15,40,84,0.8) 100%)",
                border: "1px solid rgba(28,77,141,0.3)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)",
              }}
            >
              {/* Connector line (not on last) */}
              {i < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute top-[52px] left-[calc(100%+2px)] w-6 h-[1px] pointer-events-none"
                  style={{ background: "linear-gradient(90deg, rgba(28,77,141,0.5), transparent)" }}
                />
              )}

              {/* Glow on hover */}
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${step.accent.replace("0.8", "0.08")} 0%, transparent 70%)`,
                }}
              />

              {/* Step number badge */}
              <div
                className="absolute -top-3 -right-3 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{
                  background: "linear-gradient(135deg, #1C4D8D, #0F2854)",
                  border: "1px solid rgba(28,77,141,0.6)",
                  boxShadow: "0 2px 12px rgba(28,77,141,0.4)",
                }}
              >
                {step.id}
              </div>

              {/* Icon */}
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 text-white"
                style={{
                  background: `linear-gradient(135deg, ${step.accent.replace("0.8", "0.2")} 0%, rgba(15,40,84,0.6) 100%)`,
                  border: `1px solid ${step.accent.replace("0.8", "0.3")}`,
                  boxShadow: `0 4px 20px ${step.accent.replace("0.8", "0.2")}`,
                }}
              >
                <step.icon className="w-6 h-6" />
              </motion.div>

              <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
              <p className="text-white/45 text-sm leading-relaxed">{step.description}</p>

              {/* Bottom accent */}
              <div
                className="mt-5 h-[2px] w-8 rounded-full group-hover:w-14 transition-all duration-500"
                style={{ background: `linear-gradient(90deg, ${step.accent}, transparent)` }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <Link href="/auth/sign-up">
            <motion.button
             whileHover={{ scale: 1.04, boxShadow: "0 0 36px rgba(28,77,141,0.6)" }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold text-white transition-all group"
              style={{
                background: "linear-gradient(135deg, #1C4D8D 0%, #0F2854 100%)",
                border: "1px solid rgba(28,77,141,0.6)",
                boxShadow: "0 4px 24px rgba(28,77,141,0.4)",
              }}
            >
              Start Creating Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link> 
        </motion.div>
      </div>
    </section>
  );
}
