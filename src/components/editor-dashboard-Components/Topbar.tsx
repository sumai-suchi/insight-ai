"use client";

import { Bell, Search, Settings, ChevronDown } from "lucide-react";
import { useState } from "react";

interface TopbarProps {
  editorName: string;
  avatarUrl?: string;
  unreadCount?: number;
}

export function Topbar({
  editorName,
  avatarUrl,
  unreadCount = 3,
}: TopbarProps) {
  const [searchFocused, setSearchFocused] = useState(false);

  const initials = editorName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex items-center justify-between py-4 mb-2">
      {/* left: greeting */}
      <div>
        <p className="text-xs text-zinc-400 font-medium tracking-wide uppercase">
          {dateStr}
        </p>
        <h1 className="text-xl font-semibold text-zinc-900 mt-0.5">
          Good{" "}
          {now.getHours() < 12
            ? "morning"
            : now.getHours() < 17
            ? "afternoon"
            : "evening"}
          , {editorName.split(" ")[0]} 👋
        </h1>
      </div>

      {/* right: search + actions + avatar */}
      <div className="flex items-center gap-3">
        {/* search */}
        <div
          className={`flex items-center gap-2 bg-zinc-100 rounded-xl px-3 py-2 transition-all duration-200 ${
            searchFocused ? "ring-2 ring-blue-500 bg-white" : ""
          }`}
        >
          <Search className="w-4 h-4 text-zinc-400 shrink-0" />
          <input
            type="text"
            placeholder="Search articles…"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="bg-transparent text-sm text-zinc-700 placeholder:text-zinc-400 outline-none w-48"
          />
        </div>

        {/* notifications */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-zinc-100 hover:bg-zinc-200 transition-colors">
          <Bell className="w-4 h-4 text-zinc-600" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
              {unreadCount}
            </span>
          )}
        </button>

        {/* settings */}
        <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-zinc-100 hover:bg-zinc-200 transition-colors">
          <Settings className="w-4 h-4 text-zinc-600" />
        </button>

        {/* avatar */}
        <button className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-zinc-100 transition-colors">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={editorName}
              className="w-7 h-7 rounded-lg object-cover"
            />
          ) : (
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
              {initials}
            </div>
          )}
          <span className="text-sm font-medium text-zinc-700">
            {editorName.split(" ")[0]}
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
        </button>
      </div>
    </div>
  );
}