import React from "react";

export const metadata = {
  title: "বাণিজ্য | Business | The Daily News",

  description:
    "The Daily News এর বাণিজ্য বিভাগে বাংলাদেশের ব্যবসা, কোম্পানি খবর, স্টার্টআপ, ব্যাংকিং, বিনিয়োগ, এবং বৈশ্বিক বাণিজ্যিক আপডেট পড়ুন। Get latest business news, company updates, startup trends and market insights.",

  keywords: [
    "বাণিজ্য",
    "business",
    "business news",
    "company news",
    "ব্যবসা",
    "startup",
    "investments",
    "বিনিয়োগ",
    "banking news",
    "The Daily News business",
  ],

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: "https://your-domain.com/business",

    title: "বাণিজ্য | Business | The Daily News",

    description:
      "বাংলাদেশ ও বিশ্বের ব্যবসা, কোম্পানি, স্টার্টআপ এবং বিনিয়োগ সম্পর্কিত সর্বশেষ খবর The Daily News এ পড়ুন।",

    images: [
      {
        url: "https://your-domain.com/og-business.jpg",
        width: 1200,
        height: 630,
        alt: "Business News - The Daily News",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "বাণিজ্য | Business | The Daily News",
    description:
      "Latest business news, startups, banking and investment updates.",
    images: ["https://your-domain.com/og-business.jpg"],
  },
};

const BusinessPage = () => {
  return (
    <div>
      <h1>বাণিজ্য | Business Page</h1>
    </div>
  );
};

export default BusinessPage;