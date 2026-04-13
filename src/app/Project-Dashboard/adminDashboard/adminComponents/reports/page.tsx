"use client";

import React, { useState, useEffect } from "react";
import {
  FiDownload,
  FiTarget,
  FiZap,
  FiBarChart2,
  FiAward,
  FiAlertCircle,
  FiCheckCircle,
} from "react-icons/fi";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  Cell,
} from "recharts";

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444"];

const ReportsPage = () => {
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch("/api/dashboard/stats?range=30");
        const json = await response.json();
        if (json.success) setReportData(json.data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const seoPerformanceData = [
    { subject: "SEO Score", A: reportData?.avgSeoScore || 0, fullMark: 100 },
    { subject: "Readability", A: 85, fullMark: 100 },
    { subject: "Keywords", A: 70, fullMark: 100 },
    { subject: "AI Accuracy", A: 90, fullMark: 100 },
    { subject: "Engagement", A: 65, fullMark: 100 },
  ];

  if (loading)
    return (
      <div className="min-h-screen bg-[#0A1228] flex items-center justify-center text-blue-400 font-bold animate-pulse uppercase tracking-widest">
        Analyzing InsightAI Data...
      </div>
    );

  return (
    <div className="relative min-h-screen w-full bg-[#0A1228] text-white p-6 md:p-10 font-sans">
      {/* Background Glow Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter mb-2 bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
              InsightAI Reports
            </h1>
            <p className="text-blue-400/60 font-bold uppercase text-[10px] tracking-[0.2em] border-l-2 border-blue-500 pl-4">
              Deep Content Analytics & Platform Quality Audit
            </p>
          </div>
          <button
            onClick={() => window.print()}
            className="group flex items-center gap-3 px-6 py-3 rounded-2xl bg-blue-600 text-white font-bold uppercase text-xs tracking-widest hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] active:scale-95"
          >
            <FiDownload className="group-hover:translate-y-0.5 transition-transform" />
            Download Full Audit
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* SEO Quality Radar */}
          <div className="bg-white/[0.03] backdrop-blur-md p-8 rounded-[2.5rem] border border-white/10 shadow-2xl flex flex-col items-center">
            <h3 className="text-xs font-black uppercase tracking-widest mb-8 self-start flex items-center gap-3 text-blue-400">
              <FiTarget size={18} /> Content Quality Radar
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  data={seoPerformanceData}
                >
                  <PolarGrid stroke="#ffffff10" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fontSize: 10, fill: "#94a3b8", fontWeight: "bold" }}
                  />
                  <Radar
                    name="Metrics"
                    dataKey="A"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.4}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-6 text-[10px] text-white/30 font-bold uppercase tracking-wider text-center italic">
              Overall health of your published architecture.
            </p>
          </div>

          {/* Platform Scorecard */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-800 p-10 rounded-[2.5rem] text-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all" />
              <FiAward size={50} className="text-white/20" />
              <div>
                <p className="text-blue-100 font-black uppercase text-[10px] tracking-[0.3em] mb-2">
                  Platform Authority
                </p>
                <h2 className="text-6xl font-black tracking-tighter">High</h2>
                <p className="mt-6 text-sm text-blue-100/70 font-medium leading-relaxed">
                  Your SEO average is{" "}
                  <span className="text-white font-bold">
                    {reportData?.avgSeoScore}%
                  </span>
                  , exceeding benchmark standards for new publications.
                </p>
              </div>
            </div>

            <div className="bg-white/[0.03] p-8 rounded-[2.5rem] border border-white/10 shadow-2xl backdrop-blur-sm">
              <h3 className="text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-3 text-amber-400">
                <FiZap size={18} /> Quick Audit
              </h3>
              <div className="space-y-4">
                {[
                  {
                    label: "Total Articles",
                    value: reportData?.totalArticles,
                    color: "text-white",
                  },
                  {
                    label: "AI vs Human",
                    value: `${reportData?.aiGenerations}/${reportData?.totalArticles}`,
                    color: "text-white",
                  },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center p-4 bg-white/[0.02] rounded-2xl border border-white/5"
                  >
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">
                      {stat.label}
                    </span>
                    <span className={`text-xl font-black ${stat.color}`}>
                      {stat.value}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between items-center p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
                    System Status
                  </span>
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-tighter bg-emerald-400/10 px-3 py-1 rounded-full">
                    Healthy
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bar Chart */}
          <div className="bg-white/[0.03] p-8 rounded-[2.5rem] border border-white/10 shadow-2xl">
            <h3 className="text-xs font-black uppercase tracking-widest mb-8 flex items-center gap-3 text-indigo-400">
              <FiBarChart2 size={18} /> Publication Distribution
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={reportData?.chartData}>
                  <XAxis dataKey="name" hide />
                  <Tooltip
                    cursor={{ fill: "#ffffff05" }}
                    contentStyle={{
                      backgroundColor: "#0F172A",
                      borderRadius: "20px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
                    }}
                    itemStyle={{
                      color: "#3b82f6",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      fontSize: "10px",
                    }}
                  />
                  <Bar
                    dataKey="amt"
                    fill="#3b82f6"
                    radius={[10, 10, 10, 10]}
                    barSize={30}
                  >
                    {reportData?.chartData?.map((entry: any, index: number) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index % 2 === 0 ? "#3b82f6" : "#1E293B"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[10px] text-white/20 font-black uppercase tracking-widest mt-6">
              Daily volume analysis: Last {reportData?.chartData?.length} days
              cycle.
            </p>
          </div>

          {/* Critical Insights */}
          <div className="bg-[#0F172A] p-10 rounded-[2.5rem] shadow-2xl border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 blur-3xl rounded-full" />
            <h3 className="text-xs font-black uppercase tracking-widest mb-10 flex items-center gap-3 text-rose-500">
              <FiAlertCircle size={18} /> Critical Insights
            </h3>
            <ul className="space-y-8">
              <li className="flex gap-5 group">
                <div className="mt-1 p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20 group-hover:scale-110 transition-transform">
                  <FiCheckCircle className="text-emerald-400" size={20} />
                </div>
                <div>
                  <p className="font-black uppercase tracking-tight text-sm mb-1">
                    SEO Optimization is Consistent
                  </p>
                  <p className="text-sm text-white/40 font-medium leading-relaxed">
                    Most articles maintain the{" "}
                    <span className="text-emerald-400">
                      {reportData?.avgSeoScore}%
                    </span>{" "}
                    mark, optimizing organic visibility.
                  </p>
                </div>
              </li>
              <li className="flex gap-5 group">
                <div className="mt-1 p-2 bg-amber-500/10 rounded-xl border border-amber-500/20 group-hover:scale-110 transition-transform">
                  <FiAlertCircle className="text-amber-400" size={20} />
                </div>
                <div>
                  <p className="font-black uppercase tracking-tight text-sm mb-1">
                    AI Content Ratio
                  </p>
                  <p className="text-sm text-white/40 font-medium leading-relaxed">
                    You have{" "}
                    <span className="text-amber-400">
                      {reportData?.aiGenerations}
                    </span>{" "}
                    AI posts. Inject more human perspective to balance the
                    authority score.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
