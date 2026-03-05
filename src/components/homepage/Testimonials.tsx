"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Quote } from "lucide-react";

export interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  company: string;
  image: string;
  rating: number;
}

const testimonials: Testimonial[] = [
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
    quote: "I love the AI content suggestions! It saves me hours every week and helps me stay on top of trends.",
    name: "David Lee",
    role: "Content Strategist",
    company: "Creative Hub",
    image: "https://i.pravatar.cc/150?u=david",
    rating: 5,
  },
];

const TestimonialSlider = () => {
  return (
    <div className="bg-[#7b39ed] py-30 flex flex-col items-center justify-center w-full">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-white text-3xl md:text-4xl font-bold mb-2">
          Loved by Content Creators Worldwide
        </h2>
        <p className="text-purple-100 text-lg">
          See what our users have to say
        </p>
      </div>

      {/* Swiper Container */}
      <div className="max-w-6xl w-full">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-16 px-4!"
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl h-full flex flex-col justify-between text-white hover:bg-white/20 transition-all duration-300">
                <div>
                  <Quote className="w-10 h-10 mb-4 opacity-50 rotate-180" />
                  <p className="text-lg leading-relaxed mb-6 italic">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-auto">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-full border-2 border-purple-300"
                    />
                    <div>
                      <h4 className="font-bold text-base leading-tight">
                        {item.name}
                      </h4>
                      <p className="text-sm text-purple-200">
                        {item.role} <br />
                        <span className="text-xs opacity-75">
                          {item.company}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Star Rating */}
                  <div className="flex gap-1 text-yellow-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
          width: 25px;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
};

export default TestimonialSlider;