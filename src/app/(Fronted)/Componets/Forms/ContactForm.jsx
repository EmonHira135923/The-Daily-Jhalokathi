"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Send, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("বার্তাটি সফলভাবে পাঠানো হয়েছে!");
        reset();
      } else {
        toast.error(result.message || "কিছু ভুল হয়েছে।");
      }
    } catch (error) {
      toast.error("সার্ভারে সমস্যা হচ্ছে, আবার চেষ্টা করুন।");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Name */}
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
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          ইমেইল <span className="text-red-600">*</span>
        </label>
        <input
          type="email"
          {...register("email", { 
            required: "ইমেইল প্রয়োজন",
            pattern: { value: /^\S+@\S+$/i, message: "সঠিক ইমেইল দিন" }
          })}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="your@email.com"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      {/* Subject */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">বিষয়</label>
        <input
          {...register("subject")}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
          placeholder="বার্তার বিষয়"
        />
      </div>

      {/* Message */}
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
        ></textarea>
        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
      </div>

      {/* Submit Button */}
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
    </form>
  );
};

export default ContactForm;