"use client";

import { FC, ReactNode } from "react"; // LucideIcon এর বদলে ReactNode ব্যবহার করা হয়েছে টাইপ এরর এড়াতে
import { motion, Variants } from "framer-motion";
import {
  HiOutlinePencilAlt,
  HiOutlineShieldCheck,
  HiOutlineChartBar,
  HiOutlineNewspaper,
  HiOutlineSave,
  HiOutlineLightningBolt,
} from "react-icons/hi";

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
  bgColor: string;
  iconBg: string;
}

const features: Feature[] = [
  {
    icon: <HiOutlinePencilAlt size={28} />,
    title: "AI Content Editor",
    description:
      "Generate high-quality blogs, articles, and marketing copy in seconds with our advanced AI technology.",
    bgColor: "#F8F5FF",
    iconBg: "#8B5CF6",
  },
  {
    icon: <HiOutlineShieldCheck size={28} />,
    title: "Plagiarism Checker",
    description:
      "Ensure originality with our comprehensive plagiarism detection system that scans billions of sources.",
    bgColor: "#F0F7FF",
    iconBg: "#3B82F6",
  },
  {
    icon: <HiOutlineChartBar size={28} />,
    title: "SEO Suggestions",
    description:
      "Optimize your content for search engines with real-time SEO recommendations and keyword insights.",
    bgColor: "#F0FDF4",
    iconBg: "#22C55E",
  },
  {
    icon: <HiOutlineNewspaper size={28} />,
    title: "Personalized News Feed",
    description:
      "Stay updated with trending news tailored to your interests across technology, AI, and business.",
    bgColor: "#FFF7ED",
    iconBg: "#F97316",
  },
  {
    icon: <HiOutlineSave size={28} />,
    title: "Draft Saving",
    description:
      "Never lose your work with automatic draft saving. Continue your content creation anytime, anywhere.",
    bgColor: "#FFF1F2",
    iconBg: "#EC4899",
  },
  {
    icon: <HiOutlineLightningBolt size={28} />,
    title: "Lightning Fast",
    description:
      "Generate content 10x faster than manual writing while maintaining quality and accuracy.",
    bgColor: "#F0F9FF",
    iconBg: "#6366F1",
  },
];

// Container Variants for Stagger Effect
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // একটির পর একটি কার্ড আসার সময়
    },
  },
};

// Individual Item Variants
const itemVariants: Variants = {
  hidden: {
    y: 50, // নিচ থেকে আসবে
    opacity: 0,
    scale: 0.9, // হালকা ছোট থেকে বড় হবে
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1], // Smooth power4 out curve
    },
  },
};

const Features: FC = () => {
  return (
    <section className="mt-12 bg-white dark:bg-slate-950 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Animation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Powerful Features for <br /> <span className="text-purple-500"> Content Creators</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            Everything you need to create, optimize, and stay informed
          </p>
        </motion.div>

        {/* Features Grid with Scroll Animation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible" // স্ক্রল করলে এনিমেশন শুরু হবে
          viewport={{ once: true, amount: 0.2 }} // ২০% স্ক্রিন এ আসলেই শুরু হবে
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
              style={{ backgroundColor: feature.bgColor }}
              className="p-10 rounded-[2.5rem] border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition-all duration-300 group shadow-sm hover:shadow-xl"
            >
              {/* Icon Container */}
              <motion.div
                whileHover={{ rotate: 15 }} // আইকনে হোভার এনিমেশন
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-white shadow-md"
                style={{ backgroundColor: feature.iconBg }}
              >
                {feature.icon}
              </motion.div>

              <h3 className="text-xl font-bold mb-3 text-slate-900">
                {feature.title}
              </h3>

              <p className="text-slate-600 leading-relaxed text-[15px]">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
