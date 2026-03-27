"use client";

import React, { useState, useEffect } from "react";
import {
  FiDownload,
  FiTarget,
  FiZap,
  FiBox,
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
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie,
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

  // SEO Breakdown Logic
  const seoPerformanceData = [
    { subject: "SEO Score", A: reportData?.avgSeoScore || 0, fullMark: 100 },
    { subject: "Readability", A: 85, fullMark: 100 },
    { subject: "Keywords", A: 70, fullMark: 100 },
    { subject: "AI Accuracy", A: 90, fullMark: 100 },
    { subject: "Engagement", A: 65, fullMark: 100 },
  ];

  if (loading)
    return (
      <div className="p-10 text-center font-bold animate-pulse">
        Analyzing InsightAI Data...
      </div>
    );

  return (
    <div className="p-8 bg-[#f8fafc] min-h-screen text-slate-900">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            InsightAI Reports
          </h1>
          <p className="text-slate-500 font-medium border-l-4 border-blue-600 pl-3 mt-2">
            Deep Content Analytics & Platform Quality Audit
          </p>
        </div>
        <button
          onClick={() => window.print()}
          className="bg-slate-900 cursor-pointer text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-3 hover:bg-blue-600 transition-all shadow-xl"
        >
          <FiDownload /> Download Full Audit
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* SEO Quality */}
        <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col items-center">
          <h3 className="text-lg font-bold mb-6 self-start flex items-center gap-2">
            <FiTarget className="text-blue-600" /> Content Quality Radar
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart
                cx="50%"
                cy="50%"
                outerRadius="80%"
                data={seoPerformanceData}
              >
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fontSize: 10, fill: "#64748b", fontWeight: "bold" }}
                />
                <Radar
                  name="Metrics"
                  dataKey="A"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.5}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-xs text-slate-400 font-medium text-center italic">
            This radar shows the overall health of your published articles.
          </p>
        </div>

        {/* 2. Platform Scorecard */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-[2rem] text-white shadow-xl flex flex-col justify-between">
            <FiAward size={40} className="opacity-50" />
            <div>
              <p className="text-blue-100 font-bold uppercase text-xs tracking-widest">
                Platform Authority
              </p>
              <h2 className="text-5xl font-black mt-2">High</h2>
              <p className="mt-4 text-sm text-blue-100 opacity-80">
                Your SEO average is <strong>{reportData?.avgSeoScore}%</strong>,
                which is excellent for a new publication.
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <FiZap className="text-amber-500" /> Quick Audit
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                <span className="text-sm font-bold text-slate-600">
                  Total Articles
                </span>
                <span className="text-lg font-black">
                  {reportData?.totalArticles}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                <span className="text-sm font-bold text-slate-600">
                  AI vs Human
                </span>
                <span className="text-lg font-black">
                  {reportData?.aiGenerations}/{reportData?.totalArticles}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
                <span className="text-sm font-bold text-emerald-700">
                  System Status
                </span>
                <span className="text-xs font-black text-emerald-600 uppercase">
                  Healthy
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <FiBarChart2 className="text-indigo-600" /> Publication Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={reportData?.chartData}>
                <XAxis dataKey="name" hide />
                <Tooltip
                  contentStyle={{
                    borderRadius: "15px",
                    border: "none",
                    boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
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
                      fill={index % 2 === 0 ? "#3b82f6" : "#e2e8f0"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-slate-500 font-medium mt-4">
            Graph shows daily volume variations for the last{" "}
            {reportData?.chartData?.length} days.
          </p>
        </div>

        <div className="bg-slate-900 p-8 rounded-[2rem] shadow-2xl text-white">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <FiAlertCircle className="text-rose-500" /> Critical Insights
          </h3>
          <ul className="space-y-6">
            <li className="flex gap-4">
              <div className="mt-1">
                <FiCheckCircle className="text-emerald-400" size={20} />
              </div>
              <div>
                <p className="font-bold">SEO Optimization is Consistent</p>
                <p className="text-sm text-slate-400">
                  Most of your articles hit the {reportData?.avgSeoScore}% mark,
                  which is great for ranking.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="mt-1">
                <FiAlertCircle className="text-amber-400" size={20} />
              </div>
              <div>
                <p className="font-bold">AI Content Ratio</p>
                <p className="text-sm text-slate-400">
                  You have {reportData?.aiGenerations} AI generated posts. Try
                  adding more human-written content to balance.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
