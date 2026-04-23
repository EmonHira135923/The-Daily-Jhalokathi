"use client";
import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { BiReply } from "react-icons/bi";
import { toast } from "react-toastify";

// ─── Spinner ──────────────────────────────────────────────────────────────────
const Spinner = ({ size = "sm" }) => (
  <svg
    className={`animate-spin ${size === "sm" ? "w-3.5 h-3.5" : "w-5 h-5"}`}
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
  </svg>
);

// ─── Avatar ───────────────────────────────────────────────────────────────────
const Avatar = ({ name, size = "md" }) => {
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
  const sizeClass = size === "sm" ? "w-8 h-8 text-xs" : "w-10 h-10 text-sm";

  return (
    <div className={`${sizeClass} ${color} rounded-full flex items-center justify-center font-bold flex-shrink-0 select-none`}>
      {letter}
    </div>
  );
};

// ─── Time Formatter ───────────────────────────────────────────────────────────
const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("bn-BD", { year: "numeric", month: "long", day: "numeric" });
};

// ─── Field Component ──────────────────────────────────────────────────────────
const Field = ({ label, error, children }) => (
  <label className="block">
    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</span>
    {children}
    {error && <p className="mt-1 text-[11px] text-red-500 font-medium">{error}</p>}
  </label>
);

// ─── Input styles ─────────────────────────────────────────────────────────────
const inputCls = (err) =>
  `mt-1.5 w-full rounded-xl border px-3.5 py-2.5 text-sm text-gray-800 bg-white outline-none transition-all duration-200 placeholder:text-gray-300 focus:ring-2 focus:ring-offset-1 ${
    err
      ? "border-red-300 focus:ring-red-200 focus:border-red-400"
      : "border-gray-200 focus:ring-emerald-100 focus:border-emerald-400"
  }`;


// ─── Comment Form ──────────────────────────────────────────────────────────────
export const CommentForm = ({ newsId, onCommentAdded }) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await fetch("/api/newsdetails/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, newsId }),
      });
      const result = await res.json();
      if (result.success) {
        toast.success("✅ মন্তব্য সফলভাবে পাঠানো হয়েছে!", { position: "top-right", autoClose: 4000 });
        reset();
        onCommentAdded?.();
      } else {
        toast.error(`❌ ${result.error || "কিছু একটা সমস্যা হয়েছে"}`, { position: "top-right", autoClose: 4000 });
      }
    } catch {
      toast.error("❌ সার্ভারে সংযোগ করতে ব্যর্থ হয়েছে", { position: "top-right", autoClose: 4000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-1 h-6 bg-emerald-500 rounded-full" />
        <h3 className="text-base font-bold text-gray-800">মন্তব্য করুন</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="নাম *" error={errors.name?.message}>
            <input
              type="text"
              placeholder="আপনার নাম লিখুন"
              {...register("name", {
                required: "নাম দেওয়া আবশ্যক",
                minLength: { value: 2, message: "নাম কমপক্ষে ২ অক্ষরের হতে হবে" },
              })}
              className={inputCls(errors.name)}
            />
          </Field>
          <Field label="ইমেইল *" error={errors.email?.message}>
            <input
              type="email"
              placeholder="your@email.com"
              {...register("email", {
                required: "ইমেইল দেওয়া আবশ্যক",
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "সঠিক ইমেইল ঠিকানা দিন" },
              })}
              className={inputCls(errors.email)}
            />
          </Field>
        </div>

        <Field label="মন্তব্য *" error={errors.comment?.message}>
          <textarea
            rows="4"
            placeholder="আপনার মন্তব্য লিখুন..."
            {...register("comment", {
              required: "মন্তব্য লেখা আবশ্যক",
              minLength: { value: 5, message: "মন্তব্য কমপক্ষে ৫ অক্ষরের হতে হবে" },
            })}
            className={`${inputCls(errors.comment)} resize-none`}
          />
        </Field>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm shadow-emerald-200"
          >
            {loading ? <><Spinner /> পাঠানো হচ্ছে...</> : "মন্তব্য পাঠান →"}
          </button>
        </div>
      </form>
    </div>
  );
};


