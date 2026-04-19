import React from "react";
import HomeNewsGrid from "./(Fronted)/Componets/AllPages/HomeNewsGrid";

export const metadata = {
  title: "দ্য ডেইলি নিউজ | The Daily News - সর্বশেষ সংবাদ",

  description:
    "দ্য ডেইলি নিউজ একটি আধুনিক নিউজ পোর্টাল যেখানে আপনি বাংলাদেশ ও বিশ্বের সর্বশেষ খবর, ব্রেকিং নিউজ, রাজনীতি, অর্থনীতি, খেলাধুলা, বিনোদন ও আরও অনেক কিছু পাবেন।",

  keywords: [
    "দ্য ডেইলি নিউজ",
    "The Daily News",
    "বাংলাদেশ সংবাদ",
    "Bangladesh news",
    "latest news",
    "breaking news",
    "news portal",
    "অনলাইন নিউজ",
    "daily news",
    "world news",
  ],

  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: "https://your-domain.com",

    title: "দ্য ডেইলি নিউজ | The Daily News",

    description:
      "বাংলাদেশ ও বিশ্বের সর্বশেষ সংবাদ, ব্রেকিং নিউজ, রাজনীতি, খেলাধুলা, অর্থনীতি ও বিনোদনের আপডেট একসাথে পান।",

    images: [
      {
        url: "https://your-domain.com/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "The Daily News Home",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "দ্য ডেইলি নিউজ | The Daily News",
    description:
      "Get latest breaking news from Bangladesh & world in Bangla and English.",
    images: ["https://your-domain.com/og-home.jpg"],
  },
};

const Home = () => {
  return (
    <div>
      <HomeNewsGrid />
    </div>
  );
};

export default Home;