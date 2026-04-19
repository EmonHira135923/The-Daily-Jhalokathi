import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import React, { useState } from "react";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <div>
      <div className="space-y-4">
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
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="text-right">
          <button className="text-xs text-red-600 hover:underline font-medium">
            পাসওয়ার্ড ভুলে গেছেন?
          </button>
        </div>

        <button className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white text-sm font-bold py-3 rounded-xl shadow-lg shadow-red-200 hover:shadow-red-300 active:scale-[0.98] transition-all">
          লগইন করুন
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
