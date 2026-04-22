"use client";
import React, { useState, useEffect } from "react";
import Aside from "./Aside";
import Anavvar from "./Anavvar";

const DashboardLayoutClient = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Fixed Sidebar ── */}
      <Aside
        sidebarOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        collapsed={collapsed}
      />

      {/* ── Main content: margin-left = sidebar width ── */}
      <div
        className={`
          flex flex-col min-h-screen transition-all duration-300
          ml-0
          ${collapsed ? "md:ml-[72px]" : "md:ml-64"}
        `}
      >
        {/* Sticky Navbar */}
        <header className="sticky top-0 z-10 bg-white border-b border-gray-100">
          <Anavvar
            onMenuToggle={() => setSidebarOpen((v) => !v)}
            onCollapseToggle={() => setCollapsed((v) => !v)}
            collapsed={collapsed}
          />
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-5 lg:p-6">
          <div className="mx-auto max-w-7xl w-full">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="px-6 py-4 border-t border-gray-100 bg-white">
          <p className="text-[11px] text-gray-400 text-center">
            © {new Date().getFullYear()} দৈনিক ঝালকাঠি — সর্বস্বত্ব সংরক্ষিত
          </p>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayoutClient;