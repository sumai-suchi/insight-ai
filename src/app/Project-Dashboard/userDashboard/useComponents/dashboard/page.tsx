"use client";
import React, { useEffect, useState } from "react";
import {
  Activity,
  Settings,
  LogOut,
  Bell,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import { authClient } from "@/lib/auth/auth-client";

interface ActivityItem {
  id: number;
  action: string;
  time: string;
}

const UserDashboard = () => {
   const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");
    const [loading, setLoading] = useState(true);
  const userName: string = "Alex";

   useEffect(() => {
      const fetchSession = async () => {
        const session = await authClient.getSession();
        if (!session?.data?.user) {
          // router.push("/auth/sign-in");
          return;
        }
        const u = session.data.user;
        setUser(u);
        setName(u.name || "");
        setLoading(false);
      };
      fetchSession();
    }, []);
  

  const activities: ActivityItem[] = [
    { id: 1, action: "Security protocols updated", time: "2 hours ago" },
    { id: 2, action: "New deployment successful", time: "5 hours ago" },
    { id: 3, action: "Storage limit reached 80%", time: "Yesterday" },
  ];

  return (
    // Main background now uses the sidebar color #1C4D8D
    <div className="min-h-screen bg-[#1C4D8D] text-[#BDE8F5] font-sans p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Top Navigation Bar (Since Sidebar is removed) */}
        <nav className="flex justify-between items-center mb-12">
          {/* <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#BDE8F5] rounded-xl flex items-center justify-center text-[#1C4D8D]">
              <Activity size={24} />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              NEXUS
            </span>
          </div> */}

          {/* <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-[#0F2854] rounded-lg transition-colors">
              <Settings size={20} />
            </button>
            <button className="p-2 bg-[#0F2854] text-white rounded-lg hover:opacity-90 transition-all flex items-center gap-2 px-4 border border-[#BDE8F5]/20">
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div> */}
        </nav>

        {/* Hero Greeting Section */}
        <header className="mb-10 text-center md:text-left">
          <div className="inline-block px-4 py-1 rounded-full bg-[#0F2854] text-xs font-bold tracking-widest text-cyan-400 mb-4 border border-cyan-400/20">
            SYSTEM ONLINE
          </div>
          <h1 className="text-5xl font-extrabold text-white mb-2">
            Welcome back,{" "}
            <span className="text-[#03173a]">{user?.name || "No Name"}</span>
          </h1>
          <p className="text-[#BDE8F5]/60 text-lg">
            Your dashboard is synchronized and up to date.
          </p>
        </header>

        {/* Activity Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard label="Network Health" value="99.9%" trend="+0.2%" />
          <StatCard label="Active Sessions" value="24" trend="Stable" />
          <StatCard label="Tasks Completed" value="142" trend="+12" />
        </div>

        {/* Main Activity Feed Section */}
        <section className="bg-[#0F2854] rounded-3xl p-6 md:p-10 shadow-2xl border border-white/5">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Recent Activities</h2>
            <button className="text-sm font-semibold text-cyan-400 hover:underline">
              View History
            </button>
          </div>

          <div className="space-y-3">
            {activities.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-5 rounded-2xl bg-[#1C4D8D] hover:bg-[#0F2854] hover:scale-[1.01] transition-all border border-[#BDE8F5]/5 group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-cyan-400/10 rounded-lg text-cyan-400 group-hover:bg-cyan-400 group-hover:text-[#0F2854] transition-colors">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <p className="text-white font-medium">{item.action}</p>
                    <p className="text-xs opacity-50 uppercase tracking-tighter">
                      {item.time}
                    </p>
                  </div>
                </div>
                <ArrowUpRight
                  size={18}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

// --- Sub-component for Stats ---

interface StatProps {
  label: string;
  value: string;
  trend: string;
}

const StatCard: React.FC<StatProps> = ({ label, value, trend }) => (
  <div className="bg-[#0F2854] p-6 rounded-2xl border border-white/5 shadow-lg group hover:border-cyan-400/30 transition-colors">
    <p className="text-xs font-black uppercase tracking-widest text-[#BDE8F5]/50 mb-1">
      {label}
    </p>
    <div className="flex items-baseline gap-3">
      <h3 className="text-3xl font-bold text-white">{value}</h3>
      <span className="text-xs font-bold text-cyan-400">{trend}</span>
    </div>
  </div>
);

export default UserDashboard;
