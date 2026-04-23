"use client";
import React, { useState, useEffect, useRef } from "react";
import { AiOutlineDelete } from "react-icons/ai";

// ─── Delete Confirm Modal ─────────────────────────────────────────────────────
const DeleteModal = ({ dialogRef, onConfirm, onCancel }) => (
  <dialog ref={dialogRef} className="modal modal-bottom sm:modal-middle">
    <div className="modal-box bg-white rounded-2xl shadow-xl border border-gray-100 p-6 max-w-sm mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
          <AiOutlineDelete className="w-5 h-5 text-red-500" />
        </div>
        <div>
          <h3 className="font-bold text-gray-800">নিশ্চিত করুন</h3>
          <p className="text-xs text-gray-400">এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না</p>
        </div>
      </div>
      <p className="text-sm text-gray-600 bg-gray-50 rounded-xl p-3 mb-5">
        আপনি কি সত্যিই এই <strong>রিপ্লাইটি</strong> মুছে ফেলতে চান?
      </p>
      <div className="flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
        >
          বাতিল
        </button>
        <button
          onClick={onConfirm}
          className="rounded-xl bg-red-500 hover:bg-red-600 active:scale-95 px-4 py-2 text-sm font-semibold text-white transition-all"
        >
          হ্যাঁ, মুছুন
        </button>
      </div>
    </div>
    <form method="dialog" className="modal-backdrop">
      <button onClick={onCancel} />
    </form>
  </dialog>
);

// ─── Avatar ───────────────────────────────────────────────────────────────────
const Avatar = ({ name }) => {
  const letter = name ? name.charAt(0).toUpperCase() : "?";
  const colors = [
    "bg-rose-100 text-rose-600",
    "bg-sky-100 text-sky-600",
    "bg-emerald-100 text-emerald-600",
    "bg-amber-100 text-amber-600",
    "bg-violet-100 text-violet-600",
    "bg-pink-100 text-pink-600",
  ];
  const color = colors[letter.charCodeAt(0) % colors.length];
  return (
    <div className={`w-10 h-10 ${color} rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 select-none`}>
      {letter}
    </div>
  );
};

// ─── Main Page ─────────────────────────────────────────────────────────────────
const ReplayPage = () => {
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [pendingId, setPendingId] = useState(null);
  const dialogRef = useRef(null);

  // Admin email — DELETE API তে email required, তাই admin email পাঠাতে হবে
  const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@dailyjhalokathi.com";

  // Fetch all replies (no commentId filter = admin view, সব রিপ্লাই)
  const fetchReplies = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/newsdetails/replay");
      const result = await res.json();
      if (result.success) {
        setReplies(result.data);
      }
    } catch (err) {
      console.error("Error fetching replies:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReplies();
  }, []);

  const openDeleteModal = (id) => {
    setPendingId(id);
    dialogRef.current?.showModal();
  };

  const closeDeleteModal = () => {
    dialogRef.current?.close();
    setPendingId(null);
  };

  const handleConfirmDelete = async () => {
    if (!pendingId) return;
    closeDeleteModal();
    setDeletingId(pendingId);
    try {
      const res = await fetch(`/api/newsdetails/replay?id=${pendingId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        // DELETE API তে email required — admin email পাঠাচ্ছি
        body: JSON.stringify({ email: ADMIN_EMAIL }),
      });
      const result = await res.json();
      if (result.success) {
        // Optimistic remove
        setReplies((prev) => prev.filter((r) => r.id !== pendingId));
      } else {
        alert(result.error || "মুছতে ব্যর্থ হয়েছে");
      }
    } catch {
      alert("সার্ভারে সংযোগ করতে ব্যর্থ হয়েছে");
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("bn-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">সকল রিপ্লাই</h1>
            {!loading && (
              <p className="text-sm text-gray-400 mt-0.5">মোট {replies.length}টি রিপ্লাই</p>
            )}
          </div>
          <button
            onClick={fetchReplies}
            className="text-xs text-emerald-600 border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 rounded-xl px-3 py-1.5 font-medium transition-all"
          >
            রিফ্রেশ করুন
          </button>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-sm">রিপ্লাই লোড হচ্ছে...</p>
          </div>
        ) : replies.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
            <div className="text-4xl mb-3">💬</div>
            <p className="text-sm font-medium text-gray-500">কোনো রিপ্লাই পাওয়া যায়নি</p>
          </div>
        ) : (
          <div className="space-y-3">
            {replies.map((reply, index) => (
              <div
                key={reply.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-start gap-4 group hover:shadow-md transition-all duration-200"
              >
                <Avatar name={reply.name} />

                <div className="flex-1 min-w-0">
                  {/* Meta */}
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-semibold text-sm text-gray-900">{reply.name}</span>
                    <span className="text-xs text-gray-400">{reply.email}</span>
                    {reply.commentId && (
                      <span className="text-[10px] bg-sky-50 text-sky-600 border border-sky-100 rounded-full px-2 py-0.5 font-medium">
                        Comment: {reply.commentId.slice(0, 8)}…
                      </span>
                    )}
                    <span className="text-[11px] text-gray-300 ml-auto">
                      {formatDate(reply.createdAt)}
                    </span>
                  </div>

                  {/* Reply text */}
                  <p className="text-sm text-gray-700 leading-relaxed">{reply.reply}</p>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => openDeleteModal(reply.id)}
                  disabled={deletingId === reply.id}
                  title="মুছুন"
                  className="flex-shrink-0 p-2 rounded-xl text-gray-300 hover:text-red-500 hover:bg-red-50 border border-transparent hover:border-red-100 transition-all active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed opacity-0 group-hover:opacity-100"
                >
                  {deletingId === reply.id ? (
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                  ) : (
                    <AiOutlineDelete className="w-4 h-4" />
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirm Modal */}
      <DeleteModal
        dialogRef={dialogRef}
        onConfirm={handleConfirmDelete}
        onCancel={closeDeleteModal}
      />
    </div>
  );
};

export default ReplayPage;