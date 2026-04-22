"use client";
import { uploadToCloudinary } from "@/app/(Backend)/lib/cloudinary";
import { categories } from "@/app/(Backend)/lib/newsData";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateNewsPage = () => {
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const router = useRouter();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const file = form.image.files[0];
    const toastId = toast.loading("ছবি আপলোড হচ্ছে...");

    try {
      const uploaded = await uploadToCloudinary(file);
      toast.update(toastId, { render: "খবর সংরক্ষণ হচ্ছে...", isLoading: true });

      const payload = {
        title: form.title.value,
        slug: form.slug.value,
        description: form.description.value,
        author: form.author.value,
        image: uploaded?.secure_url || "",
        imagePublicId: uploaded?.public_id || "",
        date: new Date().toLocaleDateString("bn-BD"),
        time: "এইমাত্র",
        content: form.content.value.split("\n").filter((item) => item.trim() !== ""),
        quote: {
          text: form.quoteText.value,
          author: form.quoteAuthor.value,
        },
        featured: false,
        side: false,
      };

      const res = await fetch("/api/AllNews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        toast.update(toastId, {
          render: "✅ খবর সফলভাবে প্রকাশিত হয়েছে!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        form.reset();
        setPreviewUrl(null);
        setTimeout(() => router.push("/dashboard/news"), 2000);
      } else {
        toast.update(toastId, {
          render: "❌ খবর প্রকাশ করতে সমস্যা হয়েছে।",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch {
      toast.update(toastId, {
        render: "⚠️ কিছু একটা ভুল হয়েছে। আবার চেষ্টা করুন।",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" theme="colored" pauseOnHover />

      <div className="min-h-screen bg-base-200 py-10 px-4">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-base-content">📰 নতুন খবর প্রকাশ করুন</h1>
            <p className="text-base-content/50 text-sm mt-1">নিচের ফর্মটি পূরণ করে খবর প্রকাশ করুন</p>
          </div>

          <form onSubmit={handleSubmit} className="card bg-base-100 shadow-sm p-6 flex flex-col gap-5">

            {/* Title */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-base-content">শিরোনাম *</label>
              <input name="title" placeholder="খবরের শিরোনাম লিখুন" className="input input-bordered w-full" required />
            </div>

            {/* Category */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-base-content">ক্যাটাগরি *</label>
              <select name="slug" className="select select-bordered w-full">
                {categories.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Author */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-base-content">লেখক</label>
              <input name="author" placeholder="লেখকের নাম" className="input input-bordered w-full" />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-base-content">ছোট বিবরণ</label>
              <textarea name="description" placeholder="সংক্ষিপ্ত বিবরণ লিখুন..." className="textarea textarea-bordered w-full h-24 resize-none" />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-base-content">বিস্তারিত বিবরণ</label>
              <p className="text-xs text-base-content/40">প্রতিটি প্যারাগ্রাফ আলাদা লাইনে লিখুন</p>
              <textarea name="content" placeholder="বিস্তারিত খবর এখানে লিখুন..." className="textarea textarea-bordered w-full h-48 resize-none" />
            </div>

            {/* Image */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-base-content">ছবি আপলোড</label>
              <input type="file" name="image" accept="image/*" onChange={handleImageChange} className="file-input file-input-bordered w-full" />
              {previewUrl && (
                <div className="rounded-lg overflow-hidden border border-base-300 mt-1">
                  <img src={previewUrl} alt="Preview" className="w-full object-cover max-h-52" />
                </div>
              )}
            </div>

            {/* Quote Text */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-base-content">উক্তি (ঐচ্ছিক)</label>
              <input name="quoteText" placeholder="উক্তির বিষয়বস্তু" className="input input-bordered w-full" />
            </div>

            {/* Quote Author */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-base-content">উক্তিদাতা (ঐচ্ছিক)</label>
              <input name="quoteAuthor" placeholder="উক্তিদাতার নাম" className="input input-bordered w-full" />
            </div>

            {/* Submit */}
            <button type="submit" disabled={loading} className="btn btn-primary w-full mt-2 gap-2">
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  প্রকাশ হচ্ছে...
                </>
              ) : "✅ খবর প্রকাশ করুন"}
            </button>

          </form>
        </div>
      </div>
    </>
  );
};

export default CreateNewsPage;