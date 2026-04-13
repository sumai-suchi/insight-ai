// "use client";

// import { useEffect, useState } from "react";
// import { useAuth } from "@/Context/AuthContext";
// import { IUser } from "@/lib/mongoose-connect/User";
// import DashboardCard from "./_components/DashboardCard";
// import ActionCard from "./_components/ActionCard";
// import { RecentActivity } from "./_components/RecentActivity";
// import { ProfileSidebar } from "./_components/ProfileSidebar";
// import AiContentTools from "./_components/AiContentTools";
// import SeoInsights from "./_components/SeoInsights";
// import PlagiarismChecker from "./_components/PlagiarismChecker";
// import PerformanceAnalytics from "./_components/PerformanceAnalytics";
// import SavedDrafts from "./_components/SavedDrafts";
// import PersonalizedNewsFeed from "./_components/PersonalizedNewsFeed";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

// export default function DashboardPage() {
//   const { session, error, loading: authLoading } = useAuth();

//   const [user, setUser] = useState<IUser | null>(null);
//   const [loading, setLoading] = useState(true);

//   // Fetch user after session is available
//   useEffect(() => {
//     const fetchUser = async () => {
//       if (authLoading) return;

//       if (!session?.user?.id) {
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await fetch("/api/user/me", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ id: session.user.id }),
//         });

        // if (!res.ok) throw new Error("Failed to fetch user");

//         const data = await res.json();
//         setUser(data);
//       } catch (error) {
//         console.error("User fetch error:", error);
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, [session?.user?.id, authLoading]);

//   // Loading state
//   if (authLoading || loading) {
//     return (
//       <div className="p-10 text-center text-lg font-semibold">
//         Loading Dashboard...
//       </div>
//     );
//   }

//   // Stats & actions
//   type StatItem = {
//     title: string;
//     value: string | number;
//     change: string;
//     changeType: "up" | "down";
//     icon: React.ReactNode;
//     bgColor: string;
//   };

//   type ActionItem = {
//     icon: React.ReactNode;
//     label: string;
//     gradient: string;
//     href: string;
//   };

//   const stats: StatItem[] = [
//     {
//       title: "Total Blogs",
//       value: 247,
//       change: "+12% this month",
//       changeType: "up",
//       icon: <FileText className="text-purple-600" size={22} />,
//       bgColor: "bg-purple-100",
//     },
//     {
//       title: "Drafts Saved",
//       value: 89,
//       change: "+8% this week",
//       changeType: "up",
//       icon: <Save className="text-blue-600" size={22} />,
//       bgColor: "bg-blue-100",
//     },
//     {
//       title: "Total Words",
//       value: "156K",
//       change: "+24% this month",
//       changeType: "up",
//       icon: <BarChart className="text-green-600" size={22} />,
//       bgColor: "bg-green-100",
//     },
//     {
//       title: "Avg SEO Score",
//       value: "85/100",
//       change: "+5 points",
//       changeType: "up",
//       icon: <Target className="text-yellow-600" size={22} />,
//       bgColor: "bg-yellow-100",
//     },
//     {
//       title: "Plagiarism Checks",
//       value: 142,
//       change: "23 remaining",
//       changeType: "down",
//       icon: <Shield className="text-red-600" size={22} />,
//       bgColor: "bg-red-100",
//     },
//   ];

//   const actions: ActionItem[] = [
//     {
//       icon: <Plus />,
//       label: "Create New Blog",
//       gradient: "from-purple-500 to-indigo-500",
//       href: "/blog",
//     },
//     {
//       icon: <Sparkles />,
//       label: "Generate with AI",
//       gradient: "from-blue-500 to-cyan-500",
//       href: "/ai-generator",
//     },
//     {
//       icon: <Edit />,
//       label: "Continue Draft",
//       gradient: "from-green-500 to-emerald-500",
//       href: "/drafts",
//     },
//     {
//       icon: <LayoutTemplate />,
//       label: "Use Template",
//       gradient: "from-orange-500 to-amber-500",
//       href: "/templates",
//     },
//     {
//       icon: <MessageSquare />,
//       label: "Social Media Post",
//       gradient: "from-pink-500 to-rose-500",
//       href: "/social-post",
//     },
//   ];

//   return (
//     <div className="p-6">
//       {/* Back Button */}
//       <div className="mb-4">
//         <Link href="/" className="inline-flex items-center gap-2 text-[var(--brand-primary)] hover:text-[var(--brand-secondary)] font-medium">
//           <ArrowLeft size={20} />
//           Back
//         </Link>
//       </div>
//       {/* Header */}

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
//         {stats.map((item, index) => (
//           <DashboardCard key={index} {...item} />
//         ))}
//       </div>

