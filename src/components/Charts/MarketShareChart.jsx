

import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A569BD",
  "#E74C3C",
  "#16A085",
  "#F39C12",
  "#5DADE2",
  "#58D68D",
];

// Helper to darken hex color
const darkenColor = (hex, amount = 0.2) => {
  let c = hex.slice(1);
  if (c.length === 3) {
    c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
  }
  const num = parseInt(c, 16);
  let r = Math.floor(((num >> 16) & 0xff) * (1 - amount));
  let g = Math.floor(((num >> 8) & 0xff) * (1 - amount));
  let b = Math.floor((num & 0xff) * (1 - amount));
  return `rgb(${r},${g},${b})`;
};

// Format numbers for tooltip
const formatNumber = (num) => {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toLocaleString("en-IN");
};

const MarketShareChart = ({ data, valueKey = "sales_value" }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  // Aggregate data by brand
  const aggregated = Object.values(
    data.reduce((acc, item) => {
      const key = item.brand || "Unknown";
      if (!acc[key]) acc[key] = { name: key, sales_value: 0, volume: 0 };
      acc[key].sales_value += Number(item.sales_value || 0);
      acc[key].volume += Number(item.volume || 0);
      return acc;
    }, {})
  );

  // Top 10 brands
  const chartData = aggregated
    .sort((a, b) => b[valueKey] - a[valueKey])
    .slice(0, 10);

  return (
    <div className="w-full h-96">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={chartData}
            dataKey={valueKey}
            nameKey="name"
            innerRadius="60%"
            outerRadius="90%"
            paddingAngle={3}
            labelLine={false}   // no label lines
            onClick={(e) => e.preventDefault()}   // prevent focus border
            onMouseDown={(e) => e.preventDefault()}
            tabIndex={-1}      // remove from tab order
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  activeIndex === index
                    ? darkenColor(COLORS[index % COLORS.length], 0.3)
                    : COLORS[index % COLORS.length]
                }
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                style={{
                  outline: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </Pie>

          <Tooltip
            formatter={(value, name) => [
              formatNumber(value),
              name === "sales_value" ? "Sales" : "Volume",
            ]}
            contentStyle={{
              background: "#f9fafb",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
            }}
          />

          <Legend layout="vertical" align="right" verticalAlign="middle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MarketShareChart;
