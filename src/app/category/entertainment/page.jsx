import React from "react";

export const metadata = {
  title: "বিনোদন | Entertainment | The Daily News",

  description:
    "The Daily News এর বিনোদন বিভাগে সিনেমা, নাটক, গান, সেলিব্রিটি খবর, শোবিজ আপডেট এবং বিনোদন জগতের সব নতুন খবর পড়ুন। Get latest entertainment news, celebrity updates, movies, drama and music updates.",

  keywords: [
    "বিনোদন",
    "entertainment",
    "movies",
    "drama",
    "music",
    "সিনেমা",
    "নাটক",
    "সেলিব্রিটি",
    "celebrity news",
    "The Daily News entertainment",
  ],

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: "https://your-domain.com/entertainment",

    title: "বিনোদন | Entertainment | The Daily News",

    description:
      "সিনেমা, নাটক, গান, এবং সেলিব্রিটি খবরের সর্বশেষ আপডেট The Daily News এ পড়ুন। Latest entertainment news and celebrity updates.",

    images: [
      {
        url: "https://your-domain.com/og-entertainment.jpg",
        width: 1200,
        height: 630,
        alt: "Entertainment News - The Daily News",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "বিনোদন | Entertainment | The Daily News",
    description:
      "Latest movies, drama, music and celebrity entertainment news.",
    images: ["https://your-domain.com/og-entertainment.jpg"],
  },
};

const Entertainment = () => {
  return (
    <div>
      <h1>বিনোদন | Entertainment</h1>
    </div>
  );
};

export default Entertainment;