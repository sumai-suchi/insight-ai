"use client";
import { Search } from "lucide-react";
import React, { use } from "react";

function SearchSection({ onSearchInput }: any) {
  return (
    <div
      className="p-10 w-full flex flex-col justify-center items-center gap-4"
      style={{
        background:
          "linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-secondary) 100%)",
        color: "#fff",
      }}
    >
      <h2 className="text-3xl font-bold tracking-tight">
        Browse All Templates
      </h2>
      <p className="text-lg text-white/80">
        What would you like to create today?
      </p>
      <div className="w-full flex justify-center">
        <div className="flex gap-2 justify-center p-2 border border-white/30 rounded-lg bg-white/90 my-5 w-full max-w-xl shadow-sm">
          <Search className="text-[var(--brand-primary)]" />
          <input
            type="text"
            placeholder="Search templates..."
            onChange={(event) => onSearchInput(event.target.value)}
            className="w-full focus:outline-none text-gray-700 bg-transparent placeholder:text-gray-400"
          />
        </div>
      </div>
    </div>
  );
}

export default SearchSection;
