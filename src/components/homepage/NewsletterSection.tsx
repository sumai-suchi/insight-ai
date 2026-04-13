"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Mail, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

const PERKS = [
  "Weekly AI writing tips & tricks",
  "Trending news digest every Monday",
  "Early access to new features",
  "Exclusive templates & prompts",
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) { setDone(true); setEmail(""); }
  };

  return (
    <section className="w-full py-24 overflow-hidden relative">
      {/* glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(28,77,141,0.18) 0%, transparent 70%)" }} />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(15,40,84,0.85) 0%, rgba(28,77,141,0.6) 50%, rgba(15,40,84,0.85) 100%)",
            border: "1px solid rgba(28,77,141,0.45)",
            boxShadow: "0 8px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          {/* Mesh grid inside card */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none rounded-3xl"
            style={{ backgroundImage: "linear-gradient(rgba(28,77,141,1) 1px, transparent 1px), linear-gradient(90deg, rgba(28,77,141,1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 p-8 sm:p-12">
            {/* Left */}
            <div className="flex flex-col justify-center">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6 w-fit"
                style={{ background: "rgba(28,77,141,0.25)", border: "1px solid rgba(28,77,141,0.4)", color: "rgba(147,197,253,0.9)" }}>
                <Sparkles className="w-3 h-3 text-cyan-400" />
                Newsletter
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
                Stay Ahead with{" "}
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, #60a5fa, #a78bfa)" }}>
                  AI Insights
                </span>
              </h2>
              <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-8">
                Join 10,000+ writers and get the best AI content tips, platform updates, and curated news delivered to your inbox.
              </p>

              <ul className="space-y-3">
                {PERKS.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-sm text-white/60">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right */}
            <div className="flex flex-col justify-center">
              {done ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center gap-4 py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)" }}>
                    <CheckCircle2 className="w-8 h-8 text-green-400" />
                  </div>
                  <p className="text-white font-bold text-xl">You&apos;re in!</p>
                  <p className="text-white/45 text-sm">Check your inbox for a confirmation email.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="rounded-2xl p-1" style={{ background: "rgba(10,18,40,0.6)", border: "1px solid rgba(28,77,141,0.35)" }}>
                    <div className="flex items-center gap-3 px-4 py-3">
                      <Mail className="w-5 h-5 text-white/30 shrink-0" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="flex-1 bg-transparent text-sm text-white placeholder-white/25 outline-none"
                        required
                      />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: "0 0 32px rgba(28,77,141,0.6)" }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-semibold text-white group transition-all"
                    style={{ background: "linear-gradient(135deg, #1C4D8D 0%, #0F2854 100%)", border: "1px solid rgba(28,77,141,0.6)", boxShadow: "0 4px 24px rgba(28,77,141,0.4)" }}
                  >
                    Subscribe Now
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>

                  <p className="text-white/25 text-xs text-center">No spam. Unsubscribe anytime.</p>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
