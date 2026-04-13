"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroContent from "./HeroContent";

const PARTICLES = Array.from({ length: 32 }, (_, i) => ({
  id: i,
  x: (i * 3.71) % 100,
  y: (i * 6.83) % 100,
  size: (i % 3) + 1.2,
  duration: 9 + (i % 8) * 1.4,
  delay: (i % 6) * 0.9,
}));

const GRID_DOTS = Array.from({ length: 120 }, (_, i) => ({ id: i }));

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY        = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const overlayOp  = useTransform(scrollYProgress, [0, 1], [0, 0.75]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center"
    >
      {/* ══════════════════════════════════════
          TOP LIGHTING — strong beam from above
      ══════════════════════════════════════ */}

      {/* Primary top-center beam — wide, bright */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full sm:w-[900px] h-[55vh] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 100% at 50% 0%, rgba(28,77,141,0.75) 0%, rgba(15,40,84,0.35) 45%, transparent 75%)",
          filter: "blur(2px)",
        }}
      />

      {/* Top-left accent beam */}
      <div
        className="absolute -top-10 -left-10 w-[50vw] sm:w-[500px] h-[50vh] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 100% at 0% 0%, rgba(6,182,212,0.22) 0%, transparent 65%)",
          filter: "blur(8px)",
        }}
      />

      {/* Top-right accent beam */}
      <div
        className="absolute -top-10 -right-10 w-[50vw] sm:w-[500px] h-[50vh] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 100% at 100% 0%, rgba(99,102,241,0.2) 0%, transparent 65%)",
          filter: "blur(8px)",
        }}
      />

      {/* Thin bright top edge line glow */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(6,182,212,0.6) 20%, rgba(96,165,250,0.9) 50%, rgba(167,139,250,0.6) 80%, transparent 100%)",
          boxShadow: "0 0 40px 8px rgba(96,165,250,0.35)",
        }}
      />

      {/* ══════════════════════════════════════
          BOTTOM LIGHTING — glow rising from below
      ══════════════════════════════════════ */}

      {/* Primary bottom-center upward beam */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full sm:w-[900px] h-[50vh] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 100% at 50% 100%, rgba(28,77,141,0.65) 0%, rgba(15,40,84,0.3) 45%, transparent 75%)",
          filter: "blur(2px)",
        }}
      />

      {/* Bottom-left rising glow */}
      <div
        className="absolute -bottom-10 -left-10 w-[50vw] sm:w-[450px] h-[45vh] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 100% at 0% 100%, rgba(6,182,212,0.18) 0%, transparent 65%)",
          filter: "blur(10px)",
        }}
      />

      {/* Bottom-right rising glow */}
      <div
        className="absolute -bottom-10 -right-10 w-[50vw] sm:w-[450px] h-[45vh] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 100% at 100% 100%, rgba(99,102,241,0.18) 0%, transparent 65%)",
          filter: "blur(10px)",
        }}
      />

      {/* Thin bright bottom edge line glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.5) 20%, rgba(96,165,250,0.8) 50%, rgba(6,182,212,0.5) 80%, transparent 100%)",
          boxShadow: "0 0 40px 8px rgba(96,165,250,0.25)",
        }}
      />

      {/* ══════════════════════════════════════
          AMBIENT SIDE GLOWS
      ══════════════════════════════════════ */}

      {/* Left side ambient */}
      <motion.div
        className="absolute -left-32 top-1/4 w-[400px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(28,77,141,0.35) 0%, transparent 65%)",
          filter: "blur(55px)",
        }}
        animate={{ y: [0, 30, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Right side ambient */}
      <motion.div
        className="absolute -right-32 top-1/3 w-[400px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 65%)",
          filter: "blur(55px)",
        }}
        animate={{ y: [0, -30, 0], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Center deep glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 60%)",
          filter: "blur(70px)",
        }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ══════════════════════════════════════
          PARALLAX DOT GRID
      ══════════════════════════════════════ */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 grid grid-cols-12 opacity-[0.055] pointer-events-none"
      >
        {GRID_DOTS.map((d) => (
          <div key={d.id} className="flex items-center justify-center aspect-square">
            <div className="w-[2px] h-[2px] rounded-full bg-white" />
          </div>
        ))}
      </motion.div>

      {/* ══════════════════════════════════════
          MESH GRID
      ══════════════════════════════════════ */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(28,77,141,1) 1px, transparent 1px), linear-gradient(90deg, rgba(28,77,141,1) 1px, transparent 1px)",
          backgroundSize: "90px 90px",
        }}
      />

      {/* ══════════════════════════════════════
          ORBITING RINGS
      ══════════════════════════════════════ */}
      <motion.div
        className="absolute top-[10%] right-[5%] w-48 h-48 sm:w-64 sm:h-64 rounded-full pointer-events-none"
        style={{ border: "1px solid rgba(28,77,141,0.3)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-cyan-400/80 shadow-[0_0_10px_rgba(6,182,212,1)]" />
      </motion.div>
      <motion.div
        className="absolute top-[10%] right-[5%] w-28 h-28 sm:w-40 sm:h-40 rounded-full pointer-events-none"
        style={{ border: "1px solid rgba(6,182,212,0.18)" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-300/90" />
      </motion.div>
      <motion.div
        className="absolute bottom-[15%] left-[4%] w-32 h-32 sm:w-44 sm:h-44 rounded-full pointer-events-none"
        style={{ border: "1px solid rgba(28,77,141,0.22)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-400/70 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
      </motion.div>

      {/* ══════════════════════════════════════
          FLOATING PARTICLES
      ══════════════════════════════════════ */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-blue-300/25"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
            animate={{ y: [0, -60, 0], opacity: [0, 0.65, 0] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* ══════════════════════════════════════
          SCROLL VEIL
      ══════════════════════════════════════ */}
      <motion.div
        style={{ opacity: overlayOp }}
        className="absolute inset-0 bg-[#020c1f] pointer-events-none"
      />

      <HeroContent />
    </section>
  );
}
