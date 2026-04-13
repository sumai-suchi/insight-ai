"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1500);
  };

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#0F2854] p-8 md:p-16 shadow-2xl">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-[#1C4D8D] rounded-full blur-[120px] opacity-50" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-64 h-64 bg-blue-400 rounded-full blur-[100px] opacity-20" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-blue-200 text-xs font-bold uppercase tracking-wider">
                <Sparkles size={14} />
                <span>The InsightAI Weekly</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Stay ahead of the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-100">
                  AI Revolution.
                </span>
              </h2>

              <p className="text-lg text-blue-100/80 max-w-md">
                Get premium AI writing tips and the latest tech news delivered
                straight to your inbox. Join 12,000+ professionals.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 text-sm text-blue-200/60">
                  <ShieldCheck size={18} className="text-blue-400" />
                  No Spam, ever.
                </div>
                <div className="flex items-center gap-2 text-sm text-blue-200/60">
                  <CheckCircle2 size={18} className="text-blue-400" />
                  Unsubscribe anytime.
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="bg-white p-2 rounded-3xl shadow-inner group">
              {status === "success" ? (
                <div className="py-12 px-6 text-center animate-in fade-in zoom-in duration-500">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0F172A]">
                    You are on the list!
                  </h3>
                  <p className="text-gray-500 mt-2">
                    Check your inbox for your first AI guide.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-2"
                >
                  <input
                    type="email"
                    required
                    placeholder="Enter your professional email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-6 py-5 rounded-2xl text-[#0F172A] focus:outline-none placeholder:text-gray-400 text-lg"
                  />
                  <button
                    disabled={status === "loading"}
                    className="bg-[#1C4D8D] hover:bg-[#0F2854] text-white px-8 py-5 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 group active:scale-95 disabled:opacity-70"
                  >
                    {status === "loading" ? "Joining..." : "Join Now"}
                    <Send
                      size={18}
                      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Brand Text Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-[#0F172A]/40 font-medium">
            Trusted by teams at <span className="font-bold">InsightAI</span>{" "}
            Global Network
          </p>
        </div>
      </div>
    </section>
  );
}
