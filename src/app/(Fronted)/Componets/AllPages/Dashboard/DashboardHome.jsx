"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

// ─── Animated Counter ─────────────────────────────────────────────────────────
const Counter = ({ target, duration = 1200 }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (target === 0) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return <span>{count.toLocaleString("bn-BD")}</span>;
};

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ icon, label, value, sub, href, color, loading }) => (
  <Link href={href} className={`group relative flex flex-col gap-3 rounded-2xl border p-5 bg-white hover:shadow-lg transition-all duration-300 overflow-hidden ${color.border}`}>
    {/* Accent bar */}
    <div className={`absolute top-0 left-0 right-0 h-0.5 ${color.bar} opacity-0 group-hover:opacity-100 transition-opacity`} />

    <div className="flex items-start justify-between">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${color.bg}`}>
        {icon}
      </div>
      <svg className={`w-4 h-4 ${color.text} opacity-0 group-hover:opacity-100 transition-all translate-x-1 group-hover:translate-x-0`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </div>

    <div>
      {loading ? (
        <div className="h-8 w-16 bg-gray-100 rounded-lg animate-pulse mb-1" />
      ) : (
        <p className="text-2xl font-black text-gray-900 tabular-nums">
          <Counter target={value} />
        </p>
      )}
      <p className="text-[12px] font-semibold text-gray-500 mt-0.5">{label}</p>
      {sub && <p className="text-[10px] text-gray-300 mt-0.5">{sub}</p>}
    </div>
  </Link>
);

// ─── Recent News Row ──────────────────────────────────────────────────────────
const NewsRow = ({ item, index }) => (
  <div
    className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0 group"
    style={{ animationDelay: `${index * 60}ms` }}
  >
    {item.image ? (
      <img src={item.image} alt={item.title} className="w-12 h-12 rounded-xl object-cover flex-shrink-0 bg-gray-100" />
    ) : (
      <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0 text-xl">📰</div>
    )}
    <div className="flex-1 min-w-0">
      <p className="text-[12px] font-bold text-gray-800 leading-snug line-clamp-2 group-hover:text-black transition-colors">
        {item.title}
      </p>
      <div className="flex items-center gap-2 mt-1 flex-wrap">
        {item.author && (
          <span className="text-[10px] text-gray-400">{item.author}</span>
        )}
        <span className="text-[10px] text-gray-300">{item.formattedDate || "—"}</span>
        {item.featured && (
          <span className="text-[9px] bg-amber-50 text-amber-600 border border-amber-100 rounded-full px-1.5 py-0.5 font-bold">ফিচার্ড</span>
        )}
      </div>
    </div>
  </div>
);

// ─── Recent Comment Row ───────────────────────────────────────────────────────
const CommentRow = ({ item, index }) => (
  <div
    className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0"
    style={{ animationDelay: `${index * 60}ms` }}
  >
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
      ["bg-rose-100 text-rose-600","bg-sky-100 text-sky-600","bg-emerald-100 text-emerald-600","bg-amber-100 text-amber-600"][item.name?.charCodeAt(0) % 4]
    }`}>
      {item.name?.charAt(0).toUpperCase() || "?"}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-0.5">
        <span className="text-[11px] font-bold text-gray-800">{item.name}</span>
        <span className="text-[10px] text-gray-300">
          {new Date(item.createdAt).toLocaleDateString("bn-BD")}
        </span>
      </div>
      <p className="text-[11px] text-gray-500 line-clamp-1">{item.comment}</p>
    </div>
  </div>
);

