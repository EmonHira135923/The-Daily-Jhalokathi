"use client";
import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaYoutube, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  // ১. ডায়নামিক বছর বের করা
  const currentYear = new Date().getFullYear();

  // ২. ক্যাটাগরি লিস্ট (এটি আপনি প্রপস হিসেবেও নিতে পারেন বা এখানে রাখতে পারেন)
  const categories = [
    { name: "অপরাধ", slug: "crime" },
    { name: "বাণিজ্য", slug: "business" },
    { name: "জাতীয়", slug: "national" },
    { name: "আন্তর্জাতিক", slug: "international" },
    { name: "রাজনীতি", slug: "politics" },
    { name: "অর্থনীতি", slug: "economics" },
    { name: "খেলাধুলা", slug: "sports" },
    { name: "বিনোদন", slug: "entertainment" },
  ];

  const portalLinks = [
    { name: "আমাদের সম্পর্কে", slug: "about" },
    { name: "যোগাযোগ", slug: "contact" },
    { name: "বিজ্ঞাপন", slug: "ads" },
    { name: "গোপনীয়তা নীতি", slug: "privacy" },
    { name: "ব্যবহারের শর্ত", slug: "terms" },
  ];

  return (
    <footer className="bg-[#0b1120] text-gray-300 font-banglafont pt-12 pb-6 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/">
              <h2 className="text-3xl font-bold text-white mb-2">
                দৈনিক ঝালকাঠি
              </h2>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              সত্যের সন্ধানে, সবার জন্য। বস্তুনিষ্ঠ সংবাদ পরিবেশনাই আমাদের মূল লক্ষ্য।
            </p>
            <div className="flex gap-4 pt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors bg-gray-800 p-2 rounded-full">
                <FaFacebook size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors bg-gray-800 p-2 rounded-full">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* ডায়নামিক বিভাগ (Categories) */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 border-l-4 border-primary pl-3">
              বিভাগ
            </h3>
            <ul className="grid grid-cols-2 gap-3 text-sm">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/category/${cat.slug}`} className="hover:text-primary transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ডায়নামিক পোর্টাল (Portal Links) */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 border-l-4 border-primary pl-3">
              পোর্টাল
            </h3>
            <ul className="space-y-3 text-sm">
              {portalLinks.map((link) => (
                <li key={link.slug}>
                  <Link href={`/${link.slug}`} className="hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* যোগাযোগ (Contact Info) */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 border-l-4 border-primary pl-3">
              যোগাযোগ
            </h3>
            <ul className="space-y-4 text-sm font-roboto">
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-primary" />
                <a href="mailto:contact@dailyjhalokathi.com" className="hover:underline">
                  contact@dailyjhalokathi.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-primary mt-1" />
                <span className="font-banglafont">ঝালকাঠি সদর, ঝালকাঠি</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar with Dynamic Year */}
        <div className="mt-12 pt-6 border-t border-gray-800 text-center text-xs text-gray-500">
          <p>© {currentYear} দৈনিক ঝালকাঠি। সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;