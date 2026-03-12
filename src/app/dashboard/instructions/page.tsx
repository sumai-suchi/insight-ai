"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  PenLine,
  History,
  Search,
  ShieldCheck,
  Sliders,
  ChevronDown,
  ArrowRight,
  Zap,
  BookOpen,
  Target,
  RotateCcw,
} from "lucide-react";

// Data 

const steps = [
  {
    number: "01",
    icon: <PenLine size={22} />,
    title: "Start a New Article",
    desc: 'Click the "Start New Article" button on the home page. Choose your topic, target keywords, and content type — blog post, marketing copy, or article.',
    color: "from-blue-500 to-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    number: "02",
    icon: <Sparkles size={22} />,
    title: "Generate Content with AI",
    desc: "After providing your input, the AI will produce professional-grade content in just seconds. Customize the tone, style, and length to match your needs.",
    color: "from-indigo-500 to-blue-600",
    bg: "bg-indigo-50",
    border: "border-indigo-100",
  },
  {
    number: "03",
    icon: <Sliders size={22} />,
    title: "Edit & Customize",
    desc: "Edit the generated content directly inside the editor. Switch tones — formal, casual, or professional — to perfectly fit any target audience.",
    color: "from-sky-500 to-cyan-600",
    bg: "bg-sky-50",
    border: "border-sky-100",
  },
  {
    number: "04",
    icon: <Search size={22} />,
    title: "SEO Optimization",
    desc: "Use the built-in SEO tools to check keyword density, craft meta descriptions, and review your readability score before publishing.",
    color: "from-blue-600 to-blue-800",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    number: "05",
    icon: <ShieldCheck size={22} />,
    title: "Run a Plagiarism Check",
    desc: "Before publishing, use the integrated plagiarism checker to confirm your content is 100% original and safe to post.",
    color: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
  },
  {
    number: "06",
    icon: <History size={22} />,
    title: "View Revision History",
    desc: 'Browse all your previous edits in the History / Revisions section. Hit "Restore" on any past version to roll back to an earlier state instantly.',
    color: "from-violet-500 to-blue-600",
    bg: "bg-violet-50",
    border: "border-violet-100",
  },
];

const features = [
  {
    icon: <Zap size={18} />,
    title: "Instant Generation",
    desc: "High-quality content produced in just a few seconds",
  },
  {
    icon: <Target size={18} />,
    title: "SEO-Friendly",
    desc: "Content optimized to rank on search engines",
  },
  {
    icon: <RotateCcw size={18} />,
    title: "Version Control",
    desc: "Roll back to any previous version at any time",
  },
  {
    icon: <BookOpen size={18} />,
    title: "Multi-Format",
    desc: "Blogs, articles, marketing copy — all content types",
  },
];

const faqs = [
  {
    q: "Can the AI generate content in multiple languages?",
    a: "Yes! Our AI supports 30+ languages including English, Spanish, French, and more. Simply provide your input in your preferred language and the output will match.",
  },
  {
    q: "How many versions are saved in the Revision History?",
    a: "By default, the last 5 edits are stored. Click 'View Full Version History' to browse your complete edit timeline.",
  },
  {
    q: "Will restoring a version delete my current content?",
    a: "No. Before a restore is applied, your current content is automatically saved as a new revision — so nothing is ever lost.",
  },
  {
    q: "How does the SEO optimization feature work?",
    a: "Our AI analyzes your target keywords, weaves them naturally into the content at the optimal density, and structures sentences to maximize readability scores.",
  },
];


const FaqItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`border rounded-xl overflow-hidden transition-all duration-300 ${
        open ? "border-blue-200 shadow-sm" : "border-gray-100"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-800 text-sm">{q}</span>
        <ChevronDown
          size={18}
          className={`text-blue-500 shrink-0 ml-4 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <p className="px-6 pb-4 pt-1 text-gray-500 text-sm leading-relaxed bg-blue-50/40">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};



