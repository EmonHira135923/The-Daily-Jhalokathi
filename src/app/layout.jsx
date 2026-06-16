import { Hind_Siliguri, Roboto } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import Footer from "./(Fronted)/Componets/Shared/Footer";
import Header from "./(Fronted)/Componets/Shared/Header";
import AuthProvider from "./(Fronted)/Componets/Provider/AuthProvider";

// Font
const roboto = Roboto({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

const banglafont = Hind_Siliguri({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["bengali"],
  variable: "--font-banglafont",
});

// Category
const categories = [
  { name: "অপরাধ", slug: "crime" },
  { name: "বাণিজ্য", slug: "business" },
  { name: "জাতীয়", slug: "national" },
  { name: "আন্তর্জাতিক", slug: "international" },
  { name: "রাজনীতি", slug: "politics" },
  { name: "অর্থনীতি", slug: "economics" },
  { name: "খেলাধুলা", slug: "sports" },
  { name: "বিনোদন", slug: "entertainment" },
  { name: "শিক্ষা", slug: "education" },
  { name: "স্বাস্থ্য", slug: "health" },
  { name: "মতামত", slug: "opinion" },
];

// SEO keywords
const categoryKeywords = categories.flatMap((c) => [
  c.name, // Bangla
  c.slug, // English slug
  `${c.name} সংবাদ`, // Bangla SEO
  `${c.name} news`, // English SEO
]);

// metadata
export const metadata = {
  metadataBase: new URL("https://the-daily-jhalokathi.vercel.app"),

  title: {
    default: "দ্য ডেইলি নিউজ | The Daily News - সর্বশেষ সংবাদ",
    template: "%s | The Daily News",
  },

  description:
    "দ্য ডেইলি নিউজ একটি নির্ভরযোগ্য অনলাইন নিউজ পোর্টাল যেখানে বাংলাদেশ ও বিশ্বজুড়ে রাজনীতি, অর্থনীতি, খেলাধুলা, বিনোদন, শিক্ষা, স্বাস্থ্যসহ সকল গুরুত্বপূর্ণ খবর পাওয়া যায়।",

  keywords: [
    // Brand
    "দ্য ডেইলি নিউজ",
    "The Daily News",
    "বাংলাদেশ সংবাদ",
    "Bangladesh news",
    "breaking news",
    "সর্বশেষ খবর",
    "latest news",

    // Portal
    "news portal",
    "online news",
    "news website",
    "daily news update",

    // Categories (BN + EN mix)
    ...categoryKeywords,
  ],

  authors: [{ name: "The Daily News Editorial Team" }],
  creator: "The Daily News",
  publisher: "The Daily News",

  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: "https://the-daily-jhalokathi.vercel.app",
    siteName: "The Daily News",
    title: "দ্য ডেইলি নিউজ | The Daily News",
    description:
      "বাংলাদেশ ও বিশ্বের সর্বশেষ খবর, ব্রেকিং নিউজ, রাজনীতি, খেলাধুলা, অর্থনীতি ও বিনোদনের আপডেট একসাথে পান।",

    images: [
      {
        url: "https://i.ibb.co.com/tpbdRHtr/Home.png",
        width: 1200,
        height: 630,
        alt: "The Daily News",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "দ্য ডেইলি নিউজ | The Daily News",
    description:
      "Latest breaking news from Bangladesh & world in Bangla and English.",
    images: ["https://i.ibb.co.com/tpbdRHtr/Home.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  category: "news",
};

// =====================
// Root Layout
// =====================
export default function RootLayout({ children }) {
  return (
    <html
      lang="bn"
      data-theme="lightnews"
      className={`${banglafont.variable} ${roboto.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <ToastContainer />
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
