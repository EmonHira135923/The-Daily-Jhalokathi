import React from 'react';
import Aboutpage from '../Componets/AllPages/Aboutpage';

export const metadata = {
  title: "আমাদের সম্পর্কে | About | The Daily News",

  description:
    "The Daily News সম্পর্কে জানুন। আমাদের লক্ষ্য, ভিশন এবং নির্ভরযোগ্য সংবাদ পরিবেশনের প্রতিশ্রুতি সম্পর্কে বিস্তারিত জানুন। Learn about our mission, vision and commitment to trusted news.",

  keywords: [
    "about",
    "about us",
    "The Daily News about",
    "আমাদের সম্পর্কে",
    "news portal",
    "mission vision",
    "বাংলাদেশ নিউজ",
  ],

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: "https://the-daily-jhalokathi.vercel.app/about",

    title: "আমাদের সম্পর্কে | About | The Daily News",

    description:
      "The Daily News এর লক্ষ্য, ভিশন এবং নির্ভরযোগ্য সংবাদ পরিবেশনের অঙ্গীকার সম্পর্কে জানুন।",

    images: [
      {
        url: "https://i.ibb.co.com/tpbdRHtr/Home.png",
        width: 1200,
        height: 630,
        alt: "About The Daily News",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "আমাদের সম্পর্কে | About | The Daily News",
    description:
      "Learn about The Daily News mission, vision and trusted journalism.",
    images: ["https://i.ibb.co.com/tpbdRHtr/Home.png"],
  },
};

const About = () => {
  return (
    <div>
      <Aboutpage/>
    </div>
  );
};

export default About;