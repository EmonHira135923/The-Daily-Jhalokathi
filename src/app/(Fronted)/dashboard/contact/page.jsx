import React from 'react';
import AllContactPage from '../../Componets/AllPages/Dashboard/AllContactPage';

export const metadata = {
  title: "সকল মেসেজ | All Messages | The Daily News Dashboard",

  description:
    "সকল কন্টাক্ট মেসেজ (Contact Messages) এখানে দেখুন, রিভিউ করুন এবং The Daily News Dashboard থেকে সহজে ম্যানেজ করুন।",

  keywords: [
    "সকল মেসেজ",
    "all messages",
    "contact messages",
    "contact form submissions",
    "dashboard messages",
    "The Daily News dashboard",
  ],

  robots: {
    index: false,
    follow: false,
  },

  openGraph: {
    title: "সকল মেসেজ | All Messages | The Daily News Dashboard",
    description:
      "Review and manage all contact form messages from the admin dashboard.",
    url: "https://your-domain.com/dashboard/messages",
    locale: "bn_BD",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "All Messages | The Daily News Dashboard",
    description:
      "Contact message management system for admin dashboard.",
  },
};

const ContactPage = () => {
    return (
        <div>
            <AllContactPage/>
        </div>
    );
};

export default ContactPage;