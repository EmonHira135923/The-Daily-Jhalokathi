import config from '../../data/config.json';
import { FaEnvelope } from 'react-icons/fa';

export default function Privacypage() {

  const { privacy_policy } = config;

  return (
    <main className="min-h-screen bg-white font-banglafont">

      {/* Header */}
      <section className="bg-[#0b1120] text-white py-14 px-4">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold mb-3">
            {privacy_policy.title}
          </h1>

          <p className="text-gray-400 text-sm font-roboto">
            সর্বশেষ আপডেট: {privacy_policy.last_updated}
          </p>
        </div>
      </section>

      {/* Sections */}
      <section className="py-14 px-4">
        <div className="container mx-auto max-w-3xl space-y-10">

          {privacy_policy.sections.map((section) => (
            <div
              key={section.id}
              className="border-b border-gray-100 pb-10 last:border-0"
            >

              <h2 className="text-xl font-bold text-[#0b1120] mb-3 flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-roboto font-bold shrink-0">
                  {section.id}
                </span>
                {section.heading}
              </h2>

              <p className="text-gray-600 leading-relaxed mb-3">
                {section.text}
              </p>

              {/* List items */}
              {section.items && (
                <ul className="space-y-2 mt-3">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                      <span className="text-primary mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {/* FIXED CONTACT */}
              {section.contact_email && (
                <a
                  href={`mailto:${config.email}`}
                  className="inline-flex items-center gap-2 mt-3 text-primary hover:underline text-sm"
                >
                  <FaEnvelope />
                  {config.email}
                </a>
              )}

            </div>
          ))}

        </div>
      </section>

    </main>
  );
}