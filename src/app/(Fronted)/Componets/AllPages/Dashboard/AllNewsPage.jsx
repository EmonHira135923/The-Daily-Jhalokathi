"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Link from "next/link";

const PAGE_SIZE = 15;

// ── Skeleton Row ──────────────────────────────────────────────────────────────
const SkeletonRow = ({ showQuote }) => (
  <tr className="animate-pulse border-b border-gray-50">
    <td className="px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 bg-gray-100 rounded-xl shrink-0" />
        <div className="space-y-2 flex-1 min-w-0">
          <div className="h-3 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
          <div className="h-4 w-16 bg-gray-100 rounded-full" />
        </div>
      </div>
    </td>
    <td className="px-4 py-3 hidden sm:table-cell">
      <div className="space-y-2">
        <div className="h-3 w-20 bg-gray-200 rounded" />
        <div className="h-2 w-24 bg-gray-100 rounded" />
        <div className="h-2 w-16 bg-gray-100 rounded" />
      </div>
    </td>
    <td className="px-4 py-3 hidden lg:table-cell">
      <div className="space-y-1.5">
        <div className="h-2 w-full bg-gray-100 rounded" />
        <div className="h-2 w-4/5 bg-gray-100 rounded" />
      </div>
    </td>
    {showQuote && (
      <td className="px-4 py-3 hidden xl:table-cell">
        <div className="space-y-1.5">
          <div className="h-2 w-full bg-gray-100 rounded" />
          <div className="h-2 w-3/4 bg-gray-100 rounded" />
        </div>
      </td>
    )}
    <td className="px-4 py-3">
      <div className="flex justify-center gap-2">
        <div className="w-8 h-8 bg-gray-100 rounded-lg" />
        <div className="w-8 h-8 bg-gray-100 rounded-lg" />
      </div>
    </td>
  </tr>
);

