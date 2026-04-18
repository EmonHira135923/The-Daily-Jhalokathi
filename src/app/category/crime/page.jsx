import CategoryPage from "@/app/Componets/AllPages/CategoryPage";
import React from "react";

export const metadata = {
  title: "অপরাধ | Crime | The Daily News",

  description:
    "The Daily News এর অপরাধ বিভাগে বাংলাদেশ ও বিশ্বের অপরাধ সংবাদ, পুলিশ রিপোর্ট, মামলা-মোকদ্দমা, তদন্ত ও নিরাপত্তা সংক্রান্ত সর্বশেষ খবর পড়ুন। Get latest crime news, police reports, investigation updates and legal cases.",

  keywords: [
    "অপরাধ",
    "crime",
    "crime news",
    "police report",
    "মামলা",
    "investigation",
    "আইন শৃঙ্খলা",
    "law and order",
    "The Daily News crime",
    "criminal news",
  ],

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: "https://your-domain.com/crime",

    title: "অপরাধ | Crime | The Daily News",

    description:
      "বাংলাদেশ ও বিশ্বের অপরাধ সংবাদ, পুলিশ রিপোর্ট, তদন্ত ও আইন-শৃঙ্খলা সংক্রান্ত সর্বশেষ খবর The Daily News এ পড়ুন।",

    images: [
      {
        url: "https://your-domain.com/og-crime.jpg",
        width: 1200,
        height: 630,
        alt: "Crime News - The Daily News",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "অপরাধ | Crime | The Daily News",
    description:
      "Latest crime news, police reports and investigation updates.",
    images: ["https://your-domain.com/og-crime.jpg"],
  },
};

const CrimePage = () => {
  return <CategoryPage slug="crime" />;
};

export default CrimePage;