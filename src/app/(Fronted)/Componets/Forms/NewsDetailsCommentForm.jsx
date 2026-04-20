"use client";
import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";

// ─── Comment Form ──────────────────────────────────────────────────────────────
export const CommentForm = ({ newsId, onCommentAdded }) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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
        toast.success("✅ মন্তব্য সফলভাবে পাঠানো হয়েছে!", {
          position: "top-right",
          autoClose: 4000,
        });
        reset();
        onCommentAdded?.();
      } else {
        toast.error(`❌ ${result.error || "কিছু একটা সমস্যা হয়েছে"}`, {
          position: "top-right",
          autoClose: 4000,
        });
      }
    } catch {
      toast.error("❌ সার্ভারে সংযোগ করতে ব্যর্থ হয়েছে", {
        position: "top-right",
        autoClose: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold text-gray-800 mb-4">মন্তব্য করুন</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* নাম */}
          <label className="block">
            <span className="text-sm font-medium text-gray-700">
              নাম <span className="text-red-500">*</span>
            </span>
            <input
              type="text"
              placeholder="আপনার নাম"
              {...register("name", {
                required: "নাম দেওয়া আবশ্যক",
                minLength: { value: 2, message: "নাম কমপক্ষে ২ অক্ষরের হতে হবে" },
              })}
              className={`mt-2 w-full rounded-2xl border bg-gray-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:ring-2 focus:ring-primary/10 ${
                errors.name
                  ? "border-red-400 focus:border-red-400"
                  : "border-gray-300 focus:border-primary"
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
            )}
          </label>

          {/* ইমেইল */}
          <label className="block">
            <span className="text-sm font-medium text-gray-700">
              ইমেইল <span className="text-red-500">*</span>
            </span>
            <input
              type="email"
              placeholder="your@email.com"
              {...register("email", {
                required: "ইমেইল দেওয়া আবশ্যক",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "সঠিক ইমেইল ঠিকানা দিন",
                },
              })}
              className={`mt-2 w-full rounded-2xl border bg-gray-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:ring-2 focus:ring-primary/10 ${
                errors.email
                  ? "border-red-400 focus:border-red-400"
                  : "border-gray-300 focus:border-primary"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
            )}
          </label>
        </div>

        {/* মন্তব্য */}
        <label className="block">
          <span className="text-sm font-medium text-gray-700">
            মন্তব্য <span className="text-red-500">*</span>
          </span>
          <textarea
            rows="5"
            placeholder="আপনার মন্তব্য লিখুন..."
            {...register("comment", {
              required: "মন্তব্য লেখা আবশ্যক",
              minLength: { value: 5, message: "মন্তব্য কমপক্ষে ৫ অক্ষরের হতে হবে" },
            })}
            className={`mt-2 w-full rounded-3xl border bg-gray-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:ring-2 focus:ring-primary/10 ${
              errors.comment
                ? "border-red-400 focus:border-red-400"
                : "border-gray-300 focus:border-primary"
            }`}
          />
          {errors.comment && (
            <p className="mt-1 text-xs text-red-500">{errors.comment.message}</p>
          )}
        </label>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              পাঠানো হচ্ছে...
            </>
          ) : (
            "মন্তব্য পাঠান"
          )}
        </button>
      </form>
    </div>
  );
};


