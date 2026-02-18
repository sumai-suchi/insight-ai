"use client";

import React from "react";
import { motion } from "framer-motion";

const HeroAi = () => {
  // ৮০ শব্দের কাছাকাছি একটি ডেসক্রিপশন
  const description = `Leverage our cutting-edge artificial intelligence to effortlessly create compelling articles, high-ranking blogs, and persuasive marketing copy in mere seconds. Our platform provides advanced tools for seamless search engine optimization, ensuring your content reaches the right audience. With integrated plagiarism checks and the ability to adapt tone to various demographics, you can streamline your workflow, boost productivity, and publish with absolute confidence. Experience the future of professional writing and take your digital presence to the next level today.`;

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-blue-950 to-blue-800 text-white px-6">
      {/* Animated Stickers */}
      <div className="pointer-events-none select-none absolute inset-0 w-full h-full z-0">
        {/* Star Sticker */}
        <svg
          className="absolute left-10 top-10 animate-spin-slow opacity-70"
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
        >
          <path
            d="M24 2l4.09 12.26L40 16.18l-9.55 8.28L32.18 38 24 30.91 15.82 38l1.73-13.54L8 16.18l11.91-1.92L24 2z"
            fill="#FBBF24"
          />
        </svg>
        {/* Heart Sticker */}
        <svg
          className="absolute right-16 top-24 animate-bounce-slow opacity-60"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
        >
          <path
            d="M20 36s-8.35-7.36-12.07-11.07C3.2 21.2 2 18.13 2 15.5 2 10.81 6.03 7 10.5 7c2.54 0 4.99 1.23 6.5 3.09C18.51 8.23 20.96 7 23.5 7 27.97 7 32 10.81 32 15.5c0 2.63-1.2 5.7-5.93 9.43C28.35 28.64 20 36 20 36z"
            fill="#F87171"
          />
        </svg>
        {/* Lightning Sticker */}
        <svg
          className="absolute left-1/2 bottom-10 animate-float-slow opacity-50"
          style={{ transform: "translateX(-50%)" }}
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
        >
          <path d="M16 2l-6 16h7l-3 14 11-18h-8l6-12z" fill="#60A5FA" />
        </svg>
        {/* AI Chip Sticker */}
        <svg
          className="absolute right-10 bottom-20 animate-pulse-slow opacity-60"
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
        >
          <rect x="8" y="8" width="28" height="28" rx="6" fill="#34D399" />
          <text
            x="50%"
            y="55%"
            textAnchor="middle"
            fill="#fff"
            fontSize="12"
            fontWeight="bold"
            dy=".3em"
          >
            AI
          </text>
        </svg>
      </div>

      {/* Animation Keyframes */}
      <style>{`
        @keyframes spin-slow { 0% { transform: rotate(0deg);} 100% { transform: rotate(360deg);} }
        .animate-spin-slow { animation: spin-slow 18s linear infinite; }
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0);} 50% { transform: translateY(-18px);} }
        .animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }
        @keyframes float-slow { 0%, 100% { transform: translateY(0);} 50% { transform: translateY(-12px);} }
        .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
        @keyframes pulse-slow { 0%, 100% { opacity: 0.6;} 50% { opacity: 1;} }
        .animate-pulse-slow { animation: pulse-slow 3.5s ease-in-out infinite; }
      `}</style>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="max-w-4xl">
          {/* Headline */}
          <motion.h1
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, ease: "easeOut" }}
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-blue-100 to-blue-400 bg-clip-text text-transparent"
          >
            Generate High-Quality <br className="hidden md:block" />
            Content with AI
          </motion.h1>

          {/* Description (Approx 80 words) */}
          <motion.p
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            variants={fadeInUp}
            className="text-gray-400 text-lg md:text-xl leading-relaxed mb-10"
          >
            {description}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center group">
              Start New Article
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="9 5l7 7-7 7"
                />
              </svg>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroAi;
