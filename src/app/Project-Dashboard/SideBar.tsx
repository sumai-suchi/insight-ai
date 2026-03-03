
"use client";

import {
  Home,
  LayoutDashboard,
  PenTool,
  Lightbulb,
  Newspaper,
  FileText,
  Image,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  return (
    <div className="h-screen w-64 flex flex-col justify-between bg-linear-to-b from-purple-700 to-purple-900 text-white p-5">

      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="flex items-center gap-2 mb-10">
          <span className="text-2xl">✨</span>
          <h1 className="text-xl font-bold">ContentAI Pro</h1>
        </div>

        {/* Menu */}
        <ul className="space-y-3">
          <SidebarItem icon={<Home size={18} />} label="Home" />
          
          {/* Active Item */}
          <SidebarItem
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
            active
          />

          <SidebarItem icon={<PenTool size={18} />} label="AI Editor" />
          <SidebarItem icon={<Lightbulb size={18} />} label="Solutions" />
          <SidebarItem icon={<Newspaper size={18} />} label="Latest News" />
          <SidebarItem icon={<FileText size={18} />} label="Templates" />
          <SidebarItem icon={<Image size={18} />} label="Media Library" />
        </ul>
      </div>

      {/* Bottom Section */}
      <div>
        <SidebarItem icon={<Settings size={18} />} label="Settings" />

        {/* Upgrade Card */}
        <div className="mt-6 bg-purple-800 rounded-xl p-4 shadow-lg">
          <p className="text-sm">Free Plan</p>
          <p className="text-xs text-purple-200 mb-3">
            1,500 words remaining
          </p>

          <button className="w-full py-2 rounded-lg bg-linear-to-r from-fuchsia-500 to-purple-600 font-semibold">
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
}

function SidebarItem({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <li>
      <button
        className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition 
        ${
          active
            ? "bg-white text-purple-700 font-semibold"
            : "hover:bg-purple-800 text-purple-200"
        }`}
      >
        {icon}
        {label}
      </button>
    </li>
  );
}