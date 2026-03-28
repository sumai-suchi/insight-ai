"use client";

import { FC } from "react";
import { motion, Variants } from "framer-motion";
import {
  HiOutlinePencilAlt,
  HiOutlineShieldCheck,
  HiOutlineChartBar,
  HiOutlineNewspaper,
  HiOutlineSave,
  HiOutlineLightningBolt,
} from "react-icons/hi";

/* ── Feature data ── */
interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  accent: string;       // glow / border accent color
  tag: string;          // small label
}

const features: Feature[] = [
  {
    icon: <HiOutlinePencilAlt size={26} />,
    title: "AI Content Editor",
    description:
      "Generate high-quality blogs, articles, and marketing copy in seconds with our advanced AI technology.",
    accent: "rgba(99,102,241,0.7)",
    tag: "Writing",
  },
  {
    icon: <HiOutlineShieldCheck size={26} />,
    title: "Plagiarism Checker",
    description:
      "Ensure originality with our comprehensive plagiarism detection system that scans billions of sources.",
    accent: "rgba(6,182,212,0.7)",
    tag: "Integrity",
  },
  {
    icon: <HiOutlineChartBar size={26} />,
    title: "SEO Suggestions",
    description:
      "Optimize your content for search engines with real-time SEO recommendations and keyword insights.",
    accent: "rgba(34,197,94,0.7)",
    tag: "Growth",
  },
  {
    icon: <HiOutlineNewspaper size={26} />,
    title: "Personalized News Feed",
    description:
      "Stay updated with trending news tailored to your interests across technology, AI, and business.",
    accent: "rgba(249,115,22,0.7)",
    tag: "News",
  },
  {
    icon: <HiOutlineSave size={26} />,
    title: "Auto Draft Saving",
    description:
      "Never lose your work with automatic draft saving. Continue your content creation anytime, anywhere.",
    accent: "rgba(236,72,153,0.7)",
    tag: "Reliability",
  },
  {
    icon: <HiOutlineLightningBolt size={26} />,
    title: "Lightning Fast",
    description:
      "Generate content 10x faster than manual writing while maintaining quality and accuracy.",
    accent: "rgba(250,204,21,0.7)",
    tag: "Performance",
  },
];