const InstructionPage = () => {
  const router = useRouter();
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="max-w-7xl mx-auto pt-16 px-6 pb-24 font-sans">
      {/*Hero Banner*/}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.6 }}
        className="relative rounded-2xl overflow-hidden bg-linear-to-br from-black via-blue-950 to-blue-800 text-white px-10 py-16 mb-12 mt-16"
      >
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-1.5 mb-6">
            <BookOpen size={14} className="text-blue-300" />
            <span className="text-blue-200 text-xs font-bold uppercase tracking-widest">
              Guidebook
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-5 bg-linear-to-r from-white via-blue-100 to-blue-400 bg-clip-text text-transparent leading-tight">
            How to Use the <br className="hidden md:block" />
            AI Editor
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
            Create, edit, and publish professional content in just a few steps
            using our AI-powered editor. Follow the guide below to get started.
          </p>
        </div>
      </motion.section>

      {/*Quick Features*/}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14"
      >
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-white border border-gray-100 rounded-2xl px-5 py-4 shadow-sm hover:shadow-md hover:border-blue-100 transition-all group"
          >
            <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-3 group-hover:bg-blue-100 transition-colors">
              {f.icon}
            </div>
            <p className="font-bold text-gray-800 text-sm mb-1">{f.title}</p>
            <p className="text-gray-400 text-xs leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </motion.div>

      {/*Step-by-Step Guide */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="mb-16"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
            <Sparkles size={20} />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900">
              Step-by-Step Guide
            </h2>
            <p className="text-gray-400 text-sm">
              Get your content ready in 6 simple steps
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * i }}
              className={`relative bg-white border ${step.border} rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group overflow-hidden`}
            >
              <span className="absolute right-4 top-3 text-6xl font-black text-gray-100 select-none group-hover:text-blue-50 transition-colors">
                {step.number}
              </span>
              <div className="relative z-10">
                <div
                  className={`inline-flex items-center gap-2 ${step.bg} rounded-xl px-3 py-2 mb-4`}
                >
                  <div
                    className={`p-1.5 rounded-lg bg-linear-to-br ${step.color} text-white`}
                  >
                    {step.icon}
                  </div>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                    Step {step.number}
                  </span>
                </div>
                <h3 className="font-extrabold text-gray-900 text-base mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Visual Workflow */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-linear-to-br from-blue-950 to-black rounded-2xl p-8 md:p-12 mb-16 text-white"
      >
        <h2 className="text-2xl font-extrabold mb-2 text-center">
          Workflow Overview
        </h2>
        <p className="text-blue-300 text-sm text-center mb-10">
          See how the entire process works end-to-end
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-3">
          {[
            { label: "Input", sub: "Topic + Keywords", icon: "✍️" },
            { label: "AI Process", sub: "Generation", icon: "⚡" },
            { label: "Edit", sub: "Customize", icon: "🎨" },
            { label: "Check", sub: "SEO + Plagiarism", icon: "🔍" },
            { label: "Publish", sub: "Content Ready!", icon: "🚀" },
          ].map((node, i, arr) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-2xl mb-2 hover:bg-white/20 transition-colors">
                  {node.icon}
                </div>
                <p className="font-bold text-sm text-white">{node.label}</p>
                <p className="text-blue-300 text-xs">{node.sub}</p>
              </div>
              {i < arr.length - 1 && (
                <ArrowRight
                  size={20}
                  className="text-blue-500 hidden md:block shrink-0"
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </motion.section>

      {/*Revision History*/}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden mb-16"
      >
        <div className="bg-[#F9FAFB] px-6 py-4 border-b border-gray-100 flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
            <History size={20} />
          </div>
          <div>
            <h2 className="text-gray-900 font-extrabold text-lg">
              History / Revisions — Explained
            </h2>
            <p className="text-gray-400 text-xs">
              How this feature works under the hood
            </p>
          </div>
        </div>
        <div className="p-6 grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <History size={18} className="text-blue-600" />,
              title: "Auto-Save",
              desc: "Content is saved automatically after every edit. No manual saving required — your work is always protected.",
              bg: "bg-blue-50",
            },
            {
              icon: <RotateCcw size={18} className="text-emerald-600" />,
              title: "Restore Button",
              desc: 'Click "Restore" on any previous version to roll back. Your current content is saved as a new revision first, so nothing is lost.',
              bg: "bg-emerald-50",
            },
            {
              icon: <ShieldCheck size={18} className="text-violet-600" />,
              title: "Author Info",
              desc: "Each revision stores the author's name, exact date and time, and an editor note so you always know what changed and when.",
              bg: "bg-violet-50",
            },
          ].map((item, i) => (
            <div key={i} className={`${item.bg} rounded-xl p-5`}>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-white rounded-lg shadow-sm">
                  {item.icon}
                </div>
                <h3 className="font-extrabold text-gray-900 text-sm">
                  {item.title}
                </h3>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* FAQ */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-16"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
            <BookOpen size={20} />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400 text-sm">
              Everything you need to know, answered
            </p>
          </div>
        </div>
        <div className="space-y-3 max-w-3xl">
          {faqs.map((faq, i) => (
            <FaqItem key={i} q={faq.q} a={faq.a} />
          ))}
        </div>
      </motion.section>

      {/* CTA */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.5, delay: 0.45 }}
        className="relative rounded-2xl overflow-hidden bg-linear-to-br from-black via-blue-950 to-blue-800 text-white px-10 py-12 text-center"
      >
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative z-10">
          <div className="text-4xl mb-4">🚀</div>
          <h2 className="text-3xl font-extrabold mb-3 bg-linear-to-r from-white to-blue-300 bg-clip-text text-transparent">
            Ready to Get Started?
          </h2>
          <p className="text-gray-300 mb-8 max-w-md mx-auto text-sm leading-relaxed">
            Create your first AI-generated piece of content right now and
            experience the difference for yourself.
          </p>
          <motion.button
            onClick={() => router.push("/ai-editing")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 cursor-pointer bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] inline-flex items-center gap-2 group"
          >
            Go to AI Editor
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default InstructionPage;
