"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/Context/AuthContext";
import { IUser } from "@/lib/mongoose-connect/User";

// import DashboardCard from "./DashboardCard";
// import ActionCard from "./ActionCard";
// import { RecentActivity } from "./RecentActivity";
// import { ProfileSidebar } from "./ProfileSidebar";
// import AiContentTools from "./AiContentTools";
// import SeoInsights from "./SeoInsights";
// import PlagiarismChecker from "./PlagiarismChecker";
// import PerformanceAnalytics from "./PerformanceAnalytics";
// import SavedDrafts from "./SavedDrafts";
// import PersonalizedNewsFeed from "./PersonalizedNewsFeed";

import {
  FileText,
  Save,
  BarChart,
  Target,
  Shield,
  Sparkles,
  Plus,
  Edit,
  LayoutTemplate,
  MessageSquare,
} from "lucide-react";
import UserDashboard from "./userDashboard/page";
import AdminDashboard from "./adminDashboard/page";

import EditorDashboardPage from "./editorDashboard/page";

export default function DashboardPage() {
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
          body: JSON.stringify({ id: session?.user?.id }),
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

  console.log(user);

  // Loading state
  if (authLoading || loading) {
    return (
      <div className="p-10 text-center text-lg font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  // Stats & actions
  type StatItem = {
    title: string;
    value: string | number;
    change: string;
    changeType: "up" | "down";
    icon: React.ReactNode;
    bgColor: string;
  };

  type ActionItem = {
    icon: React.ReactNode;
    label: string;
    gradient: string;
    href: string;
  };

  const stats: StatItem[] = [
    {
      title: "Total Blogs",
      value: 247,
      change: "+12% this month",
      changeType: "up",
      icon: <FileText className="text-purple-600" size={22} />,
      bgColor: "bg-purple-100",
    },
    {
      title: "Drafts Saved",
      value: 89,
      change: "+8% this week",
      changeType: "up",
      icon: <Save className="text-blue-600" size={22} />,
      bgColor: "bg-blue-100",
    },
    {
      title: "Total Words",
      value: "156K",
      change: "+24% this month",
      changeType: "up",
      icon: <BarChart className="text-green-600" size={22} />,
      bgColor: "bg-green-100",
    },
    {
      title: "Avg SEO Score",
      value: "85/100",
      change: "+5 points",
      changeType: "up",
      icon: <Target className="text-yellow-600" size={22} />,
      bgColor: "bg-yellow-100",
    },
    {
      title: "Plagiarism Checks",
      value: 142,
      change: "23 remaining",
      changeType: "down",
      icon: <Shield className="text-red-600" size={22} />,
      bgColor: "bg-red-100",
    },
  ];

  const actions: ActionItem[] = [
    {
      icon: <Plus />,
      label: "Create New Blog",
      gradient: "from-purple-500 to-indigo-500",
      href: "/blog",
    },
    {
      icon: <Sparkles />,
      label: "Generate with AI",
      gradient: "from-blue-500 to-cyan-500",
      href: "/ai-generator",
    },
    {
      icon: <Edit />,
      label: "Continue Draft",
      gradient: "from-green-500 to-emerald-500",
      href: "/drafts",
    },
    {
      icon: <LayoutTemplate />,
      label: "Use Template",
      gradient: "from-orange-500 to-amber-500",
      href: "/templates",
    },
    {
      icon: <MessageSquare />,
      label: "Social Media Post",
      gradient: "from-pink-500 to-rose-500",
      href: "/social-post",
    },
  ];

  if (user?.role === "user") return <UserDashboard></UserDashboard>;
  if (user?.role === "admin") return <AdminDashboard></AdminDashboard>;
  if (user?.role === "editor") return <EditorDashboardPage></EditorDashboardPage>;
}
