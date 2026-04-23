import CategoryPage from "../../Componets/AllPages/CategoryPage";
import React from "react";

export const metadata = {
  title: "জাতীয় | National | The Daily News",

  description:
    "The Daily News এর জাতীয় বিভাগে বাংলাদেশ সরকারের সিদ্ধান্ত, উন্নয়ন প্রকল্প, প্রশাসনিক খবর, আইন-শৃঙ্খলা এবং দেশের গুরুত্বপূর্ণ আপডেট পড়ুন। Get latest national news, government updates and Bangladesh development news.",

  keywords: [
    "জাতীয়",
    "national",
    "Bangladesh news",
    "সরকারি খবর",
    "government news",
    "বাংলাদেশ সংবাদ",
    "national news Bangladesh",
    "দেশের খবর",
    "The Daily News national",
    "development news",
  ],

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: "https://the-daily-jhalokathi.vercel.app/national",

    title: "জাতীয় | National | The Daily News",

    description:
      "বাংলাদেশের জাতীয় খবর, সরকারি সিদ্ধান্ত, উন্নয়ন প্রকল্প ও প্রশাসনিক আপডেট The Daily News এ পড়ুন।",

    images: [
      {
        url: "https://i.ibb.co.com/tpbdRHtr/Home.png",
        width: 1200,
        height: 630,
        alt: "National News - The Daily News",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "জাতীয় | National | The Daily News",
    description:
      "Latest Bangladesh national news, government updates and development news.",
    images: ["https://i.ibb.co.com/tpbdRHtr/Home.png"],
  },
};


const NationalPage = () => {
  return <CategoryPage slug="national" />;
};

export default NationalPage;