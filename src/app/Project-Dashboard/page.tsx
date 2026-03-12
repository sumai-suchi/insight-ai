'use client';

import { useEffect, useState } from "react";
import { useAuth } from "@/Context/AuthContext";
import { IUser } from "@/lib/mongoose-connect/User";
import DashboardCard from "./DashboardCard";
import ActionCard from "./ActionCard";
import { RecentActivity } from "./RecentActivity";
import { ProfileSidebar } from "./ProfileSidebar";
import AiContentTools from "./AiContentTools";
import SeoInsights from "./SeoInsights";
import PlagiarismChecker from "./PlagiarismChecker";
import PerformanceAnalytics from "./PerformanceAnalytics";
import SavedDrafts from "./SavedDrafts";
import PersonalizedNewsFeed from "./PersonalizedNewsFeed";
import { FileText, Save, BarChart, Target, Shield, Sparkles, Plus, Edit, LayoutTemplate, MessageSquare } from "lucide-react";

export default function DashboardPage() {
  const { session } = useAuth();

  // ✅ Hooks must always be at the top
    const [userId, setUserId] = useState("");
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

   // ✅ useEffect for fetching user
  useEffect(() => {
    const fetchUser = async () => {
      if (!session?.user?.id) {
        setLoading(false);
        return;
      }
      setUserId(session.user.id);
      console.log(userId); // <-- Set userId from session

      try {
       const res = await fetch("/api/user/me", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId }), // send id to API
      });
      console.log("Fetch response:", res);
      if (!res.ok) throw new Error("Failed to fetch user");
      const data = await res.json();
      console.log("User data fetched:", data);
      setUser(data); // <-- Update user state with fetched data
      } catch (error) {
        console.error(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [session]);


  // Stats & actions
  type StatItem = { title: string; value: string | number; change: string; changeType: "up" | "down"; icon: React.ReactNode; bgColor: string; };
  type ActionItem = { icon: React.ReactNode; label: string; gradient: string; href: string; };

  const stats: StatItem[] = [
    { title: "Total Blogs", value: 247, change: "+12% this month", changeType: "up", icon: <FileText className="text-purple-600" size={22} />, bgColor: "bg-purple-100" },
    { title: "Drafts Saved", value: 89, change: "+8% this week", changeType: "up", icon: <Save className="text-blue-600" size={22} />, bgColor: "bg-blue-100" },
    { title: "Total Words", value: "156K", change: "+24% this month", changeType: "up", icon: <BarChart className="text-green-600" size={22} />, bgColor: "bg-green-100" },
    { title: "Avg SEO Score", value: "85/100", change: "+5 points", changeType: "up", icon: <Target className="text-yellow-600" size={22} />, bgColor: "bg-yellow-100" },
    { title: "Plagiarism Checks", value: 142, change: "23 remaining", changeType: "down", icon: <Shield className="text-red-600" size={22} />, bgColor: "bg-red-100" },
  ];

  const actions: ActionItem[] = [
    { icon: <Plus />, label: "Create New Blog", gradient: "from-purple-500 to-indigo-500", href: "/blog" },
    { icon: <Sparkles />, label: "Generate with AI", gradient: "from-blue-500 to-cyan-500", href: "/ai-generator" },
    { icon: <Edit />, label: "Continue Draft", gradient: "from-green-500 to-emerald-500", href: "/drafts" },
    { icon: <LayoutTemplate />, label: "Use Template", gradient: "from-orange-500 to-amber-500", href: "/templates" },
    { icon: <MessageSquare />, label: "Social Media Post", gradient: "from-pink-500 to-rose-500", href: "/social-post" },
  ];

 
  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{user?.role} Dashboard</h1>
        <p className="text-gray-500">
          Welcome back, <span className="text-purple-400 font-semibold text-2xl">{user?.name}</span>!
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((item, index) => (
          <DashboardCard key={index} {...item} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-md p-6 mt-10">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Sparkles className="text-purple-600" size={20} /> Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {actions.map((item, index) => (
            <ActionCard key={index} {...item} />
          ))}
        </div>
      </div>

      {/* Main + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-16 gap-8 mt-10">
        <div className="lg:col-span-10"><RecentActivity /></div>
        <div className="lg:col-span-6"><ProfileSidebar /></div>
      </div>

      {/* AI Tools */}
      <div className="w-full py-8">
        <div className="mb-8"><AiContentTools /></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SeoInsights />
          <PlagiarismChecker />
        </div>
      </div>

      {/* Analytics + Drafts + News */}
      <div className="pt-8 space-y-8">
        <PerformanceAnalytics />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <SavedDrafts />
          <PersonalizedNewsFeed />
        </div>
      </div>
    </div>
  );
}