
// import React from "react";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend,CartesianGrid, ResponsiveContainer } from "recharts";

// const BrandComparisonChart = ({ data }) => {
//   const grouped = {};

//   data.forEach(d => {
//     if (!grouped[d.brand]) grouped[d.brand] = { brand: d.brand };
//     grouped[d.brand][d.year] = (grouped[d.brand][d.year] || 0) + d.sales_value;
//   });

//   const chartData = Object.values(grouped);

//   return (
//     <ResponsiveContainer width="100%" height={250}>
//       <BarChart data={chartData}>
//          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//         <XAxis dataKey="brand" />
//         <YAxis tickFormatter={(v) => `${(v / 1e6).toFixed(1)}M`} />
//         <Tooltip formatter={(v) => `${(v / 1e6).toFixed(1)}M`} />
//         <Legend />
//         {[2021, 2022, 2023].map((y, i) => (
//           <Bar key={y} dataKey={y} fill={["#4299E1", "#48BB78", "#F6AD55"][i]} />
//         ))}
//       </BarChart>
//     </ResponsiveContainer>
//   );
// };

// export default BrandComparisonChart;


import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";

const BrandComparisonChart = ({ data }) => {
  const grouped = {};

  data.forEach(d => {
    if (!grouped[d.brand]) grouped[d.brand] = { brand: d.brand };
    grouped[d.brand][d.year] = (grouped[d.brand][d.year] || 0) + d.sales_value;
  });

  const chartData = Object.values(grouped);

  const years = [2021, 2022, 2023];
  const colors = ["#4299E1", "#48BB78", "#F6AD55"];

  // Custom legend to show color-year mapping clearly
  const renderLegend = () => (
  <div className="flex justify-center gap-6 mt-2">
    {years.map((year, i) => (
      <div key={year} className="flex items-center gap-1">
        <span
          className="w-4 h-4 inline-block"
          style={{ backgroundColor: colors[i] }}
        ></span>
        <span className="text-sm text-gray-600">{year}</span>
      </div>
    ))}
  </div>
);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} margin={{ bottom: 40 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="brand" tickFormatter={(brand) => brand} interval={0} height={40} />
        <YAxis tickFormatter={(v) => `${(v / 1e6).toFixed(1)}M`} />
        <Tooltip formatter={(v) => `${(v / 1e6).toFixed(1)}M`} />
        {years.map((y, i) => (
          <Bar key={y} dataKey={y} fill={colors[i]} />
        ))}
        <Legend content={renderLegend} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BrandComparisonChart;
