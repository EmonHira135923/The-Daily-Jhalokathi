import CategoryPage from "@/app/Componets/AllPages/CategoryPage";
import React from "react";

export const metadata = {
  title: "মতামত | Opinion | The Daily News",

  description:
    "The Daily News এর মতামত বিভাগে বিশেষজ্ঞদের বিশ্লেষণ, সম্পাদকীয়, সামাজিক ইস্যু, রাজনীতি ও অর্থনীতি নিয়ে গভীর আলোচনা ও মতামত পড়ুন। Read expert opinions, editorials and analysis on current affairs, politics, economy and society.",

  keywords: [
    "মতামত",
    "opinion",
    "editorial",
    "analysis",
    "expert opinion",
    "সম্পাদকীয়",
    "social opinion",
    "রাজনৈতিক বিশ্লেষণ",
    "The Daily News opinion",
    "opinion news",
  ],

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: "https://your-domain.com/opinion",

    title: "মতামত | Opinion | The Daily News",

    description:
      "বিশেষজ্ঞদের মতামত, সম্পাদকীয় ও সামাজিক ও রাজনৈতিক বিশ্লেষণ The Daily News এ পড়ুন। Expert opinions and editorial analysis.",

    images: [
      {
        url: "https://your-domain.com/og-opinion.jpg",
        width: 1200,
        height: 630,
        alt: "Opinion - The Daily News",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "মতামত | Opinion | The Daily News",
    description:
      "Expert opinions, editorials and deep analysis on current affairs.",
    images: ["https://your-domain.com/og-opinion.jpg"],
  },
};

const OpinionPage = () => {
  return <CategoryPage slug="opinion" />;
};

export default OpinionPage;