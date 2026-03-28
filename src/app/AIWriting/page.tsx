"use client"; // Next.js App Router ব্যবহার করলে এটি অবশ্যই দিবেন

import React from "react";
import { motion } from "framer-motion";

const WritingBlogPage = () => {
  const marqueeText =
    "AI CONTENT GENERATION • INSIGHTFUL WRITING • SEO OPTIMIZATION • DIGITAL STORYTELLING • ";

  return (
    <div className="bg-white min-h-screen text-black p-6 md:p-12 lg:p-20 selection:bg-black selection:text-white font-serif">
      {/* Header Section */}

      {/* Marquee Section */}
      <div className="overflow-hidden whitespace-nowrap border-b border-black py-2 mb-12">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20,
          }}
          className="inline-block text-[10px] md:text-xs tracking-[0.5em] uppercase font-bold"
        >
          <span>{marqueeText}</span>
          <span>{marqueeText}</span>
        </motion.div>
      </div>

      <main className="max-w-6xl mx-auto">
        {/* Top Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="w-full aspect-[4/3] bg-gray-100 rounded-[60px] md:rounded-[100px] overflow-hidden border border-gray-200">
              <img
                src="https://i.ibb.co.com/RG9FrqBk/ai-4.jpg"
                alt="Blog visual"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-right"
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl leading-[0.9] font-light tracking-tighter uppercase">
              On <br /> The <br /> Blog
            </h1>
          </motion.div>
        </div>

        {/* Content Section 1 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          <div className="md:col-span-7 space-y-8 text-lg md:text-xl leading-relaxed text-left">
            <p>
              <span className="text-5xl font-bold mr-3 float-left leading-none">
                T
              </span>
              The landscape of content creation is evolving at an unprecedented
              pace, driven by the seamless integration of Artificial
              Intelligence. What once relied solely on human intuition and
              creativity is now transforming into a powerful collaboration
              between human insight and machine intelligence.
            </p>
            <p>
              True depth in a blog post comes from authentic storytelling. While
              AI can process information at lightning speed, the infusion of
              personal experience remains a human craft.
            </p>

            <div className="pt-8">
              <p>
                <span className="text-5xl font-bold mr-3 float-left leading-none">
                  L
                </span>
                andscape of content creation is undergoing a profound
                transformation with the rapid integration of Artificial
                Intelligence. Today’s AI tools can analyze millions of data
                points in seconds, generate drafts, and optimize SEO. However,
                AI still struggles to replicate the authentic human touch—the
                subtle nuances of emotion and genuine storytelling.
              </p>
            </div>
          </div>

          <div className="md:col-span-5">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="w-full aspect-[3/4] bg-gray-100 rounded-2xl overflow-hidden border border-gray-200"
            >
              <img
                src="https://i.ibb.co.com/HLB9tqpj/ai1.jpg"
                alt="Content visual"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>

        {/* Double Column Small Text Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-sm md:text-base leading-loose mb-32 opacity-70 italic">
          <div className="border-l border-black pl-6">
            Prompt engineering is the secret sauce of AI-assisted writing. The
            more precisely you communicate, the more professional the output
            will be.
          </div>
          <div className="border-l border-black pl-6">
            Visual presentation is just as vital as the text itself. Clean
            layouts reduce bounce rates and keep readers engaged with your
            AI-driven insights.
          </div>
        </div>

        {/* Bottom Section / Footer Content */}
        <footer className="border-t border-black pt-20 pb-16">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="mb-16">
                <div className="w-full max-w-2xl mx-auto aspect-[16/9] bg-gray-100 rounded-3xl overflow-hidden border border-gray-200 shadow-xl">
                  <img
                    src="https://i.ibb.co.com/Z6PVSv5M/ai2.jpg"
                    alt="How to Edit a Photo"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <h2 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-widest uppercase mb-10 leading-none">
                How to Edit <br /> A Photo
              </h2>

              <div className="max-w-3xl mx-auto">
                <p className="text-lg md:text-xl leading-relaxed text-gray-700 mb-12">
                  In today’s digital age, photo editing has become an essential
                  skill for creators. Modern tools like Adobe Photoshop and
                  AI-powered editors have made professional-level editing
                  accessible to everyone.
                </p>
                <p className="text-lg md:text-xl leading-relaxed text-gray-700 mb-12">
                  The process begins with understanding basic
                  principles—exposure, contrast, and color balance. Start by
                  correcting imperfections, then move toward creative
                  enhancements to tell your visual story.
                </p>
              </div>

              <p className="text-sm tracking-[0.5em] font-bold uppercase mt-16 text-gray-500">
                @reallygreatsite
              </p>
            </motion.div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default WritingBlogPage;
