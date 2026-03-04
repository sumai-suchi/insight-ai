"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
// types/testimonial.ts
export interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  company: string;
  image: string;
  stars: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "This platform has transformed our content workflow. We're now producing 3x more content in half the time. The AI suggestions are incredibly accurate!",
    name: "Sarah Johnson",
    role: "Content Marketing Manager",
    company: "TechCorp",
    image: "https://i.pravatar.cc/150?u=sarah", 
    stars: 5,
  },
  {
    id: 2,
    quote: "As a freelancer, this tool is a game-changer. The plagiarism checker and SEO optimization features help me deliver premium quality work to my clients.",
    name: "Michael Chen",
    role: "Freelance Writer",
    company: "Independent",
    image: "https://i.pravatar.cc/150?u=michael",
    stars: 5,
  },
  {
    id: 3,
    quote: "The personalized news feed keeps me updated on industry trends while I create content. It's like having a research assistant and writer in one platform!",
    name: "Emily Rodriguez",
    role: "Digital Marketing Director",
    company: "Growth Labs",
    image: "https://i.pravatar.cc/150?u=emily",
    stars: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 px-6 bg-[#7c3aed] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Loved by Content Creators Worldwide
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-purple-100 text-lg"
          >
            See what our users have to say
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-15">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                scale: 1.02,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
              className="relative p-8 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm transition-colors duration-300"
            >
              {/* Quote Icon */}
              <div className="text-4xl mb-4 opacity-80 font-serif">“</div>

              {/* Quote Text */}
              <p className="text-sm md:text-base leading-relaxed mb-8 min-h-[100px]">
                {item.quote}
              </p>

              {/* User Identity */}
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/20">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-sm">{item.name}</h4>
                  <p className="text-xs text-purple-200">
                    {item.role} <br /> {item.company}
                  </p>
                </div>
              </div>

              {/* Star Rating */}
              <div className="flex gap-1">
                {[...Array(item.stars)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">
                    ★
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
