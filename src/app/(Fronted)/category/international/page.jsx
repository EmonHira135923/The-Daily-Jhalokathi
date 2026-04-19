import CategoryPage from "../../Componets/AllPages/CategoryPage";
import React from "react";

export const metadata = {
  title: "আন্তর্জাতিক | International | The Daily News",

  description:
    "The Daily News এর আন্তর্জাতিক বিভাগে বিশ্বের গুরুত্বপূর্ণ খবর, বিশ্ব রাজনীতি, যুদ্ধ-সংঘাত, অর্থনীতি, প্রযুক্তি ও বৈশ্বিক ইভেন্টের আপডেট পড়ুন। Get latest international news, world updates, global politics and world events.",

  keywords: [
    "আন্তর্জাতিক",
    "international",
    "world news",
    "global news",
    "বিশ্ব সংবাদ",
    "world politics",
    "বিদেশী খবর",
    "international updates",
    "The Daily News international",
    "global events",
  ],

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: "https://your-domain.com/international",

    title: "আন্তর্জাতিক | International | The Daily News",

    description:
      "বিশ্বের গুরুত্বপূর্ণ খবর, আন্তর্জাতিক রাজনীতি, অর্থনীতি ও বৈশ্বিক ইভেন্টের সর্বশেষ আপডেট The Daily News এ পড়ুন।",

    images: [
      {
        url: "https://your-domain.com/og-international.jpg",
        width: 1200,
        height: 630,
        alt: "International News - The Daily News",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "আন্তর্জাতিক | International | The Daily News",
    description:
      "Latest world news, global politics and international updates.",
    images: ["https://your-domain.com/og-international.jpg"],
  },
};

const InternationalPage = () => {
  return <CategoryPage slug="international" />;
};

export default InternationalPage;