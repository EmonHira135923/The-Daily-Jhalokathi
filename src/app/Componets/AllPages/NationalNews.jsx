"use client";

import Image from "next/image";
import React, { useState } from "react";

const ITEMS_PER_PAGE = 8;

const allNewsItems = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=700&q=70",
    title: "ঝালকাঠিতে 'শাহী মহল'-এ সন্ত্রাসী হামলা, দশ লক্ষ টাকা চাঁদাবাজি ও পুলিশকে বিভ্রান্ত করার অভিযোগ — নেপথ্যে পারিবারিক ব্যবসায়িক বিরোধ",
    author: "নিজস্ব প্রতিবেদক",
    date: "৬ দিন আগে",
    featured: true,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=70",
    title: "নড়াইলে তিন মাস বয়সী শিশু খুন, মা আটক",
    author: "নিজস্ব প্রতিবেদক",
    date: "০৯ এপ্রিল ২০২৪",
    side: true,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400&q=70",
    title: "নারায়ণগঞ্জে তিন বাড়িতে ডাকাতি, স্বর্ণালংকার-টাকার সঙ্গে লুট হয়েছে কাপড়",
    author: "নিজস্ব প্রতিবেদক",
    date: "০৮ এপ্রিল ২০২৪",
    side: true,
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=70",
    title: "ভাণ্ডারিয়ায় বিয়ের প্রলোভন দেখিয়ে গৃহবধূকে ধর্ষণ",
    author: "নিজস্ব প্রতিবেদক",
    date: "০৭ এপ্রিল ২০২৪",
    side: true,
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1634157703702-3c124b455499?w=300&q=65",
    title: "রাজধানীতে জাল নোটসহ তিন কারবারি গ্রেফতার, বিপুল পরিমাণ সরঞ্জাম উদ্ধার",
    author: "স্টাফ রিপোর্টার",
    date: "০৬ এপ্রিল ২০২৪",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&q=65",
    title: "বগুড়ায় আধিপত্য বিস্তার নিয়ে দুই গ্রুপের সংঘর্ষে আহত ৫",
    author: "নিজস্ব প্রতিবেদক",
    date: "০৫ এপ্রিল ২০২৪",
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1605792657660-596af9009e82?w=300&q=65",
    title: "সিলেটে সীমান্ত দিয়ে পাচারকালে বিপুল পরিমাণ চিনি জব্দ",
    author: "নিজস্ব প্রতিবেদক",
    date: "০৪ এপ্রিল ২০২৪",
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1601933973783-43cf8a7d4c5f?w=300&q=65",
    title: "মাদারীপুরে তুচ্ছ ঘটনায় কৃষককে পিটিয়ে হত্যার অভিযোগ",
    author: "নিজস্ব প্রতিবেদক",
    date: "০৩ এপ্রিল ২০২৪",
  },
  {
    id: 9,
    image: "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=300&q=65",
    title: "চট্টগ্রাম বন্দরে মিথ্যা ঘোষণায় পণ্য আমদানি, কাস্টমসের অভিযান",
    author: "স্টাফ রিপোর্টার",
    date: "০২ এপ্রিল ২০২৪",
  },
  {
    id: 10,
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&q=65",
    title: "সাভারে কিশোর গ্যাংয়ের দুই সদস্য দেশীয় অস্ত্রসহ আটক",
    author: "নিজস্ব প্রতিবেদক",
    date: "০১ এপ্রিল ২০২৪",
  },
  {
    id: 11,
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=300&q=65",
    title: "রংপুরে জুয়ার আসর থেকে ১০ জনকে গ্রেফতার করেছে পুলিশ",
    author: "নিজস্ব প্রতিবেদক",
    date: "৩১ মার্চ ২০২৪",
  },
  {
    id: 12,
    image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=300&q=65",
    title: "খুলনায় মাদকবিরোধী অভিযানে ৫ কেজি গাঁজাসহ কারবারি আটক",
    author: "নিজস্ব প্রতিবেদক",
    date: "৩০ মার্চ ২০২৪",
  },
  {
    id: 13,
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&q=65",
    title: "ময়মনসিংহে বাসচাপায় মোটরসাইকেল আরোহী নিহত, আহত ২",
    author: "নিজস্ব প্রতিবেদক",
    date: "২৯ মার্চ ২০২৪",
  },
  {
    id: 14,
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=300&q=65",
    title: "কুমিল্লায় অবৈধ গ্যাস সংযোগ বিচ্ছিন্নে তিতাসের অভিযান, জরিমানা আদায়",
    author: "স্টাফ রিপোর্টার",
    date: "২৮ মার্চ ২০২৪",
  },
  {
    id: 15,
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=300&q=65",
    title: "ফরিদপুরে নদী থেকে অজ্ঞাত যুবকের মরদেহ উদ্ধার, পরিচয় অনুসন্ধান চলছে",
    author: "নিজস্ব প্রতিবেদক",
    date: "২৭ মার্চ ২০২৪",
  },
  {
    id: 16,
    image: "https://images.unsplash.com/photo-1588421357574-87938a86fa28?w=300&q=65",
    title: "গাজীপুরে পোশাক কারখানায় অগ্নিকাণ্ড, কোটি টাকার ক্ষতি",
    author: "নিজস্ব প্রতিবেদক",
    date: "২৬ মার্চ ২০২৪",
  },
];

