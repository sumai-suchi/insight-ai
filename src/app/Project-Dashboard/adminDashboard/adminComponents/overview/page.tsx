"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth/auth-client";
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
  FiCpu,
  FiUsers,
  FiActivity,
  FiShield,
  FiEdit3,
  FiPieChart,
  FiCalendar,
  FiArrowRight,
} from "react-icons/fi";

const COLORS = ["#2563eb", "#9333ea", "#10b981", "#f59e0b"];

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
      trend: "All Publications",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      id: 2,
      label: "Total Users",
      value: statsData?.totalUsers || 0,
      icon: <FiUsers />,
      trend: "All Registered",
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      id: 3,
      label: "System Admins",
      value: statsData?.totalAdmins || 0,
      icon: <FiShield />,
      trend: "Full Access",
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      id: 4,
      label: "Content Editors",
      value: statsData?.totalEditors || 0,
      icon: <FiEdit3 />,
      trend: "Writing Team",
      color: "text-purple-600",
      bg: "bg-purple-50",
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
      trend: "General Users",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
  ];

  if (loading && !statsData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium text-slate-500">
            Fetching InsightAI stats...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-slate-50 min-h-screen text-slate-900 font-sans">
      {/* Header */}
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            InsightAI Overview
          </h1>
          <div className="flex items-center gap-4 mt-2">
            <p className="text-slate-500">
              Welcome back,{" "}
              <span className="font-bold text-slate-700">
                {isPending
                  ? "..."
                  : session?.user?.name?.split(" ")[0] || "User"}
              </span>
              !
            </p>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold rounded uppercase tracking-wider">
                SEO Avg: {statsData?.avgSeoScore || 0}%
              </span>
              <span className="px-2 py-1 bg-purple-100 text-purple-700 text-[10px] font-bold rounded uppercase tracking-wider">
                AI Articles: {statsData?.aiGenerations || 0}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all shadow-sm flex flex-col justify-between group"
          >
            <div className="flex justify-between items-start">
              <div
                className={`p-2.5 rounded-xl ${stat.bg} ${stat.color} text-lg transition-transform group-hover:scale-110`}
              >
                {stat.icon}
              </div>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full border bg-slate-50 text-slate-400 border-slate-100 uppercase tracking-tighter">
                {stat.trend}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                {stat.label}
              </h3>
              <p className="text-2xl font-black mt-1 text-slate-900">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Area */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
          {loading && (
            <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-10 flex items-center justify-center rounded-2xl">
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2 text-slate-800">
              <FiActivity className="text-blue-600" /> Multi-Dimensional
              Analytics
            </h2>
            <div className="flex items-center bg-white border border-slate-200 p-1 rounded-xl shadow-sm">
              <button
                onClick={() => setRange(7)}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${range === 7 ? "bg-blue-600 text-white shadow-md" : "text-slate-500 hover:bg-slate-50"}`}
              >
                7 Days
              </button>
              <button
                onClick={() => setRange(30)}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${range === 30 ? "bg-blue-600 text-white shadow-md" : "text-slate-500 hover:bg-slate-50"}`}
              >
                30 Days
              </button>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={statsData?.chartData}>
                <CartesianGrid stroke="#f5f5f5" vertical={false} />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#64748b" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#64748b" }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                  }}
                />
                <Legend verticalAlign="top" height={36} iconType="circle" />
                <Area
                  type="monotone"
                  dataKey="amt"
                  name="Total Posts"
                  fill="#8884d8"
                  stroke="#8884d8"
                  fillOpacity={0.1}
                />
                <Bar
                  dataKey="pv"
                  name="Views/Activity"
                  barSize={20}
                  fill="#413ea0"
                  radius={[4, 4, 0, 0]}
                />
                <Line
                  type="monotone"
                  dataKey="uv"
                  name="AI Score/Trend"
                  stroke="#ff7300"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#ff7300" }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Roles Pie Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <h2 className="text-lg font-semibold mb-4 text-slate-800 flex items-center gap-2">
            <FiPieChart className="text-purple-600" /> User Roles
          </h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-auto space-y-2">
            {pieData.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 bg-slate-50 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                  ></div>
                  <span className="text-[10px] font-bold text-slate-600 uppercase">
                    {item.name}
                  </span>
                </div>
                <span className="text-xs font-bold text-slate-800">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- Recent Articles Table --- */}
      <div className="mt-8 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
            <FiFileText className="text-blue-600" /> Recent Published Articles
          </h2>
          <button className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors">
            View All <FiArrowRight />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Article Title
                </th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {statsData?.recentArticles?.map((article: any) => (
                <tr
                  key={article._id}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {article.title}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium tracking-tight">
                        ID: {article._id.slice(-8).toUpperCase()}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-slate-600">
                    <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold uppercase text-slate-500 tracking-tighter">
                      {article.category || "General"}
                    </span>
                  </td>
                  <td className="p-4 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                        article.status === "published"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      {article.status || "Review"}
                    </span>
                  </td>
                  <td className="p-4 text-xs text-slate-500 font-medium">
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
            <div className="p-10 text-center text-slate-400 text-sm italic">
              No recent articles found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
