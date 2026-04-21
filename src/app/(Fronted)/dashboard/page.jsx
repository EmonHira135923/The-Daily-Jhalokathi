import React from "react";
import DashboardHome from "../Componets/AllPages/DashboardHome";

export const metadata = {
  title: "ড্যাশবোর্ড | দৈনিক ঝালকাঠি অ্যাডমিন",
  description:
    "দৈনিক ঝালকাঠি ড্যাশবোর্ড থেকে নিউজ পোর্টালের পরিসংখ্যান, ভিজিটর, পোস্ট এবং অন্যান্য তথ্য রিয়েল-টাইমে মনিটর করুন।",
  keywords: ["Dashboard", "Admin Dashboard", "দৈনিক ঝালকাঠি", "news admin panel"],
  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: "https://your-domain.com/dashboard",
    title: "ড্যাশবোর্ড | দৈনিক ঝালকাঠি",
    description: "নিউজ পোর্টাল পারফরম্যান্স রিয়েল-টাইমে মনিটর করুন।",
    images: [{ url: "https://your-domain.com/og-dashboard.jpg", width: 1200, height: 630, alt: "Dashboard Preview" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ড্যাশবোর্ড | দৈনিক ঝালকাঠি",
    description: "নিউজ পোর্টাল ম্যানেজ করুন।",
    images: ["https://your-domain.com/og-dashboard.jpg"],
  },
};

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <DashboardHome />
    </div>
  );
};

export default Dashboard;