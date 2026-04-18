import CategoryPage from "@/app/Componets/AllPages/CategoryPage";
import React from "react";

export const metadata = {
  title: "খেলাধুলা | Sports | The Daily News",

  description:
    "The Daily News এর খেলাধুলা বিভাগে বাংলাদেশ ও বিশ্বজুড়ে ক্রিকেট, ফুটবল, ক্রিকেট লাইভ স্কোর, ম্যাচ আপডেট, খেলোয়াড়দের খবর এবং বিশ্লেষণ পড়ুন। Get latest sports news, live scores, cricket, football updates and analysis.",

  keywords: [
    "খেলাধুলা",
    "sports",
    "cricket",
    "football",
    "live score",
    "ক্রিকেট",
    "ফুটবল",
    "sports news",
    "The Daily News sports",
    "ম্যাচ আপডেট",
    "game news",
  ],

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: "https://your-domain.com/sports",

    title: "খেলাধুলা | Sports | The Daily News",

    description:
      "ক্রিকেট, ফুটবল সহ সকল খেলাধুলার লাইভ আপডেট, স্কোর এবং বিশ্লেষণ The Daily News এ পড়ুন। Latest sports news and live updates.",

    images: [
      {
        url: "https://your-domain.com/og-sports.jpg",
        width: 1200,
        height: 630,
        alt: "Sports News - The Daily News",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "খেলাধুলা | Sports | The Daily News",
    description:
      "Latest cricket, football and sports news with live updates and scores.",
    images: ["https://your-domain.com/og-sports.jpg"],
  },
};

const SportsPage = () => {
  return <CategoryPage slug="sports" />;
};

export default SportsPage;