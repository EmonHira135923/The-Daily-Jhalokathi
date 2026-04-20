"use client";
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navvar = () => {
  const pathname = usePathname();
  const [showFirstText, setShowFirstText] = useState(true);

  const currentDate = useMemo(() => {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    return new Date().toLocaleDateString("bn-BD", options);
  }, []);

  const [weather, setWeather] = useState({ temp: null, loading: true, error: false });

  useEffect(() => {
    const interval = setInterval(() => setShowFirstText((prev) => !prev), 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Jhalokati&units=metric&appid=${API_KEY}`
        );
        const data = await res.json();
        if (res.ok && data.main) {
          setWeather({ temp: Math.round(data.main.temp), loading: false, error: false });
        } else throw new Error("Failed");
      } catch {
        setWeather((prev) => ({ ...prev, loading: false, error: true }));
      }
    };
    if (API_KEY) fetchWeather();
  }, []);

  const categories = [
    { name: "জাতীয়", slug: "national" },
    { name: "আন্তর্জাতিক", slug: "international" },
    { name: "রাজনীতি", slug: "politics" },
    { name: "বাণিজ্য", slug: "business" },
    { name: "অর্থনীতি", slug: "economics" },
    { name: "স্বাস্থ্য", slug: "health" },
    { name: "শিক্ষা", slug: "education" },
    { name: "অপরাধ", slug: "crime" },
    { name: "খেলাধুলা", slug: "sports" },
    { name: "বিনোদন", slug: "entertainment" },
    { name: "মতামত", slug: "opinion" },
  ];

  return (
    <header className="w-full bg-white font-banglafont border-b border-gray-200 shadow-sm sticky top-0 z-50">

      {/* ── Row 1: Date + Weather + Login — ALL screen sizes ── */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-3 py-1.5 flex items-center justify-between gap-2">

          {/* Date */}
          <p className="text-[11px] sm:text-[12px] text-gray-500 leading-tight">
            {currentDate}
          </p>

          {/* Weather + Login */}
          <div className="flex items-center gap-2 shrink-0">

            {/* Weather */}
            <div className="flex items-center gap-1 text-[11px] sm:text-[12px] text-gray-500">
              {weather.loading ? (
                <span className="text-gray-400 text-[10px]">লোড...</span>
              ) : !weather.error ? (
                <>
                  <span>☀️</span>
                  <span className="font-medium">{weather.temp}°C</span>
                </>
              ) : null}
            </div>

            <div className="w-px h-5 bg-gray-300" />

            {/* Login */}
            <Link
              href="/login"
              className="inline-flex items-center gap-1 text-[11px] sm:text-[13px] font-medium px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors whitespace-nowrap"
            >
              <svg
                className="w-3 h-3 sm:w-3.5 sm:h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              লগইন
            </Link>
          </div>
        </div>
      </div>

      {/* ── Row 2: Logo + Animated Text — ALL screen sizes ── */}
      <div className="container mx-auto px-3 py-3 flex items-center justify-between gap-3">

        {/* Logo */}
        <div className="shrink-0">
          <Link href="/">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-red-600 tracking-tight leading-none">
              দৈনিক ঝালকাঠি
            </h1>
          </Link>
          <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-gray-400 font-roboto mt-0.5 pl-0.5">
            The Daily Jhalokathi
          </p>
        </div>

        {/* Animated contact text — ALL screen sizes */}
        <div className="flex-1 flex justify-center h-10 items-center relative overflow-hidden">
          <div
            className={`absolute w-full text-center transition-all duration-700 ease-in-out transform ${
              showFirstText ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <Link
              href="/contact"
              className="text-sm sm:text-xl md:text-2xl font-black text-red-600"
            >
              যোগাযোগ করুন
            </Link>
          </div>
          <div
            className={`absolute w-full text-center transition-all duration-700 ease-in-out transform ${
              !showFirstText ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
            }`}
          >
            <Link
              href="/contact"
              className="text-[12px] sm:text-xl md:text-2xl font-black text-red-600"
            >
              বিজ্ঞাপন দিতে যোগাযোগ করুন
            </Link>
          </div>
        </div>

      </div>

      {/* ── Row 3: Category Nav — horizontal scroll, ALL screen sizes ── */}
      <nav className="bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-3 overflow-x-auto no-scrollbar">
          <ul className="flex items-center whitespace-nowrap min-h-[42px] gap-0">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/category/${cat.slug}`}
                  className={`px-3 sm:px-4 py-2.5 text-[13px] sm:text-[15px] font-semibold inline-block transition-colors ${
                    pathname === `/category/${cat.slug}`
                      ? "text-red-600 border-b-2 border-red-600"
                      : "text-gray-600 hover:text-red-600"
                  }`}
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

    </header>
  );
};

export default Navvar;
