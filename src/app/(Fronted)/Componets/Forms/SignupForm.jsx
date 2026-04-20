import { uploadToCloudinary } from "@/app/(Backend)/lib/cloudinary";
import { Eye, EyeOff, Lock, Mail, Phone, User, Upload } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
 

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // ১. ইমেজ ক্লাউডিনারিতে আপলোড করা
      let imageUrl = null;
      if (data.image && data.image[0]) {
        imageUrl = await uploadToCloudinary(data.image[0]);
      }

      // ২. ব্যাকএন্ড এপিআই-তে ডাটা পাঠানো
      const payload = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        image: imageUrl,
      };

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("রেজিস্ট্রেশন সফল হয়েছে!");
        reset(); // ফর্ম ক্লিয়ার করা
      } else {
        toast.error(result.message || "কিছু ভুল হয়েছে");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      if (error.message.includes("Cloudinary")) {
        toast.error("ইমেজ আপলোড ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
      } else {
        toast.error("সার্ভার সমস্যা, আবার চেষ্টা করুন");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        {/* Name Input */}
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4.5 h-4.5" />
          <input
            {...register("name", { required: "নাম দিতে হবে" })}
            type="text"
            className="w-full pl-10 pr-3 py-3 text-sm border border-gray-200 rounded-xl focus:ring-red-500/20 focus:border-red-500 transition-all bg-gray-50/50"
            placeholder="পুরো নাম | Full Name"
          />
        </div>

        {/* Email Input */}
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4.5 h-4.5" />
          <input
            {...register("email", { required: "ইমেইল দিতে হবে" })}
            type="email"
            className="w-full pl-10 pr-3 py-3 text-sm border border-gray-200 rounded-xl focus:ring-red-500/20 focus:border-red-500 transition-all bg-gray-50/50"
            placeholder="ইমেইল | Email Address"
          />
        </div>

        {/* Phone Input */}
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4.5 h-4.5" />
          <input
            {...register("phone")}
            type="tel"
            className="w-full pl-10 pr-3 py-3 text-sm border border-gray-200 rounded-xl focus:ring-red-500/20 focus:border-red-500 transition-all bg-gray-50/50"
            placeholder="ফোন নম্বর | Phone Number"
          />
        </div>

        {/* Image Upload Input */}
        <div className="relative">
          <Upload className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4.5 h-4.5" />
          <input
            {...register("image")}
            type="file"
            accept="image/*"
            className="w-full pl-10 pr-3 py-3 text-sm border border-gray-200 rounded-xl bg-gray-50/50 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-red-50 file:text-red-700"
          />
        </div>

        {/* Password Input */}
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4.5 h-4.5" />
          <input
            {...register("password", { required: "পাসওয়ার্ড প্রয়োজন", minLength: 6 })}
            type={showPassword ? "text" : "password"}
            className="w-full pl-10 pr-10 py-3 text-sm border border-gray-200 rounded-xl focus:ring-red-500/20 focus:border-red-500 transition-all bg-gray-50/50"
            placeholder="পাসওয়ার্ড | Password"
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Submit Button */}
        <button 
          disabled={loading}
          type="submit" 
          className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white text-sm font-bold py-3 rounded-xl shadow-lg hover:shadow-red-300 active:scale-[0.98] transition-all mt-2 disabled:opacity-70"
        >
          {loading ? "প্রসেস হচ্ছে..." : "একউন্ট তৈরি করুন"}
        </button>
      </div>
    </form>
  );
};

export default SignupForm;