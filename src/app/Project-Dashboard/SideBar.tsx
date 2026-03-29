"use client";

import Link from "next/link";
import {
  Home,
  LayoutDashboard,
  PenTool,
  Lightbulb,
  Newspaper,
  FileText,
  Settings,
  User,
  FileEdit,
  Bell,
  ShieldCheck,
  Pencil,
  Calendar,
  Tag,
  AlertCircle,
  MessageCircle,
  BarChart2,
  History,
  Bookmark,
  Sliders,
  CreditCard,
  HelpCircle,
  Shield,
  Save,
  ClipboardCheck,
  PencilLine,
} from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  role: "admin" | "editor" | "user";
}

const sidebarConfig = {
  admin: [
    { icon: <Home size={18} />, label: "Home", href: "/" },
    { icon: <LayoutDashboard size={18} />, label: "Overview", href: "/Project-dashboard/adminDashboard/adminComponents/overview" },
    { icon: <User size={18} />, label: "Manage Users", href: "/user" },
    { icon: <ShieldCheck size={18} />, label: "Roles & Permissions", href: "/Project-dashboard/adminDashboard/adminComponents/role-and-permision" },
    { icon: <Newspaper size={18} />, label: "All Articles", href: "/Project-dashboard/adminDashboard/adminComponents/allArticles" },
    { icon: <FileText size={18} />, label: "Reports", href: "/Project-dashboard/adminDashboard/adminComponents/reports" },
    { icon: <Bell size={18} />, label: "Notifications", href: "/Project-dashboard/adminDashboard/adminComponents/notifications" },
    { icon: <Settings size={18} />, label: "System Settings", href: "/Project-dashboard/adminDashboard/adminComponents/system-settings" },
  ],
  editor: [
    { icon: <Home size={18} />, label: "Dashboard", href: "/Project-dashboard/editorDashboard" },
    { icon: <ClipboardCheck size={18} />, label: "Review Queue", href: "/Project-dashboard/editorDashboard/editorComponents/reviewArticle" },
    { icon: <Save size={18} />, label: "Draft Articles", href: "/Project-dashboard/editorDashboard/editorComponents/ArticleDraft " },
    { icon: <Pencil size={18} />, label: "Edit Articles", href: "/Project-dashboard/editorDashboard/editorComponents/editeArticle" },
    { icon: <FileEdit size={18} />, label: "Published Articles", href: "/Project-dashboard/editorDashboard/editorComponents/publishedArticle" },
    { icon: <Calendar size={18} />, label: "Scheduled Articles", href: "/Project-dashboard/editorDashboard/editorComponents/schedule-article" },
    { icon: <Tag size={18} />, label: "Categories & Tags", href: "/Project-dashboard/editorDashboard/editorComponents/category-tags" },
    { icon: <AlertCircle size={18} />, label: "Content Reports", href: "/Project-dashboard/editorDashboard/editorComponents/reports" },
    { icon: <MessageCircle size={18} />, label: "Comments Moderation", href: "/Project-dashboard/editorDashboard/editorComponents/comment-modaration" },
    { icon: <Bell size={18} />, label: "Notifications", href: "/Project-dashboard/editorDashboard/editorComponents/notifications" },
    { icon: <BarChart2 size={18} />, label: "SEO Tools", href: "/Project-dashboard/editorDashboard/editorComponents/seo-tools" },
    { icon: <User size={18} />, label: "Profile", href: "/Project-dashboard/editorDashboard/editorComponents/editor-profile" },
  ],
  user: [
    { icon: <LayoutDashboard size={18} />, label: "Dashboard", href: "/Project-dashboard/userDashboard/useComponents/dashboard" },
    { icon: <Lightbulb size={18} />, label: "Personalized Feed", href: "/Project-dashboard/userDashboard/useComponents/feed" },
    { icon: <Newspaper size={18} />, label: "Explore News", href: "/Project-dashboard/userDashboard/useComponents/explore" },
    { icon: <FileText size={18} />, label: "AI Writer", href: "/Project-dashboard/userDashboard/useComponents/ai-writer" },
    { icon: <Bookmark size={18} />, label: "Bookmarks", href: "/Project-dashboard/userDashboard/useComponents/bookmarks" },
    { icon: <History size={18} />, label: "Reading History", href: "/Project-dashboard/userDashboard/useComponents/history" },
    { icon: <Bell size={18} />, label: "Notifications", href: "/Project-dashboard/userDashboard/useComponents/notifications" },
    { icon: <MessageCircle size={18} />, label: "Comments", href: "/Project-dashboard/userDashboard/useComponents/comments" },
    { icon: <User size={18} />, label: "Profile", href: "/Project-dashboard/userDashboard/useComponents/profile" },
    { icon: <CreditCard size={18} />, label: "Subscription", href: "/Project-dashboard/userDashboard/useComponents/subscription" },
    { icon: <Shield size={18} />, label: "Security", href: "/Project-dashboard/userDashboard/useComponents/security" },
    { icon: <PencilLine size={18} />, label: "apply for editor", href: "/Project-dashboard/userDashboard/useComponents/apply-for-editor" },
    { icon: <Settings size={18} />, label: "Settings", href: "/Project-dashboard/userDashboard/useComponents/settings" },
    // 8. Notifications
    {
      icon: <Bell size={18} />,
      label: "Notifications",
      href: "/Project-dashboard/userDashboard/useComponents/notifications",
    },

    // 9. Comments
    {
      icon: <MessageCircle size={18} />,
      label: "Comments",
      href: "/Project-dashboard/userDashboard/useComponents/comments",
    },

    // 10. Profile
    {
      icon: <User size={18} />,
      label: "Profile",
      href: "/dashboard/profile",
    },

    // 11. Preferences
    {
      icon: <Sliders size={18} />,
      label: "Preferences",
      href: "/Project-dashboard/userDashboard/useComponents/preferences",
    },

    // 12. Subscription
    {
      icon: <CreditCard size={18} />,
      label: "Subscription",
      href: "/Project-dashboard/userDashboard/useComponents/subscription",
    },

    // 13. Support
    {
      icon: <HelpCircle size={18} />,
      label: "Support",
      href: "/Project-dashboard/userDashboard/useComponents/support",
    },

    // 14. Security
    {
      icon: <Shield size={18} />,
      label: "Security",
      href: "/Project-dashboard/userDashboard/useComponents/security",
    },

  ],
} as const;

