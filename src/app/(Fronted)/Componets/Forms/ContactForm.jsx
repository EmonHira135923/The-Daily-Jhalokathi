"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Loader2, LogIn, Send } from "lucide-react";
import { toast } from "react-toastify";

const getAccessToken = () =>
  typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

const ContactForm = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = getAccessToken();
        const response = await fetch("/api/auth/myprofile", {
          credentials: "include",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const result = await response.json();

        if (result.success) {
          setCurrentUser(result.result);
          reset({
            name: result.result?.name || "",
            email: result.result?.email || "",
            subject: "",
            message: "",
          });
        }
      } catch {
        setCurrentUser(null);
      } finally {
        setAuthLoading(false);
      }
    };

    const timer = setTimeout(fetchProfile, 0);
    return () => clearTimeout(timer);
  }, [reset]);

  const onSubmit = async (data) => {
    if (!currentUser) {
      toast.error("বার্তা পাঠাতে আগে লগইন করুন।");
      return;
    }

    try {
      const token = getAccessToken();
      const response = await fetch("/api/contact", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("বার্তাটি সফলভাবে পাঠানো হয়েছে!");
        reset({
          name: currentUser?.name || "",
          email: currentUser?.email || "",
          subject: "",
          message: "",
        });
      } else {
        toast.error(result.message || "কিছু ভুল হয়েছে।");
      }
    } catch {
      toast.error("সার্ভারে সমস্যা হচ্ছে, আবার চেষ্টা করুন।");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          নাম <span className="text-red-600">*</span>
        </label>
        <input
          {...register("name", { required: "আপনার নাম লিখুন" })}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="আপনার নাম"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">
          ইমেইল <span className="text-red-600">*</span>
        </label>
        <input
          type="email"
          {...register("email", {
            required: "ইমেইল প্রয়োজন",
            pattern: { value: /^\S+@\S+$/i, message: "সঠিক ইমেইল দিন" },
          })}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="your@email.com"
          readOnly={!!currentUser}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">বিষয়</label>
        <input
          {...register("subject")}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
          placeholder="বার্তার বিষয়"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">
          বার্তা <span className="text-red-600">*</span>
        </label>
        <textarea
          {...register("message", { required: "আপনার বার্তা লিখুন" })}
          rows="6"
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all resize-none ${
            errors.message ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="আপনার বার্তা লিখুন..."
        />
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>

      {authLoading ? (
        <button
          type="button"
          disabled
          className="w-full bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-md"
        >
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>লগইন চেক হচ্ছে...</span>
        </button>
      ) : currentUser ? (
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
        >
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
          <span>{isSubmitting ? "পাঠানো হচ্ছে..." : "বার্তা পাঠান"}</span>
        </button>
      ) : (
        <Link
          href="/login"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
        >
          <LogIn className="w-5 h-5" />
          <span>আগে লগইন করুন</span>
        </Link>
      )}
    </form>
  );
};

export default ContactForm;
