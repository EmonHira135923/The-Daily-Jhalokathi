import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getCategoryName, getNewsBySlug } from "@/(Backend)/lib/newsData";

const CategoryPage = ({ slug }) => {
  const categoryName = getCategoryName(slug);
  const items = getNewsBySlug(slug);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 font-sans">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-black mb-3">{categoryName} সংবাদ</h1>
        <p className="text-sm text-gray-600 max-w-3xl">
          {categoryName} বিভাগে সর্বশেষ সংবাদ, বিশ্লেষণ ও আপডেটগুলো এখানে পাবেন।
        </p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-500">
          এই বিভাগের জন্য এখনও কোনো সংবাদ যোগ করা হয়নি।
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/news/${item.id}`}
              className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1"
            >
              <div className="relative h-52 overflow-hidden bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-800">
                  {categoryName}
                </span>
                <h2 className="mt-4 text-lg font-bold text-slate-900 line-clamp-2">{item.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 line-clamp-3">
                  {item.description ?? item.content?.[0] ?? "বিস্তারিত সংবাদটি পড়তে ক্লিক করুন।"}
                </p>
                <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                  <span>{item.time}</span>
                  <span>{item.author}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
};

export default CategoryPage;