// ─── Reply Form ────────────────────────────────────────────────────────────────
export const ReplyForm = ({ commentId, newsId, onReplyAdded, onCancel }) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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
        toast.success("✅ রিপ্লাই সফলভাবে পাঠানো হয়েছে!", {
          position: "top-right",
          autoClose: 4000,
        });
        reset();
        onReplyAdded?.();
        onCancel?.();
      } else {
        toast.error(`❌ ${result.error || "কিছু একটা সমস্যা হয়েছে"}`, {
          position: "top-right",
          autoClose: 4000,
        });
      }
    } catch {
      toast.error("❌ সার্ভারে সংযোগ করতে ব্যর্থ হয়েছে", {
        position: "top-right",
        autoClose: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-3 ml-6 p-4 bg-gray-50 rounded-2xl border border-gray-200">
      <h4 className="text-sm font-semibold text-gray-700 mb-3">রিপ্লাই করুন</h4>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" noValidate>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {/* নাম */}
          <label className="block">
            <span className="text-xs font-medium text-gray-600">
              নাম <span className="text-red-500">*</span>
            </span>
            <input
              type="text"
              placeholder="আপনার নাম"
              {...register("name", {
                required: "নাম দেওয়া আবশ্যক",
                minLength: { value: 2, message: "নাম কমপক্ষে ২ অক্ষরের" },
              })}
              className={`mt-1 w-full rounded-xl border bg-white px-3 py-2 text-xs text-slate-900 outline-none transition focus:ring-2 focus:ring-primary/10 ${
                errors.name ? "border-red-400" : "border-gray-300 focus:border-primary"
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
            )}
          </label>

          {/* ইমেইল */}
          <label className="block">
            <span className="text-xs font-medium text-gray-600">
              ইমেইল <span className="text-red-500">*</span>
            </span>
            <input
              type="email"
              placeholder="your@email.com"
              {...register("email", {
                required: "ইমেইল দেওয়া আবশ্যক",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "সঠিক ইমেইল দিন",
                },
              })}
              className={`mt-1 w-full rounded-xl border bg-white px-3 py-2 text-xs text-slate-900 outline-none transition focus:ring-2 focus:ring-primary/10 ${
                errors.email ? "border-red-400" : "border-gray-300 focus:border-primary"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
            )}
          </label>
        </div>

        {/* রিপ্লাই */}
        <label className="block">
          <span className="text-xs font-medium text-gray-600">
            রিপ্লাই <span className="text-red-500">*</span>
          </span>
          <textarea
            rows="3"
            placeholder="আপনার রিপ্লাই লিখুন..."
            {...register("reply", {
              required: "রিপ্লাই লেখা আবশ্যক",
              minLength: { value: 5, message: "রিপ্লাই কমপক্ষে ৫ অক্ষরের" },
            })}
            className={`mt-1 w-full rounded-xl border bg-white px-3 py-2 text-xs text-slate-900 outline-none transition focus:ring-2 focus:ring-primary/10 ${
              errors.reply ? "border-red-400" : "border-gray-300 focus:border-primary"
            }`}
          />
          {errors.reply && (
            <p className="mt-1 text-xs text-red-500">{errors.reply.message}</p>
          )}
        </label>

        <div className="flex items-center gap-2">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white transition hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                পাঠানো হচ্ছে...
              </>
            ) : (
              "রিপ্লাই পাঠান"
            )}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-gray-300 px-4 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-100"
          >
            বাতিল
          </button>
        </div>
      </form>
    </div>
  );
};


