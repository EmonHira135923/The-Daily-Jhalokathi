"use strict";
"use client";

import React from "react";
import { toast } from "react-toastify";

const DemoCredentials = () => {
  const handleCopy = (e, text, type) => {
    e.stopPropagation(); // বাটনের ভেতরের ক্লিক যাতে বাইরে না ছড়ায়
    navigator.clipboard.writeText(text);
    toast.success(`${type} কপি হয়েছে!`);
  };

  return (
    <div className="mt-6 border border-dashed border-gray-200 rounded-xl p-3 bg-gray-50/50">
      <p className="text-xs font-semibold text-gray-500 mb-2.5 text-center">
        ⚡ ডেমো অ্যাকাউন্ট (যেটিতে ক্লিক করবেন শুধু সেটিই কপি হবে)
      </p>

      <div className="flex flex-col gap-3 sm:flex-row justify-center items-center">
        {/* ================= Admin Card ================= */}
        <div className="flex flex-col gap-1.5 w-full sm:w-1/2 bg-white border border-gray-100 p-2.5 rounded-xl shadow-sm">
          <div className="flex items-center justify-between w-full mb-0.5">
            <span className="bg-red-50 text-red-600 px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider">
              Admin
            </span>
          </div>

          {/* Email Row */}
          <button
            type="button"
            onClick={(e) => handleCopy(e, "admin@gmail.com", "Admin ইমেইল")}
            className="flex items-center justify-between w-full text-left text-xs font-mono text-gray-600 hover:text-blue-600 bg-gray-50/50 hover:bg-blue-50/30 px-2 py-1 rounded-md transition-all group"
          >
            <div>
              <span className="text-gray-400 font-sans font-medium mr-1">
                E:
              </span>
              admin@gmail.com
            </div>
            <span className="text-[10px] text-gray-400 group-hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-all">
              📋
            </span>
          </button>

          {/* Password Row */}
          <button
            type="button"
            onClick={(e) => handleCopy(e, "admin123", "Admin পাসওয়ার্ড")}
            className="flex items-center justify-between w-full text-left text-xs font-mono text-gray-500 hover:text-blue-600 bg-gray-50/50 hover:bg-blue-50/30 px-2 py-1 rounded-md transition-all group"
          >
            <div>
              <span className="text-gray-400 font-sans font-medium mr-1">
                P:
              </span>
              admin123
            </div>
            <span className="text-[10px] text-gray-400 group-hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-all">
              📋
            </span>
          </button>
        </div>

        {/* ================= User Card ================= */}
        <div className="flex flex-col gap-1.5 w-full sm:w-1/2 bg-white border border-gray-100 p-2.5 rounded-xl shadow-sm">
          <div className="flex items-center justify-between w-full mb-0.5">
            <span className="bg-green-50 text-green-600 px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider">
              User
            </span>
          </div>

          {/* Email Row */}
          <button
            type="button"
            onClick={(e) => handleCopy(e, "user@gmail.com", "User ইমেইল")}
            className="flex items-center justify-between w-full text-left text-xs font-mono text-gray-600 hover:text-blue-600 bg-gray-50/50 hover:bg-blue-50/30 px-2 py-1 rounded-md transition-all group"
          >
            <div>
              <span className="text-gray-400 font-sans font-medium mr-1">
                E:
              </span>
              user@gmail.com
            </div>
            <span className="text-[10px] text-gray-400 group-hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-all">
              📋
            </span>
          </button>

          {/* Password Row */}
          <button
            type="button"
            onClick={(e) => handleCopy(e, "user123", "User পাসওয়ার্ড")}
            className="flex items-center justify-between w-full text-left text-xs font-mono text-gray-500 hover:text-blue-600 bg-gray-50/50 hover:bg-blue-50/30 px-2 py-1 rounded-md transition-all group"
          >
            <div>
              <span className="text-gray-400 font-sans font-medium mr-1">
                P:
              </span>
              user123
            </div>
            <span className="text-[10px] text-gray-400 group-hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-all">
              📋
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DemoCredentials;
