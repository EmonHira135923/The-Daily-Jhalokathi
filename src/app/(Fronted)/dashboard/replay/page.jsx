import React from 'react';
import ReplayPage from '../../Componets/AllPages/Dashboard/ReplayPage';

export const metadata = {
  title: "সকল রিপ্লাই | All Replies | The Daily News Dashboard",

  description:
    "সকল রিপ্লাই (Replies) এখানে দেখুন, রিভিউ করুন এবং The Daily News Dashboard থেকে সহজে ম্যানেজ করুন।",

  keywords: [
    "সকল রিপ্লাই",
    "all replies",
    "reply management",
    "কমেন্ট রিপ্লাই",
    "dashboard replies",
    "The Daily News dashboard",
  ],

  robots: {
    index: false,
    follow: false,
  },

  openGraph: {
    title: "সকল রিপ্লাই | All Replies | The Daily News Dashboard",
    description:
      "Manage and review all replies from the admin dashboard.",
    url: "https://your-domain.com/dashboard/replies",
    locale: "bn_BD",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "All Replies | The Daily News Dashboard",
    description:
      "Reply management system for admin dashboard.",
  },
};

const AllReplayPage = () => {
    return (
        <div>
            <ReplayPage/>
        </div>
    );
};

export default AllReplayPage;