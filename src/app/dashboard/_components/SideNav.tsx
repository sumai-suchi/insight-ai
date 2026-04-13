import {
  FolderKanban,
  Home,
  ScrollText,
  History,
  Settings,
  CircleUserRound,
  PenTool,
  X,
  LayoutDashboard,
  LayoutTemplate,
  Newspaper,
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
    // { icon: PenTool, label: "AI Editor", href: "/dashboard/ai-editor" },

    {
      icon: LayoutTemplate,
      label: "Use Templates",
      href: "/dashboard/templates",
    },

    { label: "Plagiarism", icon: ScrollText, href: "/dashboard/plagiarism" },
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
    </aside>
  );
};