export default function Sidebar({ role }: SidebarProps) {
  const items = sidebarConfig[role];
  const [activeItem, setActiveItem] = useState("Dashboard");

  return (
    <div className="h-screen w-64 flex flex-col justify-between bg-[#0F2854] border-r border-[#1C4D8D] text-[#BDE8F5] p-6 shadow-2xl">
      {/* Top Section */}
      <div className="overflow-y-auto custom-scrollbar pr-2">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10 pl-2">
          <div className="bg-[#4988C4] p-1.5 rounded-lg shadow-inner">
            <ShieldCheck size={24} className="text-[#0F2854]" />
          </div>
          <Link href={'/'}>
            <h1 className="text-xl font-black uppercase tracking-tighter text-white">
              InSight<span className="text-[#4988C4]">-ai</span>
            </h1>
          </Link>
        </div>

        {/* Role Badge */}
        <div className="mb-6 pl-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#4988C4] bg-[#1C4D8D]/30 px-2 py-1 rounded">
                System::{role}
            </span>
        </div>

        {/* Menu */}
        <ul className="space-y-1.5">
          {items.map((item) => (
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

      {/* Footer Branding */}
      <div className="mt-8 pt-6 border-t border-[#1C4D8D]">
         <div className="flex items-center gap-3 px-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <p className="text-[10px] font-mono text-[#4988C4] uppercase tracking-widest">Core Engine Active</p>
         </div>
      </div>
    </div>
  );
}

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
        className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-300 group
          ${
            active
              ? "bg-[#4988C4] text-[#0F2854] font-bold shadow-lg shadow-[#4988C4]/20"
              : "hover:bg-[#1C4D8D] text-[#BDE8F5]/70 hover:text-white"
          }`}
      >
        <span className={`${active ? "text-[#0F2854]" : "text-[#4988C4] group-hover:scale-110 transition-transform"}`}>
          {icon}
        </span>
        <span className="text-sm tracking-tight">{label}</span>
      </Link>
    </li>
  );
}