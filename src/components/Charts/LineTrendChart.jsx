
import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip,CartesianGrid, ResponsiveContainer } from "recharts";

const LineTrendChart = ({ data }) => {
  const aggregated = {};

  data.forEach(d => {
    if (!d.date) return; // skip null or undefined dates
    const month = d.date.slice(0, 7); // YYYY-MM
    aggregated[month] = (aggregated[month] || 0) + d.sales_value;
  });

  const chartData = Object.entries(aggregated)
    .map(([month, value]) => ({ month, value }))
    .sort((a, b) => new Date(a.month) - new Date(b.month)); // chronological order

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={chartData}>
         <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="month" />
        <YAxis tickFormatter={(v) => `${(v / 1e6).toFixed(1)}M`} />
        <Tooltip formatter={(v) => `${(v / 1e6).toFixed(1)}M`} />
        <Line type="monotone" dataKey="value" stroke="#48BB78" dot />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineTrendChart;
