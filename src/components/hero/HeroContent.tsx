"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
const HeroContent = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* badge */}

      <motion.span
        variants={itemVariants}
        className="text-5xl md:text-7xl font-bold leading-tight max-w-4xl
                   bg-gradient-to-r from-white via-blue-200 to-purple-300 
                   bg-clip-text text-transparent"
      >
        ✨ Welcome to Insight-AI
      </motion.span>
      {/* heading */}
      <motion.h1
        variants={itemVariants}
        className="mt-6 text-lg md:text-xl text-white/70 max-w-xl"
      >
        Build Something
        <br />
        Amazing Today
      </motion.h1>
      {/* subtitle */}
      <motion.p
        variants={itemVariants}
        className="mt-6 text-lg md:text-xl text-white/70 max-w-xl"
      >
        Build your dream project with cutting-edge technology. Fast, beautiful,
        and powerful. Experience Insight-AI – your AI-powered news reader where
        you can read news and generate content effortlessly.
      </motion.p>

      {/* buttons */}
      <motion.div
        className="mt-10 mb-10 flex flex-col sm:flex-row gap-4"
        variants={itemVariants}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="px-8 py-3.5 rounded-lg bg-white text-black font-semibold hover:bg-blue-100 transition-colors shadow-lg shadow-white/20"
        >
          Get Started →
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="px-8 py-3.5 rounded-full border border-white/40 
                     bg-white/10 backdrop-blur-sm font-semibold 
                     hover:bg-white/20 transition-colors"
        >
          Watch Demo
        </motion.button>
      </motion.div>
      {/* scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <div
          className="w-6 h-10 rounded-full border-2 border-white/40 
                        flex items-start justify-center p-1.5"
        >
          <div className="w-1 h-2 bg-white rounded-full" />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
