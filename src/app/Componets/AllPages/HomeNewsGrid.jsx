"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { categories, getCategoryName, newsItems } from "@/lib/newsData";

// ─── Category color map ───────────────────────────────────────────────────────
const categoryColors = {
  national:      { bg: "bg-red-600",     text: "text-white",  border: "border-red-600",     light: "bg-red-50 text-red-700 border-red-200"   },
  international: { bg: "bg-green-600",   text: "text-white",  border: "border-green-600",   light: "bg-green-50 text-green-700 border-green-200" },
  politics:      { bg: "bg-orange-500",  text: "text-white",  border: "border-orange-500",  light: "bg-orange-50 text-orange-700 border-orange-200" },
  business:      { bg: "bg-blue-600",    text: "text-white",  border: "border-blue-600",    light: "bg-blue-50 text-blue-700 border-blue-200"   },
  economics:     { bg: "bg-cyan-600",    text: "text-white",  border: "border-cyan-600",    light: "bg-cyan-50 text-cyan-700 border-cyan-200"   },
  health:        { bg: "bg-teal-600",    text: "text-white",  border: "border-teal-600",    light: "bg-teal-50 text-teal-700 border-teal-200"   },
  education:     { bg: "bg-indigo-600",  text: "text-white",  border: "border-indigo-600",  light: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  crime:         { bg: "bg-rose-700",    text: "text-white",  border: "border-rose-700",    light: "bg-rose-50 text-rose-700 border-rose-200"   },
  sports:        { bg: "bg-yellow-500",  text: "text-white",  border: "border-yellow-500",  light: "bg-yellow-50 text-yellow-700 border-yellow-200" },
  entertainment: { bg: "bg-pink-500",    text: "text-white",  border: "border-pink-500",    light: "bg-pink-50 text-pink-700 border-pink-200"   },
  opinion:       { bg: "bg-purple-600",  text: "text-white",  border: "border-purple-600",  light: "bg-purple-50 text-purple-700 border-purple-200" },
};

const breakingNewsItems = [
  "ঢাকায় আইনশৃঙ্খলা পরিস্থিতি নিয়ে বিশেষ বৈঠক ডেকেছে স্বরাষ্ট্র মন্ত্রণালয়",
  "সারাদেশে ডেঙ্গু পরিস্থিতি উদ্বেগজনক, হাসপাতালে ভর্তি বাড়ছে",
  "পদ্মা সেতুতে টোল আদায় নতুন রেকর্ড, একদিনে ৫ কোটি টাকা",
  "জাতীয় সংসদে বিশেষ অধিবেশন আহ্বান, আলোচনায় বাজেট সংশোধন",
  "দেশের রিজার্ভ পরিস্থিতি উন্নতির দিকে, বলছে বাংলাদেশ ব্যাংক",
];

const ITEMS_PER_PAGE = 12;

const featuredItem = newsItems.find((n) => n.featured);
const sideItems = newsItems.filter((n) => n.side);
const gridItems = newsItems.filter((n) => !n.featured && !n.side);

// Badge component
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

// Light badge (for grid cards)
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

// Section header with colored left border
const SectionHeader = ({ slug, name }) => {
  const color = categoryColors[slug] ?? categoryColors.national;
  return (
    <div className={`flex items-center gap-3 mb-4 pb-2 border-b-2 ${color.border}`}>
      <span className={`${color.bg} ${color.text} text-sm font-bold px-3 py-1 rounded-sm tracking-wide`}>
        {name}
      </span>
      <div className="flex-1 h-px bg-gray-100" />
    </div>
  );
};

// Clock icon
const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
  </svg>
);

