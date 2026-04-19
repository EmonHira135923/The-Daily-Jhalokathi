import React from "react";
import ContactPage from "../Componets/AllPages/ContactPage";

export const metadata = {
  title: "যোগাযোগ | Contact | The Daily News",

  description:
    "The Daily News এর সাথে যোগাযোগ করুন। আমাদের খবর, রিপোর্ট, বিজ্ঞাপন বা যেকোনো সহায়তার জন্য আমাদের Contact পেজ ব্যবহার করুন। Contact The Daily News for news, support, or business inquiries.",

  keywords: [
    "যোগাযোগ",
    "contact",
    "The Daily News contact",
    "contact page",
    "news contact",
    "support",
    "advertisement",
    "সহায়তা",
    "customer support",
    "যোগাযোগ করুন",
  ],

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: "https://your-domain.com/contact",

    title: "যোগাযোগ | Contact | The Daily News",

    description:
      "The Daily News এর সাথে যোগাযোগ করুন যেকোনো খবর, বিজ্ঞাপন বা সহায়তার জন্য। Contact us for support and inquiries.",

    images: [
      {
        url: "https://your-domain.com/og-contact.jpg",
        width: 1200,
        height: 630,
        alt: "Contact The Daily News",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "যোগাযোগ | Contact | The Daily News",
    description:
      "Contact The Daily News for news tips, support, and business inquiries.",
    images: ["https://your-domain.com/og-contact.jpg"],
  },
};

const Contactpage = () => {
  return (
    <div>
      <ContactPage/>
    </div>
  );
};

export default Contactpage;