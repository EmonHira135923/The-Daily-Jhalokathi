import React from "react";
import AuthPage from "../Componets/AllPages/AuthPage";

export const metadata = {
  title: "লগইন | Login | The Daily News",

  description:
    "The Daily News এ নিরাপদে লগইন করুন এবং ব্যক্তিগত ড্যাশবোর্ড, সেটিংস ও কাস্টম নিউজ ফিচার ব্যবহার করুন। Secure login to The Daily News admin and user dashboard.",

  keywords: [
    "লগইন",
    "login",
    "sign in",
    "The Daily News login",
    "নিউজ পোর্টাল লগইন",
    "news portal login",
    "admin login",
    "ইউজার ড্যাশবোর্ড",
    "user dashboard",
  ],

  robots: {
    index: false,
    follow: false,
  },

  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: "https://your-domain.com/login",

    title: "লগইন | Login | The Daily News",

    description:
      "The Daily News এ নিরাপদে লগইন করুন এবং আপনার ব্যক্তিগত নিউজ ড্যাশবোর্ড ব্যবহার করুন। Secure login for users and admin dashboard.",

    images: [
      {
        url: "https://your-domain.com/og-login.jpg",
        width: 1200,
        height: 630,
        alt: "The Daily News Login Page",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "লগইন | Login | The Daily News",
    description:
      "Secure login page for The Daily News users and admin dashboard.",
    images: ["https://your-domain.com/og-login.jpg"],
  },
};

const Loginpage = () => {
  return (
    <div>
      <AuthPage/>
    </div>
  );
};

export default Loginpage;