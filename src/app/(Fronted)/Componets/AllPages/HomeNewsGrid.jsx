"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { categories, getCategoryName } from "@/app/(Backend)/lib/newsData";

// ১. ক্যাটাগরি কালার ম্যাপ (আগের মতোই থাকছে)
const categoryColors = {
  national: {
    bg: "bg-red-600",
    text: "text-white",
    border: "border-red-600",
    light: "bg-red-50 text-red-700 border-red-200",
  },
  international: {
    bg: "bg-green-600",
    text: "text-white",
    border: "border-green-600",
    light: "bg-green-50 text-green-700 border-green-200",
  },
  politics: {
    bg: "bg-orange-500",
    text: "text-white",
    border: "border-orange-500",
    light: "bg-orange-50 text-orange-700 border-orange-200",
  },
  business: {
    bg: "bg-blue-600",
    text: "text-white",
    border: "border-blue-600",
    light: "bg-blue-50 text-blue-700 border-blue-200",
  },
  economics: {
    bg: "bg-cyan-600",
    text: "text-white",
    border: "border-cyan-600",
    light: "bg-cyan-50 text-cyan-700 border-cyan-200",
  },
  health: {
    bg: "bg-teal-600",
    text: "text-white",
    border: "border-teal-600",
    light: "bg-teal-50 text-teal-700 border-teal-200",
  },
  education: {
    bg: "bg-indigo-600",
    text: "text-white",
    border: "border-indigo-600",
    light: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  crime: {
    bg: "bg-rose-700",
    text: "text-white",
    border: "border-rose-700",
    light: "bg-rose-50 text-rose-700 border-rose-200",
  },
  sports: {
    bg: "bg-yellow-500",
    text: "text-white",
    border: "border-yellow-500",
    light: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
  entertainment: {
    bg: "bg-pink-500",
    text: "text-white",
    border: "border-pink-500",
    light: "bg-pink-50 text-pink-700 border-pink-200",
  },
  opinion: {
    bg: "bg-purple-600",
    text: "text-white",
    border: "border-purple-600",
    light: "bg-purple-50 text-purple-700 border-purple-200",
  },
};

const ITEMS_PER_PAGE = 12;

// --- ছোট হেল্পার কম্পোনেন্ট (Badge & Icon) ---
const Badge = ({ slug, size = "sm" }) => {
  const color = categoryColors[slug] ?? categoryColors.national;
  const base =
    size === "sm"
      ? `text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-widest`
      : `text-[11px] font-bold px-2.5 py-0.5 rounded-sm uppercase tracking-widest`;
  return (
    <span className={`inline-block ${color.bg} ${color.text} ${base}`}>
      {getCategoryName(slug)}
    </span>
  );
};

const LightBadge = ({ slug }) => {
  const color = categoryColors[slug] ?? categoryColors.national;
  return (
    <span
      className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-widest border ${color.light}`}
    >
      {getCategoryName(slug)}
    </span>
  );
};

const ClockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-3 h-3"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z"
    />
  </svg>
);

const HomeNewsGrid = () => {
  const [newsData, setNewsData] = useState([]);
  const [breakingNews, setBreakingNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  // ২. এপিআই থেকে ডাটা নিয়ে আসা (All News + Breaking News)
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [newsRes, breakingRes] = await Promise.all([
          fetch("/api/AllNews"),
          fetch("/api/breakingnews"),
        ]);

        const newsJson = await newsRes.json();
        const breakingJson = await breakingRes.json();

        if (newsJson.success) setNewsData(newsJson.data);
        if (breakingJson.success) setBreakingNews(breakingJson.data);
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  // ৩. লজিক: ক্যাটাগরি ফিল্টারিং
  const filteredCategoryNews =
    activeCategory === "all"
      ? newsData
      : newsData.filter((n) => n.slug === activeCategory);

  // ৪. লজিক: হিরো সেকশনের জন্য ফিচারড এবং সাইড নিউজ আলাদা করা
  const featuredItem = filteredCategoryNews.find(
    (n) => n.featured === true || n.featured === "true",
  );

  // সাইড আইটেম: যেগুলো featured না এবং side: true হিসেবে মার্ক করা
  const sideItems = filteredCategoryNews
    .filter((n) => n.side && n.id !== featuredItem?.id)
    .slice(0, 3);

  // গ্রিড আইটেম: ফিচারড এবং সাইড বাদে বাকি সব
  const gridItems = filteredCategoryNews.filter(
    (n) => n.id !== featuredItem?.id && !sideItems.find((s) => s.id === n.id),
  );

  // ৫. পেজিনেশন লজিক
  const pageCount = Math.ceil(gridItems.length / ITEMS_PER_PAGE) || 1;
  const visibleGrid = gridItems.slice(0, currentPage * ITEMS_PER_PAGE);
  const hasMore = currentPage < pageCount;

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setCurrentPage((prev) => prev + 1);
      setLoadingMore(false);
    }, 500);
  };

  if (loading)
    return <div className="text-center py-20 font-bangla">লোডিং হচ্ছে...</div>;

  return (
    <main className="max-w-7xl mx-auto px-4 py-6 font-sans">
      {/* --- ডাইনামিক ব্রেকিং নিউজ মারকিউ (Improved) --- */}
      {breakingNews.length > 0 && (
        <div className="flex items-stretch border border-gray-200 rounded-lg overflow-hidden mb-8 bg-white shadow-sm ring-1 ring-black/5">
          {/* ব্রেকিং লেবেল এবং পালস এনিমেশন */}
          <div className="bg-red-600 flex items-center px-4 shrink-0 gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span className="text-white text-[11px] font-black uppercase tracking-[0.15em] whitespace-nowrap">
              ব্রেকিং
            </span>
          </div>

          {/* ডিভাইডার লাইন */}
          <div className="w-[1.5px] bg-red-400 shrink-0 opacity-50" />

          {/* মারকিউ কন্টেন্ট এরিয়া */}
          <div className="flex-1 overflow-hidden py-3 px-4 bg-red-50/20">
            <marquee
              behavior="scroll"
              direction="left"
              scrollamount="7"
              className="text-sm font-bold text-gray-800"
              onMouseOver={(e) => e.currentTarget.stop()} // মাউস রাখলে থেমে যাবে
              onMouseOut={(e) => e.currentTarget.start()} // মাউস সরালে আবার চলবে
            >
              {breakingNews.map((item) => (
                <span key={item.id} className="mr-16 inline-flex items-center">
                  <span className="text-red-600 font-black italic mr-3 select-none">
                    #UPDATE:
                  </span>
                  <span className="hover:text-red-600 transition-colors cursor-default">
                    {item.title}
                  </span>
                </span>
              ))}
            </marquee>
          </div>
        </div>
      )}

      {/* --- হিরো গ্রিড (Featured + Side Stack) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 mb-10">
        {featuredItem ? (
          <Link
            href={`/news/${featuredItem.id}`}
            className="lg:col-span-3 relative rounded-xl overflow-hidden cursor-pointer group block min-h-[300px]"
          >
            <Image
              src={featuredItem.image}
              alt={featuredItem.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <Badge slug={featuredItem.slug} size="md" />
              <h2 className="text-white text-xl md:text-3xl font-bold leading-tight mt-3 mb-3 group-hover:text-red-400 transition-colors">
                {featuredItem.title}
              </h2>
              <p className="text-white/70 text-sm line-clamp-2 mb-4 max-w-2xl font-light">
                {featuredItem.description}
              </p>
              <div className="flex items-center gap-2 text-white/50 text-xs border-t border-white/10 pt-3">
                <ClockIcon />
                <span>{featuredItem.time || featuredItem.date}</span>
              </div>
            </div>
          </Link>
        ) : (
          <div className="lg:col-span-3 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 italic">
            কোনো ফিচারড নিউজ নেই
          </div>
        )}

        {/* Side Stack */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          {sideItems.length > 0 ? (
            sideItems.map((news) => (
              <Link
                key={news.id}
                href={`/news/${news.id}`}
                className="flex gap-4 border border-gray-100 rounded-lg p-3 hover:border-gray-300 transition-all bg-white group flex-1 shadow-xs"
              >
                <div className="relative w-28 h-20 shrink-0 rounded-md overflow-hidden bg-gray-50">
                  <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col justify-between py-0.5">
                  <div>
                    <LightBadge slug={news.slug} />
                    <p className="text-[14px] font-bold leading-snug text-gray-900 line-clamp-2 group-hover:text-red-600 transition-colors mt-1.5">
                      {news.title}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-medium">
                    <ClockIcon />
                    <span>{news.time || news.date}</span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-10 text-gray-300 border border-dashed rounded-lg">
              কোনো পার্শ্ব সংবাদ নেই
            </div>
          )}
        </div>
      </div>

      {/* --- ক্যাটাগরি ফিল্টার ট্যাব --- */}
      <div className="flex items-center gap-2 flex-wrap mb-8 pb-4 border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <button
          onClick={() => setActiveCategory("all")}
          className={`text-xs font-bold px-4 py-2 rounded-full border transition-all ${
            activeCategory === "all"
              ? "bg-gray-900 text-white border-gray-900 shadow-md"
              : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
          }`}
        >
          সব খবর
        </button>
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setActiveCategory(cat.slug)}
            className={`text-xs font-bold px-4 py-2 rounded-full border transition-all ${
              activeCategory === cat.slug
                ? `${categoryColors[cat.slug].bg} text-white border-transparent shadow-md`
                : `bg-white border-gray-200 hover:border-gray-400 text-gray-600`
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* --- মেইন নিউজ গ্রিড --- */}
      {filteredCategoryNews.length === 0 ? (
        <div className="text-center py-20 text-gray-400 font-medium border-2 border-dashed rounded-2xl">
          এই বিভাগে আপাতত কোনো খবর পাওয়া যায়নি।
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleGrid.map((item) => (
            <Link
              key={item.id}
              href={`/news/${item.id}`}
              className="border border-gray-100 rounded-2xl overflow-hidden hover:border-gray-300 hover:shadow-xl hover:-translate-y-1 transition-all bg-white group block"
            >
              <div className="relative w-full h-40 overflow-hidden bg-gray-50">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-3 left-3">
                  <Badge slug={item.slug} />
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-[15px] font-bold text-gray-900 line-clamp-2 group-hover:text-red-600 transition-colors leading-relaxed">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs text-gray-500 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-gray-50 pt-3">
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-medium">
                    <ClockIcon />
                    <span>{item.time || item.date}</span>
                  </div>
                  <span className="text-[11px] font-bold text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    আরও পড়ুন →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* --- লোড মোর বাটন --- */}
      {hasMore && (
        <div className="flex justify-center mt-12">
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="group relative flex items-center gap-2 px-8 py-3 bg-gray-900 text-white font-bold rounded-full hover:bg-red-600 transition-all duration-300 shadow-lg disabled:opacity-50"
          >
            {loadingMore ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                লোডিং...
              </span>
            ) : (
              "আরও খবর দেখুন"
            )}
          </button>
        </div>
      )}
    </main>
  );
};

export default HomeNewsGrid;