// ─── Section Shell ────────────────────────────────────────────────────────────
const Section = ({ title, icon, href, linkLabel, loading, children }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
      <h2 className="text-[13px] font-black text-gray-800 flex items-center gap-2">
        <span>{icon}</span> {title}
      </h2>
      <Link href={href} className="text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
        {linkLabel} →
      </Link>
    </div>
    <div className="px-5 py-1">
      {loading ? (
        <div className="space-y-3 py-3">
          {[1,2,3,4].map(i => (
            <div key={i} className="flex gap-3 animate-pulse">
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex-shrink-0" />
              <div className="flex-1 space-y-2 pt-1">
                <div className="h-3 bg-gray-100 rounded w-3/4" />
                <div className="h-2 bg-gray-50 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : children}
    </div>
  </div>
);

// ─── Main Dashboard ───────────────────────────────────────────────────────────
const DashboardHome = () => {
  const [greeting, setGreeting] = useState("শুভেচ্ছা");
  const [stats, setStats] = useState({ news: 0, users: 0, comments: 0, replies: 0, contacts: 0 });
  const [recentNews, setRecentNews] = useState([]);
  const [recentComments, setRecentComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("শুভ সকাল");
    else if (hour < 17) setGreeting("শুভ দুপুর");
    else setGreeting("শুভ সন্ধ্যা");
  }, []);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [newsRes, usersRes, commentsRes, repliesRes, contactsRes] = await Promise.allSettled([
          fetch("/api/AllNews"),
          fetch("/api/auth/register"),
          fetch("/api/newsdetails/comment"),
          fetch("/api/newsdetails/replay"),
          fetch("/api/contact"),
        ]);

        const safe = async (res) => {
          if (res.status === "fulfilled" && res.value.ok) {
            const json = await res.value.json();
            return json.success ? (json.data || json.result || []) : [];
          }
          return [];
        };

        const [newsData, usersData, commentsData, repliesData, contactsData] = await Promise.all([
          safe(newsRes), safe(usersRes), safe(commentsRes), safe(repliesRes), safe(contactsRes),
        ]);

        setStats({
          news: newsData.length,
          users: usersData.length,
          comments: commentsData.length,
          replies: repliesData.length,
          contacts: contactsData.length,
        });

        setRecentNews(newsData.slice(0, 5));
        setRecentComments(commentsData.slice(0, 5));
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const statCards = [
    { icon: "📰", label: "মোট খবর", value: stats.news, sub: "প্রকাশিত নিবন্ধ", href: "/dashboard/news", color: { border: "border-gray-100 hover:border-gray-200", bar: "bg-gray-800", bg: "bg-gray-50", text: "text-gray-400" } },
    { icon: "👥", label: "মোট সদস্য", value: stats.users, sub: "নিবন্ধিত ব্যবহারকারী", href: "/dashboard/users", color: { border: "border-sky-50 hover:border-sky-100", bar: "bg-sky-500", bg: "bg-sky-50", text: "text-sky-300" } },
    { icon: "💬", label: "মোট মন্তব্য", value: stats.comments, sub: "পাঠকের মন্তব্য", href: "/dashboard/comment", color: { border: "border-emerald-50 hover:border-emerald-100", bar: "bg-emerald-500", bg: "bg-emerald-50", text: "text-emerald-300" } },
    { icon: "↩️", label: "মোট রিপ্লাই", value: stats.replies, sub: "মন্তব্যের উত্তর", href: "/dashboard/replay", color: { border: "border-violet-50 hover:border-violet-100", bar: "bg-violet-500", bg: "bg-violet-50", text: "text-violet-300" } },
    { icon: "📩", label: "যোগাযোগ বার্তা", value: stats.contacts, sub: "অপঠিত বার্তা", href: "/dashboard/contact", color: { border: "border-amber-50 hover:border-amber-100", bar: "bg-amber-400", bg: "bg-amber-50", text: "text-amber-300" } },
  ];

  return (
    <div className="space-y-6 pb-8">

      {/* ── Welcome Banner ── */}
      <div className="bg-black rounded-2xl sm:rounded-3xl px-5 sm:px-8 py-6 flex items-center justify-between overflow-hidden relative">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
        {/* Red accent blob */}
        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-red-600 opacity-10 blur-2xl" />

        <div className="relative z-10">
          <p className="text-gray-400 text-[11px] font-bold uppercase tracking-widest">
            {greeting} 👋
          </p>
          <h1 className="text-white text-lg sm:text-2xl font-black mt-1 leading-tight">
            দৈনিক ঝালকাঠি
          </h1>
          <p className="text-gray-500 text-[11px] sm:text-[12px] mt-1">
            {new Date().toLocaleDateString("bn-BD", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {statCards.map((card) => (
          <StatCard key={card.label} {...card} loading={loading} />
        ))}
      </div>

      {/* ── Today Summary Strip ── */}
      {!loading && (
        <div className="bg-gradient-to-r from-red-600 to-rose-500 rounded-2xl px-5 py-4 flex flex-wrap items-center gap-4 sm:gap-8">
          <div className="text-white">
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">আজকের সারসংক্ষেপ</p>
            <p className="text-lg font-black mt-0.5">
              {recentNews.filter(n => {
                const d = new Date(n.createdAt);
                const today = new Date();
                return d.toDateString() === today.toDateString();
              }).length} টি নতুন খবর
            </p>
          </div>
          <div className="w-px h-8 bg-white/20 hidden sm:block" />
          <div className="text-white">
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">সর্বমোট কন্টেন্ট</p>
            <p className="text-lg font-black mt-0.5">{(stats.news + stats.comments + stats.replies).toLocaleString("bn-BD")} টি</p>
          </div>
          <div className="w-px h-8 bg-white/20 hidden sm:block" />
          <div className="text-white">
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">পাঠক যোগাযোগ</p>
            <p className="text-lg font-black mt-0.5">{stats.contacts} টি অপেক্ষমাণ</p>
          </div>
          <Link
            href="/dashboard/contact"
            className="ml-auto text-[11px] font-bold text-white/80 hover:text-white border border-white/20 hover:border-white/40 rounded-xl px-3 py-2 transition-all hidden sm:inline-flex items-center gap-1"
          >
            দেখুন →
          </Link>
        </div>
      )}

      {/* ── Two Column: Recent News + Recent Comments ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Recent News */}
        <Section
          title="সাম্প্রতিক খবর"
          icon="📰"
          href="/dashboard/news"
          linkLabel="সব দেখুন"
          loading={loading}
        >
          {recentNews.length === 0 ? (
            <div className="text-center py-8 text-gray-300">
              <p className="text-sm">কোনো খবর নেই</p>
            </div>
          ) : (
            recentNews.map((item, i) => <NewsRow key={item.id || i} item={item} index={i} />)
          )}
        </Section>

        {/* Recent Comments */}
        <Section
          title="সাম্প্রতিক মন্তব্য"
          icon="💬"
          href="/dashboard/comment"
          linkLabel="সব দেখুন"
          loading={loading}
        >
          {recentComments.length === 0 ? (
            <div className="text-center py-8 text-gray-300">
              <p className="text-sm">কোনো মন্তব্য নেই</p>
            </div>
          ) : (
            recentComments.map((item, i) => <CommentRow key={item.id || i} item={item} index={i} />)
          )}
        </Section>
      </div>

      {/* ── Quick Links ── */}
      <div>
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 px-1">দ্রুত অ্যাকসেস</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { href: "/dashboard/news/create", icon: "✍️", label: "নতুন খবর লিখুন", color: "hover:bg-gray-900 hover:text-white hover:border-gray-900" },
            { href: "/dashboard/comment", icon: "💬", label: "মন্তব্য পরিচালনা", color: "hover:bg-emerald-600 hover:text-white hover:border-emerald-600" },
            { href: "/dashboard/contact", icon: "📩", label: "বার্তা দেখুন", color: "hover:bg-amber-500 hover:text-white hover:border-amber-500" },
            { href: "/dashboard/users", icon: "👥", label: "সদস্য তালিকা", color: "hover:bg-sky-500 hover:text-white hover:border-sky-500" },
          ].map((q) => (
            <Link
              key={q.href}
              href={q.href}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl border border-gray-100 bg-white text-gray-600 text-[12px] font-semibold transition-all duration-200 active:scale-95 group ${q.color}`}
            >
              <span className="text-base">{q.icon}</span>
              <span className="leading-tight">{q.label}</span>
              <svg className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
};

export default DashboardHome;