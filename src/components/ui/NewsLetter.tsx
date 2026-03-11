import React from "react";
import { Sparkles } from "lucide-react";

const Newsletter = () => {
  return (
    <section className="w-full max-w-7xl mx-auto py-12">
      <div className="w-full bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] rounded-[1rem] p-10 md:p-16 flex flex-col items-center text-center shadow-2xl shadow-purple-200">
        {/* Icon */}
        <div className="mb-6">
          <Sparkles size={48} className="text-white animate-pulse" />
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Never Miss an Update
        </h2>

        {/* Description */}
        <p className="text-purple-100 text-sm md:text-base max-w-lg mb-10 leading-relaxed">
          Subscribe to our newsletter and get the latest insights delivered
          straight to your inbox.
        </p>

        {/* Input & Button Container */}
        <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-2xl flex flex-col sm:flex-row items-center gap-2">
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full bg-transparent border-none outline-none px-4 py-3 text-white placeholder:text-purple-200 text-sm"
          />
          <button className="w-full sm:w-auto bg-white text-purple-700 font-bold px-8 py-3 rounded-xl hover:bg-purple-50 transition-all active:scale-95 whitespace-nowrap">
            Subscribe
          </button>
        </div>

        {/* Extra Privacy Text (Optional) */}
        <p className="mt-4 text-purple-300 text-[10px] uppercase tracking-widest font-medium">
          Your privacy is our priority
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
