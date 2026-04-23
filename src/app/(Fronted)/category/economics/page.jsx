import CategoryPage from "../../Componets/AllPages/CategoryPage";
import React from "react";

export const metadata = {
  title: "অর্থনীতি | Economics | The Daily News",

  description:
    "The Daily News এর অর্থনীতি বিভাগে বাংলাদেশের অর্থনীতি, ব্যাংকিং, শেয়ার বাজার, ব্যবসা-বাণিজ্য, মুদ্রাস্ফীতি এবং বৈশ্বিক অর্থনৈতিক খবর পড়ুন। Get latest economics news, finance updates, stock market and business trends.",

  keywords: [
    "অর্থনীতি",
    "economics",
    "business news",
    "finance",
    "stock market",
    "শেয়ার বাজার",
    "ব্যবসা",
    "banking",
    "The Daily News economics",
    "financial news",
  ],

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: "https://the-daily-jhalokathi.vercel.app/economics",

    title: "অর্থনীতি | Economics | The Daily News",

    description:
      "বাংলাদেশ ও বিশ্বের অর্থনীতি, ব্যাংকিং, শেয়ার বাজার ও ব্যবসার সর্বশেষ খবর The Daily News এ পড়ুন। Latest economic and financial news updates.",

    images: [
      {
        url: "https://i.ibb.co.com/tpbdRHtr/Home.png",
        width: 1200,
        height: 630,
        alt: "Economics News - The Daily News",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "অর্থনীতি | Economics | The Daily News",
    description:
      "Latest economics, finance, stock market and business news updates.",
    images: ["https://i.ibb.co.com/tpbdRHtr/Home.png"],
  },
};

const EconomicsPage = () => {
  return <CategoryPage slug="economics" />;
};

export default EconomicsPage;