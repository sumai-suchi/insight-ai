// "use client";

// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Autoplay } from "swiper/modules";
// import { Quote } from "lucide-react";

// export interface Testimonial {
//   id: number;
//   quote: string;
//   name: string;
//   role: string;
//   company: string;
//   image: string;
//   rating: number;
// }

// const testimonials: Testimonial[] = [
//   {
//     id: 1,
//     quote:
//       "This platform has transformed our content workflow. We're now producing 3x more content in half the time. The AI suggestions are incredibly accurate!",
//     name: "Sarah Johnson",
//     role: "Content Marketing Manager",
//     company: "TechCorp",
//     image: "https://i.pravatar.cc/150?u=sarah",
//     rating: 5,
//   },
//   {
//     id: 2,
//     quote:
//       "As a freelancer, this tool is a game-changer. The plagiarism checker and SEO optimization features help me deliver premium quality work to my clients.",
//     name: "Michael Chen",
//     role: "Freelance Writer",
//     company: "Independent",
//     image: "https://i.pravatar.cc/150?u=michael",
//     rating: 5,
//   },
//   {
//     id: 3,
//     quote:
//       "The personalized news feed keeps me updated on industry trends while I create content. It's like having a research assistant and writer in one platform!",
//     name: "Emily Rodriguez",
//     role: "Digital Marketing Director",
//     company: "Growth Labs",
//     image: "https://i.pravatar.cc/150?u=emily",
//     rating: 5,
//   },
//   {
//     id: 4,
//     quote:
//       "I love the AI content suggestions! It saves me hours every week and helps me stay on top of trends. The insights are always relevant, making it easy to create content that truly.",
//     name: "David Lee",
//     role: "Content Strategist",
//     company: "Creative Hub",
//     image: "https://i.pravatar.cc/150?u=david",
//     rating: 5,
//   },
// ];

// const TestimonialSlider = () => {
//   return (
//     <div className="bg-gray-500 mb-12 py-12 flex flex-col items-center justify-center w-full">
//       {/* Header Section */}
//       <div className="text-center mb-12">
//         <h2 className="text-black text-3xl md:text-4xl font-bold mb-2">
//           Loved by Content Creators Worldwide
//         </h2>
//         <p className="text-purple-100 text-lg">
//           See what our users have to say
//         </p>
//       </div>

//       {/* Swiper Container */}
//       <div className="max-w-6xl w-full">
//         <Swiper
//           modules={[Pagination, Autoplay]}
//           spaceBetween={20}
//           slidesPerView={1}
//           autoplay={{ delay: 5000 }}
//           pagination={{ clickable: true }}
//           breakpoints={{
//             640: { slidesPerView: 1 },
//             768: { slidesPerView: 2 },
//             1024: { slidesPerView: 3 },
//           }}
//           className="pb-8 px-4!"
//         >
//           {testimonials.map((item) => (
//             <SwiperSlide key={item.id}>
//               <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl flex flex-col justify-between text-black hover:bg-white/20 transition-all duration-300">
//                 <div>
//                   <Quote className="w-10 h-10 mb-4 opacity-50 rotate-180" />
//                   <p className="text-lg leading-relaxed mb-4 italic">
//                     &ldquo;{item.quote}&rdquo;
//                   </p>
//                 </div>

//                 <div className="mt-auto">
//                   <div className="flex items-center gap-4 mb-4">
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-12 h-12 rounded-full border-2 border-purple-400"
//                     />
//                     <div>
//                       <h4 className="font-bold text-base leading-tight">
//                         {item.name}
//                       </h4>
//                       <p className="text-sm text-purple-400">
//                         {item.role} <br />
//                         <span className="text-xs opacity-75">
//                           {item.company}
//                         </span>
//                       </p>
//                     </div>
//                   </div>

//                   {/* Star Rating */}
//                   <div className="flex gap-1 text-yellow-400">
//                     {[...Array(item.rating)].map((_, i) => (
//                       <span key={i}>★</span>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>

//       <style jsx global>{`
//         .swiper-pagination-bullet {
//           background: white !important;
//           opacity: 0.5;
//         }
//         .swiper-pagination-bullet-active {
//           opacity: 1;
//           width: 25px;
//           border-radius: 5px;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default TestimonialSlider;

"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Quote, Star } from "lucide-react";

// Swiper styles are required
import "swiper/css";
import "swiper/css/pagination";

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
    quote:
      "This platform has transformed our content workflow.is is going to be awsome We're now producing 3x more content in half the time. The AI suggestions are incredibly accurate!",
    name: "Sarah Johnson",
    role: "Content Marketing Manager",
    company: "TechCorp",
    image: "https://i.pravatar.cc/150?u=sarah",
    rating: 5,
  },
  {
    id: 2,
    quote:
      "As a freelancer, this tool is a game-changer. The plagiarism checker and SEO optimization features help me deliver premium quality work to my clients.",
    name: "Michael Chen",
    role: "Freelance Writer",
    company: "Independent",
    image: "https://i.pravatar.cc/150?u=michael",
    rating: 5,
  },
  {
    id: 3,
    quote:
      "The personalized news feed keeps me updated on industry trends while I create content. It's like having a research assistant and writer in one platform!",
    name: "Emily Rodriguez",
    role: "Digital Marketing Director",
    company: "Growth Labs",
    image: "https://i.pravatar.cc/150?u=emily",
    rating: 5,
  },
  {
    id: 4,
    quote:
      "I love the AI content suggestions! It saves me hours every week and helps me stay on top of trends. The insights are always relevant, making it easy to create content.",
    name: "David Lee",
    role: "Content Strategist",
    company: "Creative Hub",
    image: "https://i.pravatar.cc/150?u=david",
    rating: 5,
  },
];

const TestimonialSlider = () => {
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
          {testimonials.map((item) => (
            <SwiperSlide key={item.id} className="h-full">
              <div className="h-full bg-gray-50 border border-gray-100 p-8 rounded-3xl flex flex-col justify-between hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-500 group">
                <div>
                  <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors duration-300">
                    <Quote className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed mb-8 font-medium">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-full object-cover ring-4 ring-white shadow-sm"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg leading-tight">
                        {item.name}
                      </h4>
                      <p className="text-sm text-purple-600 font-semibold">
                        {item.role}
                      </p>
                      <p className="text-xs text-gray-400 uppercase tracking-wider mt-0.5">
                        {item.company}
                      </p>
                    </div>
                  </div>

                  {/* Star Rating */}
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom Styles for Pagination */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: #9333ea !important; /* purple-600 */
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
