"use client";

import { motion, Variants } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import {
  Brain, Newspaper, PenLine, SearchCheck,
  TrendingUp, Zap, Globe, ShieldCheck,
} from "lucide-react";

const SLIDES = [
  {
    icon: Brain,
    title: "AI Content Writer",
    subtitle: "Write in seconds",
    description: "Generate full blog posts, articles, and marketing copy with a single prompt. Our AI understands context, tone, and style.",
    stat: "10x faster",
    statLabel: "than manual writing",
    accent: "rgba(99,102,241,0.8)",
    tag: "Writing",
  },
  {
    icon: Newspaper,
    title: "Live News Feed",
    subtitle: "Stay informed",
    description: "Real-time news from 500+ sources, curated and summarized by AI. Filter by category, topic, or keyword.",
    stat: "500+",
    statLabel: "news sources",
    accent: "rgba(6,182,212,0.8)",
    tag: "News",
  },
  {
    icon: PenLine,
    title: "Smart Editor",
    subtitle: "Edit like a pro",
    description: "A rich text editor with AI suggestions, inline rewrites, tone adjustments, and one-click formatting.",
    stat: "50K+",
    statLabel: "active writers",
    accent: "rgba(167,139,250,0.8)",
    tag: "Editor",
  },
  {
    icon: SearchCheck,
    title: "SEO Optimizer",
    subtitle: "Rank higher",
    description: "Real-time keyword suggestions, readability scores, and meta description generation to boost your search rankings.",
    stat: "3x",
    statLabel: "more organic traffic",
    accent: "rgba(34,197,94,0.8)",
    tag: "SEO",
  },
  {
    icon: ShieldCheck,
    title: "Plagiarism Checker",
    subtitle: "Stay original",
    description: "Scan your content against billions of web pages instantly. Get a detailed originality report before you publish.",
    stat: "99.9%",
    statLabel: "accuracy rate",
    accent: "rgba(251,191,36,0.8)",
    tag: "Integrity",
  },
  {
    icon: TrendingUp,
    title: "Analytics Dashboard",
    subtitle: "Track performance",
    description: "Monitor your content performance, reader engagement, and SEO rankings all from one unified dashboard.",
    stat: "2M+",
    statLabel: "articles tracked",
    accent: "rgba(249,115,22,0.8)",
    tag: "Analytics",
  },
  {
    icon: Globe,
    title: "Multi-language",
    subtitle: "Write globally",
    description: "Generate and translate content in 30+ languages. Reach a global audience without language barriers.",
    stat: "30+",
    statLabel: "languages supported",
    accent: "rgba(236,72,153,0.8)",
    tag: "Global",
  },
  {
    icon: Zap,
    title: "API & Integrations",
    subtitle: "Connect everything",
    description: "Plug Insight-AI into your CMS, Slack, Zapier, or custom workflow via our developer-friendly REST API.",
    stat: "100+",
    statLabel: "integrations",
    accent: "rgba(96,165,250,0.8)",
    tag: "API",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

export default function PlatformSlider() {
  return (
    <section className="w-full py-24 overflow-hidden relative">
      {/* glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(28,77,141,0.25) 0%, transparent 70%)", filter: "blur(70px)" }} />

      <div className="relative w-full">
        {/* Header */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-14 px-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-5"
            style={{ background: "rgba(28,77,141,0.15)", border: "1px solid rgba(28,77,141,0.35)", color: "rgba(147,197,253,0.9)" }}>
            <Zap className="w-3 h-3 text-cyan-400" />
            Platform Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Everything Built for{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, #60a5fa, #a78bfa)" }}>
              Modern Creators
            </span>
          </h2>
          <p className="text-white/45 text-base sm:text-lg max-w-xl mx-auto">
            Explore the full suite of tools that make Insight-AI the go-to platform for content professionals.
          </p>
        </motion.div>

        {/* Swiper */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Swiper
            modules={[Autoplay, Pagination, EffectCoverflow]}
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView="auto"
            coverflowEffect={{ rotate: 0, stretch: 0, depth: 120, modifier: 2.5, slideShadows: false }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            breakpoints={{
              0:    { slidesPerView: 1.1 },
              640:  { slidesPerView: 1.5 },
              1024: { slidesPerView: 2.5 },
              1280: { slidesPerView: 3 },
            }}
            className="pb-14 px-4"
          >
            {SLIDES.map((slide) => (
              <SwiperSlide key={slide.title} style={{ maxWidth: 380 }}>
                <div
                  className="relative rounded-3xl p-7 overflow-hidden h-full flex flex-col gap-5 cursor-grab active:cursor-grabbing"
                  style={{
                    background: "linear-gradient(145deg, rgba(10,18,40,0.95) 0%, rgba(15,40,84,0.85) 100%)",
                    border: "1px solid rgba(28,77,141,0.3)",
                    boxShadow: "0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
                    minHeight: 300,
                  }}
                >
                  {/* Glow */}
                  <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full pointer-events-none opacity-20"
                    style={{ background: `radial-gradient(circle, ${slide.accent} 0%, transparent 70%)`, filter: "blur(28px)" }} />

                  {/* Top row */}
                  <div className="flex items-start justify-between relative z-10">
                    <div className="w-13 h-13 w-12 h-12 rounded-2xl flex items-center justify-center text-white"
                      style={{
                        background: `linear-gradient(135deg, ${slide.accent.replace("0.8", "0.25")} 0%, rgba(15,40,84,0.6) 100%)`,
                        border: `1px solid ${slide.accent.replace("0.8", "0.35")}`,
                        boxShadow: `0 4px 20px ${slide.accent.replace("0.8", "0.25")}`,
                      }}>
                      <slide.icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: `${slide.accent.replace("0.8", "0.12")}`, border: `1px solid ${slide.accent.replace("0.8", "0.25")}`, color: "rgba(255,255,255,0.6)" }}>
                      {slide.tag}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex-1">
                    <p className="text-xs text-white/35 uppercase tracking-widest mb-1">{slide.subtitle}</p>
                    <h3 className="text-lg font-bold text-white mb-3">{slide.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{slide.description}</p>
                  </div>

                  {/* Stat */}
                  <div className="relative z-10 flex items-end gap-2 pt-4"
                    style={{ borderTop: "1px solid rgba(28,77,141,0.25)" }}>
                    <span className="text-2xl font-extrabold text-white">{slide.stat}</span>
                    <span className="text-xs text-white/35 mb-0.5">{slide.statLabel}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      <style jsx global>{`
        .swiper-pagination-bullet { background: rgba(96,165,250,0.4) !important; width: 8px; height: 8px; opacity: 1; }
        .swiper-pagination-bullet-active { background: #60a5fa !important; width: 28px; border-radius: 4px; transition: all 0.3s ease; }
      `}</style>
    </section>
  );
}
