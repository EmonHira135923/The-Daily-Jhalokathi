import { FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import config from "../../data/config.json";

export default function Aboutpage() {

  const { about } = config;

  const valueIcons = ['✦', '◈', '❖', '◉'];

  return (
    <main className="min-h-screen bg-white font-banglafont">

      {/* Hero */}
      <section className="bg-[#0b1120] text-white py-16 px-4">
        <div className="container mx-auto max-w-4xl">

          {/* FIXED */}
          <p className="text-primary text-sm uppercase tracking-widest mb-3 font-roboto">
            {config.site_name_english}
          </p>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            {about.title}
          </h1>

          {/* FIXED */}
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
            {config.site_description}
          </p>

        </div>
      </section>

      {/* Mission & Team */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl grid md:grid-cols-2 gap-12">

          <div className="border-l-4 border-primary pl-6">
            <h2 className="text-2xl font-bold text-[#0b1120] mb-4">
              {about.mission.heading}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {about.mission.text}
            </p>
          </div>

          <div className="border-l-4 border-gray-200 pl-6">
            <h2 className="text-2xl font-bold text-[#0b1120] mb-4">
              {about.team.heading}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {about.team.text}
            </p>
          </div>

        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-[#0b1120] mb-10 text-center">
            {about.values.heading}
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            {about.values.items.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex gap-4 items-start hover:shadow-md transition-shadow"
              >
                <span className="text-primary text-2xl mt-1">{valueIcons[i]}</span>
                <div>
                  <h3 className="text-lg font-bold text-[#0b1120] mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Strip */}
      <section className="py-12 px-4 bg-[#0b1120] text-white">
        <div className="container mx-auto max-w-4xl flex flex-col md:flex-row items-center justify-between gap-6">

          <p className="text-xl font-bold">আমাদের সাথে যোগাযোগ করুন</p>

          <div className="flex flex-wrap gap-6 text-sm text-gray-300">

            {/* FIXED */}
            <a href={`mailto:${config.email}`} className="flex items-center gap-2 hover:text-primary transition-colors">
              <FaEnvelope className="text-primary" />
              {config.email}
            </a>

            {/* FIXED */}
            <span className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-primary" />
              {config.address}
            </span>

          </div>
        </div>
      </section>

    </main>
  );
}