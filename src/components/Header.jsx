import { useState } from "react";
import { Menu, Bell, Mail, User } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between bg-white px-6 py-3 shadow-sm border-b">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Hamburger Menu */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-700 hover:text-gray-900 transition"
        >
          <Menu size={22} />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2 select-none">
          <div className="w-6 h-6 border border-yellow-500 rounded-md flex items-center justify-center text-yellow-500 font-semibold text-sm">
            Q
          </div>
          <h1 className="text-lg font-semibold tracking-wide text-gray-800">
            QUANT <span className="font-normal text-gray-500">MATRIX AI</span>
          </h1>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">
        {/* Project name pill */}
        <div className="flex items-center gap-2 bg-orange-50 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
          <span role="img" aria-label="globe" style={{ color: "black" }}>
            🌐
            </span>

          <span>Project Name</span>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-3 text-gray-600">
          <button className="hover:text-gray-800 transition">
            <Mail size={20} />
          </button>
          <button className="hover:text-gray-800 transition relative">
            <Bell size={20} />
            {/* Notification dot */}
            <span className="absolute top-0 right-0 block w-2 h-2 bg-red-500 rounded-full" />
          </button>
        </div>

        {/* Profile Icon */}
        <div className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition">
          <User size={20} />
        </div>
      </div>
    </header>
  );
}
