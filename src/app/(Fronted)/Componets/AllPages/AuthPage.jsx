"use client";
import React, { useState, useEffect } from "react";
import LoginForm from "../Forms/LoginForm";
import SignupForm from "../Forms/SignupForm";
import Googlebtn from "../button/Googlebtn";
import DemoCredentials from "./DemoCredentials";

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
              {isLogin
                ? "Welcome back! Please login"
                : "Join us! Create an account"}
            </p>
          </div>

          {/* Toggle Buttons */}
          <div className="flex border-b">
            <button
              onClick={() => handleTabSwitch(true)}
              className={`flex-1 py-3 text-center text-sm font-bold transition-all ${
                isLogin
                  ? "bg-white text-red-600 border-b-2 border-red-600"
                  : "bg-gray-50 text-gray-400"
              }`}
            >
              লগইন
            </button>
            <button
              onClick={() => handleTabSwitch(false)}
              className={`flex-1 py-3 text-center text-sm font-bold transition-all ${
                !isLogin
                  ? "bg-white text-red-600 border-b-2 border-red-600"
                  : "bg-gray-50 text-gray-400"
              }`}
            >
              সাইন আপ
            </button>
          </div>

          <div className="p-6">
            {isLogin ? (
              /* LOGIN FORM */
              <LoginForm />
            ) : (
              /* SIGNUP FORM */
              <SignupForm />
            )}

            <DemoCredentials />

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 bg-white text-gray-400 font-medium">
                  অথবা
                </span>
              </div>
            </div>
            {/* Google Button */}
            <Googlebtn />
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
