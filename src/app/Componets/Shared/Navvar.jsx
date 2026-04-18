"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navvar = () => {
  const pathname = usePathname();
  const [currentDate, setCurrentDate] = useState("");
  const [showFirstText, setShowFirstText] = useState(true);

  // 🌤 Weather states
  const [weather, setWeather] = useState({
    temp: null,
    loading: true,
    error: false,
  });

  // ১. টেক্সট এনিমেশন (৩ সেকেন্ড পর পর)
  useEffect(() => {
    const interval = setInterval(() => {
      setShowFirstText((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // ২. বাংলা তারিখ সেট করা
  useEffect(() => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    setCurrentDate(new Date().toLocaleDateString("bn-BD", options));
  }, []);

  // ৩. আবহাওয়া তথ্য সংগ্রহ
  useEffect(() => {
    const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;
    const fetchWeather = async () => {
      try {
        // সরাসরি ঝালকাঠির জন্য কল
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Jhalokati&units=metric&appid=${API_KEY}`,
        );
        const data = await res.json();

        if (res.ok && data.main) {
          setWeather({
            temp: Math.round(data.main.temp),
            loading: false,
            error: false,
          });
        } else {
          throw new Error("Failed");
        }
      } catch (err) {
        setWeather((prev) => ({ ...prev, loading: false, error: true }));
      }
    };
    fetchWeather();
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
      <div className="container mx-auto px-4 py-5 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo Section */}
        <div className="text-left shrink-0">
          <Link href="/">
            <h1 className="text-4xl md:text-5xl font-bold text-red-600 hover:opacity-90 transition-opacity tracking-tight">
              দৈনিক ঝালকাঠি
            </h1>
          </Link>
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-roboto mt-1 pl-1">
            The Daily Jhalokathi
          </p>
        </div>

        {/* Animated News/Contact Center */}
        {/* Animated News/Contact Center */}
        <div className="flex-1 flex justify-center h-10 items-center relative overflow-hidden">
          <div
            className={`absolute transition-all duration-700 ease-in-out transform ${
              showFirstText
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <Link
              href="/contact"
              className="text-xl md:text-2xl font-black text-red-600 hover:text-red-700 transition-all inline-block animate-bounce"
            >
              যোগাযোগ করুন
            </Link>
          </div>

          <div
            className={`absolute transition-all duration-700 ease-in-out transform ${
              !showFirstText
                ? "translate-y-0 opacity-100"
                : "-translate-y-10 opacity-0"
            }`}
          >
            <Link
              href="/contact"
              className="text-xl md:text-2xl font-black text-red-600 hover:text-red-700 transition-all inline-block animate-bounce"
            >
              বিজ্ঞাপন দিতে যোগাযোগ করুন
            </Link>
          </div>
        </div>

        {/* Date & Dynamic Weather Section */}
        {/* Date & Dynamic Weather Section */}
        <div className="text-right text-[11px] md:text-[12px] text-gray-500 border-l border-gray-200 pl-4 hidden md:block">
          {/* তারিখ */}
          <p className="font-normal text-gray-400 mb-0.5">{currentDate}</p>

          {/* ওয়েদার */}
          <div className="flex justify-end items-center gap-1.5">
            {weather.loading ? (
              <span className="loading loading-spinner w-3 h-3 text-gray-300"></span>
            ) : weather.error ? (
              <span className="text-gray-400">Jhalokathi</span>
            ) : (
              <div className="flex items-center gap-1 text-gray-400 italic">
                <span className="text-yellow-500/80 text-sm">☀️</span>
                <span className="font-roboto tracking-tight">
                  {weather.temp}°C,
                </span>
                <span>Jhalokathi</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Categories Navigation */}
      <nav className="bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4 overflow-x-auto no-scrollbar">
          <ul className="flex items-center justify-start whitespace-nowrap min-h-[45px] gap-2">
            {categories.map((cat) => {
              const active = pathname === `/category/${cat.slug}`;
              return (
                <li key={cat.slug} className="relative">
                  <Link
                    href={`/category/${cat.slug}`}
                    className={`px-4 py-3 text-[15px] font-semibold inline-block transition-all duration-200 ${
                      active
                        ? "text-red-600"
                        : "text-gray-600 hover:text-red-600"
                    }`}
                  >
                    {cat.name}
                  </Link>
                  {active && (
                    <div className="absolute bottom-0 left-0 w-full h-[3px] bg-red-600 rounded-t-sm" />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navvar;
