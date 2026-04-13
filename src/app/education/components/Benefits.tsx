"use client";

import { motion } from "framer-motion";

export default function Benefits() {
  const benefits = [
    {
      title: "Exam Preparation",
      desc: "Prepare for competitive exams with curated and updated global knowledge.",
      icon: "📚",
    },
    {
      title: "Trend Analysis",
      desc: "Stay ahead of the curve by staying informed about the latest global tech and education trends.",
      icon: "📈",
    },
    {
      title: "Skill Enhancement",
      desc: "Improve your research, critical thinking, and structured learning skills through quality articles.",
      icon: "🧠",
    },
    {
      title: "AI-Powered Discovery",
      desc: "Discover niche topics tailored to your interests using our advanced AI-driven suggestions.",
      icon: "🤖",
    },
    {
      title: "Time Efficiency",
      desc: "Get summarized insights from lengthy reports, saving hours of manual research time.",
      icon: "⏱️",
    },
    {
      title: "Career Growth",
      desc: "Understand industry demands and align your learning with future job market requirements.",
      icon: "💼",
    },
    {
      title: "Diverse Perspectives",
      desc: "Access global viewpoints on politics, health, and culture to broaden your understanding.",
      icon: "🌍",
    },
  ];

  return (
    <section className="bg-white text-black py-24 px-6 border-t border-gray-100">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
            How It Empowers Students
          </h2>
          <div className="h-1.5 w-24 bg-black mx-auto"></div>
          <p className="mt-6 text-gray-500 font-medium max-w-xl mx-auto">
            InsightAI isn't just a news platform—it's a digital mentor designed
            to streamline your educational journey.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="p-8 border border-gray-200 rounded-xl hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 group bg-[#fafafa]"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 border-b-2 border-transparent group-hover:border-black inline-block">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {benefit.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Call to Action (Optional) */}
        <div className="mt-16 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-gray-400">
            Trusted by 5,000+ students worldwide
          </p>
        </div>
      </div>
    </section>
  );
}
