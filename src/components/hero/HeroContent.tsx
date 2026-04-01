"use client";
import { motion, Variants, AnimatePresence } from "framer-motion";
import {
  Sparkles, Zap, BookOpen, ArrowRight, Play,
  Brain, Newspaper, PenLine, TrendingUp, Clock,
  CheckCircle2, FileText, Globe, Mic2,
} from "lucide-react";
import { useState, useEffect } from "react";

/* ── Variants ── */
const container: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.25 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 44 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
};
const fadeIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

/* ── Rotating words ── */
const WORDS = ["Articles", "Blog Posts", "News Briefs", "Reports", "Newsletters", "Stories"];

function RotatingWord() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % WORDS.length), 2400);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="relative inline-block overflow-hidden h-[1.1em] align-bottom min-w-[260px] sm:min-w-[340px]">
      <AnimatePresence mode="wait">
        <motion.span
          key={WORDS[index]}
          className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-400 bg-clip-text text-transparent"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          {WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ── Stats ── */
const STATS = [
  { icon: Zap,      label: "Articles Generated", value: "2M+"  },
  { icon: BookOpen, label: "News Sources",        value: "500+" },
  { icon: Sparkles, label: "Active Writers",      value: "50K+" },
];

/* ── Feature pills ── */
const FEATURES = [
  { icon: Brain,    label: "AI Writing"    },
  { icon: Newspaper,label: "Live News"     },
  { icon: PenLine,  label: "Smart Editor"  },
  { icon: Globe,    label: "Multi-language"},
];

/* ── Floating article cards data ── */
const ARTICLE_CARDS = [
  {
    tag: "Technology",
    tagColor: "text-cyan-300 bg-cyan-400/10 border-cyan-400/20",
    title: "How AI is Reshaping Modern Journalism",
    meta: "4 min read",
    icon: Brain,
    delay: 1.0,
    position: "top-[8%] right-[2%] lg:right-[3%]",
    rotate: "rotate-[2deg]",
    floatY: [0, -12, 0],
  },
  {
    tag: "Business",
    tagColor: "text-blue-300 bg-blue-400/10 border-blue-400/20",
    title: "Content Strategy for the AI Era",
    meta: "6 min read",
    icon: TrendingUp,
    delay: 1.3,
    position: "bottom-[12%] right-[2%] lg:right-[3%]",
    rotate: "-rotate-[1.5deg]",
    floatY: [0, -10, 0],
  },
  {
    tag: "Writing Tips",
    tagColor: "text-indigo-300 bg-indigo-400/10 border-indigo-400/20",
    title: "10 Prompts That Write Themselves",
    meta: "3 min read",
    icon: FileText,
    delay: 1.6,
    position: "top-[30%] left-[1%] lg:left-[2%]",
    rotate: "-rotate-[2deg]",
    floatY: [0, -14, 0],
  },
];

