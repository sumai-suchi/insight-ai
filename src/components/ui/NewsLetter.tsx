import React from "react";
import { Sparkles } from "lucide-react";

const Newsletter = () => {
  return (
    <section className="w-full py-0">
      <div className="w-full bg-[#0F2854] border border-[#BDE8F5]/20 rounded-[1rem] p-10 md:p-16 flex flex-col items-center text-center shadow-2xl shadow-primary/10">
        {/* Icon */}
        <div className="mb-6">
          <Sparkles size={48} className="text-white animate-pulse" />
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#BDE8F5] mb-4">
          Never Miss an Update
        </h2>

        {/* Description */}
        <p className="text-[#BDE8F5]/85 text-sm md:text-base max-w-lg mb-10 leading-relaxed">
          Subscribe to our newsletter and get the latest insights delivered
          straight to your inbox.
        </p>

        {/* Input & Button Container */}
        <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-2xl flex flex-col sm:flex-row items-center gap-2">
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full bg-transparent border-none outline-none px-4 py-3 text-white placeholder:text-white/70 text-sm"
          />
          <button className="w-full sm:w-auto bg-[#BDE8F5] text-[#0F2854] font-bold px-8 py-3 rounded-xl hover:bg-[#BDE8F5]/90 transition-all active:scale-95 whitespace-nowrap">
            Subscribe
          </button>
        </div>

        {/* Extra Privacy Text (Optional) */}
        <p className="mt-4 text-[#BDE8F5]/70 text-[10px] uppercase tracking-widest font-medium">
          Your privacy is our priority
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