//       {/* Quick Actions */}
//       <div className="bg-white rounded-2xl shadow-md p-6 mt-10">
//         <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
//           <Sparkles className="text-purple-600" size={20} /> Quick Actions
//         </h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
//           {actions.map((item, index) => (
//             <ActionCard key={index} {...item} />
//           ))}
//         </div>
//       </div>

//       {/* Main + Sidebar */}
//       <div className="grid grid-cols-1 lg:grid-cols-16 gap-8 mt-10">
//         <div className="lg:col-span-10">
//           <RecentActivity />
//         </div>

//         <div className="lg:col-span-6">
//           <ProfileSidebar />
//         </div>
//       </div>

//       {/* AI Tools */}
//       <div className="w-full py-8">
//         <div className="mb-8">
//           <AiContentTools />
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           <SeoInsights />
//           <PlagiarismChecker />
//         </div>
//       </div>

//       {/* Analytics + Drafts + News */}
//       <div className="pt-8 space-y-8">
//         <PerformanceAnalytics />

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
//           <SavedDrafts />
//           <PersonalizedNewsFeed />
//         </div>
//       </div>
//     </div>
//   );
// }

// app/page.tsx

import React from "react";

export default function AIPage() {
  return (
    <div className="min-h-screen bg-[#0c234b] text-white font-sans relative">
      {/* Back Button - Top Left Corner */}
      <div className="absolute top-6 left-6 z-50">
        <Link
          href="/"
          className="flex items-center gap-2 px-5 py-3 bg-[#0F2854] hover:bg-[#1C4D8D] transition-all rounded-2xl text-sm font-medium border border-white/10 hover:border-[#1C4D8D]"
        >
          <span className="text-xl">←</span>
          <span>Back</span>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-6 pt-24 pb-16 text-center">
        <h2 className="text-6xl md:text-7xl font-bold leading-tight mb-6">
          Powerful AI for
          <br />
          Modern Writers
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
          Write better, faster, and with confidence. AI Edition + Plagiarism
          Checker in one place.
        </p>
      </div>

      {/* Two Feature Cards */}
      <div className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 gap-8">
          {/* AI Edition Card */}
          <div className="group bg-[#0F2854] rounded-3xl p-10 hover:scale-[1.02] transition-all duration-300 border border-white/5 hover:border-[#1C4D8D]">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-[#1C4D8D] flex items-center justify-center mb-8 text-4xl">
              ✨
            </div>
            <h3 className="text-4xl font-semibold mb-4">AI Edition</h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Intelligent writing assistant that helps you generate, rewrite,
              and improve your content with state-of-the-art AI models.
            </p>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-3">✓ Smart suggestions</li>
              <li className="flex items-center gap-3">
                ✓ Multiple writing styles
              </li>
              <li className="flex items-center gap-3">✓ Real-time editing</li>
              <li className="flex items-center gap-3">✓ Tone adjustment</li>
            </ul>

            {/* Fixed Link Button */}
            <Link
              href="/dashboard/templates"
              className="mt-10 block w-full py-4 bg-[#1C4D8D] hover:bg-white hover:text-[#0F2854] font-medium rounded-2xl transition-all text-center"
            >
              Explore AI Edition →
            </Link>
          </div>

          {/* Plagiarism Checker Card */}
          <div className="group bg-[#0F2854] rounded-3xl p-10 hover:scale-[1.02] transition-all duration-300 border border-white/5 hover:border-[#1C4D8D]">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-400 to-orange-500 flex items-center justify-center mb-8 text-4xl">
              🔍
            </div>
            <h3 className="text-4xl font-semibold mb-4">Plagiarism Checker</h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Advanced plagiarism detection with AI content identification. Get
              detailed reports and originality scores instantly.
            </p>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-3">✓ Deep web search</li>
              <li className="flex items-center gap-3">
                ✓ AI-generated content detection
              </li>
              <li className="flex items-center gap-3">
                ✓ Detailed similarity report
              </li>
              <li className="flex items-center gap-3">✓ PDF & Doc upload</li>
            </ul>

            {/* Fixed Link Button */}
            <Link
              href="/dashboard/plagiarism"
              className="mt-10 block w-full py-4 bg-[#1C4D8D] hover:bg-white hover:text-[#0F2854] font-medium rounded-2xl transition-all text-center"
            >
              Check Plagiarism Now →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
