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
  "/profile": "প্রোফাইল",
};

// ── Anavvar receives onMenuToggle + onCollapseToggle as props ─────────────────
const Anavvar = ({ onMenuToggle, onCollapseToggle, collapsed }) => {
  const pathname = usePathname();
  const redirectpage = useRouter();
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const dropdownRef = useRef(null);

  const pageTitle = PAGE_TITLES[pathname] || "ড্যাশবোর্ড";

  useEffect(() => {
    const getAuth = async () => {
      const data = await fetchUserProfile();
      if (data?.success) setUser(data.result);
    };
    getAuth();
  }, [pathname]);

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
      const success = await logoutUser();
      if (success) {
        setUser(null); // ✅ user state clear
        setShowDropdown(false);
        toast.success("✅ সফলভাবে লগআউট হয়েছেন!");
        redirectpage.push("/login");
        redirectpage.refresh(); // ✅ page refresh
      }
    } catch {
      toast.error("❌ লগআউট করতে সমস্যা হয়েছে");
    } finally {
      setLoggingOut(false);
    }
  };

  const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
  const finalImage =
    user?.image?.secure_url ||
    (typeof user?.image === "string" ? user.image : defaultAvatar);

  return (
    <div className="flex items-center justify-between h-16 px-4 sm:px-6 bg-white border-b border-gray-100 sticky top-0 z-20 font-banglafont">
      {/* Left: Hamburger (mobile) + Collapse (desktop) + Title */}
      <div className="flex items-center gap-3">
        {/* Mobile hamburger */}
        <button
          onClick={onMenuToggle}
          className="md:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100 active:scale-95 transition-all focus:outline-none"
          aria-label="মেনু খুলুন"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Desktop collapse toggle */}
        <button
          onClick={onCollapseToggle}
          className="hidden md:flex p-2 rounded-xl text-gray-400 hover:bg-gray-100 hover:text-gray-700 active:scale-95 transition-all focus:outline-none"
          aria-label={
            collapsed ? "সাইডবার প্রসারিত করুন" : "সাইডবার সংকুচিত করুন"
          }
          title={collapsed ? "সাইডবার প্রসারিত করুন" : "সাইডবার সংকুচিত করুন"}
        >
          {collapsed ? (
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
          )}
        </button>

        {/* Page Title */}
        <div>
          <h2 className="text-[14px] sm:text-[15px] font-bold text-black leading-tight">
            {pageTitle}
          </h2>
          <p className="hidden sm:block text-[11px] text-gray-400 leading-none mt-0.5">
            {new Date().toLocaleDateString("bn-BD", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Right: Search + Divider + Avatar */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search — hidden on smallest screens */}
        <div className="hidden sm:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
          <svg
            className="w-3.5 h-3.5 text-gray-400 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="খুঁজুন..."
            className="text-[12px] bg-transparent outline-none text-black w-20 md:w-32"
          />
        </div>

        <div className="hidden sm:block w-px h-7 bg-gray-200" />

        {/* Avatar + Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown((v) => !v)}
            className="relative focus:outline-none block"
            aria-label="প্রোফাইল মেনু"
          >
            <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-full border-2 border-red-600 p-0.5 flex items-center justify-center shadow-inner hover:opacity-95 active:scale-95 transition-all">
              <div className="relative h-full w-full rounded-full overflow-hidden bg-gray-100">
                <Image
                  src={finalImage}
                  alt="User"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-3 w-52 bg-white rounded-2xl border border-gray-100 shadow-xl z-[200] overflow-hidden py-1">
              <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
                <p className="text-[12px] font-bold text-gray-800 truncate">
                  {user?.name || "ব্যবহারকারী"}
                </p>
                <p className="text-[10px] text-gray-500 truncate">
                  {user?.email || "ইমেইল নেই"}
                </p>
              </div>

              <div className="py-1.5">
                <Link
                  href="/"
                  onClick={() => setShowDropdown(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-[13px] font-semibold text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  🏠 হোমপেজ
                </Link>
                <Link
                  href="/profile"
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
                  className="flex items-center gap-2.5 w-full px-4 py-2 text-[13px] font-bold text-red-600 hover:bg-red-50 transition-colors disabled:opacity-60"
                >
                  🚪 {loggingOut ? "অপেক্ষা করুন..." : "লগআউট"}
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
