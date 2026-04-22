import CreateNewsPage from '@/app/(Fronted)/Componets/AllPages/Dashboard/CreateNewsPage';
import React from 'react';

export const metadata = {
  title: "নতুন খবর | Create News | The Daily News Dashboard",

  description:
    "The Daily News Dashboard এর মাধ্যমে নতুন নিউজ পোস্ট তৈরি করুন, কনটেন্ট পাবলিশ করুন এবং আপনার নিউজ পোর্টাল আপডেট রাখুন।",

  keywords: [
    "create news",
    "add news",
    "news publish",
    "dashboard create post",
    "The Daily News admin",
    "CMS create news",
  ],

  robots: {
    index: false,
    follow: false,
  },

  openGraph: {
    title: "Create News | The Daily News Dashboard",
    description:
      "Create and publish new news content easily from the admin dashboard.",
    url: "https://your-domain.com/dashboard/news/create",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "Create News | The Daily News Dashboard",
    description:
      "Add and publish news posts from The Daily News admin panel.",
  },
};

const AdminNewNewsPage = () => {
    return (
        <div>
            <CreateNewsPage/>
        </div>
    );
};

export default AdminNewNewsPage;