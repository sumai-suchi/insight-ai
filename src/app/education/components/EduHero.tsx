"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function EduHero() {
  return (
    <section className="relative bg-white pt-24 pb-20 px-6 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[30%] h-[40%] bg-blue-50 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] left-[-5%] w-[25%] h-[35%] bg-purple-50 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left"
          >
            <div className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-blue-600 uppercase bg-blue-50 rounded-full">
              ✨ The Future of Learning is Here
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-[1.1] mb-6">
              Empowering Students with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
                AI-Driven Learning
              </span>
            </h1>

            <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-xl">
              InsightAI converts complex global news into student-friendly
              insights. Summarize articles, generate SEO-ready content, and
              master any topic 10x faster with our advanced AI engine.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/auth/sign-up"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 transition-all hover:scale-105 active:scale-95"
              >
                Get Started Free
              </Link>

              <Link
                href="/news"
                className="group flex items-center gap-2 border-2 border-gray-100 bg-white px-8 py-4 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 transition-all"
              >
                Explore Articles
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>

            {/* Stats/Trust Bar */}
            <div className="mt-12 pt-8 border-t border-gray-100 flex gap-8">
              <div>
                <p className="text-2xl font-bold text-gray-900">10k+</p>
                <p className="text-sm text-gray-500">Active Students</p>
              </div>
              <div className="w-[1px] bg-gray-200" />
              <div>
                <p className="text-2xl font-bold text-gray-900">50+</p>
                <p className="text-sm text-gray-500">AI Tools</p>
              </div>
              <div className="w-[1px] bg-gray-200" />
              <div>
                <p className="text-2xl font-bold text-gray-900">99%</p>
                <p className="text-sm text-gray-500">Accuracy Rate</p>
              </div>
            </div>
          </motion.div>

          {/* Right Image/Illustration Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main Hero Image Placeholder */}
            <div className="relative rounded-[2.5rem] overflow-hidden border-[12px] border-gray-100 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200"
                alt="Students studying with AI"
                className="w-full h-auto object-cover"
              />

              {/* Floating AI Status Card */}
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/20 hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <p className="text-sm font-bold text-gray-800">
                    AI Content Generator Active
                  </p>
                </div>
              </div>

              {/* Floating Task Completed Card */}
              <div className="absolute bottom-10 right-[-20px] bg-white p-5 rounded-2xl shadow-2xl border border-gray-50 hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">
                      Article Summarized
                    </p>
                    <p className="text-sm font-bold text-gray-900">
                      Success in 0.8s
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative circles */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-200/30 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-200/30 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
