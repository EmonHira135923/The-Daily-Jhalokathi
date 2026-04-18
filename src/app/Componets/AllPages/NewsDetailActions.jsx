"use client";

import { useEffect, useState } from "react";
import { FaFacebook, FaTwitter, FaYoutube, FaPrint, FaLink } from "react-icons/fa";

const NewsDetailActions = ({ title }) => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard");
    } catch (error) {
      console.error(error);
      alert("Could not copy link. Please copy manually.");
    }
  };

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold mb-4">Share this story</h2>
      <div className="flex flex-wrap gap-3">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
        >
          <FaFacebook /> Facebook
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
        >
          <FaTwitter /> X / Twitter
        </a>
        <a
          href={`https://www.youtube.com/results?search_query=${encodeURIComponent(title)}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
        >
          <FaYoutube /> YouTube
        </a>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
        >
          <FaPrint /> Print / Save PDF
        </button>
        <button
          type="button"
          onClick={handleCopyLink}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
        >
          <FaLink /> Copy Link
        </button>
      </div>
    </div>
  );
};

export default NewsDetailActions;
