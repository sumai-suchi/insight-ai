import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section className="relative bg-[#F9FAFB] min-h-[90vh] flex items-center w-full overflow-hidden">
      {/* Background Decorative Blurs */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-full bg-blue-100/60 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 -translate-x-1/4 w-[300px] h-[300px] bg-indigo-100/50 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-20 py-12 flex flex-col md:flex-row items-center relative z-10">
        {/* Left Content Column */}
        <div className="w-full md:w-1/2 flex flex-col items-start text-left z-20">
          <h1 className="text-[#1F2937] text-4xl lg:text-5xl font-[900] leading-[1.1] mb-6 tracking-tight">
            Create & Discover <br />
            <span className="text-[#3B82F6] inline-block mt-2">
              AI-Powered Insights
            </span>
          </h1>

          <p className="text-gray-600 text-sm md:text-base mb-10 max-w-lg leading-relaxed font-medium">
            Generate SEO-optimized blogs, check plagiarism, and stay updated
            with trending news—all powered by advanced AI.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/sign-up" className="w-full sm:w-auto">
              <button className="w-full sm:min-w-[180px] bg-[#3B82F6] hover:bg-blue-700 active:scale-95 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 shadow-xl shadow-blue-200/50">
                Get Started
              </button>
            </Link>

            <Link href="/ai-editing" className="w-full sm:w-auto">
              <button className="w-full sm:min-w-[180px] border-2 border-gray-200 text-[#1F2937] hover:border-[#3B82F6] hover:text-[#3B82F6] active:scale-95 font-bold py-4 px-8 rounded-xl transition-all duration-200 bg-white shadow-sm">
                Try AI Editor
              </button>
            </Link>
          </div>
        </div>

        {/* Right Illustration Column */}
        <div className="w-full md:w-1/2 mt-16 md:mt-0 flex justify-center relative">
          <div className="relative w-full max-w-[500px] aspect-square md:aspect-auto md:h-[500px] drop-shadow-2xl">
            {/* Animated UI Badge (The "Perfect" Touch) */}
            <div className="absolute -top-4 -left-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl z-30 border border-white animate-bounce [animation-duration:5s] hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  AI
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                    Generating
                  </p>
                  <p className="text-xs text-gray-800 font-bold">
                    Personalized Feed...
                  </p>
                </div>
              </div>
            </div>

            <Image
              src="/Hero.jpg"
              alt="AI Content Platform Interface Preview"
              fill
              className="object-contain rounded-3xl"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
