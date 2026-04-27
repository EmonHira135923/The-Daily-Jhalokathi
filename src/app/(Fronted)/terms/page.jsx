import React from 'react';
import Termpage from '../Componets/AllPages/Termpage';

export const metadata = {
  title: "শর্তাবলী | Terms & Conditions | The Daily News",

  description:
    "The Daily News এর শর্তাবলী সম্পর্কে জানুন। আমাদের ওয়েবসাইট ব্যবহারের নিয়ম, শর্ত এবং নীতিমালা বিস্তারিতভাবে তুলে ধরা হয়েছে। Read our terms and conditions for using the website.",

  keywords: [
    "terms and conditions",
    "শর্তাবলী",
    "website terms",
    "user agreement",
    "The Daily News terms",
    "legal policy",
    "terms of service",
  ],

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: "https://the-daily-jhalokathi.vercel.app/terms",

    title: "শর্তাবলী | Terms & Conditions | The Daily News",

    description:
      "The Daily News এর ওয়েবসাইট ব্যবহারের শর্তাবলী ও নীতিমালা সম্পর্কে জানুন।",

    images: [
      {
        url: "https://i.ibb.co.com/tpbdRHtr/Home.png",
        width: 1200,
        height: 630,
        alt: "Terms & Conditions - The Daily News",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "শর্তাবলী | Terms & Conditions | The Daily News",
    description:
      "Read our terms and conditions and user agreement.",
    images: ["https://i.ibb.co.com/tpbdRHtr/Home.png"],
  },
};

const Terms = () => {
  return (
    <div>
      <Termpage/>
    </div>
  );
};

export default Terms;