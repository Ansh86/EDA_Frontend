
import React from "react";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Static Header (fixed at top) */}
      <Header />

      {/* Add top padding equal to header height (≈60px) */}
      <main className="pt-16">
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
