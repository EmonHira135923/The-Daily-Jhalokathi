import React from 'react';
import AllNewsPage from '../../Componets/AllPages/Dashboard/AllNewsPage';

export const metadata = {
  title: " সকল নিউজ | All News | The Daily News Dashboard",

  description:
    "The Daily News Dashboard এর All News পেজ থেকে সকল নিউজ পোস্ট ম্যানেজ করুন, এডিট, আপডেট বা ডিলিট করুন সহজেই।",

  keywords: [
    "all news",
    "news management",
    "dashboard news",
    "The Daily News admin",
    "CMS news control",
    "manage news",
  ],

  robots: {
    index: false,
    follow: false,
  },

  openGraph: {
    title: "All News | The Daily News Dashboard",
    description:
      "Manage all news posts, edit, update, or delete content from the dashboard.",
    url: "https://your-domain.com/dashboard/news",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "All News | The Daily News Dashboard",
    description:
      "News management system for The Daily News admin panel.",
  },
};


const NewsPage = () => {
    return (
        <div>
            <AllNewsPage/>
        </div>
    );
};

export default NewsPage;