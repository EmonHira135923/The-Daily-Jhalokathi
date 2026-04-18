import Link from 'next/link';
import React from 'react';

const NotFound = () => {
    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-white font-banglafont px-4">
            <div className="max-w-2xl text-center relative">
                
                {/* Background 404 Watermark */}
                <h1 className="text-[12rem] md:text-[18rem] font-black text-gray-300 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
                    404
                </h1>

                <div className="relative z-10">          
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4 tracking-tight">
                        দুঃখিত, পাতাটি খুঁজে পাওয়া যায়নি!
                    </h2>
                    
                    <p className="text-gray-500 text-base md:text-lg mb-10 max-w-md mx-auto leading-relaxed">
                        আপনি যে সংবাদ বা পাতাটি খুঁজছেন তা হয়তো সরানো হয়েছে অথবা লিংকটি ভুল। 
                        আমাদের হোম পেজে গিয়ে সর্বশেষ সংবাদগুলো দেখতে পারেন।
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link 
                            href="/" 
                            className="bg-red-600 text-white font-bold py-3 px-10 rounded-full shadow-lg shadow-red-200 hover:bg-red-700 hover:scale-105 transition-all duration-300"
                        >
                            হোম পেজে ফিরে যান
                        </Link>
                        
                        <Link 
                            href="/contact" 
                            className="text-gray-600 font-semibold py-3 px-10 rounded-full border border-gray-200 hover:bg-gray-50 transition-all duration-300"
                        >
                            যোগাযোগ করুন
                        </Link>
                    </div>
                </div>

                {/* Bottom Decorative Dots */}
                <div className="mt-20 flex justify-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-600 opacity-20"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-red-600 opacity-40"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-red-600 opacity-20"></div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;