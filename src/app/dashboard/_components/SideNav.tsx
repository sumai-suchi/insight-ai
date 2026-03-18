import {
  FolderKanban,
  ScrollText,
  History,
  Settings,
  Newspaper,
  PenTool,
  LayoutDashboard,
  LayoutTemplate,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import NavLogo from "../../../../public/NavLogo.png";

interface SideNavProps {
  onToggleSide: () => void;
  isOpen: boolean;
}
export const SideNav = ({ onToggleSide, isOpen }: SideNavProps) => {
  const [activeItem, setActiveItem] = useState("Dashboard");

  // Menu items with labels, icons, and hrefs
  const menuItems = [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
    { icon: PenTool, label: "AI Editor", href: "/dashboard/ai-editor" },
    {
      icon: LayoutTemplate,
      label: "Use Templates",
      href: "/dashboard/templates",
    },
    { icon: Newspaper, label: "Bookmarks", href: "/dashboard/bookmark" },
    { label: "Plagiarism", icon: ScrollText, href: "/dashboard/plagiarism" },
    { label: "Projects", icon: FolderKanban, href: "/dashboard/projects" },
    // {
    //   label: "Instructions",
    //   icon: ScrollText,
    //   href: "/dashboard/instructions",
    // },
    { label: "History", icon: History, href: "/dashboard/history" },
    { label: "News History", icon: History, href: "/dashboard/news_history" },
  ];
  return (
    <aside
      className={`h-screen fixed lg:min-w-100 flex flex-col justify-between p-5 shadow-sm border bg-gradient-to-b
     from-purple-700 to-purple-900 transform transition-transform duration-300 ease-in-out z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="flex items-center justify-between">
          <Link href="/" className="flex grow-0 items-center space-x-2">
            <Image
              src={NavLogo}
              alt="Insight AI Logo"
              width={200}
              height={100}
              className="rounded-full"
            />
          </Link>

          <button
            onClick={onToggleSide}
            className="p-2 rounded hover:bg-gray-200 focus:outline-none"
            aria-label="Toggle sidebar"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        {/* Menu */}
        <ul className="space-y-3">
          {menuItems.map((item) => (
            <Link
              href={item.href}
              key={item.label}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition
              hover:bg-white hover:text-purple-700 font-semibold text-purple-200 `}
            >
              <i className="mr-2">
                <item.icon className="w-4 h-4" />
              </i>
              <h3 className="block px-4 py-2 ">{item.label}</h3>
            </Link>
          ))}
        </ul>
      </div>

      {/* Bottom Section */}
      <div>
        <Link
          href="/dashboard/settings"
          onClick={() => setActiveItem("Settings")}
          className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition
          ${
            activeItem === "Settings"
              ? "bg-white text-purple-700 font-semibold"
              : "hover:bg-purple-800 text-purple-200"
          }`}
        >
          <Settings size={18} />
          Settings
        </Link>

        {/* Upgrade Card */}
        <div className="mt-6 bg-purple-800 rounded-xl p-4 shadow-lg">
          <p className="text-sm">Free Plan</p>
          <p className="text-xs text-purple-200 mb-3">1,500 words remaining</p>

          <button className="w-full py-2 rounded-lg bg-gradient-to-r from-fuchsia-500 to-purple-600 font-semibold">
            Upgrade Now
          </button>
        </div>
      </div>
    </aside>
  );
};
