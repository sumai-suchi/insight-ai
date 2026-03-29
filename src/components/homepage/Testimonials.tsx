"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Quote, Star } from "lucide-react";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// ইন্টারফেস আপডেট (এপিআই ডাটার সাথে মিল রেখে)
export interface ReviewData {
  _id?: string;
  name: string;
  email: string;
  image: string;
  rating: number;
  comment: string;
}

const TestimonialSlider = () => {
  const [reviewData, setReviewData] = useState<ReviewData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log("reviewData", reviewData);

  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setReviewData(data.data);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading)
    return (
      <div className="py-20 text-center text-gray-500">Loading reviews...</div>
    );

  return (
    <div className="bg-white py-20 px-4 w-full font-sans">
      {/* Header Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-gray-900 text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
          Loved by Content Creators{" "}
          <span className="text-purple-600">Worldwide</span>
        </h2>
        <p className="text-gray-600 text-lg md:text-xl">
          Don't just take our word for it—hear from the experts using our
          platform.
        </p>
      </div>

      {/* Swiper Container */}
      <div className="max-w-7xl mx-auto">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true, dynamicBullets: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-16"
        >
          {reviewData.map((item, index) => (
            <SwiperSlide key={item._id || index} className="h-full">
              <div className="h-full bg-gray-50 border border-gray-100 p-8 rounded-3xl flex flex-col justify-between hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-500 group">
                <div>
                  <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors duration-300">
                    <Quote className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  {/* API থেকে আসা comment এখানে বসবে */}
                  <p className="text-gray-700 text-lg leading-relaxed mb-8 line-clamp-3 font-medium">
                    &ldquo;{item.comment}&rdquo;
                  </p>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={item.image || "https://i.pravatar.cc/150"}
                      alt={item.name}
                      className="w-14 h-14 rounded-full object-cover ring-4 ring-white shadow-sm"
                    />
                    <div>
                      {/* API থেকে আসা name */}
                      <h4 className="font-bold text-gray-900 text-lg leading-tight">
                        {item.name}
                      </h4>
                      {/* Static Role */}
                      <p className="text-sm text-purple-600 font-semibold">
                        Content Strategist
                      </p>
                      {/* Static Company */}
                      <p className="text-xs text-gray-400 uppercase tracking-wider mt-0.5">
                        Creative Hub
                      </p>
                    </div>
                  </div>

                  {/* API থেকে আসা rating অনুযায়ী স্টার ম্যাপ */}
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                    {/* যদি রেটিং ৫ এর কম হয় তবে বাকিগুলো খালি স্টার দেখাতে পারেন (অপশনাল) */}
                    {[...Array(5 - item.rating)].map((_, i) => (
                      <Star
                        key={i + 10}
                        size={16}
                        fill="none"
                        className="text-gray-300"
                      />
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
          background: #9333ea !important;
          width: 10px;
          height: 10px;
          opacity: 0.3;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
          width: 30px;
          border-radius: 5px;
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default TestimonialSlider;
