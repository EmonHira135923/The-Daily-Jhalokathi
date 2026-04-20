import React from "react";
import { Mail, MapPin, Globe, Phone } from "lucide-react";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import ContactForm from "../Forms/ContactForm";
import config from "../../data/config.json";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">যোগাযোগ</h1>
          <div className="h-1 w-24 bg-red-600 mb-4"></div>
          <p className="text-gray-600 text-lg">
            আমাদের সাথে যোগাযোগ করতে নিম্নোক্ত ফর্মটি পূরণ করুন
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Side - Contact Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              আমাদের তথ্য
            </h2>

            {/* Email */}
            <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-red-600" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">ইমেইল</h3>
                <a
                  href={`mailto:${config.email}`}
                  className="text-red-600 hover:text-red-700 transition-colors"
                >
                  {config.email}
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-red-600" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">ফোন</h3>
                <a
                  href={`tel:${config.phone}`}
                  className="text-red-600 hover:text-red-700 transition-colors"
                >
                  {config.phone}
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-red-600" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">ঠিকানা</h3>
                <p className="text-gray-600">
                  {config.address}
                </p>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Globe className="w-6 h-6 text-red-600" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  সোশ্যাল মিডিয়া
                </h3>
                <div className="flex items-center gap-3">
                  <a
                    href={config.social_links.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                    aria-label="Facebook"
                  >
                    <FaFacebook className="h-5 w-5" />
                  </a>
                  <a
                    href={config.social_links.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
                    aria-label="YouTube"
                  >
                    <FaYoutube className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              বার্তা পাঠান
            </h2>
            {/* Contact Form */}
            <ContactForm/>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            আমরা যত দ্রুত সম্ভব আপনার বার্তার উত্তর দেব। ধন্যবাদ!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;