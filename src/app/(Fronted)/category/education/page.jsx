import CategoryPage from "../../Componets/AllPages/CategoryPage";
import React from "react";

export const metadata = {
  title: "শিক্ষা | Education | The Daily News",

  description:
    "The Daily News এর শিক্ষা বিভাগে পরীক্ষার ফলাফল, ভর্তি তথ্য, চাকরির খবর, শিক্ষা টিপস, স্কলারশিপ এবং একাডেমিক আপডেট পড়ুন। Get latest education news, exam results, admission updates and career tips.",

  keywords: [
    "শিক্ষা",
    "education",
    "exam results",
    "ভর্তি তথ্য",
    "admission",
    "স্কলারশিপ",
    "scholarship",
    "চাকরির খবর",
    "career",
    "The Daily News education",
    "student news",
  ],

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: "https://your-domain.com/education",

    title: "শিক্ষা | Education | The Daily News",

    description:
      "পরীক্ষার ফলাফল, ভর্তি তথ্য, চাকরির খবর এবং শিক্ষা সম্পর্কিত সকল আপডেট The Daily News এ পড়ুন। Latest education news and updates.",

    images: [
      {
        url: "https://your-domain.com/og-education.jpg",
        width: 1200,
        height: 630,
        alt: "Education News - The Daily News",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "শিক্ষা | Education | The Daily News",
    description:
      "Latest education news, exam results, admission and career updates.",
    images: ["https://your-domain.com/og-education.jpg"],
  },
};

const EducationPage = () => {
  return <CategoryPage slug="education" />;
};

export default EducationPage;