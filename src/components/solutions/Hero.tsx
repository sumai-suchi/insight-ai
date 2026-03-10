// components/Hero.tsx
import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative min-h-screen w-full bg-[#3b2a9f] bg-gradient-to-br from-[#4c35c1] to-[#251b63] flex flex-col items-center pt-20 px-4 text-white font-sans">
      {/* Top Badge */}
      <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm">
        <span className="text-xs font-medium tracking-wide">
          ✨ Complete Content & News Platform
        </span>
      </div>

      {/* Main Heading */}
      <h1 className="text-4xl md:text-6xl font-bold text-center max-w-4xl leading-tight mb-6">
        Create AI-Powered Content & Discover Personalized News
      </h1>

      {/* Subtext */}
      <p className="text-gray-200 text-center max-w-2xl text-lg mb-10 leading-relaxed">
        Generate high-quality content, optimize for SEO, and get trending news
        tailored to you — all in one powerful platform.
      </p>

      {/* Primary Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-12">
        <button className="bg-white text-[#3b2a9f] font-semibold px-8 py-3 rounded-md hover:bg-gray-100 transition-colors flex items-center gap-2">
          <span>✍️</span> Try AI Editor
        </button>
        <button className="border border-white/40 bg-white/5 hover:bg-white/10 backdrop-blur-md px-8 py-3 rounded-md transition-all flex items-center gap-2">
          <span>📰</span> Explore News Feed
        </button>
      </div>

      {/* Secondary Feature Pills */}
      <div className="flex flex-wrap justify-center gap-3 mb-16">
        {[
          "AI Content Editor",
          "Personalized News",
          "SEO Optimization",
          "Plagiarism Check",
        ].map((tag) => (
          <span
            key={tag}
            className="text-xs bg-white/10 border border-white/20 px-4 py-2 rounded-full cursor-default"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Dashboard Image Section */}
      <div className="relative w-full max-w-5xl group">
        <div className="relative rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl">
          <Image
            src="https://i.ibb.co.com/mCBBf9H5/scene-with-business-person-working-futuristic-office-job.jpg"
            alt="Platform Interface"
            width={1200}
            height={675}
            className="w-full h-auto object-cover"
            priority
          />
        </div>

        {/* Floating Stats Cards */}
        <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl text-black hidden md:block">
          <p className="text-gray-500 text-sm font-medium">Content Generated</p>
          <p className="text-3xl font-bold">50,000+</p>
        </div>

        <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl text-black hidden md:block">
          <p className="text-gray-500 text-sm font-medium">Active Users</p>
          <p className="text-3xl font-bold">12,500+</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
