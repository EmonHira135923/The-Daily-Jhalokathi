import React from 'react';
import CreateBreakingNews from '../../Componets/AllPages/Dashboard/CreateBreakingNews';

export const metadata = {
  title: "ব্রেকিং নিউজ | Create Breaking News | The Daily News Dashboard",

  description:
    "The Daily News Dashboard থেকে দ্রুত ব্রেকিং নিউজ তৈরি ও প্রকাশ করুন। গুরুত্বপূর্ণ আপডেট রিয়েল-টাইমে শেয়ার করুন।",

  keywords: [
    "breaking news create",
    "add breaking news",
    "news dashboard",
    "The Daily News admin",
    "CMS breaking news",
    "publish breaking news",
  ],

  robots: {
    index: false,
    follow: false,
  },

  openGraph: {
    title: "Create Breaking News | The Daily News Dashboard",
    description:
      "Quickly create and publish breaking news updates from the admin dashboard.",
    url: "https://your-domain.com/dashboard/breaking-news/create",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "Create Breaking News | The Daily News Dashboard",
    description:
      "Publish breaking news instantly from The Daily News admin panel.",
  },
};

const AdminBreakingNewsPage = () => {
    return (
        <div>
            <CreateBreakingNews/>
        </div>
    );
};

export default AdminBreakingNewsPage;