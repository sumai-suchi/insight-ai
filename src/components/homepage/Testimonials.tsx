"use client";

import { useEffect, useRef, useState } from "react";


interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  cardBg: string;
  accentLine: string;
  accentQuote: string;
  avatarBg: string;
  avatarBorder: string;
  avatarText: string;
}

interface StatItem {
  label: string;
  sub: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "This platform has transformed our content workflow. We're now producing 3x more content in half the time. The AI suggestions are incredibly accurate!",
    name: "Sarah Johnson",
    role: "Content Marketing Manager",
    company: "TechCorp",
    initials: "SJ",
    cardBg:
      "bg-orange-50 dark:bg-orange-950/20 border-black/[0.07] dark:border-white/[0.08]",
    accentLine:
      "bg-gradient-to-r from-transparent via-orange-400 to-transparent",
    accentQuote: "text-orange-400",
    avatarBg: "bg-orange-100 dark:bg-orange-900/30",
    avatarBorder: "border-orange-300 dark:border-orange-700",
    avatarText: "text-orange-500 dark:text-orange-400",
  },
  {
    quote:
      "As a freelancer, this tool is a game-changer. The plagiarism checker and SEO optimization features help me deliver premium quality work to my clients.",
    name: "Michael Chen",
    role: "Freelance Writer",
    company: "Independent",
    initials: "MC",
    cardBg:
      "bg-cyan-50 dark:bg-cyan-950/20 border-black/[0.07] dark:border-white/[0.08]",
    accentLine:
      "bg-gradient-to-r from-transparent via-cyan-400 to-transparent",
    accentQuote: "text-cyan-400",
    avatarBg: "bg-cyan-100 dark:bg-cyan-900/30",
    avatarBorder: "border-cyan-300 dark:border-cyan-700",
    avatarText: "text-cyan-500 dark:text-cyan-400",
  },
  {
    quote:
      "The personalized news feed keeps me updated on industry trends while I create content. It's like having a research assistant and writer in one platform!",
    name: "Emily Rodriguez",
    role: "Digital Marketing Director",
    company: "Growth Labs",
    initials: "ER",
    cardBg:
      "bg-purple-50 dark:bg-purple-950/20 border-black/[0.07] dark:border-white/[0.08]",
    accentLine:
      "bg-gradient-to-r from-transparent via-purple-400 to-transparent",
    accentQuote: "text-purple-400",
    avatarBg: "bg-purple-100 dark:bg-purple-900/30",
    avatarBorder: "border-purple-300 dark:border-purple-700",
    avatarText: "text-purple-500 dark:text-purple-400",
  },
];

const STATS: StatItem[] = [
  { label: "4.9 / 5", sub: "average rating" },
  { label: "10,000+", sub: "creators" },
  { label: "50+ countries", sub: "worldwide" },
];

// Animation delay classes for each card position
const CARD_DELAY_CLASSES = [
  "delay-[0ms]",
  "delay-[120ms]",
  "delay-[240ms]",
] as const;

// Star Icon 

const STAR_PATH =
  "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z";

function StarIcon() {
  return (
    <svg className="w-4 h-4 fill-amber-400 text-amber-400" viewBox="0 0 20 20">
      <path d={STAR_PATH} />
    </svg>
  );
}

function StarRating() {
  return (
    <div className="flex gap-0.5">
      <StarIcon />
      <StarIcon />
      <StarIcon />
      <StarIcon />
      <StarIcon />
    </div>
  );
}

// Testimonial Card 

interface TestimonialCardProps {
  testimonial: Testimonial;
  delayClass: string;
}

function TestimonialCard({ testimonial, delayClass }: TestimonialCardProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  const animationClass = visible
    ? `opacity-100 translate-y-0 ${delayClass}`
    : "opacity-0 translate-y-6";

  return (
    <div
      ref={ref}
      className={`flex flex-col h-full transition-all duration-500 ease-out ${animationClass}`}
    >
      <div
        className={`group relative flex flex-col flex-1 rounded-2xl border p-7 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${testimonial.cardBg}`}
      >
        {/* Top accent line */}
        <div
          className={`absolute top-0 left-6 right-6 h-0.5 rounded-b opacity-70 group-hover:opacity-100 transition-opacity duration-300 ${testimonial.accentLine}`}
        />

        {/* Decorative quote mark */}
        <span
          className={`absolute top-5 right-6 text-6xl leading-none font-serif select-none opacity-10 group-hover:opacity-20 transition-opacity duration-300 ${testimonial.accentQuote}`}
          aria-hidden="true"
        >
          &ldquo;
        </span>

        {/* Quote text */}
        <blockquote className="flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-300 mb-7">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>

        {/* Author info + star rating */}
        <div className="mt-auto">
          <div className="flex items-center gap-3 mb-3">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 border ${testimonial.avatarBg} ${testimonial.avatarBorder} ${testimonial.avatarText}`}
            >
              {testimonial.initials}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">
                {testimonial.name}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                {testimonial.role} &middot; {testimonial.company}
              </p>
            </div>
          </div>
          <StarRating />
        </div>
      </div>
    </div>
  );
}

// Section Header 

function SectionHeader() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  const animationClass = visible
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-4";

  return (
    <div
      ref={ref}
      className={`text-center mb-12 transition-all duration-600 ease-out ${animationClass}`}
    >
      
      <div className="inline-flex items-center gap-2 border border-black/10 dark:border-white/10 bg-black/3 rounded-full px-4 py-1.5 mb-5">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-xs font-medium tracking-widest uppercase text-gray-500 dark:text-gray-400">
          Testimonials
        </span>
      </div>

      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-3">
        Loved by Content Creators{" "}
        <span className="bg-linear-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent">
          Worldwide
        </span>
      </h2>

      <p className="text-gray-400 dark:text-gray-500 text-base max-w-sm mx-auto">
        See what our users have to say
      </p>
    </div>
  );
}

// Stats Bar 

function StatDivider() {
  return <span className="w-px h-4 bg-gray-200 dark:bg-gray-800" />;
}

function StatEntry({ label, sub }: StatItem) {
  return (
    <span className="text-xs text-gray-400 dark:text-gray-600">
      <span className="font-semibold text-gray-700 dark:text-gray-300">
        {label}
      </span>{" "}
      {sub}
    </span>
  );
}

function StatsBar() {
  return (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
      <StatEntry label={STATS[0].label} sub={STATS[0].sub} />
      <StatDivider />
      <StatEntry label={STATS[1].label} sub={STATS[1].sub} />
      <StatDivider />
      <StatEntry label={STATS[2].label} sub={STATS[2].sub} />
    </div>
  );
}

//  Main Export 

export default function Testimonials() {
  return (
    <section className="w-full">
      <SectionHeader />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <TestimonialCard
          testimonial={TESTIMONIALS[0]}
          delayClass={CARD_DELAY_CLASSES[0]}
        />
        <TestimonialCard
          testimonial={TESTIMONIALS[1]}
          delayClass={CARD_DELAY_CLASSES[1]}
        />
        <TestimonialCard
          testimonial={TESTIMONIALS[2]}
          delayClass={CARD_DELAY_CLASSES[2]}
        />
      </div>

      <StatsBar />
    </section>
  );
}