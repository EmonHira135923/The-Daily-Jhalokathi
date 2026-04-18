"use client"
import Image from 'next/image';
import React from 'react';

const Loading = () => {
    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white">
            <div className="relative flex flex-col items-center">
                
                {/* Logo with Pulse Animation */}
                <div className="relative w-32 h-32 md:w-40 md:h-40 mb-6 animate-pulse">
                    <Image 
                        src="/logo.png" // আপনার public ফোল্ডারে লোগোটির নাম logo.png রেখে এখানে পাথ দিন
                        alt="The Daily Jhalokathi Logo"
                        fill
                        className="object-contain"
                    />
                </div>

                {/* Animated Loading Text & Spinner */}
                <div className="flex flex-col items-center gap-3">
                    <div className="flex items-center gap-2">
                        <span className="loading loading-ring loading-md text-red-600"></span>
                        <p className="text-gray-500 font-banglafont font-medium tracking-wide">
                            সংবাদ লোড হচ্ছে...
                        </p>
                    </div>
                    
                    {/* Progress Bar Style */}
                    <div className="w-48 h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div className="w-full h-full bg-red-600 origin-left animate-loading-bar"></div>
                    </div>
                </div>
            </div>

            {/* Bottom Footer Text */}
            <div className="absolute bottom-10">
                <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400 font-roboto">
                    The Daily Jhalokathi
                </p>
            </div>

            <style jsx>{`
                @keyframes loading-bar {
                    0% { transform: scaleX(0); }
                    50% { transform: scaleX(0.7); }
                    100% { transform: scaleX(1); }
                }
                .animate-loading-bar {
                    animation: loading-bar 2s infinite ease-in-out;
                }
            `}</style>
        </div>
    );
};

export default Loading;