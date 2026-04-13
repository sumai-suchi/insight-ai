"use client";

import React, { useEffect, useState } from "react";

import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  FiFileText,
  FiUsers,
  FiActivity,
  FiShield,
  FiEdit3,
  FiPieChart,
  FiArrowRight,
} from "react-icons/fi";
import authClient from "@/lib/auth/auth-client";

const COLORS = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b"];

const DashboardOverview = () => {
  const { data: session, isPending } = authClient.useSession();
  const [statsData, setStatsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState(7);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/dashboard/stats?range=${range}`);
        const json = await response.json();
        if (json.success) {
          setStatsData(json.data);
        }
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [range]);

  const pieData = [
    { name: "Admins", value: statsData?.totalAdmins || 0 },
    { name: "Editors", value: statsData?.totalEditors || 0 },
    {
      name: "Users",
      value: Math.max(
        0,
        (statsData?.totalUsers || 0) -
          ((statsData?.totalAdmins || 0) + (statsData?.totalEditors || 0)),
      ),
    },
  ].filter((item) => item.value > 0);

  const stats = [
    {
      id: 1,
      label: "Total Articles",
      value: statsData?.totalArticles || 0,
      icon: <FiFileText />,
      trend: "Publications",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      id: 2,
      label: "Total Users",
      value: statsData?.totalUsers || 0,
      icon: <FiUsers />,
      trend: "Registered",
      color: "text-indigo-400",
      bg: "bg-indigo-500/10",
    },
    {
      id: 3,
      label: "Admins",
      value: statsData?.totalAdmins || 0,
      icon: <FiShield />,
      trend: "Full Access",
      color: "text-rose-400",
      bg: "bg-rose-500/10",
    },
    {
      id: 4,
      label: "Editors",
      value: statsData?.totalEditors || 0,
      icon: <FiEdit3 />,
      trend: "Writing Team",
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
    {
      id: 5,
      label: "Active Members",
      value: Math.max(
        0,
        (statsData?.totalUsers || 0) -
          ((statsData?.totalAdmins || 0) + (statsData?.totalEditors || 0)),
      ),
      icon: <FiActivity />,
      trend: "General",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
  ];

  if (loading && !statsData) {
    return (
      <div className="min-h-screen bg-[#0A1228] flex items-center justify-center text-blue-400 font-bold animate-pulse uppercase tracking-[0.2em]">
        Initializing InsightAI Core...
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-[#0A1228] text-white p-6 md:p-10 font-sans overflow-x-hidden">
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter mb-2 bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
              InsightAI Overview
            </h1>
            <div className="flex flex-wrap items-center gap-4">
              <p className="text-blue-400/60 font-bold uppercase text-[10px] tracking-[0.2em] border-l-2 border-blue-500 pl-4">
                Welcome back,{" "}
                <span className="text-white">
                  {isPending ? "..." : session?.user?.name || "User"}
                </span>
              </p>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[9px] font-black rounded-full uppercase tracking-widest">
                  SEO Avg: {statsData?.avgSeoScore || 0}%
                </span>
                <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[9px] font-black rounded-full uppercase tracking-widest">
                  AI Content: {statsData?.aiGenerations || 0}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-white/[0.03] backdrop-blur-md p-5 rounded-[2rem] border border-white/10 hover:border-blue-500/50 transition-all group relative overflow-hidden"
            >
              <div className="absolute -right-2 -top-2 w-16 h-16 bg-white/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-all" />
              <div className="flex justify-between items-start mb-4">
                <div
                  className={`p-3 rounded-2xl ${stat.bg} ${stat.color} text-xl transition-transform group-hover:scale-110`}
                >
                  {stat.icon}
                </div>
                <span className="text-[8px] font-black px-2 py-1 rounded-full border border-white/5 bg-white/5 text-white/40 uppercase tracking-tighter">
                  {stat.trend}
                </span>
              </div>
              <h3 className="text-white/40 text-[10px] font-black uppercase tracking-widest leading-none">
                {stat.label}
              </h3>
              <p className="text-3xl font-black mt-2 text-white tracking-tighter">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          {/* Main Chart */}
          <div className="lg:col-span-2 bg-white/[0.03] backdrop-blur-md p-8 rounded-[2.5rem] border border-white/10 shadow-2xl relative">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-3 text-blue-400">
                <FiActivity size={18} /> Multi-Dimensional Analytics
              </h2>
              <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                {[7, 30].map((v) => (
                  <button
                    key={v}
                    onClick={() => setRange(v)}
                    className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${range === v ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "text-white/40 hover:text-white"}`}
                  >
                    {v} Days
                  </button>
                ))}
              </div>
            </div>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={statsData?.chartData}>
                  <defs>
                    <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#ffffff05" vertical={false} />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "#475569", fontWeight: "bold" }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "#475569", fontWeight: "bold" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0F172A",
                      borderRadius: "20px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
                    }}
                    itemStyle={{
                      fontSize: "10px",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                    }}
                  />
                  <Legend
                    verticalAlign="top"
                    align="right"
                    iconType="circle"
                    wrapperStyle={{
                      fontSize: "10px",
                      fontWeight: "black",
                      textTransform: "uppercase",
                      paddingBottom: "20px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="amt"
                    name="Total Posts"
                    fill="url(#colorAmt)"
                    stroke="#3b82f6"
                    strokeWidth={2}
                  />
                  <Bar
                    dataKey="pv"
                    name="Activity"
                    barSize={15}
                    fill="#1e293b"
                    radius={[10, 10, 0, 0]}
                  />
                  <Line
                    type="monotone"
                    dataKey="uv"
                    name="Growth"
                    stroke="#f59e0b"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#f59e0b", strokeWidth: 0 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* User Roles Pie */}
          <div className="bg-white/[0.03] backdrop-blur-md p-8 rounded-[2.5rem] border border-white/10 shadow-2xl flex flex-col">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] mb-8 flex items-center gap-3 text-purple-400">
              <FiPieChart size={18} /> User Segmentation
            </h2>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {pieData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        stroke="none"
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0F172A",
                      borderRadius: "15px",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-auto grid grid-cols-1 gap-3">
              {pieData.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-2xl border border-white/5"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                    />
                    <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-xs font-black text-white">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Articles Table */}
        <div className="bg-white/[0.03] backdrop-blur-md rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden">
          <div className="p-8 border-b border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-3 text-emerald-400">
              <FiFileText size={18} /> Recent Published Articles
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5">
                  <th className="p-5 text-[10px] font-black text-white/40 uppercase tracking-widest">
                    Article Title
                  </th>
                  <th className="p-5 text-[10px] font-black text-white/40 uppercase tracking-widest">
                    Category
                  </th>
                  <th className="p-5 text-[10px] font-black text-white/40 uppercase tracking-widest">
                    Status
                  </th>
                  <th className="p-5 text-[10px] font-black text-white/40 uppercase tracking-widest">
                    Time-stamp
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {statsData?.recentArticles?.map((article: any) => (
                  <tr
                    key={article._id}
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="p-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                          {article.title}
                        </span>
                        <span className="text-[9px] text-white/20 font-black tracking-widest mt-1">
                          ID: {article._id.slice(-12).toUpperCase()}
                        </span>
                      </div>
                    </td>
                    <td className="p-5">
                      <span className="px-3 py-1 bg-white/5 rounded-full text-[9px] font-black uppercase text-white/50 border border-white/10 tracking-tighter">
                        {article.category || "General"}
                      </span>
                    </td>
                    <td className="p-5">
                      <span
                        className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${article.status === "published" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border border-amber-500/20"}`}
                      >
                        {article.status || "Review"}
                      </span>
                    </td>
                    <td className="p-5 text-[10px] text-white/30 font-bold uppercase tracking-widest">
                      {new Date(article.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!statsData?.recentArticles?.length && (
              <div className="p-20 text-center text-white/20 text-xs font-black uppercase tracking-[0.3em]">
                System Archive Empty
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
