"use client";

import { useEffect, useState } from "react";
import Sidebar from "./SideBar";
import { Menu } from "lucide-react"; // optional hamburger icon
import { useAuth } from "@/Context/AuthContext";
import { IUser } from "@/lib/mongoose-connect/User";

export default function AuthLayout({children,}: { children: React.ReactNode;}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  

    const { session, error, loading: authLoading } = useAuth();
    
      const [user, setUser] = useState<IUser | null>(null);
      const [loading, setLoading] = useState(true);
    
      // Fetch user after session is available
      useEffect(() => {
        const fetchUser = async () => {
          if (authLoading) return;
    
          if (!session?.user?.id) {
            setLoading(false);
            return;
          }
    
          try {
            const res = await fetch("/api/user/me", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ id: session.user.id }),
            });
    
            if (!res.ok) throw new Error("Failed to fetch user");
    
            const data = await res.json();
            setUser(data);
          } catch (error) {
            console.error("User fetch error:", error);
            setUser(null);
          } finally {
            setLoading(false);
          }
        };
    
        fetchUser();
      }, [session?.user?.id, authLoading]);
      
    console.log(user)

  return (
    <div className="flex min-h-screen">
      
      {/* Sidebar for large screens */}
      <div className="hidden md:flex w-64 sticky top-0 h-full bg-gradient-to-b from-purple-700 to-purple-900 shadow-md">
        <Sidebar role={user?.role || "user"} />
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
          <Sidebar role={user?.role || "user"} />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 bg-gray-100 min-h-screen overflow-auto">
        {/* Mobile hamburger */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded shadow-md"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
        {children}
      </main>
    </div>
  );
}