"use client";

import Sidebar from "./SideBar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      
      {/* Sidebar */}
      <div className="w-64 sticky top-0 h-screen bg-white shadow-md">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100 overflow-auto max-h-screen">
        {children}
      </main>
      
    </div>
  );
}