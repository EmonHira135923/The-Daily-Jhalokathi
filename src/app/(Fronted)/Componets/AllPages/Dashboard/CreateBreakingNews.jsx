"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const CreateBreakingNews = () => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [focused, setFocused] = useState(false);
  const router = useRouter();
  const MAX_CHARS = 300;

  const handleChange = (e) => {
    const val = e.target.value;
    if (val.length <= MAX_CHARS) {
      setTitle(val);
      setCharCount(val.length);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("ব্রেকিং নিউজ লিখুন");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/breakingnews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim() }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("ব্রেকিং নিউজ সফলভাবে যোগ হয়েছে!");
        setTitle("");
        setCharCount(0);
        router.push("/");
      } else {
        toast.error(data.message || "কিছু সমস্যা হয়েছে");
      }
    } catch (error) {
      toast.error("সার্ভার সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  const progressPercent = Math.round((charCount / MAX_CHARS) * 100);
  const isDanger = progressPercent > 90;
  const isWarn = progressPercent > 70;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl">

        {/* Card */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100">

          {/* Top accent bar */}
          <div className="h-1 bg-gradient-to-r from-red-700 via-red-500 to-red-700" />

          {/* Header */}
          <div className="px-6 pt-6 pb-5 border-b border-gray-100">

            {/* Live badge */}
            <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 rounded-md px-3 py-1 mb-4">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-semibold tracking-widest uppercase text-red-500">
                Breaking
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight tracking-tight">
              ব্রেকিং নিউজ{" "}
              <span className="text-red-600">যোগ করুন</span>
            </h1>
            <p className="mt-1.5 text-sm text-gray-400">
              সর্বশেষ সংবাদ সরাসরি পাঠকদের কাছে পৌঁছে দিন
            </p>
          </div>

          {/* Form body */}
          <div className="px-6 py-6">
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Label + counter */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                    সংবাদ শিরোনাম
                  </label>
                  <span
                    className={`text-xs font-medium tabular-nums transition-colors ${
                      isDanger ? "text-red-500" : isWarn ? "text-orange-400" : "text-gray-400"
                    }`}
                  >
                    {charCount}/{MAX_CHARS}
                  </span>
                </div>

                {/* Textarea wrapper */}
                <div
                  className={`relative rounded-xl overflow-hidden transition-all duration-200 ${
                    focused
                      ? "ring-2 ring-red-400 border-transparent"
                      : "ring-1 ring-gray-200"
                  }`}
                >
                  <textarea
                    rows={5}
                    value={title}
                    onChange={handleChange}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder="Breaking news লিখুন..."
                    className="w-full bg-gray-50 text-gray-900 placeholder-gray-300 text-[15px] leading-relaxed px-4 pt-4 pb-8 resize-none outline-none"
                  />

                  {/* Progress bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gray-100">
                    <div
                      className={`h-full transition-all duration-300 rounded-r-full ${
                        isDanger ? "bg-red-500" : isWarn ? "bg-orange-400" : "bg-emerald-400"
                      }`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                <p className="mt-2 flex items-center gap-1.5 text-[11px] text-gray-400">
                  <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
                  </svg>
                  সংবাদটি সংক্ষিপ্ত ও স্পষ্ট রাখুন
                </p>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100" />

              {/* Action buttons */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="flex-none h-12 px-5 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-500 hover:text-gray-700 text-sm font-medium transition-all duration-150 cursor-pointer"
                >
                  বাতিল
                </button>

                <button
                  type="submit"
                  disabled={loading || !title.trim()}
                  className="flex-1 h-12 rounded-xl bg-gradient-to-b from-red-500 to-red-700 hover:from-red-400 hover:to-red-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-bold tracking-wide shadow-md shadow-red-200 hover:shadow-red-300 transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      <span>যোগ হচ্ছে...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      <span>প্রকাশ করুন</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBreakingNews;