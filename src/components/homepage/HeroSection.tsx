"use client";

import React from "react";
import Link from "next/link";
import { Zap, Newspaper, PencilLine, Globe, ArrowRight } from "lucide-react";

export default function NewsAiHero() {
  return (
    <section className="relative min-h-screen bg-[#020617] pt-32 pb-20 overflow-hidden">
      {/* 🌌 Background "Pulse" Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-[#1C4D8D]/20 to-transparent blur-[120px] -z-10" />
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* 1. The "Headline" Column (Left) */}
          <div className="lg:col-span-7 space-y-10">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-200">
                Breaking: Neural Writing 2.0
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] uppercase">
              Truth. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1C4D8D] to-blue-300">
                Synthesized.
              </span>
            </h1>

            <p className="max-w-xl text-slate-400 text-lg md:text-xl font-light leading-relaxed">
              InsightAI bridges the gap between{" "}
              <span className="text-white font-medium italic underline decoration-[#1C4D8D]">
                Global News bureaus
              </span>{" "}
              and your content calendar. Create fact-checked, high-authority
              articles in seconds.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 pt-4">
              <Link
                href="/auth/sign-up"
                className="px-10 py-5 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#1C4D8D] hover:text-white transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)] active:scale-95"
              >
                Launch Editor
              </Link>
              <button className="px-10 py-5 border border-white/10 rounded-2xl text-white text-xs font-black uppercase tracking-widest hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                View Live Feed <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* 2. The "Live Feed" Card (Right) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-[2rem] bg-[#0F172A] border border-white/10 p-6 shadow-2xl group overflow-hidden">
              {/* Header of the Card */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#1C4D8D]/20 rounded-lg">
                    <Newspaper size={20} className="text-[#1C4D8D]" />
                  </div>
                  <span className="text-xs font-bold text-white uppercase tracking-widest">
                    Source Stream
                  </span>
                </div>
                <div className="text-[10px] font-mono text-slate-500 animate-pulse">
                  SYNCING...
                </div>
              </div>

              {/* Pseudo-Code / Text Generation Animation Effect */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-colors">
                  <p className="text-[10px] text-blue-400 font-mono mb-2">
                    INPUT: REUTERS_LIVE_FEED
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    "AI Market projections for Q3 2026 indicate a 40% surge
                    in..."
                  </p>
                </div>

                <div className="flex justify-center">
                  <div className="h-8 w-px bg-gradient-to-b from-blue-500 to-transparent" />
                </div>

                <div className="p-5 rounded-xl bg-[#1C4D8D] text-white shadow-xl shadow-blue-900/20 transform rotate-1">
                  <div className="flex items-center gap-3 mb-3">
                    <PencilLine size={18} />
                    <span className="text-[10px] font-bold uppercase tracking-tighter">
                      InsightAI Output
                    </span>
                  </div>
                  <h4 className="text-sm font-bold leading-tight">
                    The 2026 AI Surge: Why Market Intuition is the New
                    Currency...
                  </h4>
                </div>
              </div>

              {/* Stats Footer of the Card */}
              <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Globe size={14} className="text-slate-500" />
                  <span className="text-[10px] text-slate-500 font-bold uppercase">
                    140+ Regions
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap size={14} className="text-yellow-500" />
                  <span className="text-[10px] text-slate-500 font-bold uppercase">
                    Drafted in 1.4s
                  </span>
                </div>
              </div>

              {/* Decorative Glow */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
