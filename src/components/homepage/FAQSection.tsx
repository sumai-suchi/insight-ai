"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "What is Insight-AI?",
    a: "Insight-AI is an all-in-one AI-powered platform for content creation and real-time news. It helps writers, journalists, and marketers generate high-quality articles, blog posts, and news briefs in seconds.",
  },
  {
    q: "Is there a free plan available?",
    a: "Yes! Insight-AI offers a free forever plan that includes access to the AI editor, up to 5 articles per month, and the personalized news feed. No credit card required to get started.",
  },
  {
    q: "How does the AI content writer work?",
    a: "Simply enter your topic, choose a tone and format, and our AI generates a full draft in seconds. You can then edit, optimize for SEO, and publish — all within the platform.",
  },
  {
    q: "Does Insight-AI check for plagiarism?",
    a: "Absolutely. Every piece of content can be scanned against billions of web sources to ensure originality before you publish.",
  },
  {
    q: "Can I use Insight-AI for SEO content?",
    a: "Yes. The built-in SEO Optimizer suggests keywords, meta descriptions, and readability improvements in real time as you write.",
  },
  {
    q: "What news categories are available?",
    a: "The personalized news feed covers Technology, AI, Business, Politics, Health, Entertainment, and Sports — all curated and summarized by AI.",
  },
  {
    q: "Is my data secure?",
    a: "We take security seriously. All data is encrypted in transit and at rest. We never sell your data to third parties.",
  },
  {
    q: "Can I integrate Insight-AI with my existing tools?",
    a: "Yes. Our API & Integrations product lets you connect Insight-AI to your CMS, Slack, Zapier, and more.",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

const container: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="w-full py-24 overflow-hidden relative">
      {/* glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(28,77,141,0.2) 0%, transparent 70%)", filter: "blur(80px)" }} />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-5"
            style={{ background: "rgba(28,77,141,0.15)", border: "1px solid rgba(28,77,141,0.35)", color: "rgba(147,197,253,0.9)" }}>
            <HelpCircle className="w-3 h-3 text-cyan-400" />
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Frequently Asked{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, #60a5fa, #a78bfa)" }}>
              Questions
            </span>
          </h2>
          <p className="text-white/45 text-base max-w-lg mx-auto">Everything you need to know about Insight-AI.</p>
        </motion.div>

        {/* Accordion */}
        <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={i} variants={item}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left flex items-center justify-between gap-4 px-6 py-5 rounded-2xl transition-all duration-300 group"
                style={{
                  background: open === i ? "linear-gradient(135deg, rgba(28,77,141,0.35) 0%, rgba(15,40,84,0.5) 100%)" : "rgba(15,40,84,0.25)",
                  border: open === i ? "1px solid rgba(28,77,141,0.5)" : "1px solid rgba(28,77,141,0.2)",
                }}
              >
                <span className="text-sm sm:text-base font-semibold text-white/85 group-hover:text-white transition-colors">{faq.q}</span>
                <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.3 }} className="shrink-0">
                  <ChevronDown className="w-5 h-5 text-blue-400" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 pt-3 text-sm text-white/55 leading-relaxed"
                      style={{ borderLeft: "2px solid rgba(28,77,141,0.4)", marginLeft: "1.5rem" }}>
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
