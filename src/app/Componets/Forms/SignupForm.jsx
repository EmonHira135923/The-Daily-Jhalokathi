import { Eye, EyeOff, Lock, Mail, Phone, User } from "lucide-react";
import React, { useState } from "react";

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <div>
      <div className="space-y-4">
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4.5 h-4.5" />
          <input
            type="text"
            name="name"
            className="w-full pl-10 pr-3 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all bg-gray-50/50"
            placeholder="পুরো নাম | Full Name"
            required
          />
        </div>

        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4.5 h-4.5" />
          <input
            type="email"
            name="email"
            className="w-full pl-10 pr-3 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all bg-gray-50/50"
            placeholder="ইমেইল | Email Address"
            required
          />
        </div>

        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4.5 h-4.5" />
          <input
            type="tel"
            name="phone"
            className="w-full pl-10 pr-3 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all bg-gray-50/50"
            placeholder="ফোন নম্বর | Phone Number"
            required
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4.5 h-4.5" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className="w-full pl-10 pr-10 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all bg-gray-50/50"
            placeholder="পাসওয়ার্ড | Password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4.5 h-4.5" />
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            className="w-full pl-10 pr-10 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all bg-gray-50/50"
            placeholder="পাসওয়ার্ড নিশ্চিত করুন | Confirm Password"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <button className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white text-sm font-bold py-3 rounded-xl shadow-lg shadow-red-200 hover:shadow-red-300 active:scale-[0.98] transition-all mt-2">
          একউন্ট তৈরি করুন
        </button>
      </div>
    </div>
  );
};

export default SignupForm;
