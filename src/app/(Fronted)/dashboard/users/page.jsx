import React from 'react';
import AllUserPage from '../../Componets/AllPages/Dashboard/AllUserPage';

export const metadata = {
  title: "Admin Users | The Daily News Dashboard",

  description:
    "The Daily News Dashboard এর Admin Users পেজ থেকে সকল ইউজার ম্যানেজ করুন, রোল সেট করুন এবং অ্যাক্সেস কন্ট্রোল পরিচালনা করুন।",

  keywords: [
    "admin users",
    "user management",
    "dashboard users",
    "The Daily News admin",
    "CMS user control",
    "manage users",
  ],

  robots: {
    index: false,
    follow: false,
  },

  openGraph: {
    title: "Admin Users | The Daily News Dashboard",
    description:
      "Manage all users, roles, and permissions from the admin dashboard.",
    url: "https://your-domain.com/dashboard/users",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "Admin Users | The Daily News Dashboard",
    description:
      "User management system for The Daily News admin panel.",
  },
};

const UserPage = () => {
    return (
        <div>
            <AllUserPage/>
        </div>
    );
};

export default UserPage;