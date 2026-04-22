// app/(dashboard)/layout.js  — Server Component wrapping a Client layout shell

import DashboardLayoutClient from "../Componets/Shared/Dashboardlayoutclient";


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
  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
};

export default DashboardLayout;