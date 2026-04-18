import React from "react";

export const metadata = {
  title: "স্বাস্থ্য | Health | The Daily News",

  description:
    "The Daily News এর স্বাস্থ্য বিভাগে স্বাস্থ্য টিপস, রোগ প্রতিরোধ, চিকিৎসা তথ্য, লাইফস্টাইল, ডাক্তারদের পরামর্শ এবং মেডিকেল আপডেট পড়ুন। Get latest health news, medical tips, fitness and wellness updates.",

  keywords: [
    "স্বাস্থ্য",
    "health",
    "medical news",
    "health tips",
    "স্বাস্থ্য টিপস",
    "fitness",
    "wellness",
    "রোগ প্রতিরোধ",
    "The Daily News health",
    "medical updates",
  ],

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: "https://your-domain.com/health",

    title: "স্বাস্থ্য | Health | The Daily News",

    description:
      "স্বাস্থ্য টিপস, চিকিৎসা তথ্য, ফিটনেস এবং লাইফস্টাইল আপডেট The Daily News এ পড়ুন। Latest health and medical news updates.",

    images: [
      {
        url: "https://your-domain.com/og-health.jpg",
        width: 1200,
        height: 630,
        alt: "Health News - The Daily News",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "স্বাস্থ্য | Health | The Daily News",
    description:
      "Latest health tips, medical news and wellness updates.",
    images: ["https://your-domain.com/og-health.jpg"],
  },
};

const Healthpage = () => {
  return (
    <div>
      <h1>স্বাস্থ্য | Health Page</h1>
    </div>
  );
};

export default Healthpage;