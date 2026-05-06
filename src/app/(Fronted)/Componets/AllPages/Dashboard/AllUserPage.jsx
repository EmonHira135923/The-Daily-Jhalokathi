"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import AdminUserUpdate from "../../Forms/Admin/AdminUserUpdate";

const PAGE_SIZE = 10;

// ── Pagination ────────────────────────────────────────────────────────────────
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = useMemo(() => {
    const arr = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) arr.push(i);
    } else {
      arr.push(1);
      if (currentPage > 3) arr.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) arr.push(i);
      if (currentPage < totalPages - 2) arr.push("...");
      arr.push(totalPages);
    }
    return arr;
  }, [currentPage, totalPages]);

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-4 border-t border-gray-100">
      <p className="text-xs text-gray-400 shrink-0">
        পৃষ্ঠা <span className="font-bold text-gray-700">{currentPage}</span> /{" "}
        <span className="font-bold text-gray-700">{totalPages}</span>
      </p>

      <div className="flex items-center gap-1 flex-wrap">
        {/* Prev */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all flex items-center gap-1 text-gray-600"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden xs:inline">আগে</span>
        </button>

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {pages.map((p, idx) =>
            p === "..." ? (
              <span key={`dots-${idx}`} className="px-2 text-gray-300 text-xs select-none">
                ···
              </span>
            ) : (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                className={`w-8 h-8 text-xs font-bold rounded-lg transition-all active:scale-95 ${
                  p === currentPage
                    ? "bg-red-600 text-white shadow-sm shadow-red-200"
                    : "hover:bg-gray-100 text-gray-600 border border-gray-200"
                }`}
              >
                {p}
              </button>
            )
          )}
        </div>

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all flex items-center gap-1 text-gray-600"
        >
          <span className="hidden xs:inline">পরে</span>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────
const AllUserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [currentAdminId, setCurrentAdminId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const DEFAULT_AVATAR = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  // ── Pagination ──
  const totalPages = Math.ceil(users.length / PAGE_SIZE);
  const pagedUsers = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return users.slice(start, start + PAGE_SIZE);
  }, [users, currentPage]);

  const fetchMyProfile = useCallback(async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return;
      const res = await fetch("/api/auth/myprofile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        const id = data.result._id?.$oid || data.result._id;
        setCurrentAdminId(String(id));
      }
    } catch (error) {
      console.error("Profile fetch error", error);
    }
  }, []);

  const getAllUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", { cache: "no-store" });
      const data = await res.json();
      if (data.success) {
        setUsers(data.result);
        setCurrentPage(1);
      }
    } catch {
      toast.error("সার্ভার কানেকশন এরর!");
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMyProfile();
      getAllUsers();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchMyProfile, getAllUsers]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;
    try {
      const token = localStorage.getItem("accessToken");
      const userIdToDelete = userToDelete._id?.$oid || userToDelete._id;
      const res = await fetch(`/api/auth/delete-user/${userIdToDelete}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        setUsers((prev) =>
          prev.filter((u) => (u._id?.$oid || u._id) !== userIdToDelete)
        );
        document.getElementById("delete_confirm_modal").close();
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("ডিলিট করতে সমস্যা হয়েছে!");
    }
  };

  // ── Skeleton Row ──
  const SkeletonRow = () => (
    <tr className="animate-pulse border-b border-gray-50">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-100 rounded-xl shrink-0" />
          <div className="space-y-2">
            <div className="h-3 w-24 bg-gray-200 rounded" />
            <div className="h-2 w-16 bg-gray-100 rounded" />
          </div>
        </div>
      </td>
      <td className="px-4 py-3 hidden sm:table-cell">
        <div className="space-y-2">
          <div className="h-3 w-32 bg-gray-200 rounded" />
          <div className="h-2 w-20 bg-gray-100 rounded" />
        </div>
      </td>
      <td className="px-4 py-3 hidden md:table-cell">
        <div className="h-6 w-16 bg-gray-100 rounded-full" />
      </td>
      <td className="px-4 py-3">
        <div className="flex justify-center gap-2">
          <div className="h-5 w-12 bg-gray-100 rounded" />
          <div className="h-5 w-12 bg-gray-100 rounded" />
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 font-banglafont text-black overflow-hidden">

      {/* Header */}
      <div className="flex flex-wrap gap-3 justify-between items-center px-4 sm:px-6 py-4 border-b border-gray-100">
        <div>
          <h2 className="text-lg sm:text-xl font-bold">সদস্য তালিকা</h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            মোট সদস্য:{" "}
            {loading ? (
              <span className="animate-pulse inline-block w-5 h-3 bg-gray-200 rounded align-middle" />
            ) : (
              <span className="font-bold text-black">{users.length}</span>
            )}
            {!loading && users.length > 0 && (
              <span className="ml-2 text-gray-400 text-xs">
                · পৃষ্ঠা {currentPage}/{totalPages} · প্রতি পৃষ্ঠায় {PAGE_SIZE}জন
              </span>
            )}
          </p>
        </div>
        <button
          onClick={getAllUsers}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 active:scale-95 transition-all"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m0 0A8.001 8.001 0 0112 4a8 8 0 110 16 8.001 8.001 0 01-8-7.582M4 9h5" />
          </svg>
          রিফ্রেশ
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
              <th className="px-4 py-3 text-left font-semibold">ইউজার</th>
              <th className="px-4 py-3 text-left font-semibold hidden sm:table-cell">যোগাযোগ</th>
              <th className="px-4 py-3 text-left font-semibold hidden md:table-cell">রোল</th>
              <th className="px-4 py-3 text-center font-semibold">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {/* Skeleton */}
            {loading && [1, 2, 3, 4, 5].map((i) => <SkeletonRow key={i} />)}

            {/* Data */}
            {!loading &&
              pagedUsers.map((user) => {
                const userId = user._id?.$oid
                  ? String(user._id.$oid)
                  : String(user._id);
                const isMe = currentAdminId === userId;
                const imageLink =
                  user.image?.secure_url ||
                  (typeof user.image === "string" ? user.image : DEFAULT_AVATAR);

                return (
                  <tr key={userId} className="hover:bg-gray-50/60 transition-colors">
                    {/* User */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-gray-100 shrink-0">
                          <Image
                            src={imageLink}
                            alt="user"
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-[13px] sm:text-[14px] truncate max-w-[120px] sm:max-w-none">
                            {user.name}
                            {isMe && (
                              <span className="text-blue-500 text-[10px] ml-1 font-normal">(আপনি)</span>
                            )}
                          </div>
                          <div className="text-[10px] text-gray-400">#{userId?.slice(-6)}</div>
                          <div className="text-[11px] text-gray-500 sm:hidden truncate max-w-[140px]">
                            {user.email}
                          </div>
                          <div className="mt-1 md:hidden">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                              user.role === "admin"
                                ? "bg-red-100 text-red-600"
                                : "bg-green-100 text-green-600"
                            }`}>
                              {user.role === "admin" ? "অ্যাডমিন" : "সদস্য"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <div className="text-[13px] text-gray-700 truncate max-w-[200px]">{user.email}</div>
                      <div className="text-[11px] text-gray-400">{user.phone || "ফোন নেই"}</div>
                    </td>

                    {/* Role */}
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                        user.role === "admin"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}>
                        {user.role === "admin" ? "অ্যাডমিন" : "সদস্য"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            document.getElementById("admin_edit_modal").showModal();
                          }}
                          className="px-2.5 py-1 text-[11px] sm:text-xs font-bold text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 active:scale-95 transition-all"
                        >
                          এডিট
                        </button>
                        <button
                          onClick={() => {
                            setUserToDelete(user);
                            document.getElementById("delete_confirm_modal").showModal();
                          }}
                          disabled={isMe}
                          className={`px-2.5 py-1 text-[11px] sm:text-xs font-bold rounded-lg active:scale-95 transition-all ${
                            isMe
                              ? "text-gray-300 bg-gray-50 cursor-not-allowed"
                              : "text-red-600 bg-red-50 hover:bg-red-100"
                          }`}
                        >
                          {isMe ? "🔒" : "ডিলিট"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

            {/* Empty state */}
            {!loading && users.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-12 text-center text-gray-400 text-sm">
                  কোনো সদস্য পাওয়া যায়নি
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!loading && users.length > PAGE_SIZE && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* Delete Confirm Modal */}
      <dialog id="delete_confirm_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white text-black rounded-2xl font-banglafont">
          <h3 className="font-bold text-lg text-red-600">আপনি কি নিশ্চিত?</h3>
          <p className="py-4 text-gray-600 text-sm">
            আপনি কি সত্যিই <b>{userToDelete?.name}</b>-কে ডিলিট করতে চান? এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না।
          </p>
          <div className="modal-action gap-2">
            <form method="dialog">
              <button className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all">
                বাতিল
              </button>
            </form>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 rounded-xl bg-red-600 text-white text-sm font-bold hover:bg-red-700 active:scale-95 transition-all"
            >
              হ্যাঁ, ডিলিট করুন
            </button>
          </div>
        </div>
      </dialog>

      {/* Edit Modal */}
      <AdminUserUpdate user={selectedUser} refreshProfile={getAllUsers} />
    </div>
  );
};

export default AllUserPage;
