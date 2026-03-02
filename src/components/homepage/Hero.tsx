// import { Sparkles } from "lucide-react";
// import heroImage from "../../../public/hero_image.jpg";
// import React from "react";
// import HomeButton from "../ui/HomeButton";
// import Image from "next/image";

// const Hero = () => {
//   return (
//     <section className="bg-gradient-to-r from-[#57198A] to-[#382A86] text-white py-16 lg:py-28 w-full">
//       <div className="max-w-7xl mx-auto px-6 lg:flex items-center justify-between">
//         {/* Left Content */}
//         <div className="lg:w-1/2">
//           <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight mb-6">
//             Create <span className="text-blue-600">AI-Powered</span> Content &
//             Discover Personalized News
//           </h1>
//           <p className="text-lg mb-8 leading-relaxed">
//             Generate SEO-optimized blogs, check plagiarism, and stay updated
//             with trending news — all powered by advanced AI technology.
//           </p>

//           {/* Action Buttons */}
//           <div className="flex flex-wrap gap-4 mb-8">
//             <HomeButton variant="primary" icon={Sparkles}>
//               Try AI Editor
//             </HomeButton>
//             <HomeButton variant="outline">Try AI Editor</HomeButton>
//           </div>

//           {/* Trust Badges */}
//           <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-500">
//             <div className="flex items-center gap-2 text-white">
//               <span className="w-5 h-5 bg-green-100 text-green-600 flex items-center justify-center rounded-full">
//                 ✓
//               </span>
//               No credit card required
//             </div>
//             <div className="flex text-white items-center gap-2">
//               <span className="w-5 h-5 bg-green-100 text-green-600 flex items-center justify-center rounded-full">
//                 ✓
//               </span>
//               Free 14-day trial
//             </div>
//           </div>
//         </div>

//         {/* Right Image/Illustration */}
//         <div className="lg:w-1/2 mt-12 lg:mt-0 flex justify-center relative">
//           <div className="relative w-full max-w-lg">
//             {/* Background Decoration */}
//             <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
//             <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

//             {/* Main Image */}
//             <Image
//               src={heroImage}
//               alt="AI Content Illustration"
//               className="relative rounded-2xl shadow-2xl border border-gray-100"
//             />

//             <div className="bg-white text-black max-w-25 rounded-md p-2 space-y-1.2 absolute top-52 left-[-20]">
//               <h2 className="text-xs">AI Generated</h2>
//               <p className="text-2xl">10,847</p>
//               <p className="text-xs">Articles this month</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;

"use client"; // Framer Motion এর জন্য এটি প্রয়োজনীয়

import { Sparkles, Star, Zap, Cpu } from "lucide-react";
import heroImage from "../../../public/hero_image.jpg";
import React from "react";
import HomeButton from "../ui/HomeButton";
import Image from "next/image";
import { motion } from "framer-motion";

const Hero = () => {
  // এনিমেশন ভেরিয়েন্ট
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.2, duration: 0.8, ease: "easeOut" },
    }),
  };

  const floating = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#57198A] to-[#382A86] text-white py-16 lg:py-28 w-full">
      {/* --- ব্যাকগ্রাউন্ড এনিমেটেড স্টিকার/শেপস --- */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-10 left-10 opacity-20"
      >
        <Star size={40} className="text-yellow-400" />
      </motion.div>

      <motion.div
        animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute bottom-20 left-1/4 opacity-20 hidden md:block"
      >
        <Cpu size={60} className="text-blue-400" />
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-20 right-1/3 opacity-20"
      >
        <Zap size={30} className="text-purple-300" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:flex items-center justify-between relative z-10">
        {/* Left Content */}
        <div className="lg:w-1/2">
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-4xl lg:text-6xl font-extrabold leading-tight mb-6"
          >
            Create <span className="text-blue-400">AI-Powered</span> Content &
            Discover Personalized News
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-lg mb-8 leading-relaxed text-gray-200"
          >
            Generate SEO-optimized blogs, check plagiarism, and stay updated
            with trending news — all powered by advanced AI technology.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="flex flex-wrap gap-4 mb-8"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <HomeButton variant="primary" icon={Sparkles}>
                Try AI Editor
              </HomeButton>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <HomeButton variant="outline">Learn More</HomeButton>
            </motion.div>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 text-sm"
          >
            <div className="flex items-center gap-2 text-white">
              <span className="w-5 h-5 bg-green-500 text-white flex items-center justify-center rounded-full text-[10px]">
                ✓
              </span>
              No credit card required
            </div>
            <div className="flex text-white items-center gap-2">
              <span className="w-5 h-5 bg-green-500 text-white flex items-center justify-center rounded-full text-[10px]">
                ✓
              </span>
              Free 14-day trial
            </div>
          </motion.div>
        </div>

        {/* Right Image/Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="lg:w-1/2 mt-12 lg:mt-0 flex justify-center relative"
        >
          <div className="relative w-full max-w-lg">
            {/* Background Decoration (Blobs) */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-screen filter blur-[80px] opacity-30 animate-pulse"></div>
            <div className="absolute bottom-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-screen filter blur-[80px] opacity-30 animate-pulse delay-700"></div>

            {/* Main Image with Floating effect */}
            <motion.div variants={floating} animate="animate">
              <Image
                src={heroImage}
                alt="AI Content Illustration"
                className="relative rounded-2xl shadow-2xl border border-white/10"
              />
            </motion.div>

            {/* Floating Stats Card */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="bg-white/90 backdrop-blur-md text-black px-6 py-4 rounded-xl shadow-xl absolute top-1/2 -left-10 md:-left-20 border border-gray-200"
            >
              <h2 className="text-xs font-bold text-purple-700 uppercase tracking-wider">
                AI Generated
              </h2>
              <p className="text-3xl font-black">10,847</p>
              <p className="text-xs text-gray-500 font-medium">
                Articles this month
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
