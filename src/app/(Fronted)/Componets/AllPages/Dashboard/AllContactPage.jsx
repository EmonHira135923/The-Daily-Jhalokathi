"use client";
import React, { useCallback, useState, useEffect, useRef } from "react";
import { AiOutlineDelete, AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { MdOutlineSubject, MdOutlineMessage } from "react-icons/md";

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
        আপনি কি সত্যিই এই <strong>বার্তাটি</strong> মুছে ফেলতে চান?
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
    <div className={`w-11 h-11 ${color} rounded-full flex items-center justify-center font-bold text-base flex-shrink-0 select-none`}>
      {letter}
    </div>
  );
};

// ─── Message Card ─────────────────────────────────────────────────────────────
const MessageCard = ({ msg, onDelete, isDeleting }) => {
  const [expanded, setExpanded] = useState(false);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("bn-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 group overflow-hidden">
      {/* Card Header */}
      <div className="flex items-start gap-4 p-5">
        <Avatar name={msg.name} />

        <div className="flex-1 min-w-0">
          {/* Name + Date */}
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-sm text-gray-900 flex items-center gap-1">
                  <AiOutlineUser className="w-3.5 h-3.5 text-gray-400" />
                  {msg.name}
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <AiOutlineMail className="w-3.5 h-3.5" />
                  {msg.email}
                </span>
              </div>
              <p className="text-[11px] text-gray-300 mt-0.5">{formatDate(msg.createdAt)}</p>
            </div>

            {/* Delete Button */}
            <button
              onClick={() => onDelete(msg.id)}
              disabled={isDeleting}
              title="মুছুন"
              className="flex-shrink-0 p-2 rounded-xl text-gray-300 hover:text-red-500 hover:bg-red-50 border border-transparent hover:border-red-100 transition-all active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed opacity-0 group-hover:opacity-100"
            >
              {isDeleting ? (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              ) : (
                <AiOutlineDelete className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Subject */}
          {msg.subject && msg.subject !== "No Subject" && (
            <div className="flex items-center gap-1.5 mb-2">
              <MdOutlineSubject className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-2.5 py-0.5 truncate max-w-xs">
                {msg.subject}
              </span>
            </div>
          )}

          {/* Message */}
          <div className="mt-1">
            <p className={`text-sm text-gray-700 leading-relaxed ${!expanded ? "line-clamp-2" : ""}`}>
              {msg.message}
            </p>
            {msg.message && msg.message.length > 120 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-xs text-emerald-600 hover:text-emerald-700 font-medium mt-1 transition-colors"
              >
                {expanded ? "কম দেখুন ↑" : "আরও দেখুন ↓"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const AllContactPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [pendingId, setPendingId] = useState(null);
  const dialogRef = useRef(null);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact");
      const result = await res.json();
      if (result.success) {
        setMessages(result.data);
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(fetchMessages, 0);
    return () => clearTimeout(timer);
  }, [fetchMessages]);

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
      const res = await fetch(`/api/contact?id=${pendingId}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (result.success) {
        setMessages((prev) => prev.filter((m) => m.id !== pendingId));
      } else {
        alert(result.error || "মুছতে ব্যর্থ হয়েছে");
      }
    } catch {
      alert("সার্ভারে সংযোগ করতে ব্যর্থ হয়েছে");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <MdOutlineMessage className="w-6 h-6 text-emerald-500" />
              সকল বার্তা
            </h1>
            {!loading && (
              <p className="text-sm text-gray-400 mt-0.5">মোট {messages.length}টি বার্তা</p>
            )}
          </div>
          <button
            onClick={fetchMessages}
            className="text-xs text-emerald-600 border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 rounded-xl px-3 py-1.5 font-medium transition-all"
          >
            রিফ্রেশ করুন
          </button>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-sm">বার্তা লোড হচ্ছে...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
            <div className="text-4xl mb-3">📭</div>
            <p className="text-sm font-medium text-gray-500">কোনো বার্তা পাওয়া যায়নি</p>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((msg) => (
              <MessageCard
                key={msg.id}
                msg={msg}
                onDelete={openDeleteModal}
                isDeleting={deletingId === msg.id}
              />
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

export default AllContactPage;
