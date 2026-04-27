import config from '../../data/config.json';
import Link from 'next/link';

export default function Termpage() {

  const { terms_of_service } = config;

  return (
    <main className="min-h-screen bg-white font-banglafont">

      {/* Header */}
      <section className="bg-[#0b1120] text-white py-14 px-4">
        <div className="container mx-auto max-w-3xl">

          <h1 className="text-4xl font-bold mb-3">
            {terms_of_service.title}
          </h1>

          <p className="text-gray-400 text-sm font-roboto">
            সর্বশেষ আপডেট: {terms_of_service.last_updated}
          </p>

        </div>
      </section>

      {/* Sections */}
      <section className="py-14 px-4">
        <div className="container mx-auto max-w-3xl space-y-10">

          {terms_of_service.sections.map((section) => (
            <div
              key={section.id}
              className="border-b border-gray-100 pb-10 last:border-0"
            >

              <h2 className="text-xl font-bold text-[#0b1120] mb-3 flex items-center gap-3">

                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#0b1120] text-white text-sm font-roboto font-bold border-2 border-primary shrink-0">
                  {section.id}
                </span>

                {section.heading}
              </h2>

              <p className="text-gray-600 leading-relaxed mb-3">
                {section.text}
              </p>

              {/* List items */}
              {section.items && (
                <ul className="space-y-2 mt-3 bg-gray-50 rounded-lg p-4">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                      <span className="text-primary font-bold mt-0.5">✕</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {/* Contact page */}
              {section.contact_page && (
                <Link
                  href={section.contact_page}
                  className="inline-flex items-center gap-2 mt-3 bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-opacity-90 transition"
                >
                  যোগাযোগ পাতায় যান →
                </Link>
              )}

            </div>
          ))}

        </div>
      </section>

    </main>
  );
}