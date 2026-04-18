import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const HomeNewsGrid = () => {
  const featuredNews = {
    id: 1,
    title: "ঝালকাঠিতে আধুনিক প্রযুক্তি মেলা উদ্বোধন: নতুন সম্ভাবনার দুয়ার",
    description: "স্থানীয় তরুণদের উদ্ভাবনী শক্তি প্রদর্শনের লক্ষ্যে আজ ঝালকাঠি সদর চত্বরে বিশাল এক প্রযুক্তি মেলার আয়োজন করা হয়েছে। অনুষ্ঠানে প্রধান অতিথি হিসেবে উপস্থিত ছিলেন জেলা প্রশাসক। মেলার উদ্বোধনী বক্তব্যে তিনি বলেন, প্রযুক্তিই আগামী দিনের চালিকাশক্তি।",
    image: "https://i.ibb.co.com/Xk2qtfwx/imaegsneed.jpg",
    category: "জাতীয়",
    time: "১০ মিনিট আগে"
  };

  const sideNews = [
    { id: 2, title: "শহরের প্রধান সড়কে ড্রেনেজ ব্যবস্থার উন্নয়ন কাজ শুরু", image: "https://images.unsplash.com/photo-1541535650810-10d26f5c2abb?q=80&w=400", time: "৩০ মিনিট আগে" },
    { id: 3, title: "আন্তঃস্কুল ফুটবল প্রতিযোগিতায় চ্যাম্পিয়ন ঝালকাঠি একাডেমি", image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=400", time: "১ ঘণ্টা আগে" },
    { id: 4, title: "বাজারে ইলিশের সরবরাহ বৃদ্ধি, কমছে দাম", image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=400", time: "২ ঘণ্টা আগে" },
    { id: 5, title: "নতুন শিক্ষা কারিকুলাম নিয়ে শিক্ষকদের বিশেষ কর্মশালা", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=400", time: "৩ ঘণ্টা আগে" }
  ];

  return (
    <section className="container mx-auto px-4 py-8 font-banglafont">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Side: Big Card */}
        <div className="lg:col-span-8 group">
          <Link href={`/news/${featuredNews.id}`} className="h-full block">
            <div className="relative overflow-hidden rounded-2xl bg-base-100 shadow-md border border-base-200 h-full flex flex-col">
              <div className="relative aspect-video overflow-hidden shrink-0">
                <Image 
                  src={featuredNews.image} 
                  alt={featuredNews.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                <span className="absolute top-4 left-4 bg-primary text-white px-3 py-1 text-xs font-bold rounded-lg z-10">
                  {featuredNews.category}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold mb-4 group-hover:text-primary transition-colors leading-tight">
                    {featuredNews.title}
                  </h2>
                  <p className="text-base-content/70 text-sm md:text-base line-clamp-3 mb-4">
                    {featuredNews.description}
                  </p>
                </div>
                <div className="text-xs text-base-content/50 font-roboto border-t border-base-200 pt-4">
                  {featuredNews.time}
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Right Side: 4 Side Cards */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {sideNews.map((news) => (
            <Link key={news.id} href={`/news/${news.id}`} className="flex-1 min-h-[110px]">
              <div className="flex gap-4 p-3 bg-base-100 rounded-xl hover:shadow-lg transition-all border border-base-200 h-full items-center">
                <div className="relative w-24 h-24 shrink-0 overflow-hidden rounded-lg">
                  <Image 
                    src={news.image} 
                    alt={news.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-sm font-bold leading-snug line-clamp-2 hover:text-primary transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-[10px] text-base-content/50 font-roboto">
                    {news.time}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeNewsGrid;