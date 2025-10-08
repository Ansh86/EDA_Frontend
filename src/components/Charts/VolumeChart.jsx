

import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend,CartesianGrid, ResponsiveContainer } from "recharts";

const VolumeChart = ({ data }) => {
  const aggregated = {};

  data.forEach(d => {
    if (!aggregated[d.year]) aggregated[d.year] = {};
    aggregated[d.year][d.brand] = (aggregated[d.year][d.brand] || 0) + d.volume;
  });

  const chartData = Object.entries(aggregated).map(([year, brands]) => ({
    year,
    ...brands,
  }));

  const brands = Object.keys(data.reduce((a, b) => ((a[b.brand] = true), a), {}));

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={chartData} layout="vertical">
         <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis type="number" tickFormatter={(v) => `${(v / 1e6).toFixed(1)}M`} />
        <YAxis type="category" dataKey="year" />
        <Tooltip formatter={(v) => `${(v / 1e6).toFixed(1)}M`} />
        <Legend />
        {brands.map((b, i) => (
          <Bar
            key={b}
            dataKey={b}
            fill={["#F6AD55", "#4299E1", "#48BB78", "#9AE6B4"][i % 4]}
            stackId="a"
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default VolumeChart;
