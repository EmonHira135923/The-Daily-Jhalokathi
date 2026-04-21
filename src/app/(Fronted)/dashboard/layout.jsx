import React from "react";
import Aside from "../Componets/Shared/Aside";
import Anavvar from "../Componets/Shared/Anavvar";

export const metadata = {
  title: {
    template: "%s | দৈনিক ঝালকাঠি ড্যাশবোর্ড",
    default: "ড্যাশবোর্ড | দৈনিক ঝালকাঠি",
  },
  description:
    "দৈনিক ঝালকাঠি ড্যাশবোর্ড থেকে নিউজ পোর্টালের কন্টেন্ট, ইউজার এবং পারফরম্যান্স ম্যানেজ করুন।",
  keywords: ["dashboard", "admin panel", "news CMS", "দৈনিক ঝালকাঠি"],
  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: "https://your-domain.com/dashboard",
    title: "ড্যাশবোর্ড | দৈনিক ঝালকাঠি",
    description: "নিউজ পোর্টালের পরিসংখ্যান, ভিজিটর, পোস্ট রিয়েল-টাইমে মনিটর করুন।",
    images: [{ url: "https://your-domain.com/og-dashboard.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ড্যাশবোর্ড | দৈনিক ঝালকাঠি",
    description: "নিউজ পোর্টাল ম্যানেজ করুন।",
    images: ["https://your-domain.com/og-dashboard.jpg"],
  },
};

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Fixed Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-20">
        <Aside />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 md:pl-64">

        {/* Sticky Top Navbar */}
        <header className="sticky top-0 z-10 bg-white shadow-none border-b border-gray-100">
          <Anavvar />
        </header>

        {/* Page Content */}
        <main className="flex-1 p-5 sm:p-6">
          <div className="mx-auto max-w-7xl">
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

export default DashboardLayout;