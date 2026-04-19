import React from "react";
import {Send} from "lucide-react";

const ContactForm = () => {
  return (
    <div>
      <div className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            নাম <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            placeholder="আপনার নাম"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            ইমেইল <span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            name="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            placeholder="your@email.com"
            required
          />
        </div>

        {/* Subject */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">বিষয়</label>
          <input
            type="text"
            name="subject"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            placeholder="বার্তার বিষয়"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            বার্তা <span className="text-red-600">*</span>
          </label>
          <textarea
            name="message"
            rows="6"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
            placeholder="আপনার বার্তা লিখুন..."
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
        >
          <Send className="w-5 h-5" />
          <span>বার্তা পাঠান</span>
        </button>
      </div>
    </div>
  );
};

export default ContactForm;
