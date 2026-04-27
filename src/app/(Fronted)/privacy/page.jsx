import React from 'react';
import Privacypage from '../Componets/AllPages/Privacypage';

export const metadata = {
  title: "গোপনীয়তা নীতি | Privacy Policy | The Daily News",

  description:
    "The Daily News এর গোপনীয়তা নীতি সম্পর্কে জানুন। আমরা কীভাবে আপনার তথ্য সংগ্রহ, ব্যবহার এবং সুরক্ষা করি তা বিস্তারিতভাবে জানানো হয়েছে। Learn how we collect, use and protect your data.",

  keywords: [
    "privacy policy",
    "গোপনীয়তা নীতি",
    "data protection",
    "user privacy",
    "The Daily News privacy",
    "information security",
    "cookies policy",
  ],

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: "https://the-daily-jhalokathi.vercel.app/privacy",

    title: "গোপনীয়তা নীতি | Privacy Policy | The Daily News",

    description:
      "The Daily News কীভাবে আপনার ব্যক্তিগত তথ্য সুরক্ষিত রাখে তা জানুন।",

    images: [
      {
        url: "https://i.ibb.co.com/tpbdRHtr/Home.png",
        width: 1200,
        height: 630,
        alt: "Privacy Policy - The Daily News",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "গোপনীয়তা নীতি | Privacy Policy | The Daily News",
    description:
      "Learn about our privacy practices and data protection policy.",
    images: ["https://i.ibb.co.com/tpbdRHtr/Home.png"],
  },
};

const Privacy = () => {
  return (
    <div>
      <Privacypage/>
    </div>
  );
};

export default Privacy;