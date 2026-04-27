import React from 'react';
import Advertisementpage from '../Componets/AllPages/Advertisementpage';

export const metadata = {
  title: "বিজ্ঞাপন | Advertisement | The Daily News",

  description:
    "The Daily News এ বিজ্ঞাপন দিন এবং আপনার ব্যবসাকে আরও এগিয়ে নিন। আমাদের মাধ্যমে আপনার ব্র্যান্ডকে লক্ষ লক্ষ পাঠকের কাছে পৌঁছে দিন। Advertise with us to grow your business and reach a wider audience.",

  keywords: [
    "advertisement",
    "ads",
    "The Daily News ads",
    "বিজ্ঞাপন",
    "advertise বাংলাদেশ",
    "news advertisement",
    "online ads",
    "business promotion",
  ],

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: "https://the-daily-jhalokathi.vercel.app/ads",

    title: "বিজ্ঞাপন | Advertisement | The Daily News",

    description:
      "The Daily News এ বিজ্ঞাপন দিয়ে আপনার ব্যবসাকে নতুন উচ্চতায় নিয়ে যান।",

    images: [
      {
        url: "https://i.ibb.co.com/tpbdRHtr/Home.png",
        width: 1200,
        height: 630,
        alt: "Advertisement - The Daily News",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "বিজ্ঞাপন | Advertisement | The Daily News",
    description:
      "Advertise with The Daily News and grow your business.",
    images: ["https://i.ibb.co.com/tpbdRHtr/Home.png"],
  },
};

const Advertisement = () => {
  return (
    <div>
      <Advertisementpage/>
    </div>
  );
};

export default Advertisement;