const breakingNewsItems = [
  "ঢাকায় আইনশৃঙ্খলা পরিস্থিতি নিয়ে বিশেষ বৈঠক ডেকেছে স্বরাষ্ট্র মন্ত্রণালয়",
  "সারাদেশে ডেঙ্গু পরিস্থিতি উদ্বেগজনক, হাসপাতালে ভর্তি বাড়ছে",
  "পদ্মা সেতুতে টোল আদায় নতুন রেকর্ড, একদিনে ৫ কোটি টাকা",
  "জাতীয় সংসদে বিশেষ অধিবেশন আহ্বান, আলোচনায় বাজেট সংশোধন",
  "দেশের রিজার্ভ পরিস্থিতি উন্নতির দিকে, বলছে বাংলাদেশ ব্যাংক",
];

const featuredItem = allNewsItems.find((n) => n.featured);
const sideItems = allNewsItems.filter((n) => n.side);
const gridItems = allNewsItems.filter((n) => !n.featured && !n.side);

const NationalNews = () => {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [loading, setLoading] = useState(false);

  const visibleGridItems = gridItems.slice(0, visibleCount);
  const hasMore = visibleCount < gridItems.length;

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
      setLoading(false);
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 font-sans">

      {/* Section Header */}
      <div className="flex items-center gap-3 mb-5 pb-2 border-b-2 border-red-600">
        <span className="bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-sm tracking-wide">
          জাতীয়
        </span>
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs text-gray-400">শনিবার, ১৮ এপ্রিল ২০২৫</span>
      </div>

      {/* Breaking News Marquee */}
      <div className="flex items-stretch gap-0 border border-gray-200 rounded-lg overflow-hidden mb-6 bg-white">
        {/* Label */}
        <div className="bg-red-600 flex items-center px-4 shrink-0">
          <span className="text-white text-[11px] font-bold uppercase tracking-widest whitespace-nowrap">
            ব্রেকিং
          </span>
        </div>

        {/* Divider */}
        <div className="w-px bg-red-400 shrink-0" />

        {/* Marquee */}
        <div className="flex-1 overflow-hidden py-2.5 px-3">
          <marquee
            behavior="scroll"
            direction="left"
            scrollamount="5"
            className="text-sm font-medium text-gray-800"
          >
            {breakingNewsItems.map((item, i) => (
              <span key={i} className="mr-12">
                <span className="text-red-600 mr-2">▶</span>
                {item}
              </span>
            ))}
          </marquee>
        </div>
      </div>

      {/* Featured + Side Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 mb-8">

        {/* Hero Featured Card */}
        {featuredItem && (
          <div className="lg:col-span-3 relative rounded-xl overflow-hidden cursor-pointer group">
            <div className="relative w-full h-72">
              <Image
                src={featuredItem.image}
                alt={featuredItem.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <span className="inline-block bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-widest mb-2">
                শীর্ষ খবর
              </span>
              <h2 className="text-white text-[17px] font-bold leading-snug mb-2">
                {featuredItem.title}
              </h2>
              <div className="flex items-center gap-2 text-white/60 text-xs">
                <span>{featuredItem.author}</span>
                <span>•</span>
                <span>{featuredItem.date}</span>
              </div>
            </div>
          </div>
        )}

        {/* Side Stack */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          {sideItems.map((item) => (
            <div
              key={item.id}
              className="flex gap-3 border border-gray-200 rounded-lg p-3 cursor-pointer hover:border-gray-400 transition-colors bg-white"
            >
              <div className="relative w-24 h-[70px] shrink-0 rounded-md overflow-hidden bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
              <div className="flex flex-col justify-between min-w-0">
                <p className="text-[13px] font-semibold leading-snug text-gray-900 line-clamp-3">
                  {item.title}
                </p>
                <div className="flex items-center gap-1.5 text-[10.5px] text-gray-400 mt-1">
                  <span>{item.author}</span>
                  <span>•</span>
                  <span>{item.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Divider + Label */}
      <div className="border-t border-gray-200 mb-5 pt-4">
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-4">
          আরও খবর
        </p>

        {/* Grid Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {visibleGridItems.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:border-gray-400 hover:-translate-y-0.5 transition-all bg-white group"
            >
              <div className="relative w-full h-32 overflow-hidden bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
              <div className="p-3">
                <p className="text-[13px] font-semibold leading-snug text-gray-900 line-clamp-3 mb-2">
                  {item.title}
                </p>
                <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
                  <span>{item.author}</span>
                  <span>•</span>
                  <span>{item.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center mt-8 pt-5 border-t border-gray-200">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="inline-flex items-center gap-2 text-sm text-gray-600 border border-gray-300 px-7 py-2.5 rounded-lg hover:bg-gray-50 hover:border-gray-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                লোড হচ্ছে...
              </>
            ) : (
              `আরও খবর দেখুন (${gridItems.length - visibleCount} টি বাকি)`
            )}
          </button>
        </div>
      )}

      {/* All loaded message */}
      {!hasMore && gridItems.length > ITEMS_PER_PAGE && (
        <div className="text-center mt-8 pt-5 border-t border-gray-200">
          <p className="text-xs text-gray-400">সব খবর দেখানো হয়েছে</p>
        </div>
      )}

    </div>
  );
};

export default NationalNews;