// ── Pagination ────────────────────────────────────────────────────────────────
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = useMemo(() => {
    const arr = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) arr.push(i);
    } else {
      arr.push(1);
      if (currentPage > 3) arr.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) arr.push(i);
      if (currentPage < totalPages - 2) arr.push("...");
      arr.push(totalPages);
    }
    return arr;
  }, [currentPage, totalPages]);

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-4 border-t border-gray-100">
      {/* Info */}
      <p className="text-xs text-gray-400 shrink-0">
        পৃষ্ঠা{" "}
        <span className="font-bold text-gray-700">{currentPage}</span> /{" "}
        <span className="font-bold text-gray-700">{totalPages}</span>
      </p>

      {/* Buttons */}
      <div className="flex items-center gap-1 flex-wrap">
        {/* Prev */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all flex items-center gap-1 text-gray-600"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden xs:inline">আগে</span>
        </button>

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {pages.map((p, idx) =>
            p === "..." ? (
              <span key={`dots-${idx}`} className="px-2 text-gray-300 text-xs select-none">
                ···
              </span>
            ) : (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                className={`w-8 h-8 text-xs font-bold rounded-lg transition-all active:scale-95 ${
                  p === currentPage
                    ? "bg-red-600 text-white shadow-sm shadow-red-200"
                    : "hover:bg-gray-100 text-gray-600 border border-gray-200"
                }`}
              >
                {p}
              </button>
            )
          )}
        </div>

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all flex items-center gap-1 text-gray-600"
        >
          <span className="hidden xs:inline">পরে</span>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────
const AllNewsPage = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState(null);
  const [newsToDelete, setNewsToDelete] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { register, handleSubmit, reset } = useForm();

  // ── কোনো খবরে quote আছে কিনা চেক ──
  const hasAnyQuote = useMemo(
    () => newsList.some((n) => n.quote?.text),
    [newsList]
  );

  // ── বর্তমান পৃষ্ঠার ডাটা ──
  const totalPages = Math.ceil(newsList.length / PAGE_SIZE);
  const pagedNews = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return newsList.slice(start, start + PAGE_SIZE);
  }, [newsList, currentPage]);

  // ── সব খবর লোড ──
  const fetchNews = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/AllNews");
      const result = await res.json();
      if (result.success) {
        setNewsList(result.data);
        setCurrentPage(1); // রিফ্রেশে প্রথম পৃষ্ঠায় ফেরত
      }
    } catch {
      toast.error("খবর লোড করতে সমস্যা হয়েছে");
    } finally {
      setTimeout(() => setLoading(false), 400);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  // ── এডিট মডাল ──
  const openEditModal = (news) => {
    setSelectedNews(news);
    const contentString = Array.isArray(news.content)
      ? news.content.join("\n")
      : news.content;

    reset({
      title: news.title,
      slug: news.slug,
      author: news.author,
      image: news.image || news.thumbnail,
      content: contentString,
      quoteText: news.quote?.text || "",
      quoteAuthor: news.quote?.author || "",
    });
    document.getElementById("update_modal").showModal();
  };

  const onUpdateSubmit = async (data) => {
    setUpdating(true);
    try {
      const { quoteText, quoteAuthor, ...rest } = data;

      const formattedData = {
        ...rest,
        content: data.content.split("\n").filter((line) => line.trim() !== ""),
        quote: {
          text: quoteText || "",
          author: quoteAuthor || "",
        },
      };

      const res = await fetch(`/api/AllNews?id=${selectedNews.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });

      const result = await res.json();

      if (result.success) {
        toast.success("খবরটি সফলভাবে আপডেট হয়েছে");
        document.getElementById("update_modal").close();
        fetchNews();
      } else {
        toast.error(result.message || "আপডেট ব্যর্থ হয়েছে");
      }
    } catch (error) {
      console.error("Update Error:", error);
      toast.error("সার্ভারে সমস্যা হয়েছে");
    } finally {
      setUpdating(false);
    }
  };

  // ── ডিলিট ──
  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/AllNews?id=${newsToDelete.id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (result.success) {
        toast.success("খবরটি মুছে ফেলা হয়েছে");
        document.getElementById("delete_modal").close();
        fetchNews();
      }
    } catch {
      toast.error("মুছে ফেলতে সমস্যা হয়েছে");
    } finally {
      setDeleting(false);
    }
  };

  // ── পৃষ্ঠা পরিবর্তন ──
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden font-banglafont text-black">
      {/* ── হেডার ── */}
      <div className="flex flex-wrap gap-3 justify-between items-center px-4 sm:px-6 py-4 border-b border-gray-100">
        <div>
          <h2 className="text-lg sm:text-2xl font-bold">খবর ব্যবস্থাপনা</h2>
          <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
            মোট খবর:{" "}
            {loading ? (
              <span className="animate-pulse inline-block w-5 h-3 bg-gray-200 rounded align-middle" />
            ) : (
              <span className="font-bold text-black">{newsList.length}</span>
            )}
            {!loading && newsList.length > 0 && (
              <span className="ml-2 text-gray-400 text-xs">
                · পৃষ্ঠা {currentPage}/{totalPages} · প্রতি পৃষ্ঠায় {PAGE_SIZE}টি
              </span>
            )}
          </p>
        </div>
        <Link
          href="/dashboard/news/create"
          className="flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 active:scale-95 text-white text-sm font-bold rounded-xl transition-all"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span className="hidden xs:inline">নতুন খবর</span>
          <span className="xs:hidden">নতুন</span>
        </Link>
      </div>

      {/* ── টেবিল ── */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
              <th className="px-4 py-3 text-left font-semibold">খবরের বিবরণ</th>
              <th className="px-4 py-3 text-left font-semibold hidden sm:table-cell">
                লেখক ও সময়
              </th>
              <th className="px-4 py-3 text-left font-semibold hidden lg:table-cell">
                বিস্তারিত
              </th>
              {/* Quote কলাম — শুধু যদি কোনো খবরে quote থাকে */}
              {hasAnyQuote && (
                <th className="px-4 py-3 text-left font-semibold hidden xl:table-cell">
                  উক্তি
                </th>
              )}
              <th className="px-4 py-3 text-center font-semibold">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {/* ── Skeleton ── */}
            {loading &&
              [1, 2, 3, 4, 5].map((i) => (
                <SkeletonRow key={i} showQuote={false} />
              ))}

            {/* ── আসল ডাটা ── */}
            {!loading &&
              pagedNews.map((news) => {
                const displayImage =
                  news.image || news.thumbnail || "https://placehold.co/600x400";
                const displayDate = news.date || news.formattedDate;
                const hasQuote = !!news.quote?.text;

                return (
                  <tr
                    key={news.id}
                    className="hover:bg-gray-50/60 transition-colors group"
                  >
                    {/* ছবি ও শিরোনাম */}
                    <td className="px-0 py-0">
                      <Link
                        href={`/news/${news.id}`}
                        target="_blank"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50/40 transition-all cursor-pointer"
                      >
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-gray-100 shrink-0 group-hover:scale-105 transition-transform duration-200">
                          <Image
                            src={displayImage}
                            alt="news-thumb"
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-[13px] text-gray-800 leading-snug mb-1 group-hover:text-blue-600 transition-colors line-clamp-2 max-w-[160px] sm:max-w-[260px] md:max-w-[360px]">
                            {news.title}
                          </p>
                          <span className="inline-block px-2 py-0.5 bg-red-50 text-red-600 text-[10px] font-bold rounded-full">
                            {news.slug || "নিউজ"}
                          </span>
                          <div className="sm:hidden mt-1 text-[10px] text-gray-400">
                            {news.author || "অজানা"} · {displayDate}
                          </div>
                        </div>
                      </Link>
                    </td>

                    {/* লেখক ও সময় */}
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <p className="text-xs font-bold text-gray-700 truncate max-w-[120px]">
                        {news.author || "অজানা লেখক"}
                      </p>
                      <p className="text-[10px] text-gray-400 mt-1">
                        📅 {displayDate}
                      </p>
                      {news.time && (
                        <p className="text-[10px] text-blue-500 font-medium">
                          🕒 {news.time}
                        </p>
                      )}
                    </td>

                    {/* কন্টেন্ট প্রিভিউ */}
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <p className="text-[11px] text-gray-400 line-clamp-2 max-w-[200px]">
                        {Array.isArray(news.content)
                          ? news.content[0]
                          : news.content}
                      </p>
                    </td>

                    {/* Quote কলাম — শুধু যদি সামগ্রিকভাবে কোনো quote থাকে */}
                    {hasAnyQuote && (
                      <td className="px-4 py-3 hidden xl:table-cell">
                        {hasQuote ? (
                          <div className="max-w-[180px]">
                            <p className="text-[11px] text-indigo-700 italic line-clamp-2 leading-relaxed">
                              "{news.quote.text}"
                            </p>
                            {news.quote.author && (
                              <p className="text-[10px] text-gray-400 mt-1 font-medium">
                                — {news.quote.author}
                              </p>
                            )}
                          </div>
                        ) : (
                          <span className="text-[10px] text-gray-300 italic">—</span>
                        )}
                      </td>
                    )}

                    {/* অ্যাকশন */}
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center items-center gap-1.5">
                        <button
                          onClick={() => openEditModal(news)}
                          className="p-2 hover:bg-blue-50 rounded-lg text-blue-500 hover:text-blue-700 active:scale-95 transition-all"
                          title="এডিট করুন"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 sm:h-5 sm:w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => {
                            setNewsToDelete(news);
                            document.getElementById("delete_modal").showModal();
                          }}
                          className="p-2 hover:bg-red-50 rounded-lg text-red-400 hover:text-red-600 active:scale-95 transition-all"
                          title="ডিলিট করুন"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 sm:h-5 sm:w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

            {/* ── Empty state ── */}
            {!loading && newsList.length === 0 && (
              <tr>
                <td colSpan={hasAnyQuote ? 5 : 4} className="px-4 py-16 text-center">
                  <div className="flex flex-col items-center gap-3 text-gray-400">
                    <svg
                      className="w-12 h-12 opacity-30"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v8a2 2 0 01-2 2z"
                      />
                    </svg>
                    <p className="text-sm font-semibold">কোনো খবর পাওয়া যায়নি</p>
                    <Link
                      href="/dashboard/news/create"
                      className="text-xs text-red-600 font-bold hover:underline"
                    >
                      + নতুন খবর যোগ করুন
                    </Link>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ── Pagination ── */}
      {!loading && newsList.length > PAGE_SIZE && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* ── আপডেট মডাল ── */}
      <dialog id="update_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white max-w-2xl w-full font-banglafont text-black rounded-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-5 sticky top-0 bg-white pb-3 border-b border-gray-100 z-10">
            <h3 className="font-bold text-lg sm:text-xl text-blue-600">
              খবর এডিট করুন
            </h3>
            <button
              type="button"
              onClick={() => document.getElementById("update_modal").close()}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 text-lg transition-colors"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit(onUpdateSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* শিরোনাম */}
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  শিরোনাম
                </label>
                <input
                  {...register("title")}
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                  placeholder="খবরের শিরোনাম লিখুন"
                />
              </div>

              {/* স্ল্যাগ */}
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  স্ল্যাগ
                </label>
                <input
                  {...register("slug")}
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                />
              </div>

              {/* লেখক */}
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  লেখক / বিভাগ
                </label>
                <input
                  {...register("author")}
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                />
              </div>

              {/* ইমেজ */}
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  ইমেজ URL
                </label>
                <input
                  {...register("image")}
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                  placeholder="https://..."
                />
              </div>

              {/* উক্তি সেকশন — সবসময় দেখাবে, কিন্তু ডাটা থাকলে পূর্ণ হবে */}
              <div className="sm:col-span-2 border border-dashed border-indigo-100 bg-indigo-50/30 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-indigo-500 text-base">❝</span>
                  <h4 className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
                    বিশেষ উক্তি (Quote)
                  </h4>
                  <span className="text-[10px] text-gray-400 font-normal normal-case">
                    — ঐচ্ছিক
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1.5">
                      উক্তির টেক্সট
                    </label>
                    <textarea
                      {...register("quoteText")}
                      rows={2}
                      className="w-full px-3 py-2.5 bg-white border border-indigo-100 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all resize-none"
                      placeholder="যেমন: প্রযুক্তিই আগামী দিনের চালিকাশক্তি।"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1.5">
                      উক্তি দাতার নাম
                    </label>
                    <input
                      {...register("quoteAuthor")}
                      className="w-full px-3 py-2.5 bg-white border border-indigo-100 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all"
                      placeholder="যেমন: জেলা প্রশাসক"
                    />
                  </div>
                </div>
              </div>

              {/* কন্টেন্ট */}
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  বিস্তারিত{" "}
                  <span className="normal-case text-gray-400 font-normal">
                    (নতুন লাইনে প্যারা আলাদা করুন)
                  </span>
                </label>
                <textarea
                  {...register("content")}
                  rows={7}
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all resize-none leading-relaxed"
                  placeholder="এখানে খবরের বর্ণনা লিখুন..."
                />
              </div>
            </div>

            <div className="flex gap-3 pt-1 sticky bottom-0 bg-white pt-3 border-t border-gray-100">
              <button
                type="submit"
                disabled={updating}
                className="flex-1 sm:flex-none px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-bold rounded-xl active:scale-95 transition-all"
              >
                {updating ? "আপডেট হচ্ছে..." : "আপডেট করুন"}
              </button>
              <button
                type="button"
                onClick={() => document.getElementById("update_modal").close()}
                className="flex-1 sm:flex-none px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-xl active:scale-95 transition-all"
              >
                বাতিল
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      {/* ── ডিলিট কনফার্মেশন মডাল ── */}
      <dialog id="delete_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white font-banglafont text-black rounded-2xl">
          <div className="text-center mb-4">
            <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-7 h-7 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
            <h3 className="font-bold text-lg text-red-600">আপনি কি নিশ্চিত?</h3>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              <b>"{newsToDelete?.title}"</b> খবরটি মুছে ফেলতে চান?
              <br />
              <span className="text-xs text-gray-400">
                এটি আর ফিরে পাওয়া যাবে না।
              </span>
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white text-sm font-bold rounded-xl active:scale-95 transition-all"
            >
              {deleting ? "মুছছে..." : "হ্যাঁ, ডিলিট করুন"}
            </button>
            <form method="dialog" className="flex-1">
              <button className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-xl active:scale-95 transition-all">
                বাতিল
              </button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default AllNewsPage;