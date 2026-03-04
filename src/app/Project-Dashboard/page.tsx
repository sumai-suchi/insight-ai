
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
import DashboardCard from "./DashboardCard";
import ActionCard from "./ActionCard";
import { ReactNode } from "react";
import { RecentActivity } from "./RecentActivity";
import { ProfileSidebar } from "./ProfileSidebar";
import AiContentTools from "./AiContentTools";
import SeoInsights from "./SeoInsights";
import PlagiarismChecker from "./PlagiarismChecker";
import PersonalizedNewsFeed from "./PersonalizedNewsFeed";
import SavedDrafts from "./SavedDrafts";
import PerformanceAnalytics from "./PerformanceAnalytics";


export default function DashboardPage() {
  type ActionItem = {
  icon: ReactNode;
  label: string;
  gradient: string;
};

    type StatItem = {
  title: string;
  value: string | number;
  change: string;
  changeType: "up" | "down";
  icon: React.ReactNode;
  bgColor: string;
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
  },
  {
    icon: <Sparkles />,
    label: "Generate with AI",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: <Edit />,
    label: "Continue Draft",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: <LayoutTemplate />,
    label: "Use Template",
    gradient: "from-orange-500 to-amber-500",
  },
  {
    icon: <MessageSquare />,
    label: "Social Media Post",
    gradient: "from-pink-500 to-rose-500",
  },
];

  return (
    <div className="bg-gray-100 min-h-screen p-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500">
          Welcome back! Here's your content overview
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((item, index) => (
          <DashboardCard key={index} {...item} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-md p-6 mt-10">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Sparkles className="text-purple-600" size={20} />
          Quick Actions
        </h2>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {actions.map((item, index) => (
          <ActionCard key={index} {...item} />
        ))}
      </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-16 gap-8  mt-10">
        {/* Main Section */}
        <div className="lg:col-span-10">
          <RecentActivity />
        </div>

        {/* Sidebar Section */}
        <div className="lg:col-span-6">
          <ProfileSidebar />
        </div>
      </div>
      <div className="w-full   py-8">
        {/* Top tools section - full width */}
        <div className="mb-8">
          <AiContentTools />
        </div>

        {/* Two-column layout for insights + plagiarism */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SeoInsights />
          <PlagiarismChecker />
        </div>
      </div>

      <div className="  pt-8 space-y-8">
        
        {/* Top - Full width analytics */}
        <PerformanceAnalytics />

        {/* Bottom - Two column responsive layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <SavedDrafts />
          <PersonalizedNewsFeed />
        </div>

      </div>
    </div>
  );
}

/* 🔹 Reusable Action Card */
