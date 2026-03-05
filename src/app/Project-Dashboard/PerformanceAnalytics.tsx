"use client";

import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

// Register Chart.js elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function PerformanceAnalytics() {
  const [activeTab, setActiveTab] = useState<"Week" | "Month" | "Year">("Month");

  // ── Bar Chart ──
  const barData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Content Created",
        data: [12, 18, 14, 22, 18, 8, 5],
        backgroundColor: "#8b5cf6",
        borderColor: "#7c3aed",
        borderWidth: 1,
        borderRadius: 8,
        hoverBackgroundColor: "#a78bfa",
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1e293b",
        titleColor: "#f1f5f9",
        bodyColor: "#cbd5e1",
        cornerRadius: 6,
      },
    },
    scales: {
      x: {
        type: "category",
        grid: { display: false },
        ticks: {
          color: "#4b5563",
          font: { size: 12, weight: 500 }, // ✅ number is correct
        },
      },
      y: {
        type: "linear",
        beginAtZero: true,
        max: 28,
        grid: { color: "#e5e7eb" },
        ticks: {
          color: "#4b5563",
          stepSize: 6,
          font: { size: 12 },
        },
      },
    },
  } as const;

  // ── Pie Chart ──
  const pieData = {
    labels: ["Blog Posts", "Social Media", "Email", "Ads"],
    datasets: [
      {
        data: [45, 30, 15, 10],
        backgroundColor: ["#60a5fa", "#34d399", "#a78bfa", "#fbbf24"],
        borderWidth: 2,
        borderColor: "#ffffff",
        hoverOffset: 12,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "0%",
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          color: "#1f2937",
          font: { size: 13, weight: "bold" as const }, // ✅ use string literal "bold"
          padding: 16,
          usePointStyle: true,
          pointStyle: "circle" as const,
          boxWidth: 10,
        },
      },
      tooltip: {
        backgroundColor: "#1e293b",
        titleColor: "#f1f5f9",
        bodyColor: "#e2e8f0",
      },
    },
  } as const;

  return (
    <div className="w-full  bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-5 border-b border-gray-200 bg-gray-50/70">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-violet-600 flex items-center justify-center text-white font-bold shadow-md text-xl">
            ∞
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Performance Analytics</h2>
        </div>

        {/* Toggle buttons */}
        <div className="flex bg-gray-100 rounded-lg p-1 border border-gray-200">
          {(["Week", "Month", "Year"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-1.5 text-sm font-medium rounded-md transition-all duration-200
                ${
                  activeTab === tab
                    ? "bg-violet-600 text-white shadow-sm"
                    : "text-gray-700 hover:text-gray-900 hover:bg-white/80"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Charts container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        {/* Bar Chart */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Weekly Content Creation
          </h3>
          <div className="h-80 bg-gray-50 rounded-xl p-4 border border-gray-200">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>

        {/* Pie Chart */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Content Distribution
          </h3>
          <div className="h-80 bg-gray-50 rounded-xl p-6 border border-gray-200 flex items-center justify-center">
            <div className="w-full max-w-xs aspect-square">
              <Pie data={pieData} options={pieOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}