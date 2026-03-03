"use client";

import { TrendingUp, TrendingDown } from "lucide-react";

type DashboardCardProps = {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "up" | "down";
  icon: React.ReactNode;
  bgColor: string;
};

export default function DashboardCard({
  title,
  value,
  change,
  changeType = "up",
  icon,
  bgColor,
}: DashboardCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition">
      
      <div className="flex justify-between items-start">
        <div className={`p-3 rounded-xl ${bgColor}`}>
          {icon}
        </div>

        {change && (
          <div
            className={`flex items-center text-sm ${
              changeType === "up" ? "text-green-500" : "text-red-500"
            }`}
          >
            {changeType === "up" ? (
              <TrendingUp size={16} />
            ) : (
              <TrendingDown size={16} />
            )}
          </div>
        )}
      </div>

      <div className="mt-4">
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-3xl font-bold mt-1">{value}</h2>
        {change && (
          <p
            className={`text-sm mt-1 ${
              changeType === "up" ? "text-green-500" : "text-red-500"
            }`}
          >
            {change}
          </p>
        )}
      </div>
    </div>
  );
}