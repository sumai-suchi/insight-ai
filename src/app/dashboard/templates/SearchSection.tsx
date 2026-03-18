"use client";
import { Search } from "lucide-react";
import React, { use } from "react";

function SearchSection({ onSearchInput }: any) {
  return (
    <div className="p-10 w-full bg-linear-to-br from-purple-500 to-blue-500 text-white flex flex-col justify-center items-center gap-4">
      <h2 className="text-3xl font-bold">Browse All Templates</h2>
      <p>What would you like to create today?</p>
      <div className="w-full flex justify-center">
        <div className="flex gap-2 justify-center p-2 border rounded-md bg-white my-5 w-[50%]">
          <Search className="text-primary" />
          <input
            type="text"
            placeholder="Search templates..."
            onChange={(event) => onSearchInput(event.target.value)}
            className="w-full focus:outline-none text-black bg-transparent"
          />
        </div>
      </div>
    </div>
  );
}

export default SearchSection;
