"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navvar = () => {
  const pathname = usePathname();
  const [currentDate, setCurrentDate] = useState("");
  const [showFirstText, setShowFirstText] = useState(true);

  const [weather, setWeather] = useState({
    temp: null,
    loading: true,
    error: false,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setShowFirstText((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    setCurrentDate(new Date().toLocaleDateString("bn-BD", options));
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
        } else {
          throw new Error("Failed");
        }
      } catch (err) {
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
    <header className="w-full bg-white font-banglafont border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">

        {/* Logo Section */}
        <div className="text-left shrink-0">
          <Link href="/">
            <h1 className="text-4xl md:text-5xl font-bold text-red-600 tracking-tight">
              দৈনিক ঝালকাঠি
            </h1>
          </Link>
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-roboto mt-1 pl-1">
            The Daily Jhalokathi
          </p>
        </div>

        {/* Animated News/Contact Center */}
        <div className="flex-1 flex justify-center h-10 items-center relative overflow-hidden">
          <div
            className={`absolute transition-all duration-700 ease-in-out transform ${
              showFirstText ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <Link
              href="/contact"
              className="text-xl md:text-2xl font-black text-red-600 animate-bounce"
            >
              যোগাযোগ করুন
            </Link>
          </div>
          <div
            className={`absolute transition-all duration-700 ease-in-out transform ${
              !showFirstText ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
            }`}
          >
            <Link
              href="/contact"
              className="text-xl md:text-2xl font-black text-red-600 animate-bounce"
            >
              বিজ্ঞাপন দিতে যোগাযোগ করুন
            </Link>
          </div>
        </div>

        {/* Right Section: Date + Weather + Login — all perfectly aligned */}
        <div className="hidden md:flex items-center gap-3 border-l border-gray-200 pl-5 shrink-0">

          {/* Date */}
          <p className="text-[12px] text-gray-400 leading-tight">{currentDate}</p>

          {/* Divider */}
          <div className="w-px h-8 bg-gray-200"></div>

          {/* Weather */}
          <div className="flex items-center gap-1 text-[12px] text-gray-500">
            {weather.loading ? (
              <span className="loading loading-spinner w-3 h-3"></span>
            ) : (
              <>
                <span>☀️</span>
                <span>{weather.temp}°C</span>
              </>
            )}
          </div>

          {/* Divider */}
          <div className="w-px h-8 bg-gray-200"></div>

          {/* Login Button */}
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors whitespace-nowrap"
          >
            <svg
              className="w-3.5 h-3.5"
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

      {/* Navigation */}
      <nav className="bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4 overflow-x-auto no-scrollbar">
          <ul className="flex items-center justify-start whitespace-nowrap min-h-[45px] gap-2">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/category/${cat.slug}`}
                  className={`px-4 py-3 text-[15px] font-semibold inline-block ${
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