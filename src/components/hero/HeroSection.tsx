"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import HeroContent from "./HeroContent";
const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // autoplay blocked হলে hanle করবে

        console.log("Autoplay blocked by browser");
      });
    }
  }, []);
  return (
    <section className="relative w-full h-[70vh] overflow-hidden">
      {/* video Backround */}
      <motion.video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      {/* --Dark Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Animated Blue Orbs */}
      <div
        className="absolute top-20 left-10 w-72 h-72 
                      bg-blue-500/20 rounded-full blur-3xl animate-pulse"
      />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 
                      bg-purple-500/20 rounded-full blur-3xl animate-pulse"
      />
      <HeroContent></HeroContent>
    </section>
  );
};

export default HeroSection;
