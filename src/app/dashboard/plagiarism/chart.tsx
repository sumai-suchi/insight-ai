"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

function getScoreColor(percentage: number) {
  // 0 => green (120deg), 100 => red (0deg)
  const hue = Math.max(0, Math.min(120, (100 - percentage) * 1.2));
  return `hsl(${hue}, 80%, 45%)`;
}

export default function Chart({ percentage = 0 }: { percentage?: number }) {
  const clamped = Math.max(0, Math.min(100, Math.round(percentage)));
  const scoreColor = getScoreColor(clamped);

  const data = [
    { name: "Score", value: clamped, fill: scoreColor },
    { name: "Remaining", value: 100 - clamped, fill: "#e5e7eb" },
  ];

  return (
    <div className="mt-6 h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={95}
            stroke="none"
            startAngle={90}
            endAngle={-270}
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.fill} />
            ))}
          </Pie>
          <text
            x="50%"
            y="48%"
            textAnchor="middle"
            dominantBaseline="central"
            className="fill-gray-900 text-3xl font-bold"
          >
            {clamped}%
          </text>
          <text
            x="50%"
            y="62%"
            textAnchor="middle"
            dominantBaseline="central"
            className="fill-gray-500 text-sm"
          >
            Risk Score
          </text>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
