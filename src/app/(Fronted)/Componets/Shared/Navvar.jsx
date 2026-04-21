"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import config from "../../data/config.json";
import { fetchUserProfile, logoutUser } from "@/app/(Backend)/lib/auth";

const Navvar = () => {
  const pathname = usePathname();
  const redirectpage = useRouter();
  const [showFirstText, setShowFirstText] = useState(true);

  // Auth States
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const modalRef = useRef(null);

  // ইউজার ডাটা চেক
  useEffect(() => {
    const getAuth = async () => {
      setLoading(true);
      try {
        const data = await fetchUserProfile();
        if (data?.success) setUser(data.result);
        else setUser(null);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    getAuth();
  }, [pathname]);

  // মোডালের বাইরে ক্লিক করলে বন্ধ
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target))
        setShowModal(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Logout Logic
  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logoutUser();
      setUser(null);
      setShowModal(false);
      toast.success("✅ সফলভাবে লগআউট হয়েছেন!");
      redirectpage.push("/login");
    } catch {
      toast.error("❌ লগআউট করতে সমস্যা হয়েছে");
    } finally {
      setLoggingOut(false);
    }
  };

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
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Jhalokati&units=metric&appid=${API_KEY}`);
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

  // --- ইমেজ লজিক ফিক্স (অবজেক্ট এবং স্ট্রিং হ্যান্ডেল করার জন্য) ---
  const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
  
  // চেক করা হচ্ছে image অবজেক্টের ভেতর secure_url আছে কি না, নাহলে সরাসরি স্ট্রিং কি না
  const avatarSrc = user?.image?.secure_url || (typeof user?.image === "string" ? user.image : defaultAvatar);

  return (
    <header className="w-full bg-white font-banglafont border-b border-gray-200 shadow-sm sticky top-0 z-50">
      
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-3 py-1.5 flex items-center justify-between gap-2">
          
          <p className="text-[11px] sm:text-[12px] text-gray-500 leading-tight">{currentDate}</p>

          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1 text-[11px] sm:text-[12px] text-gray-500">
              {weather.loading ? (
                <span className="text-gray-400 text-[10px]">লোড...</span>
              ) : !weather.error ? (
                <><span>☀️</span><span className="font-medium">{weather.temp}°C</span></>
              ) : null}
            </div>

            <div className="w-px h-5 bg-gray-300" />

            <div className="relative min-w-[40px] flex justify-end" ref={modalRef}>
              {loading ? (
                <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse border-2 border-gray-100" />
              ) : user ? (
                <>
                  <button onClick={() => setShowModal((v) => !v)} className="relative focus:outline-none">
                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-red-600 shadow-sm transition-transform active:scale-95">
                      <Image 
                        src={avatarSrc} 
                        alt="User" 
                        width={32} 
                        height={32} 
                        className="object-cover" 
                        unoptimized={true} // ফ্ল্যাটআইকন বা ক্লাউডিনারি এরর এড়াতে unoptimized রাখা ভালো
                      />
                    </div>
                  </button>

                  {showModal && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-[200] overflow-hidden py-1 animate-in fade-in zoom-in duration-150">
                      <div className="px-4 py-2 border-b border-gray-50">
                        <p className="text-[12px] font-bold text-gray-800 truncate">{user.name}</p>
                        <p className="text-[10px] text-gray-500 truncate">{user.email}</p>
                      </div>
                      
                      {user.role === "admin" && (
                        <Link href="/dashboard" onClick={() => setShowModal(false)} className="flex items-center gap-2 px-4 py-2 text-[13px] font-semibold text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors">
                          📊 ড্যাশবোর্ড
                        </Link>
                      )}
                      
                      <Link href="/profile" onClick={() => setShowModal(false)} className="flex items-center gap-2 px-4 py-2 text-[13px] font-semibold text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors">
                        👤 প্রোফাইল
                      </Link>

                      <div className="h-px bg-gray-100 my-1 mx-2" />
                      
                      <button onClick={handleLogout} disabled={loggingOut} className="flex items-center gap-2 w-full px-4 py-2 text-[13px] font-semibold text-red-600 hover:bg-red-50 transition-colors">
                         {loggingOut ? "..." : "🚪 লগআউট"}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Link href="/login" className="inline-flex items-center gap-1 text-[11px] sm:text-[13px] font-medium px-3 py-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-all">
                  লগইন
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Logo + Animated Text */}
      <div className="container mx-auto px-3 py-3 flex items-center justify-between gap-3">
        <div className="shrink-0">
          <Link href="/"><h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-red-600 tracking-tight leading-none">{config.site_name_bangla}</h1></Link>
          <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-gray-400 font-roboto mt-0.5">{config.site_name_english}</p>
        </div>

        <div className="flex-1 flex justify-center h-10 items-center relative overflow-hidden">
          <div className={`absolute w-full text-center transition-all duration-700 ${showFirstText ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
            <Link href="/contact" className="text-sm sm:text-xl md:text-2xl font-black text-red-600">{config.Advertisement.main_title}</Link>
          </div>
          <div className={`absolute w-full text-center transition-all duration-700 ${!showFirstText ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"}`}>
            <Link href="/contact" className="text-[12px] sm:text-xl md:text-2xl font-black text-red-600">{config.Advertisement.sub_title}</Link>
          </div>
        </div>
      </div>

      {/* Row 3: Category Nav */}
      <nav className="bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-3 overflow-x-auto no-scrollbar">
          <ul className="flex items-center whitespace-nowrap min-h-[42px]">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link href={`/category/${cat.slug}`} className={`px-3 sm:px-4 py-2.5 text-[13px] sm:text-[15px] font-semibold inline-block transition-colors ${pathname === `/category/${cat.slug}` ? "text-red-600 border-b-2 border-red-600" : "text-gray-600 hover:text-red-600"}`}>
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