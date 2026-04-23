import React from 'react';
import CommnetPage from '../../Componets/AllPages/Dashboard/CommnetPage';

export const metadata = {
  title: "সকল মন্তব্য | All Comments | The Daily News Dashboard",

  description:
    "সকল মন্তব্য (All Comments) এখানে দেখুন, রিভিউ করুন এবং The Daily News Dashboard থেকে সহজে ম্যানেজ করুন।",

  keywords: [
    "সকল মন্তব্য",
    "all comments",
    "comment management",
    "কমেন্ট মডারেশন",
    "The Daily News dashboard",
  ],

  robots: {
    index: false,
    follow: false,
  },

  openGraph: {
    title: "সকল মন্তব্য | All Comments | The Daily News Dashboard",
    description:
      "Manage and moderate all user comments بسهولة from the dashboard.",
    url: "https://your-domain.com/dashboard/comments",
    locale: "bn_BD",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "All Comments | The Daily News Dashboard",
    description:
      "Comment management system for admin dashboard.",
  },
};

const AllCommentPage = () => {
    return (
        <div>
            <CommnetPage/>
        </div>
    );
};

export default AllCommentPage;