/* ── AI Writing card (desktop sidebar) ── */
function AIWritingCard() {
  const steps = [
    { icon: Mic2,        text: "Enter your topic"       },
    { icon: Brain,       text: "AI generates draft"     },
    { icon: PenLine,     text: "Edit & refine"          },
    { icon: CheckCircle2,text: "Publish instantly"      },
  ];

  return (
    <motion.div
      className="hidden xl:flex flex-col absolute right-[3%] top-1/2 -translate-y-1/2 w-64 rounded-2xl overflow-hidden pointer-events-none"
      style={{
        background: "linear-gradient(145deg, rgba(15,40,84,0.9) 0%, rgba(28,77,141,0.6) 100%)",
        border: "1px solid rgba(28,77,141,0.5)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 24px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
      initial={{ opacity: 0, x: 70 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/8 flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/20">
          <Brain className="w-4 h-4 text-cyan-400" />
        </span>
        <span className="text-white/80 text-sm font-semibold">AI Writing Flow</span>
        <span className="ml-auto flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-cyan-400"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.22 }}
            />
          ))}
        </span>
      </div>

      {/* Steps */}
      <div className="px-4 py-4 space-y-3">
        {steps.map(({ icon: Icon, text }, i) => (
          <motion.div
            key={text}
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3 + i * 0.15, duration: 0.5 }}
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/6 border border-white/8">
              <Icon className="w-3.5 h-3.5 text-blue-300" />
            </span>
            <span className="text-white/65 text-xs">{text}</span>
            <motion.div
              className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400/60"
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
            />
          </motion.div>
        ))}
      </div>

      {/* Simulated text output */}
      <div className="px-4 pb-4 space-y-2">
        <div className="text-white/30 text-[10px] uppercase tracking-widest mb-2">Live Output</div>
        {[{ w: "w-full" }, { w: "w-5/6" }, { w: "w-4/5" }, { w: "w-3/4" }].map((l, i) => (
          <motion.div
            key={i}
            className={`h-2 rounded-full bg-white/8 ${l.w}`}
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.8 + i * 0.12, duration: 0.5, ease: "easeOut" }}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ── Floating article card ── */
function FloatingCard({
  tag, tagColor, title, meta, icon: Icon,
  delay, position, rotate, floatY,
}: (typeof ARTICLE_CARDS)[0]) {
  return (
    <motion.div
      className={`hidden lg:block absolute ${position} ${rotate} w-52 rounded-xl overflow-hidden pointer-events-none z-20`}
      style={{
        background: "linear-gradient(145deg, rgba(15,40,84,0.92) 0%, rgba(28,77,141,0.55) 100%)",
        border: "1px solid rgba(28,77,141,0.45)",
        backdropFilter: "blur(18px)",
        boxShadow: "0 16px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: floatY, scale: 1 }}
      transition={{
        opacity: { delay, duration: 0.7 },
        scale:   { delay, duration: 0.7 },
        y: { delay, duration: 5, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      <div className="p-3.5">
        <div className="flex items-center justify-between mb-2.5">
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-medium ${tagColor}`}>
            {tag}
          </span>
          <Icon className="w-3.5 h-3.5 text-white/30" />
        </div>
        <p className="text-white/80 text-xs font-medium leading-snug line-clamp-2">{title}</p>
        <div className="mt-2.5 flex items-center gap-1.5 text-white/30 text-[10px]">
          <Clock className="w-3 h-3" />
          {meta}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main ── */
export default function HeroContent() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <>
      {/* Floating cards */}
      {ARTICLE_CARDS.map((card) => (
        <FloatingCard key={card.title} {...card} />
      ))}

      {/* AI writing sidebar */}
      <AIWritingCard />

      {/* Center content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center text-white px-4 sm:px-6 lg:px-8 xl:px-0 py-28 max-w-3xl xl:max-w-2xl mx-auto"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={fadeIn} className="mb-7">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-cyan-300 text-sm font-medium tracking-wide"
            style={{
              border: "1px solid rgba(6,182,212,0.25)",
              background: "rgba(6,182,212,0.08)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
            </span>
            AI-Powered Content & News Platform
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-[1.06] tracking-tight"
        >
          <span className="block text-white">Generate AI</span>
          <span className="block mt-1.5">
            <RotatingWord />
          </span>
          <span
            className="block mt-1.5 text-2xl sm:text-3xl md:text-4xl font-semibold"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            in seconds, not hours.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          className="mt-7 text-base sm:text-lg text-white/50 max-w-lg leading-relaxed"
        >
          Insight-AI combines real-time news intelligence with powerful AI writing tools.
          Create, edit, and publish professional content — all from one platform.
        </motion.p>

        {/* Feature pills */}
        <motion.div variants={fadeUp} className="mt-6 flex flex-wrap justify-center gap-2">
          {FEATURES.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white/55 text-xs font-medium"
              style={{
                border: "1px solid rgba(28,77,141,0.5)",
                background: "rgba(15,40,84,0.5)",
                backdropFilter: "blur(8px)",
              }}
            >
              <Icon className="w-3.5 h-3.5 text-cyan-400" />
              {label}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <a href="/ai-editor">
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(28,77,141,0.7)" }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base text-white transition-all"
              style={{
                background: "linear-gradient(135deg, #1C4D8D 0%, #0F2854 100%)",
                boxShadow: "0 8px 32px rgba(28,77,141,0.45), inset 0 1px 0 rgba(255,255,255,0.1)",
                border: "1px solid rgba(28,77,141,0.6)",
              }}
            >
              Start Writing Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </a>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setVideoOpen(true)}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-base text-white/80 transition-all"
            style={{
              border: "1px solid rgba(28,77,141,0.4)",
              background: "rgba(15,40,84,0.4)",
              backdropFilter: "blur(10px)",
            }}
          >
            <span
              className="flex items-center justify-center w-7 h-7 rounded-full"
              style={{ background: "rgba(28,77,141,0.5)", border: "1px solid rgba(28,77,141,0.6)" }}
            >
              <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />
            </span>
            Watch Demo
          </motion.button>
        </motion.div>

        {/* Trust note */}
        <motion.p variants={fadeIn} className="mt-5 text-white/25 text-sm tracking-wide">
          No credit card required · Free forever plan available
        </motion.p>

        {/* Stats */}
        <motion.div
          variants={fadeUp}
          className="mt-14 grid grid-cols-3 gap-6 sm:gap-14 w-full max-w-md pt-10"
          style={{ borderTop: "1px solid rgba(28,77,141,0.35)" }}
        >
          {STATS.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex flex-col items-center gap-1.5">
              <Icon className="w-5 h-5 text-cyan-400 mb-0.5" />
              <span className="text-2xl sm:text-3xl font-bold text-white tabular-nums">{value}</span>
              <span className="text-xs text-white/35 text-center leading-snug">{label}</span>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <div
            className="w-6 h-10 rounded-full flex items-start justify-center p-1.5"
            style={{ border: "2px solid rgba(28,77,141,0.5)" }}
          >
            <motion.div
              className="w-1 h-2 rounded-full"
              style={{ background: "rgba(6,182,212,0.6)" }}
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Video modal */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{ background: "rgba(2,12,31,0.9)", backdropFilter: "blur(12px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setVideoOpen(false)}
          >
            <motion.div
              className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden"
              style={{
                border: "1px solid rgba(28,77,141,0.4)",
                boxShadow: "0 40px 100px rgba(0,0,0,0.7)",
              }}
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <video src="/videos/hero.mp4" autoPlay controls className="w-full h-full object-cover" />
              <button
                onClick={() => setVideoOpen(false)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors text-xl font-bold leading-none"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
