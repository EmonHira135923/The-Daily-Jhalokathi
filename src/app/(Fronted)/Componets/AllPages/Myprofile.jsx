"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchUserProfile } from "@/app/(Backend)/lib/auth";
import ProfileUpdate from "../Forms/ProfileUpdate";

const Myprofile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      const data = await fetchUserProfile();
      if (data.success) setUser(data.result);
      setLoading(false);
    };
    getProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-red-600" />
          <p className="text-gray-500 text-sm font-banglafont">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-3xl">🔒</div>
        <p className="text-gray-700 font-semibold font-banglafont">প্রোফাইল পাওয়া যায়নি</p>
        <p className="text-gray-400 text-sm font-banglafont">দয়া করে লগইন করুন</p>
        <link href="/login" className="mt-2 px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold text-sm transition-all font-banglafont">
          লগইন করুন
        </link>
      </div>
    );
  }

  const avatarSrc = user.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  const infoRows = [
    { label: "পূর্ণ নাম", value: user.name, icon: "👤" },
    { label: "ইমেইল এড্রেস", value: user.email, icon: "✉️" },
    { label: "ভূমিকা", value: user.role === "admin" ? "অ্যাডমিন" : "সদস্য", icon: "🏷️" },
    {
      label: "একাউন্ট স্ট্যাটাস",
      value: "সক্রিয়",
      icon: "✅",
      valueClass: "text-green-600 font-bold",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-banglafont py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-5">

        {/* ── Profile Card ── */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="h-28 bg-gradient-to-r from-red-600 to-red-500 relative">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                backgroundSize: "20px 20px",
              }}
            />
          </div>

          <div className="px-6 pb-6 relative">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white shadow-lg -mt-12 sm:-mt-14">
              <Image
                src={avatarSrc}
                alt={user.name || "Profile"}
                fill
                className="object-cover"
                sizes="112px"
                unoptimized={avatarSrc.includes("flaticon")}
              />
            </div>

            <div className="mt-3 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <div>
                <h1 className="text-2xl font-bold text-black leading-tight">
                  {user.name}
                </h1>
                <p className="text-gray-500 text-sm mt-0.5">{user.email}</p>
                <span className="inline-block mt-2 px-3 py-0.5 text-[11px] font-bold bg-red-100 text-red-600 rounded-full uppercase tracking-wider">
                  {user.role === "admin" ? "অ্যাডমিন" : "সদস্য"}
                </span>
              </div>

              {/* Modal Trigger Button */}
              <button
                onClick={() => document.getElementById('my_modal_5').showModal()}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 active:scale-95 text-white rounded-xl font-semibold text-sm transition-all shadow-sm whitespace-nowrap"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                প্রোফাইল এডিট
              </button>
            </div>
          </div>
        </div>

        {/* ── Info Card ── */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-base font-bold text-black mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-red-600 rounded-full inline-block" />
            ব্যক্তিগত তথ্য
          </h2>

          <div className="space-y-3">
            {infoRows.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-lg shadow-sm">
                    {row.icon}
                  </span>
                  <span className="text-gray-500 text-sm">{row.label}</span>
                </div>
                <span className={`text-sm font-semibold text-black ${row.valueClass || ""}`}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Green Update Modal ── */}
      <ProfileUpdate/>      

    </div>
  );
};

export default Myprofile;