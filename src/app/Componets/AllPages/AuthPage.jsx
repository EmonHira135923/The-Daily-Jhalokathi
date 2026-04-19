"use client";
import React, { useState, useEffect } from "react";
import LoginForm from "../Forms/LoginForm";
import SignupForm from "../Forms/SignupForm";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleTabSwitch = (isLoginTab) => {
    setIsLogin(isLoginTab);
    if (typeof window !== "undefined") {
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }, 50);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const previousScrollRestoration = window.history.scrollRestoration;
      window.history.scrollRestoration = "manual";
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return () => {
        window.history.scrollRestoration = previousScrollRestoration;
      };
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-3 py-8">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-orange-600 p-6 text-center">
            <h1 className="text-xl font-bold text-white mb-1">
              {isLogin ? "লগইন করুন" : "সাইন আপ করুন"}
            </h1>
            <p className="text-red-100 text-xs opacity-90">
              {isLogin ? "Welcome back! Please login" : "Join us! Create an account"}
            </p>
          </div>

          {/* Toggle Buttons */}
          <div className="flex border-b">
            <button
              onClick={() => handleTabSwitch(true)}
              className={`flex-1 py-3 text-center text-sm font-bold transition-all ${
                isLogin ? "bg-white text-red-600 border-b-2 border-red-600" : "bg-gray-50 text-gray-400"
              }`}
            >
              লগইন
            </button>
            <button
              onClick={() => handleTabSwitch(false)}
              className={`flex-1 py-3 text-center text-sm font-bold transition-all ${
                !isLogin ? "bg-white text-red-600 border-b-2 border-red-600" : "bg-gray-50 text-gray-400"
              }`}
            >
              সাইন আপ
            </button>
          </div>

          <div className="p-6">
            {isLogin ? (
              /* LOGIN FORM */
              <LoginForm/>
            ) : (
              /* SIGNUP FORM */
              <SignupForm/>
              
            )}

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 bg-white text-gray-400 font-medium">অথবা</span>
              </div>
            </div>

            {/* Google Login */}
            <button
              className="w-full bg-white border border-gray-200 text-gray-600 text-sm font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#4285F4"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#34A853"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              গুগল দিয়ে চেষ্টা করুন
            </button>
          </div>
        </div>

        {/* Footer Toggle */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            {isLogin ? "নতুন ব্যবহারকারী?" : "ইতিমধ্যে অ্যাকাউন্ট আছে?"}{" "}
            <button
              onClick={() => handleTabSwitch(!isLogin)}
              className="text-red-600 font-bold hover:underline ml-1"
            >
              {isLogin ? "নতুন তৈরি করুন" : "লগইন করুন"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;