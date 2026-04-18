import CategoryPage from "@/app/Componets/AllPages/CategoryPage";
import React from "react";

export const metadata = {
  title: "রাজনীতি | Politics | The Daily News",

  description:
    "The Daily News এর রাজনীতি বিভাগে বাংলাদেশ ও বিশ্বের রাজনৈতিক খবর, নির্বাচন আপডেট, সরকারী সিদ্ধান্ত, দলীয় খবর এবং বিশ্লেষণ পড়ুন। Get latest political news, election updates, government policies and analysis.",

  keywords: [
    "রাজনীতি",
    "politics",
    "political news",
    "Bangladesh politics",
    "নির্বাচন",
    "election news",
    "সরকার",
    "government news",
    "The Daily News politics",
    "রাজনৈতিক খবর",
  ],

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: "https://your-domain.com/politics",

    title: "রাজনীতি | Politics | The Daily News",

    description:
      "বাংলাদেশ ও বিশ্বের রাজনৈতিক খবর, নির্বাচন আপডেট এবং সরকারি সিদ্ধান্তের সর্বশেষ সংবাদ The Daily News এ পড়ুন।",

    images: [
      {
        url: "https://your-domain.com/og-politics.jpg",
        width: 1200,
        height: 630,
        alt: "Politics News - The Daily News",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "রাজনীতি | Politics | The Daily News",
    description:
      "Latest political news, election updates and government policies.",
    images: ["https://your-domain.com/og-politics.jpg"],
  },
};

const PoliticsPage = () => {
  return <CategoryPage slug="politics" />;
};

export default PoliticsPage;