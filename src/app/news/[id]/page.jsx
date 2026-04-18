import Image from 'next/image';
import React from 'react';
import { FaCalendarAlt, FaUserEdit, FaShareAlt, FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa';

const NewsDetails = ({ params }) => {
  // স্যাম্পল ডাটা (এপিআই থেকে আসবে)
  const news = {
    title: "ঝালকাঠিতে আধুনিক প্রযুক্তি মেলা উদ্বোধন: নতুন সম্ভাবনার দুয়ার",
    category: "জাতীয়",
    author: "নিজস্ব প্রতিবেদক",
    date: "১৮ এপ্রিল, ২০২৬",
    image: "https://i.ibb.co.com/Xk2qtfwx/imaegsneed.jpg",
    content: `
      ঝালকাঠি প্রতিনিধি: স্থানীয় তরুণদের উদ্ভাবনী শক্তি প্রদর্শনের লক্ষ্যে আজ ঝালকাঠি সদর চত্বরে বিশাল এক প্রযুক্তি মেলার আয়োজন করা হয়েছে। 
      অনুষ্ঠানে প্রধান অতিথি হিসেবে উপস্থিত ছিলেন জেলা প্রশাসক। মেলার উদ্বোধনী বক্তব্যে তিনি বলেন, প্রযুক্তিই আগামী দিনের চালিকাশক্তি। 
      \n\n
      মেলায় প্রায় ৫০টি স্টলে বিভিন্ন স্কুল ও কলেজের শিক্ষার্থীরা তাদের তৈরি রোবট, স্মার্ট হোম সিস্টেম এবং পরিবেশবান্ধব জ্বালানি প্রকল্প প্রদর্শন করছে। 
      দর্শনার্থীদের উপচে পড়া ভিড় লক্ষ্য করা গেছে সকাল থেকেই। আয়োজকরা জানিয়েছেন, তিন দিনব্যাপী এই মেলা প্রতিদিন সকাল ১০টা থেকে রাত ৮টা পর্যন্ত সবার জন্য উন্মুক্ত থাকবে।
    `
  };

  return (
    <div className="bg-base-100 min-h-screen font-banglafont pb-20">
      <div className="container mx-auto px-4 pt-10">
        <div className="max-w-4xl mx-auto">
          
          {/* Header Info */}
          <div className="mb-6">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold mb-4 inline-block">
              {news.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-black leading-tight mb-6">
              {news.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-between gap-4 border-y border-base-200 py-4">
              <div className="flex items-center gap-6 text-sm text-base-content/60">
                <div className="flex items-center gap-2">
                  <FaUserEdit className="text-primary" />
                  <span>{news.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-primary" />
                  <span className="font-roboto">{news.date}</span>
                </div>
              </div>
              
              {/* Share Buttons */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1 text-base-content/40">
                  <FaShareAlt /> Share
                </span>
                <button className="btn btn-circle btn-sm btn-ghost hover:text-blue-600"><FaFacebook size={20}/></button>
                <button className="btn btn-circle btn-sm btn-ghost hover:text-blue-400"><FaTwitter size={20}/></button>
                <button className="btn btn-circle btn-sm btn-ghost hover:text-green-500"><FaWhatsapp size={20}/></button>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative rounded-2xl overflow-hidden mb-10 shadow-xl border border-base-200">
            <Image height={675} width={1200} src={news.image} alt={news.title} className="w-full h-auto object-cover" />
          </div>

          {/* News Content */}
          <div className="prose prose-lg max-w-none text-base-content/80 leading-relaxed space-y-6">
             {news.content.split('\n').map((paragraph, index) => (
               <p key={index}>{paragraph}</p>
             ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default NewsDetails;