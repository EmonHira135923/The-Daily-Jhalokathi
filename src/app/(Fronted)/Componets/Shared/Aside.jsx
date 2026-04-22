"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const navLinks = [
  {
    group: "প্রধান",
    items: [
      {
        name: "ড্যাশবোর্ড",
        href: "/dashboard",
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
        ),
      },
    ],
  },
  {
    group: "কন্টেন্ট",
    items: [
      {
        name: "সব খবর",
        href: "/dashboard/news",
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v8a2 2 0 01-2 2z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 2v6h6M9 12h6M9 16h4" />
          </svg>
        ),
      },
      {
        name: "নতুন খবর",
        href: "/dashboard/news/create",
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        ),
      },
      {
        name: "ক্যাটাগরি",
        href: "/dashboard/category",
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h10M7 12h6M7 17h8" />
          </svg>
        ),
      },
    ],
  },
  {
    group: "ব্যবহারকারী",
    items: [
      {
        name: "সদস্যগণ",
        href: "/dashboard/users",
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
          </svg>
        ),
      },
      {
        name: "মন্তব্য",
        href: "/dashboard/comments",
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72A7.965 7.965 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        ),
      },
    ],
  },
];

const Aside = ({ sidebarOpen, onClose, collapsed }) => {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar — always fixed, width changes on collapse */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40
          flex flex-col bg-white border-r border-gray-100
          transition-all duration-300 ease-in-out
          ${collapsed ? "md:w-[72px]" : "md:w-64"}
          w-64
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Logo */}
        <Link
          href="/"
          onClick={onClose}
          className="flex items-center gap-2.5 h-16 px-4 border-b border-gray-100 shrink-0 group overflow-hidden"
        >
          <span className="w-7 h-7 rounded-lg bg-red-600 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
            </svg>
          </span>
          {!collapsed && (
            <div className="overflow-hidden whitespace-nowrap">
              <p className="text-[13px] font-black text-black tracking-tight leading-none">
                দৈনিক ঝালকাঠি
              </p>
              <p className="text-[9px] text-gray-400 uppercase tracking-widest mt-0.5">
                Admin Panel
              </p>
            </div>
          )}
        </Link>

        {/* Nav */}
        <nav className="flex-1 px-2 py-5 overflow-y-auto space-y-5">
          {navLinks.map((group) => (
            <div key={group.group}>
              {!collapsed && (
                <p className="px-3 mb-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  {group.group}
                </p>
              )}
              <div className="space-y-0.5">
                {group.items.map((link) => {
                  const isActive =
                    pathname === link.href ||
                    (link.href !== "/dashboard" && pathname.startsWith(link.href));

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={onClose}
                      title={collapsed ? link.name : ""}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-150
                        ${isActive ? "bg-black text-white shadow-sm" : "text-gray-500 hover:bg-gray-50 hover:text-black"}
                        ${collapsed ? "justify-center" : ""}
                      `}
                    >
                      <span className={`shrink-0 ${isActive ? "text-white" : "text-gray-400"}`}>
                        {link.icon}
                      </span>
                      {!collapsed && (
                        <>
                          <span className="truncate">{link.name}</span>
                          {isActive && (
                            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white opacity-70 shrink-0" />
                          )}
                        </>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        {!collapsed && (
          <div className="px-4 py-3 border-t border-gray-100">
            <p className="text-[10px] text-gray-400 text-center">
              © {new Date().getFullYear()} দৈনিক ঝালকাঠি
            </p>
          </div>
        )}
      </aside>
    </>
  );
};

export default Aside;