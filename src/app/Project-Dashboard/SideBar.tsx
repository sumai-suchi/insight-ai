"use client";

import Link from "next/link";
import {
  Home,
  LayoutDashboard,
  PenTool,
  Lightbulb,
  Newspaper,
  FileText,
  Image,
  Settings,
  User,
} from "lucide-react";
import { useState } from "react";
import SignOutButton from "@/components/SignOutButton";

export default function Sidebar() {
  // Track the currently active item
  const [activeItem, setActiveItem] = useState("Dashboard");

  // Menu items with labels, icons, and hrefs
  const menuItems = [
    { icon: <Home size={18} />, label: "Home", href: "/" },
    {
      icon: <LayoutDashboard size={18} />,
      label: "Overview",
      href: "/dashboard",
    },
    { icon: <PenTool size={18} />, label: "AI Editor", href: "/ai-editor" },
    {
      icon: <Lightbulb size={18} />,
      label: "Personalized Feed",
      href: "/solutions",
    },
    {
      icon: <Newspaper size={18} />,
      label: "Bookmarks",
      href: "/bookmarks",
    },
    {
      icon: <FileText size={18} />,
      label: "Reading History",
      href: "/reading-history",
    },

    { icon: <User size={18} />, label: "Users", href: "/user" },
    { icon: <User size={18} />, label: "Notifications", href: "/notification" },
    { icon: <User size={18} />, label: "Account Setting", href: "/user" },
  ];

  return (
    <div className="h-screen w-64 flex flex-col justify-between bg-gradient-to-b from-purple-700 to-purple-900 text-white p-5">
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="flex items-center gap-2 mb-10">
          <span className="text-2xl">✨</span>
          <h1 className="text-xl font-bold">InSight-ai</h1>
        </div>

        {/* Menu */}
        <ul className="space-y-3">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              href={item.href}
              active={activeItem === item.label}
              onClick={() => setActiveItem(item.label)}
            />
          ))}
        </ul>
      </div>

      {/* Bottom Section */}
      <div>
        <SidebarItem
          icon={<Settings size={18} />}
          label="Settings"
          href="/settings"
          active={activeItem === "Settings"}
          onClick={() => setActiveItem("Settings")}
        />

        {/* Upgrade Card */}
        <div className="mt-6 bg-purple-800 rounded-xl p-4 shadow-lg">
          <p className="text-sm">Free Plan</p>
          <p className="text-xs text-purple-200 mb-3">1,500 words remaining</p>

          <button className="w-full py-2 rounded-lg bg-gradient-to-r from-fuchsia-500 to-purple-600 font-semibold">
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
}

// SidebarItem supports href navigation and active styling
function SidebarItem({
  icon,
  label,
  active = false,
  href = "#",
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  href?: string;
  onClick?: () => void;
}) {
  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition
          ${
            active
              ? "bg-white text-purple-700 font-semibold"
              : "hover:bg-purple-800 text-purple-200"
          }`}
      >
        {icon}
        {label}
      </Link>
    </li>
  );
}
