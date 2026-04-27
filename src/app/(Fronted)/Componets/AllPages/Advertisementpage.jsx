import config from '../../data/config.json';
import { FaEnvelope, FaClock } from 'react-icons/fa';

export default function Advertisementpage() {

  const { advertisement } = config;

  return (
    <main className="min-h-screen bg-white font-banglafont">

      {/* Hero */}
      <section className="bg-[#0b1120] text-white py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {advertisement.title}
          </h1>
          <p className="text-xl text-primary font-semibold mb-4">
            {advertisement.subtitle}
          </p>
          <p className="text-gray-300 max-w-2xl leading-relaxed">
            {advertisement.description}
          </p>
        </div>
      </section>

      {/* Ad Types */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-[#0b1120] mb-8 border-l-4 border-primary pl-4">
            বিজ্ঞাপনের ধরন
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            {advertisement.ad_types.map((ad, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-xl p-6 hover:border-primary hover:shadow-md transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-[#0b1120] group-hover:text-primary transition-colors">
                    {ad.name}
                  </h3>
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded font-roboto">
                    {ad.size}
                  </span>
                </div>

                <p className="text-gray-500 text-sm">
                  {ad.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Contact */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-[#0b1120] mb-8 border-l-4 border-primary pl-4">
            বিজ্ঞাপনের জন্য যোগাযোগ
          </h2>

          <div className="bg-[#0b1120] rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">

            <p className="text-gray-300 max-w-sm leading-relaxed text-sm">
              বিজ্ঞাপন দিতে আগ্রহী হলে আমাদের সাথে যোগাযোগ করুন। আমরা আপনার বাজেট ও প্রয়োজন অনুসারে একটি কার্যকর বিজ্ঞাপন পরিকল্পনা তৈরি করে নেব।
            </p>

            <div className="flex flex-col gap-4 text-sm">

              {/* FIXED */}
              <a
                href={`mailto:${config.email}`}
                className="flex items-center gap-3 bg-primary text-white px-5 py-3 rounded-lg hover:bg-opacity-90 transition"
              >
                <FaEnvelope />
                {config.email}
              </a>

              <span className="flex items-center gap-3 text-gray-400">
                <FaClock className="text-primary" />
                {advertisement.contact.office_hours}
              </span>

            </div>

          </div>
        </div>
      </section>

    </main>
  );
}