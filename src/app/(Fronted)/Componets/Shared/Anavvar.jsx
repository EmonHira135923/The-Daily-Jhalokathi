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

  // --- ইমেজ লজিক সিম্পল করা হয়েছে ---
  const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
  
  // চেক করা হচ্ছে image অবজেক্টের ভেতর secure_url আছে কি না, না থাকলে default
  const finalImage = user?.image?.secure_url || (typeof user?.image === 'string' ? user.image : defaultAvatar);

  return (
    <div className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-100 sticky top-0 z-50 font-banglafont">
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

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
          <input
            type="text"
            placeholder="খুঁজুন..."
            className="text-[12px] bg-transparent outline-none text-black w-24 md:w-32"
          />
        </div>

        <div className="w-px h-7 bg-gray-200" />

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown((v) => !v)}
            className="relative focus:outline-none block"
          >
            <div className="h-11 w-11 rounded-full border-2 border-red-600 p-0.5 flex items-center justify-center shadow-inner hover:opacity-95 active:scale-95 transition-all">
              <div className="relative h-full w-full rounded-full overflow-hidden bg-gray-100">
                <Image
                  src={finalImage}
                  alt="User"
                  fill
                  className="object-cover"
                  unoptimized={true} // এরর এড়াতে এবং দ্রুত লোড করতে unoptimized রাখা হয়েছে
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
                  className="flex items-center gap-2.5 px-4 py-2 text-[13px] font-semibold text-gray-700 hover:bg-red-50 hover:text-red-600"
                >
                  🏠 হোমপেজ
                </Link>
                <Link
                  href="/dashboard/profile"
                  onClick={() => setShowDropdown(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-[13px] font-semibold text-gray-700 hover:bg-red-50 hover:text-red-600"
                >
                  👤 প্রোফাইল
                </Link>
              </div>

              <div className="h-px bg-gray-100 mx-2 my-1" />

              <div className="pb-1.5">
                <button
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="flex items-center gap-2.5 w-full px-4 py-2 text-[13px] font-bold text-red-600 hover:bg-red-50"
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