// ─── Reply Form ────────────────────────────────────────────────────────────────
export const ReplyForm = ({ commentId, newsId, onReplyAdded, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await fetch("/api/newsdetails/replay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, commentId, newsId }),
      });
      const result = await res.json();
      if (result.success) {
        toast.success("✅ রিপ্লাই সফলভাবে পাঠানো হয়েছে!", { position: "top-right", autoClose: 4000 });
        reset();
        onReplyAdded?.();
        onCancel?.();
      } else {
        toast.error(`❌ ${result.error || "কিছু একটা সমস্যা হয়েছে"}`, { position: "top-right", autoClose: 4000 });
      }
    } catch {
      toast.error("❌ সার্ভারে সংযোগ করতে ব্যর্থ হয়েছে", { position: "top-right", autoClose: 4000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-3 ml-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100 animate-in slide-in-from-top-2 duration-200">
      <p className="text-xs font-semibold text-emerald-700 mb-3 flex items-center gap-1.5">
        <BiReply className="w-4 h-4" /> রিপ্লাই করুন
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" noValidate>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="নাম *" error={errors.name?.message}>
            <input
              type="text"
              placeholder="আপনার নাম"
              {...register("name", {
                required: "নাম দেওয়া আবশ্যক",
                minLength: { value: 2, message: "নাম কমপক্ষে ২ অক্ষরের" },
              })}
              className={inputCls(errors.name)}
            />
          </Field>
          <Field label="ইমেইল *" error={errors.email?.message}>
            <input
              type="email"
              placeholder="your@email.com"
              {...register("email", {
                required: "ইমেইল দেওয়া আবশ্যক",
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "সঠিক ইমেইল দিন" },
              })}
              className={inputCls(errors.email)}
            />
          </Field>
        </div>
        <Field label="রিপ্লাই *" error={errors.reply?.message}>
          <textarea
            rows="3"
            placeholder="আপনার রিপ্লাই লিখুন..."
            {...register("reply", {
              required: "রিপ্লাই লেখা আবশ্যক",
              minLength: { value: 5, message: "রিপ্লাই কমপক্ষে ৫ অক্ষরের" },
            })}
            className={`${inputCls(errors.reply)} resize-none`}
          />
        </Field>
        <div className="flex items-center gap-2 pt-1">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 active:scale-95 px-4 py-2 text-xs font-semibold text-white transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? <><Spinner /> পাঠানো হচ্ছে...</> : "রিপ্লাই পাঠান"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-500 hover:bg-gray-50 transition-all active:scale-95"
          >
            বাতিল
          </button>
        </div>
      </form>
    </div>
  );
};


// ─── Inline Edit Form ─────────────────────────────────────────────────────────
const InlineEditForm = ({ initialValue, fieldName, onSave, onCancel, loading, rows = 3 }) => {
  const [value, setValue] = useState(initialValue);
  return (
    <div className="mt-2 space-y-2">
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full rounded-xl border border-emerald-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-emerald-200 resize-none transition"
      />
      <div className="flex items-center gap-2">
        <button
          onClick={() => onSave(value)}
          disabled={loading || value.trim().length < 5}
          className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 active:scale-95 px-3 py-1.5 text-xs font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <Spinner /> : <AiOutlineCheck className="w-3.5 h-3.5" />}
          সংরক্ষণ
        </button>
        <button
          onClick={onCancel}
          className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-500 hover:bg-gray-50 transition-all active:scale-95"
        >
          <AiOutlineClose className="w-3.5 h-3.5" /> বাতিল
        </button>
      </div>
    </div>
  );
};


// ─── Delete Confirm Modal ─────────────────────────────────────────────────────
const DeleteModal = ({ dialogRef, pendingDelete, onConfirm, onCancel }) => (
  <dialog ref={dialogRef} className="modal modal-bottom sm:modal-middle">
    <div className="modal-box bg-white rounded-2xl shadow-xl border border-gray-100 p-6 max-w-sm mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
          <AiOutlineDelete className="w-5 h-5 text-red-500" />
        </div>
        <div>
          <h3 className="font-bold text-gray-800">নিশ্চিত করুন</h3>
          <p className="text-xs text-gray-500">এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না</p>
        </div>
      </div>
      <p className="text-sm text-gray-600 bg-gray-50 rounded-xl p-3 mb-5">
        আপনি কি সত্যিই এই <strong>{pendingDelete?.type === "comment" ? "মন্তব্য" : "রিপ্লাই"}</strong> মুছে ফেলতে চান?
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
          className="rounded-xl bg-red-500 hover:bg-red-600 active:scale-95 px-4 py-2 text-sm font-semibold text-white transition-all shadow-sm shadow-red-100"
        >
          হ্যাঁ, মুছুন
        </button>
      </div>
    </div>
    <form method="dialog" className="modal-backdrop"><button onClick={onCancel} /></form>
  </dialog>
);