// ─── Default Export: Full Comment Section ─────────────────────────────────────
const NewsDetailsCommentForm = ({ newsId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyingTo, setReplyingTo] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const dialogRef = useRef(null);

  // Fetch comments
  const fetchComments = async () => {
    try {
      // Fetch comments
      const commentsRes = await fetch(`/api/newsdetails/comment?newsId=${newsId}`);
      const commentsResult = await commentsRes.json();
      
      if (commentsResult.success) {
        // Fetch replies for all comments
        const commentsWithReplies = await Promise.all(
          commentsResult.data.map(async (comment) => {
            try {
              const repliesRes = await fetch(`/api/newsdetails/replay?commentId=${comment.id}`);
              const repliesResult = await repliesRes.json();
              
              return {
                ...comment,
                replies: repliesResult.success ? repliesResult.data : []
              };
            } catch (error) {
              console.error(`Error fetching replies for comment ${comment.id}:`, error);
              return {
                ...comment,
                replies: []
              };
            }
          })
        );
        
        setComments(commentsWithReplies);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [newsId]);

  const handleCommentAdded = () => {
    fetchComments();
  };

  const handleReplyAdded = () => {
    fetchComments();
    setReplyingTo(null);
  };

  const openDeleteModal = (type, id) => {
    setPendingDelete({ type, id });
    dialogRef.current?.showModal();
  };

  const closeDeleteModal = () => {
    dialogRef.current?.close();
    setPendingDelete(null);
  };

  const handleDeleteComment = async (commentId) => {
    setDeletingId(commentId);
    try {
      const res = await fetch(`/api/newsdetails/comment?id=${commentId}`, {
        method: "DELETE",
      });
      const result = await res.json();

      if (result.success) {
        toast.success("✅ মন্তব্য মুছে ফেলা হয়েছে", { position: "top-right", autoClose: 4000 });
        fetchComments();
      } else {
        toast.error(`❌ ${result.error || "মুছতে ব্যর্থ হয়েছে"}`, { position: "top-right", autoClose: 4000 });
      }
    } catch (error) {
      toast.error("❌ সার্ভারে সংযোগ করতে ব্যর্থ হয়েছে", { position: "top-right", autoClose: 4000 });
    } finally {
      setDeletingId(null);
    }
  };

  const handleDeleteReply = async (replyId) => {
    setDeletingId(replyId);
    try {
      const res = await fetch(`/api/newsdetails/replay?id=${replyId}`, {
        method: "DELETE",
      });
      const result = await res.json();

      if (result.success) {
        toast.success("✅ রিপ্লাই মুছে ফেলা হয়েছে", { position: "top-right", autoClose: 4000 });
        fetchComments();
      } else {
        toast.error(`❌ ${result.error || "মুছতে ব্যর্থ হয়েছে"}`, { position: "top-right", autoClose: 4000 });
      }
    } catch (error) {
      toast.error("❌ সার্ভারে সংযোগ করতে ব্যর্থ হয়েছে", { position: "top-right", autoClose: 4000 });
    } finally {
      setDeletingId(null);
    }
  };

  const handleConfirmDelete = async () => {
    if (!pendingDelete) return;

    const { type, id } = pendingDelete;
    closeDeleteModal();

    if (type === "comment") {
      await handleDeleteComment(id);
    } else {
      await handleDeleteReply(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Comment Form */}
      <CommentForm newsId={newsId} onCommentAdded={handleCommentAdded} />

      {/* Comments Display */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-800">
          মন্তব্য ({comments.length})
        </h3>

        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-gray-500 mt-2">মন্তব্য লোড হচ্ছে...</p>
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>এখনও কোনো মন্তব্য নেই। প্রথম মন্তব্য করুন!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="border border-gray-200 rounded-2xl p-4 bg-white">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-gray-900">{comment.name}</h4>
                      <span className="text-xs text-gray-500">
                        {new Date(comment.createdAt).toLocaleDateString('bn-BD')}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">{comment.comment}</p>
                  </div>
                </div>

                {/* Reply / Delete Buttons */}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                    className="text-xs text-primary hover:text-primary-dark font-medium"
                  >
                    {replyingTo === comment.id ? 'রিপ্লাই বাতিল' : 'রিপ্লাই করুন'}
                  </button>
                  <button
                    type="button"
                    onClick={() => openDeleteModal("comment", comment.id)}
                    disabled={deletingId === comment.id}
                    className="inline-flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-medium disabled:opacity-50"
                  >
                    <AiOutlineDelete className="w-4 h-4" />
                    {deletingId === comment.id ? 'মুছা হচ্ছে...' : 'মুছুন'}
                  </button>
                </div>

                {/* Reply Form */}
                {replyingTo === comment.id && (
                  <ReplyForm
                    commentId={comment.id}
                    newsId={newsId}
                    onReplyAdded={handleReplyAdded}
                    onCancel={() => setReplyingTo(null)}
                  />
                )}

                {/* Display Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-4 ml-6 space-y-3">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="border-l-2 border-gray-200 pl-4 bg-gray-50 rounded-r-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <h5 className="font-medium text-gray-800 text-sm">{reply.name}</h5>
                          <span className="text-xs text-gray-500">
                            {new Date(reply.createdAt).toLocaleDateString('bn-BD')}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">{reply.reply}</p>
                        <button
                          type="button"
                          onClick={() => openDeleteModal("reply", reply.id)}
                          disabled={deletingId === reply.id}
                          className="mt-2 inline-flex items-center gap-1 text-[11px] text-red-500 hover:text-red-700 font-medium disabled:opacity-50"
                        >
                          <AiOutlineDelete className="w-3.5 h-3.5" />
                          {deletingId === reply.id ? 'মুছা হচ্ছে...' : 'মুছুন'}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <dialog ref={dialogRef} className="modal modal-bottom sm:modal-middle">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">নিশ্চিত করুন</h3>
          <p className="py-4">
            আপনি কি সত্যিই এই {pendingDelete?.type === "comment" ? "মন্তব্য" : "রিপ্লাই"} মুছে ফেলতে চান?
          </p>
          <div className="modal-action">
            <button type="button" onClick={closeDeleteModal} className="btn">
              বাতিল
            </button>
            <button type="button" onClick={handleConfirmDelete} className="btn btn-error">
              মুছুন
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default NewsDetailsCommentForm;