// ─── Main Component ──────────────────────────────────────────────────────────
const HomeNewsGrid = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredGrid =
    activeCategory === "all"
      ? gridItems
      : gridItems.filter((n) => n.slug === activeCategory);

  const pageCount = Math.ceil(filteredGrid.length / ITEMS_PER_PAGE) || 1;
  const visibleGrid = filteredGrid.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const hasMore = currentPage < pageCount;

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setCurrentPage((page) => Math.min(page + 1, pageCount));
      setLoadingMore(false);
    }, 600);
  };

  const handleCategoryChange = (slug) => {
    setActiveCategory(slug);
    setCurrentPage(1);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-6 font-sans">

      {/* ── Breaking News Marquee ── */}
      <div className="flex items-stretch border border-gray-200 rounded-lg overflow-hidden mb-6 bg-white">
        <div className="bg-red-600 flex items-center px-4 shrink-0">
          <span className="text-white text-[11px] font-bold uppercase tracking-widest whitespace-nowrap">
            ব্রেকিং
          </span>
        </div>
        <div className="w-px bg-red-400 shrink-0" />
        <div className="flex-1 overflow-hidden py-2.5 px-3">
          <marquee behavior="scroll" direction="left" scrollamount="5" className="text-sm font-medium text-gray-800">
            {breakingNewsItems.map((item, i) => (
              <span key={i} className="mr-12">
                <span className="text-red-600 mr-2">▶</span>
                {item}
              </span>
            ))}
          </marquee>
        </div>
      </div>

      {/* ── Hero Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 mb-10">
        {/* Featured Big Card */}
        {featuredItem && (
          <Link
            href={`/news/${featuredItem.id}`}
            className="lg:col-span-3 relative rounded-xl overflow-hidden cursor-pointer group block"
          >
            <div className="relative w-full h-100">
              <Image
                src={featuredItem.image}
                alt={featuredItem.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <Badge slug={featuredItem.slug} />
              <h2 className="text-white text-xl md:text-2xl font-bold leading-snug mt-2 mb-3">
                {featuredItem.title}
              </h2>
              <p className="text-white/65 text-sm leading-relaxed line-clamp-2 mb-4">
                {featuredItem.description}
              </p>
              <div className="flex items-center gap-2 text-white/50 text-xs border-t border-white/15 pt-3">
                <ClockIcon />
                <span>{featuredItem.time}</span>
              </div>
            </div>
          </Link>
        )}

        {/* Side Stack */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          {sideItems.map((news) => (
            <Link
              key={news.id}
              href={`/news/${news.id}`}
              className="flex gap-3 border border-gray-200 rounded-lg p-3 hover:border-gray-400 transition-colors bg-white group flex-1"
            >
              <div className="relative w-24 h-17.5 shrink-0 rounded-md overflow-hidden bg-gray-100">
                <Image
                  src={news.image}
                  alt={news.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="96px"
                />
              </div>
              <div className="flex flex-col justify-between min-w-0">
                <div>
                  <LightBadge slug={news.slug} />
                  <p className="text-[13px] font-semibold leading-snug text-gray-900 line-clamp-2 group-hover:text-red-600 transition-colors mt-1">
                    {news.title}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-[10.5px] text-gray-400">
                  <ClockIcon />
                  <span>{news.time}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Category Filter Tabs ── */}
      <div className="flex items-center gap-2 flex-wrap mb-6 pb-4 border-b border-gray-200">
        <button
          onClick={() => handleCategoryChange("all")}
          className={`text-xs font-bold px-3 py-1.5 rounded-md border transition-all ${
            activeCategory === "all"
              ? "bg-gray-900 text-white border-gray-900"
              : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
          }`}
        >
          সব খবর
        </button>
        {categories.map((cat) => {
          const color = categoryColors[cat.slug];
          const isActive = activeCategory === cat.slug;
          return (
            <button
              key={cat.slug}
              onClick={() => handleCategoryChange(cat.slug)}
              className={`text-xs font-bold px-3 py-1.5 rounded-md border transition-all ${
                isActive
                  ? `${color.bg} ${color.text} border-transparent`
                  : `bg-white border-gray-200 hover:border-gray-400 text-gray-600`
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* ── News Grid ── */}
      {visibleGrid.length === 0 ? (
        <div className="text-center py-16 text-gray-400 text-sm">
          এই বিভাগে কোনো খবর নেই
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {visibleGrid.map((item) => (
            <Link
              key={item.id}
              href={`/news/${item.id}`}
              className="border border-gray-200 rounded-xl overflow-hidden hover:border-gray-400 hover:-translate-y-0.5 transition-all bg-white group block"
            >
              <div className="relative w-full h-28 overflow-hidden bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-3">
                <LightBadge slug={item.slug} />
                <p className="text-[13px] font-semibold leading-tight text-gray-900 line-clamp-2 mt-2 mb-2 group-hover:text-gray-600 transition-colors">
                  {item.title}
                </p>
                <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
                  <ClockIcon />
                  <span>{item.time}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {hasMore && (
        <div className="text-center mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="inline-flex items-center gap-2 text-sm text-gray-600 border border-gray-300 px-8 py-2.5 rounded-lg hover:bg-gray-50 hover:border-gray-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loadingMore ? (
              <>
                <svg className="animate-spin h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                লোড হচ্ছে...
              </>
            ) : (
              `আরও খবর দেখুন`
            )}
          </button>
        </div>
      )}

      {!hasMore && filteredGrid.length > ITEMS_PER_PAGE && (
        <div className="text-center mt-8 pt-5 border-t border-gray-200">
          <p className="text-xs text-gray-400">সব খবর দেখানো হয়েছে</p>
        </div>
      )}

    </main>
  );
};

export default HomeNewsGrid;