// ─── Reply Card ────────────────────────────────────────────────────────────────
const ReplyCard = ({ reply, onDelete, onEdit }) => {
  const [editing, setEditing] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  const handleSaveEdit = async (newText) => {
    setEditLoading(true);
    try {
      const res = await fetch(`/api/newsdetails/replay?id=${reply.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reply: newText, email: reply.email }),
      });
      const result = await res.json();
      if (result.success) {
        toast.success("✅ রিপ্লাই আপডেট হয়েছে", { position: "top-right", autoClose: 3000 });
        setEditing(false);
        onEdit?.();
      } else {
        toast.error(`❌ ${result.error || "আপডেট ব্যর্থ হয়েছে"}`, { position: "top-right", autoClose: 3000 });
      }
    } catch {
      toast.error("❌ সার্ভারে সংযোগ করতে ব্যর্থ হয়েছে", { position: "top-right", autoClose: 3000 });
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <div className="flex gap-3 group">
      <Avatar name={reply.name} size="sm" />
      <div className="flex-1 min-w-0">
        <div className="bg-gray-50 rounded-xl px-3.5 py-2.5 border border-gray-100">
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-semibold text-xs text-gray-800 truncate">{reply.name}</span>
              <span className="text-[10px] text-gray-400 flex-shrink-0">{formatDate(reply.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
              <button
                onClick={() => setEditing(!editing)}
                title="সম্পাদনা"
                className="p-1 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
              >
                <AiOutlineEdit className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onDelete(reply.id)}
                title="মুছুন"
                className="p-1 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
              >
                <AiOutlineDelete className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          {editing ? (
            <InlineEditForm
              initialValue={reply.reply}
              onSave={handleSaveEdit}
              onCancel={() => setEditing(false)}
              loading={editLoading}
              rows={2}
            />
          ) : (
            <p className="text-xs text-gray-600 leading-relaxed">{reply.reply}</p>
          )}
        </div>
      </div>
    </div>
  );
};


// ─── Comment Card ──────────────────────────────────────────────────────────────
const CommentCard = ({ comment, newsId, onDelete, onRefresh }) => {
  const [replyOpen, setReplyOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [showReplies, setShowReplies] = useState(true);

  const handleSaveEdit = async (newText) => {
    setEditLoading(true);
    try {
      const res = await fetch(`/api/newsdetails/comment?id=${comment.id}&type=comment`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment: newText }),
      });
      const result = await res.json();
      if (result.success) {
        toast.success("✅ মন্তব্য আপডেট হয়েছে", { position: "top-right", autoClose: 3000 });
        setEditing(false);
        onRefresh?.();
      } else {
        toast.error(`❌ ${result.error || "আপডেট ব্যর্থ হয়েছে"}`, { position: "top-right", autoClose: 3000 });
      }
    } catch {
      toast.error("❌ সার্ভারে সংযোগ করতে ব্যর্থ হয়েছে", { position: "top-right", autoClose: 3000 });
    } finally {
      setEditLoading(false);
    }
  };

  const replyCount = comment.replies?.length || 0;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 transition-all hover:shadow-md group">
      <div className="flex gap-3.5">
        <Avatar name={comment.name} size="md" />
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h4 className="font-bold text-sm text-gray-900">{comment.name}</h4>
              <p className="text-[11px] text-gray-400">{formatDate(comment.createdAt)}</p>
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
              <button
                onClick={() => setEditing(!editing)}
                title="সম্পাদনা করুন"
                className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
              >
                <AiOutlineEdit className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete("comment", comment.id)}
                title="মুছুন"
                className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
              >
                <AiOutlineDelete className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Content */}
          {editing ? (
            <InlineEditForm
              initialValue={comment.comment}
              onSave={handleSaveEdit}
              onCancel={() => setEditing(false)}
              loading={editLoading}
            />
          ) : (
            <p className="text-sm text-gray-700 leading-relaxed">{comment.comment}</p>
          )}

          {/* Actions */}
          <div className="mt-3 flex items-center gap-3 border-t border-gray-50 pt-2.5">
            <button
              onClick={() => setReplyOpen(!replyOpen)}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              <BiReply className="w-4 h-4" />
              {replyOpen ? "বাতিল করুন" : "রিপ্লাই করুন"}
            </button>
            {replyCount > 0 && (
              <button
                onClick={() => setShowReplies(!showReplies)}
                className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showReplies ? `${replyCount}টি রিপ্লাই লুকান` : `${replyCount}টি রিপ্লাই দেখুন`}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Reply Form */}
      {replyOpen && (
        <ReplyForm
          commentId={comment.id}
          newsId={newsId}
          onReplyAdded={() => { onRefresh?.(); setReplyOpen(false); }}
          onCancel={() => setReplyOpen(false)}
        />
      )}

      {/* Replies */}
      {showReplies && replyCount > 0 && (
        <div className="mt-4 ml-4 pl-4 border-l-2 border-gray-100 space-y-3">
          {comment.replies.map((reply) => (
            <ReplyCard
              key={reply.id}
              reply={reply}
              onDelete={(id) => onDelete("reply", id)}
              onEdit={onRefresh}
            />
          ))}
        </div>
      )}
    </div>
  );
};


// ─── Main Component ───────────────────────────────────────────────────────────
const NewsDetailsCommentForm = ({ newsId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const dialogRef = useRef(null);

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/newsdetails/comment?newsId=${newsId}`);
      const result = await res.json();
      if (result.success) {
        const withReplies = await Promise.all(
          result.data.map(async (comment) => {
            try {
              const rRes = await fetch(`/api/newsdetails/replay?commentId=${comment.id}`);
              const rResult = await rRes.json();
              return { ...comment, replies: rResult.success ? rResult.data : [] };
            } catch {
              return { ...comment, replies: [] };
            }
          })
        );
        setComments(withReplies);
      }
    } catch (err) {
      console.error("Error fetching comments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchComments(); }, [newsId]);

  const openDeleteModal = (type, id) => {
    setPendingDelete({ type, id });
    dialogRef.current?.showModal();
  };

  const closeDeleteModal = () => {
    dialogRef.current?.close();
    setPendingDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!pendingDelete) return;
    const { type, id } = pendingDelete;
    closeDeleteModal();
    setDeletingId(id);

    try {
      const endpoint = type === "comment"
        ? `/api/newsdetails/comment?id=${id}`
        : `/api/newsdetails/replay?id=${id}`;

      const res = await fetch(endpoint, { method: "DELETE" });
      const result = await res.json();

      if (result.success) {
        toast.success(`✅ ${type === "comment" ? "মন্তব্য" : "রিপ্লাই"} মুছে ফেলা হয়েছে`, {
          position: "top-right", autoClose: 3000,
        });
        fetchComments();
      } else {
        toast.error(`❌ ${result.error || "মুছতে ব্যর্থ হয়েছে"}`, { position: "top-right", autoClose: 3000 });
      }
    } catch {
      toast.error("❌ সার্ভারে সংযোগ করতে ব্যর্থ হয়েছে", { position: "top-right", autoClose: 3000 });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Post Comment */}
      <CommentForm newsId={newsId} onCommentAdded={fetchComments} />

      {/* Comments List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-1 h-5 bg-emerald-500 rounded-full" />
            <h3 className="text-base font-bold text-gray-800">
              মন্তব্য
              {!loading && (
                <span className="ml-2 text-xs font-normal bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                  {comments.length}টি
                </span>
              )}
            </h3>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-sm">মন্তব্য লোড হচ্ছে...</p>
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-14 bg-white rounded-2xl border border-dashed border-gray-200">
            <div className="text-4xl mb-3">💬</div>
            <p className="text-sm font-medium text-gray-500">এখনও কোনো মন্তব্য নেই</p>
            <p className="text-xs text-gray-400 mt-1">প্রথম মন্তব্য করে আলোচনা শুরু করুন!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <CommentCard
                key={comment.id}
                comment={comment}
                newsId={newsId}
                onDelete={openDeleteModal}
                onRefresh={fetchComments}
              />
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirm Modal */}
      <DeleteModal
        dialogRef={dialogRef}
        pendingDelete={pendingDelete}
        onConfirm={handleConfirmDelete}
        onCancel={closeDeleteModal}
      />
    </div>
  );
};

export default NewsDetailsCommentForm;