import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { fetchUserProfile } from "@/app/(Backend)/lib/auth";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // react-hook-form initialization
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        // ১. প্রথমে টোকেনটি সেভ করুন
        localStorage.setItem("accessToken", result.result);

        // ২. এবার প্রোফাইল ডাটা ফেচ করুন রোল জানার জন্য
        const profileData = await fetchUserProfile();

        if (profileData.success) {
          toast.success("লগইন সফল হয়েছে!");

          const userRole = profileData.result?.role; // আপনার fetchUserProfile অনুযায়ী result এর ভেতর ডাটা থাকে

          // ৩. রোলের ওপর ভিত্তি করে রিডাইরেক্ট
          if (userRole === "admin") {
            router.push("/dashboard");
          } else {
            router.push("/");
          }

          // পেজ রিফ্রেশ যাতে নেভবার আপডেট হয়
          setTimeout(() => {
            router.refresh();
          }, 100);
        } else {
          // যদি টোকেন পাওয়ার পরও প্রোফাইল না আসে
          toast.error("ইউজার প্রোফাইল পাওয়া যায়নি");
        }
      } else {
        toast.error(result.message || "ইমেইল বা পাসওয়ার্ড ভুল");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("সার্ভার সমস্যা, আবার চেষ্টা করুন");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        {/* Email Field */}
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4.5 h-4.5" />
          <input
            {...register("email", {
              required: "ইমেইল প্রয়োজন",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "সঠিক ইমেইল ফরম্যাট লিখুন",
              },
            })}
            type="email"
            className={`w-full pl-10 pr-3 py-3 text-sm border ${
              errors.email ? "border-red-500" : "border-gray-200"
            } rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all bg-gray-50/50`}
            placeholder="ইমেইল | Email Address"
          />
          {errors.email && (
            <p className="text-[10px] text-red-500 mt-1 ml-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4.5 h-4.5" />
          <input
            {...register("password", { required: "পাসওয়ার্ড প্রয়োজন" })}
            type={showPassword ? "text" : "password"}
            className={`w-full pl-10 pr-10 py-3 text-sm border ${
              errors.password ? "border-red-500" : "border-gray-200"
            } rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all bg-gray-50/50`}
            placeholder="পাসওয়ার্ড | Password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          {errors.password && (
            <p className="text-[10px] text-red-500 mt-1 ml-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="text-right">
          <button
            type="button"
            className="text-xs text-red-600 hover:underline font-medium"
          >
            পাসওয়ার্ড ভুলে গেছেন?
          </button>
        </div>

        {/* Login Button */}
        <button
          disabled={loading}
          type="submit"
          className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white text-sm font-bold py-3 rounded-xl shadow-lg shadow-red-200 hover:shadow-red-300 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? "অপেক্ষা করুন..." : "লগইন করুন"}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
