"use client";

import { FC, ReactNode } from "react";
import { motion, Variants } from "framer-motion";
import {
  AiOutlineEdit,
  AiOutlineCheckCircle,
  AiOutlineRise,
  AiOutlineStar,
  AiOutlineSave,
  AiOutlineThunderbolt,
  AiOutlineGlobal,
} from "react-icons/ai";

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
  accent: string;
}

const features: Feature[] = [
  {
    icon: <AiOutlineEdit size={28} />,
    title: "AI Content Editor",
    description: "Generate & edit blogs with ease using our neural engine.",
    accent: "#3B82F6",
  },
  {
    icon: <AiOutlineCheckCircle size={28} />,
    title: "Plagiarism Checker",
    description: "Ensure originality and maintain high authority content.",
    accent: "#10B981",
  },
  {
    icon: <AiOutlineRise size={28} />,
    title: "SEO Suggestions",
    description: "Optimize content for Google search with real-time insights.",
    accent: "#FBBF24",
  },
  {
    icon: <AiOutlineStar size={28} />,
    title: "Personalized Feed",
    description: "Stay ahead with trending topics curated for your niche.",
    accent: "#3B82F6",
  },
  {
    icon: <AiOutlineSave size={28} />,
    title: "Draft Saving",
    description: "Your progress is synced instantly across all your devices.",
    accent: "#10B981",
  },
];

// Animations for the background "stickers"
const stickerVariants: Variants = {
  animate: {
    y: [0, -20, 0],
    rotate: [0, 10, -10, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } 
  },
};

const Features: FC = () => {
  return (
    <section className="relative py-24 bg-[#F9FAFB] dark:bg-[#111827] overflow-hidden">
      
      {/* 1. Section Border - Giving it a "Frame" look */}
      <div className="absolute inset-8 border border-gray-200/60 dark:border-gray-800 pointer-events-none rounded-[3rem]" />

      {/* 2. Floating Animated Stickers */}
      <motion.div 
        variants={stickerVariants}
        animate="animate"
        className="absolute top-20 left-[10%] text-blue-200/40 dark:text-blue-900/20 hidden lg:block"
      >
        <AiOutlineThunderbolt size={120} />
      </motion.div>

      <motion.div 
        variants={stickerVariants}
        animate="animate"
        className="absolute bottom-20 right-[10%] text-emerald-200/40 dark:text-emerald-900/20 hidden lg:block"
      >
        <AiOutlineGlobal size={100} />
      </motion.div>

      <div className="mx-auto px-12 relative z-10">
        
        {/* 3. Animated Heading */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold text-[#1F2937] dark:text-white tracking-tight"
          >
            Key <span className="text-[#3B82F6]">Features</span>
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1.5 bg-[#FBBF24] mx-auto mt-4 rounded-full"
          />
        </motion.div>

        {/* 4. Features Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 20px 40px rgba(0,0,0,0.04)"
              }}
              className="group relative bg-white dark:bg-[#1F2937] p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 transition-all duration-300"
            >
              {/* Icon Container */}
              <div 
                className="w-16 h-16 rounded-3xl flex items-center justify-center mb-8 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110 shadow-sm"
                style={{ 
                    background: `linear-gradient(135deg, ${feature.accent}15, ${feature.accent}05)`, 
                    color: feature.accent 
                }}
              >
                {feature.icon}
              </div>

              <h3 className="text-2xl font-bold mb-4 text-[#111827] dark:text-white group-hover:text-[#3B82F6] transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-[#374151] dark:text-gray-400 leading-relaxed text-sm lg:text-base">
                {feature.description}
              </p>

              {/* Decorative accent dot */}
              <div 
                className="absolute top-8 right-8 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: feature.accent }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;