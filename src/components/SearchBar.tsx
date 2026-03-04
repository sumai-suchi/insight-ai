"use client";
import { useState, useEffect, useRef } from "react";

interface Props {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({
  onSearch,
  placeholder = "Search news by title, source, keyword...",
  className = "",
}: Props) {
  const [value, setValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);

    return () => clearTimeout(timer);
  }, [value]);

  // Sync debounced value → parent
  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  // Clear search
  const handleClear = () => {
    setValue("");
    // তাৎক্ষণিক ক্লিয়ার — debounce এর জন্য অপেক্ষা না করে
    onSearch("");
    inputRef.current?.focus();
  };

  // Enter press → immediate search
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // debounce bypass করে immediate search
      setDebouncedValue(value);
      onSearch(value);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Search Icon */}
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
        <svg
          className="h-5 w-5 text-gray-400 dark:text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Input */}
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={`
          w-full pl-11 pr-12 py-3.5
          bg-white dark:bg-gray-800 
          border border-gray-200 dark:border-gray-700
          rounded-xl
          text-gray-900 dark:text-gray-100
          placeholder-gray-400 dark:placeholder-gray-500
          shadow-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          transition-all duration-200
          ${className}
        `}
        aria-label="Search news"
      />

      {/* Clear button - appears only when there's text */}
      {value && (
        <button
          onClick={handleClear}
          type="button"
          className={`
            absolute inset-y-0 right-0 pr-3.5
            flex items-center
            text-gray-400 hover:text-gray-600 dark:hover:text-gray-300
            focus:outline-none focus:text-gray-600
            transition-colors duration-150
          `}
          aria-label="Clear search"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
