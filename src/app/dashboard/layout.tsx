"use client";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { SideNav } from "./_components/SideNav";
import DashboardNavbar from "./_components/DashboardNavbar";
import ChatBox from "./_components/ChatBox";

function layout({ children }: { children: React.ReactNode }) {
  const [sideOpen, setSideOpen] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);

  const router = useRouter();

  const toggleSide = () => setSideOpen((o) => !o);
  const toggleChat = () => {
    // on small screens open dedicated chat page instead of overlay
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      router.push("/dashboard/chat");
    } else {
      setChatOpen((o) => !o);
    }
  };

  const pathname = usePathname();

  return (
    <div className="min-h-screen flex bg-gray-50">
      <SideNav onToggleSide={toggleSide} isOpen={sideOpen} />
      <div
        className={`flex-1 transition-margin duration-300 ease-in-out ${
          sideOpen ? "md:ml-50 lg:ml-100" : "md:ml-0 lg:ml-0"
        }`}
      >
        <DashboardNavbar onToggleSide={toggleSide} isOpen={sideOpen} />
        {children}
      </div>
      {pathname !== "/dashboard/chat" && (
        <ChatBox open={chatOpen} onToggle={toggleChat} />
      )}
    </div>
  );
}

export default layout;
