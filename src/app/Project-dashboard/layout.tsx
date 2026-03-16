"use client";

import { useState } from "react";
import Sidebar from "./_component/SideBar";
import { Menu } from "lucide-react"; // optional hamburger icon

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      
      {/* Sidebar for large screens */}
      <div className="hidden md:flex w-64 sticky top-0 h-screen bg-white shadow-md">
        <Sidebar />
      </div>

      {/* Sidebar for mobile (drawer) */}
      <div
        className={`fixed inset-0 z-50 bg-black bg-opacity-30 transition-opacity md:hidden ${
          isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      >
        <div
          className={`absolute left-0 top-0 h-full w-64 bg-white shadow-md transform transition-transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <Sidebar />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 bg-gray-100 min-h-screen overflow-auto">
        {/* Mobile hamburger */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded bg-white shadow-md"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
        {children}
      </main>
    </div>
  );
}