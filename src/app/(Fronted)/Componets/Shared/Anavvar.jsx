"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { fetchUserProfile, logoutUser } from "@/app/(Backend)/lib/auth";

const PAGE_TITLES = {
  "/dashboard": "ড্যাশবোর্ড",
  "/dashboard/news": "সব খবর",
  "/dashboard/news/create": "নতুন খবর",
  "/dashboard/category": "ক্যাটাগরি",
  "/dashboard/users": "সদস্যগণ",
  "/dashboard/comments": "মন্তব্য",
  "/dashboard/settings": "সেটিংস",
  "/dashboard/profile": "প্রোফাইল",
};

const Anavvar = () => {
  const pathname = usePathname();
  const redirectpage = useRouter();
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const dropdownRef = useRef(null);

  const pageTitle = PAGE_TITLES[pathname] || "ড্যাশবোর্ড";

  // Auth ডাটা ফেচিং
  useEffect(() => {
    const getAuth = async () => {
      const data = await fetchUserProfile();
      if (data?.success) setUser(data.result);
    };
    getAuth();
  }, [pathname]);

  // বাইরে ক্লিক করলে ড্রপডাউন বন্ধ করা
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setShowDropdown(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logoutUser();
      setUser(null);
      setShowDropdown(false);
      toast.success("✅ সফলভাবে লগআউট হয়েছেন!");
      redirectpage.push("/login");
    } catch {
      toast.error("❌ লগআউট করতে সমস্যা হয়েছে");
    } finally {
      setLoggingOut(false);
    }
  };

  const avatarSrc =
    user?.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  return (
    <div className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-100 sticky top-0 z-50 font-banglafont">
      {/* Left: Page Title */}
      <div>
        <h2 className="text-[15px] font-bold text-black">{pageTitle}</h2>
        <p className="text-[11px] text-gray-400 leading-none mt-0.5">
          {new Date().toLocaleDateString("bn-BD", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {/* Search & Notification (আগের মতোই থাকবে) */}
        <div className="hidden sm:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
          <input
            type="text"
            placeholder="খুঁজুন..."
            className="text-[12px] bg-transparent outline-none text-black w-24 md:w-32"
          />
        </div>

        {/* Divider */}
        <div className="w-px h-7 bg-gray-200" />

        {/* User Avatar + Dropdown (Navvar এর মতো স্টাইল) */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown((v) => !v)}
            className="relative focus:outline-none block"
          >
            {/* ── লাল গোল বর্ডার (Circle) ── */}
            {/* বর্ডারটি ইমেজের চেয়ে বড় করার জন্য এখানে h-11 w-11 এবং p-0.5 ব্যবহার করা হয়েছে */}
            <div className="h-11 w-11 rounded-full border-2 border-red-600 p-0.5 flex items-center justify-center shadow-inner hover:opacity-95 active:scale-95 transition-all">
              {/* ── ইমেজ ── */}
              {/* ইমেজটি বর্ডারের ভেতর h-full w-full আকারে গোল হয়ে বসে যাবে */}
              <div className="relative h-full w-full rounded-full overflow-hidden">
                <Image
                  src={avatarSrc}
                  alt={user?.name || "User"}
                  fill
                  className="object-cover"
                  sizes="40px"
                  unoptimized={avatarSrc.includes("flaticon")}
                />
              </div>
            </div>
          </button>

          {/* ── ড্রপডাউন মোডাল (Navvar এর মতই কপি করা) ── */}
          {showDropdown && (
            <div className="absolute right-0 mt-3 w-52 bg-white rounded-2xl border border-gray-100 shadow-xl z-[200] overflow-hidden py-1 animate-in fade-in zoom-in duration-150">
              {/* ইউজার ইনফো রো */}
              <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
                <p className="text-[12px] font-bold text-gray-800 truncate">
                  {user?.name}
                </p>
                <p className="text-[10px] text-gray-500 truncate">
                  {user?.email}
                </p>
              </div>

              {/* মেনু আইটেমসমূহ */}
              <div className="py-1.5">
                <Link
                  href="/"
                  className="flex items-center gap-2.5 px-4 py-2 text-[13px] font-semibold text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  🏠 হোমপেজ
                </Link>
                <Link
                  href="/dashboard/profile"
                  onClick={() => setShowDropdown(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-[13px] font-semibold text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  👤 প্রোফাইল
                </Link>
              </div>

              <div className="h-px bg-gray-100 mx-2 my-1" />

              <div className="pb-1.5">
                <button
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="flex items-center gap-2.5 w-full px-4 py-2 text-[13px] font-bold text-red-600 hover:bg-red-50 transition-colors"
                >
                  🚪 {loggingOut ? "লগআউট হচ্ছে..." : "লগআউট"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Anavvar;
