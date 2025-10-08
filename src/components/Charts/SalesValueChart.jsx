



import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend,CartesianGrid, ResponsiveContainer } from "recharts";

const SalesValueChart = ({ data }) => {
  const aggregated = {};

  data.forEach(d => {
    if (!aggregated[d.year]) aggregated[d.year] = {};
    aggregated[d.year][d.brand] = (aggregated[d.year][d.brand] || 0) + d.sales_value;
  });

  const chartData = Object.entries(aggregated).map(([year, brands]) => ({
    year,
    ...brands,
  }));

  const brands = Object.keys(data.reduce((a, b) => ((a[b.brand] = true), a), {}));

  // Formatter to convert raw values to millions
  const formatMillion = (value) => `${(value / 1e6).toFixed(1)}M`;

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={chartData} layout="vertical">
 <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis type="number" tickFormatter={formatMillion} />
        <YAxis type="category" dataKey="year" />
        <Tooltip 
          formatter={(value) => formatMillion(value)} // Show value in millions on hover
        />
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

export default SalesValueChart;