/* ── Variants ── */
const container: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.13 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 48, scale: 0.94 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Featured large card (index 0) ── */
function FeaturedCard({ feature }: { feature: Feature }) {
  return (
    <motion.div
      variants={card}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="relative col-span-1 md:col-span-2 lg:col-span-2 row-span-1 rounded-3xl p-8 overflow-hidden group cursor-default"
      style={{
        background: "linear-gradient(135deg, rgba(15,40,84,0.95) 0%, rgba(28,77,141,0.85) 100%)",
        border: "1px solid rgba(28,77,141,0.5)",
        boxShadow: "0 8px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      {/* Background glow */}
      <div
        className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${feature.accent} 0%, transparent 70%)`, filter: "blur(32px)" }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 flex flex-col h-full gap-5">
        <div className="flex items-start justify-between">
          {/* Icon */}
          <motion.div
            whileHover={{ rotate: 12, scale: 1.1 }}
            transition={{ duration: 0.3 }}
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${feature.accent.replace("0.7", "0.4")} 0%, rgba(15,40,84,0.8) 100%)`,
              border: `1px solid ${feature.accent.replace("0.7", "0.35")}`,
              boxShadow: `0 4px 20px ${feature.accent.replace("0.7", "0.3")}`,
            }}
          >
            {feature.icon}
          </motion.div>

          {/* Tag */}
          <span
            className="text-xs font-semibold px-3 py-1 rounded-full"
            style={{
              background: `${feature.accent.replace("0.7", "0.15")}`,
              border: `1px solid ${feature.accent.replace("0.7", "0.3")}`,
              color: "rgba(255,255,255,0.7)",
            }}
          >
            {feature.tag}
          </span>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
          <p className="text-white/55 leading-relaxed text-sm">{feature.description}</p>
        </div>

        {/* Bottom bar */}
        <div className="mt-auto flex items-center gap-2">
          <div className="h-1 flex-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${feature.accent}, transparent)` }}
              initial={{ width: "0%" }}
              whileInView={{ width: "75%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
            />
          </div>
          <span className="text-white/30 text-xs">Active</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Regular card ── */
function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  return (
    <motion.div
      variants={card}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="relative rounded-3xl p-6 overflow-hidden group cursor-default"
      style={{
        background: index % 2 === 0
          ? "linear-gradient(145deg, rgba(10,18,40,0.95) 0%, rgba(15,40,84,0.9) 100%)"
          : "linear-gradient(145deg, rgba(15,40,84,0.9) 0%, rgba(10,18,40,0.95) 100%)",
        border: "1px solid rgba(28,77,141,0.3)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      {/* Glow on hover */}
      <div
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${feature.accent} 0%, transparent 70%)`, filter: "blur(24px)" }}
      />

      <div className="relative z-10">
        {/* Top row */}
        <div className="flex items-center justify-between mb-5">
          <motion.div
            whileHover={{ rotate: 12, scale: 1.1 }}
            transition={{ duration: 0.3 }}
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
            style={{
              background: `linear-gradient(135deg, ${feature.accent.replace("0.7", "0.25")} 0%, rgba(15,40,84,0.6) 100%)`,
              border: `1px solid ${feature.accent.replace("0.7", "0.3")}`,
              boxShadow: `0 4px 16px ${feature.accent.replace("0.7", "0.2")}`,
            }}
          >
            {feature.icon}
          </motion.div>

          <span
            className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
            style={{
              background: `${feature.accent.replace("0.7", "0.1")}`,
              border: `1px solid ${feature.accent.replace("0.7", "0.25")}`,
              color: "rgba(255,255,255,0.55)",
            }}
          >
            {feature.tag}
          </span>
        </div>

        <h3 className="text-base font-bold text-white mb-2">{feature.title}</h3>
        <p className="text-white/45 leading-relaxed text-sm">{feature.description}</p>

        {/* Accent line */}
        <div
          className="mt-5 h-[2px] w-10 rounded-full group-hover:w-16 transition-all duration-500"
          style={{ background: `linear-gradient(90deg, ${feature.accent}, transparent)` }}
        />
      </div>
    </motion.div>
  );
}

/* ── Section ── */
const Features: FC = () => {
  const [featured, ...rest] = features;

  return (
    <section className="w-full py-24 overflow-hidden relative">

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-16"
        >
          {/* Eyebrow */}
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-5"
            style={{
              background: "rgba(28,77,141,0.15)",
              border: "1px solid rgba(28,77,141,0.35)",
              color: "rgba(147,197,253,0.9)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Platform Features
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Everything You Need to{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg, #60a5fa, #a78bfa)" }}
            >
              Create & Inform
            </span>
          </h2>

          <p className="text-white/45 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            A complete AI-powered toolkit for writers, journalists, and content teams.
          </p>
        </motion.div>

        {/* ── Grid ── */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {/* Featured card spans 2 cols on md+ */}
          <FeaturedCard feature={featured} />

          {/* Remaining 5 cards */}
          {rest.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </motion.div>

        {/* ── Bottom CTA strip ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-3xl px-8 py-6"
          style={{
            background: "linear-gradient(135deg, rgba(15,40,84,0.8) 0%, rgba(28,77,141,0.5) 100%)",
            border: "1px solid rgba(28,77,141,0.35)",
            boxShadow: "0 4px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          <div>
            <p className="text-white font-semibold text-lg">Ready to supercharge your writing?</p>
            <p className="text-white/40 text-sm mt-0.5">Join 50,000+ writers already using Insight-AI</p>
          </div>
          <a href="/ai-editor">
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 0 32px rgba(28,77,141,0.6)" }}
              whileTap={{ scale: 0.97 }}
              className="shrink-0 px-7 py-3 rounded-xl text-sm font-semibold text-white transition-all"
              style={{
                background: "linear-gradient(135deg, #1C4D8D 0%, #0F2854 100%)",
                border: "1px solid rgba(28,77,141,0.6)",
                boxShadow: "0 4px 20px rgba(28,77,141,0.4)",
              }}
            >
              Start for Free →
            </motion.button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
