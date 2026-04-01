"use client";

import { motion, Variants } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Quote, Star } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    id: 1,
    quote: "This platform has transformed our content workflow. We're now producing 3x more content in half the time. The AI suggestions are incredibly accurate!",
    name: "Sarah Johnson",
    role: "Content Marketing Manager",
    company: "TechCorp",
    image: "https://i.pravatar.cc/150?u=sarah",
    rating: 5,
  },
  {
    id: 2,
    quote: "As a freelancer, this tool is a game-changer. The plagiarism checker and SEO optimization features help me deliver premium quality work to my clients.",
    name: "Michael Chen",
    role: "Freelance Writer",
    company: "Independent",
    image: "https://i.pravatar.cc/150?u=michael",
    rating: 5,
  },
  {
    id: 3,
    quote: "The personalized news feed keeps me updated on industry trends while I create content. It's like having a research assistant and writer in one platform!",
    name: "Emily Rodriguez",
    role: "Digital Marketing Director",
    company: "Growth Labs",
    image: "https://i.pravatar.cc/150?u=emily",
    rating: 5,
  },
  {
    id: 4,
    quote: "I love the AI content suggestions! It saves me hours every week and helps me stay on top of trends. The insights are always relevant and actionable.",
    name: "David Lee",
    role: "Content Strategist",
    company: "Creative Hub",
    image: "https://i.pravatar.cc/150?u=david",
    rating: 5,
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

export default function Testimonials() {
  return (
    <section className="w-full py-24 overflow-hidden relative">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(28,77,141,0.25) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-16"
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-5"
            style={{
              background: "rgba(28,77,141,0.15)",
              border: "1px solid rgba(28,77,141,0.35)",
              color: "rgba(147,197,253,0.9)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Testimonials
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Loved by Content Creators{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg, #60a5fa, #a78bfa)" }}
            >
              Worldwide
            </span>
          </h2>
          <p className="text-white/45 text-base sm:text-lg max-w-xl mx-auto">
            Don&apos;t just take our word for it — hear from the experts using our platform.
          </p>
        </motion.div>

        {/* Swiper */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            breakpoints={{
              640:  { slidesPerView: 1 },
              768:  { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-14"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id} className="h-auto">
                <div
                  className="h-full flex flex-col justify-between p-7 rounded-3xl group transition-all duration-300"
                  style={{
                    background: "linear-gradient(145deg, rgba(10,18,40,0.95) 0%, rgba(15,40,84,0.85) 100%)",
                    border: "1px solid rgba(28,77,141,0.3)",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)",
                  }}
                >
                  {/* Quote icon */}
                  <div>
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                      style={{
                        background: "rgba(28,77,141,0.25)",
                        border: "1px solid rgba(28,77,141,0.4)",
                      }}
                    >
                      <Quote className="w-5 h-5 text-blue-300" />
                    </div>

                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                      ))}
                    </div>

                    <p className="text-white/65 text-sm leading-relaxed mb-6">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>

                  {/* Author */}
                  <div
                    className="flex items-center gap-3 pt-5"
                    style={{ borderTop: "1px solid rgba(28,77,141,0.25)" }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-11 h-11 rounded-full object-cover"
                      style={{ border: "2px solid rgba(28,77,141,0.5)" }}
                    />
                    <div>
                      <p className="text-white font-semibold text-sm leading-tight">{t.name}</p>
                      <p className="text-blue-300/70 text-xs mt-0.5">{t.role}</p>
                      <p
                        className="text-xs mt-0.5 uppercase tracking-wider"
                        style={{ color: "rgba(255,255,255,0.25)" }}
                      >
                        {t.company}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      <style jsx global>{`
        .swiper-pagination-bullet {
          background: rgba(96,165,250,0.5) !important;
          width: 8px;
          height: 8px;
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: #60a5fa !important;
          width: 28px;
          border-radius: 4px;
          transition: all 0.3s ease;
        }
      `}</style>
    </section>
  );
}
