import React from 'react';
import Myprofile from '../Componets/AllPages/Myprofile';

export const metadata = {
  title: "My Profile | The Daily News",

  description:
    "The Daily News এর My Profile পেজে আপনার অ্যাকাউন্ট, ব্যক্তিগত তথ্য এবং সেটিংস ম্যানেজ করুন। Manage your profile, personal info, and account settings easily.",

  keywords: [
    "My Profile",
    "user profile",
    "The Daily News profile",
    "profile page",
    "account settings",
    "user account",
    "profile dashboard",
    "personal info",
    "profile management",
    "user settings",
  ],

  robots: {
    index: false,
    follow: true,
  },

  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: "https://your-domain.com/profile",

    title: "My Profile | The Daily News",

    description:
      "Manage your profile, personal information, and account settings on The Daily News.",

    images: [
      {
        url: "https://your-domain.com/og-profile.jpg",
        width: 1200,
        height: 630,
        alt: "My Profile The Daily News",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "My Profile | The Daily News",
    description:
      "Manage your profile and account settings on The Daily News.",
    images: ["https://your-domain.com/og-profile.jpg"],
  },
};

const MyProfile = () => {
    return (
        <div>
            <Myprofile/>
        </div>
    );
};

export default MyProfile;