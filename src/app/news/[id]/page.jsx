import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaCalendarAlt, FaUserEdit } from "react-icons/fa";
import { getCategoryName, getNewsById, getNewsBySlug } from "@/lib/newsData";
import ShareButtons from "@/app/Componets/Shared/ShareButtons";

export async function generateStaticParams() {
  const { newsItems } = await import("@/lib/newsData");
  return newsItems.map((item) => ({ id: item.id.toString() }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const news = getNewsById(id);

  if (!news) {
    return {
      title: "সংবাদ খুঁজে পাওয়া যায়নি | The Daily News",
      description: "দুঃখিত, আপনার চাওয়া সংবাদ পাওয়া যায়নি।",
    };
  }

  return {
    title: news.title,
    description: news.description,
    openGraph: {
      title: news.title,
      description: news.description,
      type: "article",
      images: [{ url: news.image, width: 1200, height: 675, alt: news.title }],
    },
    twitter: {
      title: news.title,
      description: news.description,
      images: [news.image],
      card: "summary_large_image",
    },
  };
}

const NewsDetails = async ({ params }) => {
  const { id } = await params;
  const news = getNewsById(id);

  if (!news) {
    notFound();
  }

  const relatedNews = getNewsBySlug(news.slug).filter((item) => item.id !== news.id).slice(0, 4);

  return (
    <div className="bg-base-100 min-h-screen font-banglafont pb-20">
      <div className="container mx-auto px-4 pt-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-[3fr_1fr] gap-10">
            <article className="space-y-8">
              <div className="space-y-4">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold inline-block">
                  {getCategoryName(news.slug)}
                </span>
                <h1 className="text-3xl md:text-5xl font-black leading-tight">
                  {news.title}
                </h1>

                <div className="flex flex-wrap items-center justify-between gap-4 border-y border-base-200 py-4">
                  <div className="flex flex-wrap items-center gap-6 text-sm text-base-content/60">
                    <div className="flex items-center gap-2">
                      <FaUserEdit className="text-primary" />
                      <span>{news.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-primary" />
                      <span className="font-roboto">{news.date}</span>
                    </div>
                  </div>

                  <ShareButtons />
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[1.5rem] border border-base-200 shadow-lg">
                <Image
                  height={675}
                  width={1200}
                  src={news.image}
                  alt={news.title}
                  className="h-auto w-full object-cover"
                />
              </div>

              <div className="prose prose-lg max-w-none text-base-content/90 leading-relaxed space-y-6">
                {news.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {news.quote && (
                <div className="mt-10 rounded-3xl border border-primary/20 bg-primary/5 p-6 shadow-sm">
                  <p className="text-lg font-semibold text-primary">“{news.quote.text}”</p>
                  <p className="mt-3 text-sm text-slate-600">— {news.quote.author}</p>
                </div>
              )}

              <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-2xl font-bold mb-4">মন্তব্য করুন</h2>
                <p className="text-sm text-gray-600 mb-6">আপনার মন্তব্য এখানে লিখে আমাদের সংবাদ নিয়ে আলোচনা করুন।</p>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <label className="block">
                      <span className="text-sm font-medium text-gray-700">নাম *</span>
                      <input
                        type="text"
                        placeholder="আপনার নাম"
                        className="mt-2 w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm font-medium text-gray-700">ইমেইল *</span>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        className="mt-2 w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                      />
                    </label>
                  </div>
                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">মন্তব্য *</span>
                    <textarea
                      rows="5"
                      placeholder="আপনার মন্তব্য লিখুন..."
                      className="mt-2 w-full rounded-3xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                    />
                  </label>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
                  >
                    মন্তব্য পাঠান
                  </button>
                </form>
              </section>
            </article>

            <aside className="space-y-8">
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4">সম্পর্কিত সংবাদ</h2>
                <div className="space-y-4">
                  {relatedNews.map((item) => (
                    <Link
                      key={item.id}
                      href={`/news/${item.id}`}
                      className="block rounded-3xl border border-base-200 bg-slate-50 p-4 transition hover:border-primary hover:bg-white"
                    >
                      <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                      <p className="text-xs text-slate-500 mt-2">{item.date}</p>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4">ট্যাগ</h2>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm">{getCategoryName(news.slug)}</span>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm">বাংলা</span>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm">নিউজ</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetails;