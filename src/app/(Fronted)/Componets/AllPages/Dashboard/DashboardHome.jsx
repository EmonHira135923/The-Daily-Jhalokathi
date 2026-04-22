"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const DashboardHome = () => {
  const [greeting, setGreeting] = useState("শুভেচ্ছা");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("শুভ সকাল");
    else if (hour < 17) setGreeting("শুভ দুপুর");
    else setGreeting("শুভ সন্ধ্যা");
  }, []);

  return (
    <div className="space-y-6">

      {/* ── Welcome Banner ── */}
      <div className="bg-black rounded-2xl sm:rounded-3xl px-5 sm:px-6 py-5 flex items-center justify-between overflow-hidden relative">
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative z-10">
          <p className="text-gray-400 text-[12px] font-semibold uppercase tracking-widest">
            {greeting} 👋
          </p>
          <h1 className="text-white text-lg sm:text-xl font-black mt-1 leading-tight">
            দৈনিক ঝালকাঠি — অ্যাডমিন প্যানেল
          </h1>
          <p className="text-gray-400 text-[11px] sm:text-[12px] mt-1.5">
            {new Date().toLocaleDateString("bn-BD", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="relative z-10 hidden sm:flex flex-col items-end gap-1">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-2xl">
            📊
          </div>
        </div>
      </div>

    </div>
  );
};

export default DashboardHome;