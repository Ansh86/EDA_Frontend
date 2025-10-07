import React, { useEffect, useState } from "react";
import axios from "axios";
import SalesValueChart from "./Charts/SalesValueChart";
import VolumeChart from "./Charts/VolumeChart";
import BrandComparisonChart from "./Charts/BrandComparisonChart";
import LineTrendChart from "./Charts/LineTrendChart";
import MarketShareChart from "./Charts/MarketShareChart";
import { RotateCcw } from "lucide-react";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Brand");

  const [filters, setFilters] = useState({
    brand: "",
    packType: "",
    ppg: "",
    channel: "",
    year: "",
  });

  const [filterOptions, setFilterOptions] = useState({
    brands: [],
    packTypes: [],
    ppgs: [],
    channels: [],
    years: [],
  });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleResetFilters = () => {
    setFilters({
      brand: "",
      packType: "",
      ppg: "",
      channel: "",
      year: "",
    });
  };

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        let allData = [];
        let url = "http://127.0.0.1:8000/api/salesdata/?limit=100";

        while (url) {
          const res = await axios.get(url);
          allData = [...allData, ...res.data.results];
          url = res.data.next;
        }

        setData(allData);
        setLoading(false);

        // Extract filter options dynamically
        setFilterOptions({
          brands: Array.from(new Set(allData.map((item) => item.brand).filter(Boolean))),
          packTypes: Array.from(new Set(allData.map((item) => item.pack_type).filter(Boolean))),
          ppgs: Array.from(new Set(allData.map((item) => item.ppg).filter(Boolean))),
          channels: Array.from(new Set(allData.map((item) => item.channel).filter(Boolean))),
          years: Array.from(new Set(allData.map((item) => item.year).filter(Boolean))),
        });
      } catch (err) {
        console.error("API Fetch Error:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

// if (loading)
//   return (
//     <div className="fixed inset-0 flex justify-center items-center bg-white z-50">
//       <div className="w-16 h-16 border-8 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
//     </div>
//   );


  // Apply filters
  const filteredData = data.filter((item) => {
    return (
      (filters.brand === "" || item.brand === filters.brand) &&
      (filters.packType === "" || item.pack_type === filters.packType) &&
      (filters.ppg === "" || item.ppg === filters.ppg) &&
      (filters.channel === "" || item.channel === filters.channel) &&
      (filters.year === "" || item.year === parseInt(filters.year))
    );
  });

  // Tabs list
  const tabs = [
    "Brand",
    "Pack Type",
    "PPG",
    "Brand × Pack Type × PPG",
    "Correlation and Trends",
  ];

  // 🔹 Render charts dynamically by active tab
  const renderCharts = () => {
    switch (activeTab) {
      // ✅ Show all 4 charts for Brand tab
     case "Brand":
  return (
    
    <>
      <div className="bg-white p-4 rounded-2xl shadow flex flex-col">
        <h2 className="font-semibold mb-2">Sales Value (EURO)</h2>
        <SalesValueChart data={filteredData} />
      </div>

      <div className="bg-white p-4 rounded-2xl shadow flex flex-col">
        <h2 className="font-semibold mb-2">Volume Contribution (KG)</h2>
        <VolumeChart data={filteredData} />
      </div>

      <div className="bg-white p-4 rounded-2xl shadow flex flex-col">
        <h2 className="font-semibold mb-2">Brand Comparison</h2>
        <BrandComparisonChart data={filteredData} />
      </div>

      <div className="bg-white p-4 rounded-2xl shadow flex flex-col">
        <h2 className="font-semibold mb-2">Sales Trend</h2>
        <LineTrendChart data={filteredData} />
      </div>

      {/* 🥧 Market Share Charts in One Row */}
      <div className="col-span-2 grid grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-2xl shadow flex flex-col">
          <h2 className="font-semibold mb-2">Market Share by Sales</h2>
          <MarketShareChart data={filteredData} valueKey="sales_value" />
        </div>

        <div className="bg-white p-4 rounded-2xl shadow flex flex-col">
          <h2 className="font-semibold mb-2">Market Share by Volume</h2>
          <MarketShareChart data={filteredData} valueKey="volume" />
        </div>
      </div>
    </>
  );
      case "Pack Type":
        return (
          <>
            <div className="bg-white p-4 rounded-2xl shadow flex flex-col">
              <h2 className="font-semibold mb-2">Pack Type Sales Distribution</h2>
              <VolumeChart data={filteredData} />
            </div>
          </>
        );

      case "PPG":
        return (
          <>
            <div className="bg-white p-4 rounded-2xl shadow flex flex-col">
              <h2 className="font-semibold mb-2">PPG-wise Sales Trend</h2>
              <LineTrendChart data={filteredData} />
            </div>
          </>
        );

      case "Brand × Pack Type × PPG":
        return (
          <>
            <div className="bg-white p-4 rounded-2xl shadow flex flex-col">
              <h2 className="font-semibold mb-2">Multi-Dimensional Comparison</h2>
              <BrandComparisonChart data={filteredData} />
            </div>
          </>
        );

      case "Correlation and Trends":
        return (
          <>
            <div className="bg-white p-4 rounded-2xl shadow flex flex-col">
              <h2 className="font-semibold mb-2">Sales Trend Over Time</h2>
              <LineTrendChart data={filteredData} />
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="px-[100px] py-6 w-full bg-gray-50 min-h-screen">
      {/* 🔹 Tabs Navigation */}
      <div className="flex space-x-8  mb-6 text-gray-700 font-medium">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 transition ${
              activeTab === tab
                ? "text-black font-semibold border-b-2 border-yellow-400"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 🔹 Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <select name="brand" value={filters.brand} onChange={handleFilterChange}  className="p-2 bg-white border-none rounded shadow-sm">
          <option value="">All Brands</option>
          {filterOptions.brands.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>

        <select name="packType" value={filters.packType} onChange={handleFilterChange}  className="p-2 bg-white border-none rounded shadow-sm">
          <option value="">All Pack Types</option>
          {filterOptions.packTypes.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>

        <select name="ppg" value={filters.ppg} onChange={handleFilterChange}  className="p-2  bg-white border-none rounded shadow-sm">
          <option value="">All PPG</option>
          {filterOptions.ppgs.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>

        <select name="channel" value={filters.channel} onChange={handleFilterChange}  className="p-2 bg-white border-none rounded shadow-sm">
          <option value="">All Channels</option>
          {filterOptions.channels.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select name="year" value={filters.year} onChange={handleFilterChange}  className="p-2 bg-white border-none rounded shadow-sm">
          <option value="">All Years</option>
          {filterOptions.years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>

        <button
  onClick={handleResetFilters}
  className="p-2 bg-gray-200 hover:bg-gray-300 rounded shadow-sm transition flex items-center justify-center gap-2"
  title="Reset Filters"
>
  <RotateCcw size={18} className="text-gray-700" />
  <span>Reset</span>
</button>
      </div>

      {/* 🔹 Charts Grid */}
      {loading ? (
      <div className="flex justify-center items-center col-span-2 w-full min-h-[400px]">
        <div className="w-20 h-20 border-8 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    ) : (
      <div className="grid grid-cols-2 gap-6 w-full">{renderCharts()}</div>
    )}
    </div>
  );
};

export default Dashboard;
