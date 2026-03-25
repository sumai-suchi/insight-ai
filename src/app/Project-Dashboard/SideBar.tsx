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
  FileEdit,
  Bell,
  ShieldCheck,
  CheckCircle,
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
  LayoutGrid,
  Save,
  ClipboardCheck,
} from "lucide-react";
import { useState } from "react";
import SignOutButton from "@/components/SignOutButton";

interface SidebarProps {
  role: "admin" | "editor" | "user";
}

 const sidebarConfig = {
 admin: [
    { icon: <Home size={18} />, label: "Home", href: "/" },
    { icon: <LayoutDashboard size={18} />, label: "Overview", href: "/Project-Dashboard/adminDashboard/adminComponents/overview" },

    { icon: <User size={18} />, label: "Manage Users", href: "/user" },
    { icon: <ShieldCheck size={18} />, label: "Roles & Permissions", href: "/Project-Dashboard/adminDashboard/adminComponents/role-and-permision" },

    { icon: <Newspaper size={18} />, label: "All Articles", href: "/Project-Dashboard/adminDashboard/adminComponents/allArticles" },
    { icon: <FileText size={18} />, label: "Reports", href: "/Project-Dashboard/adminDashboard/adminComponents/reports" },

    { icon: <Bell size={18} />, label: "Notifications", href: "/Project-Dashboard/adminDashboard/adminComponents/notifications" },
    { icon: <Settings size={18} />, label: "System Settings", href: "/Project-Dashboard/adminDashboard/adminComponents/system-settings" },
  ],

  editor: [
   { icon: <Home size={18} />, label: "Dashboard", href: "/" },
 { icon: <ClipboardCheck size={18} />, label: "Review Queue", href: "/Project-dashboard/editorDashboard/editorComponents/reviewArticle" },
  { icon: <Save size={18} />, label: "Draft Articles", href: "/Project-dashboard/editorDashboard/editorComponents/ArticleDraft " },
  { icon: <CheckCircle size={18} />, label: "AI Content Review", href: "/Project-dashboard/editorDashboard/editorComponents/ai-genarated-content" },
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
   { icon: <LayoutDashboard size={18} />, label: "Dashboard", href: "/Project-Dashboard/userDashboard/useComponents/dashboard" },

  // 2. Personalized Feed
  { icon: <Lightbulb size={18} />, label: "Personalized Feed", href: "/Project-Dashboard/userDashboard/useComponents/feed" },
  // 3. Explore News
  { icon: <Newspaper size={18} />, label: "Explore News", href: "/Project-Dashboard/userDashboard/useComponents/explore" },

  // 4. AI Content Writer
  { icon: <FileText size={18} />, label: "AI Writer", href: "/Project-Dashboard/userDashboard/useComponents/ai-writer" },

  // 5. My Articles
  { icon: <FileText size={18} />, label: "My Articles", href: "/Project-Dashboard/userDashboard/useComponents/articles" },

  // 6. Saved / Bookmarks
  { icon: <Bookmark size={18} />, label: "Bookmarks", href: "/Project-Dashboard/userDashboard/useComponents/bookmarks" },

  // 7. Reading History
  { icon: <History size={18} />, label: "Reading History", href: "/Project-Dashboard/userDashboard/useComponents/history" },

  // 8. Notifications
  { icon: <Bell size={18} />, label: "Notifications", href: "/Project-Dashboard/userDashboard/useComponents/notifications" },

  // 9. Comments
  { icon: <MessageCircle size={18} />, label: "Comments", href: "/Project-Dashboard/userDashboard/useComponents/comments" },

  // 10. Profile
  { icon: <User size={18} />, label: "Profile", href: "/Project-Dashboard/userDashboard/useComponents/profile" },

  // 11. Preferences
  { icon: <Sliders size={18} />, label: "Preferences", href: "/Project-Dashboard/userDashboard/useComponents/preferences" },

  // 12. Subscription
  { icon: <CreditCard size={18} />, label: "Subscription", href: "/Project-Dashboard/userDashboard/useComponents/subscription" },

  // 13. Support
  { icon: <HelpCircle size={18} />, label: "Support", href: "/Project-Dashboard/userDashboard/useComponents/support" },

  // 14. Security
  { icon: <Shield size={18} />, label: "Security", href: "/Project-Dashboard/userDashboard/useComponents/security" },

  // 15. Settings (optional combined)
  { icon: <Settings size={18} />, label: "Settings", href: "/Project-Dashboard/userDashboard/useComponents/settings" },
  ],
} as const;



export default function Sidebar({ role }: SidebarProps) {
  const items = sidebarConfig[role];
  console.log( 'this sidebars',items)

  // Track the currently active item
  const [activeItem, setActiveItem] = useState("Dashboard");

  // Menu items with labels, icons, and hrefs
  // const menuItems = [
  //   { icon: <Home size={18} />, label: "Home", href: "/" },
  //   { icon: <LayoutDashboard size={18} />, label: "Overview", href: "/dashboard" },
 
  //   { icon: <Lightbulb size={18} />, label: "Personalized Feed", href: "/solutions" },
  //   { icon: <Newspaper size={18} />, label: "Bookmarks", href: "/news" },
  //   { icon: <FileText size={18} />, label: "Reading History", href: "/templates" },
   
  //   { icon: <User size={18} />, label: "Users", href: "/user" },
  //   { icon: <User size={18} />, label: "Notifications", href: "/notification" },
  //   {
  //     icon: <LayoutGrid size={18} />,
  //     label: "App",
  //     href: "/Project-Dashboard/apps",
  //   },
  //   { icon: <User size={18} />, label: "Account Setting", href: "/user" },
  // ];

  

  return (
    <div className="h-screen w-64 flex flex-col justify-between bg-linear-to-b from-purple-700 to-purple-900 text-white p-5">
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="flex items-center gap-2 mb-10">
          <span className="text-2xl">✨</span>
          <Link href={'/'}><h1 className="text-xl font-bold">InSight-ai</h1></Link>
          
        </div>

        {/* Menu */}
        <ul className="space-y-2">
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

    
 
       

        {/* Upgrade Card */}
        {/* <div className="mt-6 bg-purple-800 rounded-xl p-4 shadow-lg">
          <p className="text-sm">Free Plan</p>
          <p className="text-xs text-purple-200 mb-3">1,500 words remaining</p>

          <button className="w-full py-2 rounded-lg bg-gradient-to-r from-fuchsia-500 to-purple-600 font-semibold">
            Upgrade Now
          </button>
        </div> */}
     
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
