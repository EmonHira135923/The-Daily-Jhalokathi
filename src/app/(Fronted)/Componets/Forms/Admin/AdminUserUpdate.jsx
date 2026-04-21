"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Image from "next/image";

const AdminUserUpdate = ({ user, refreshProfile }) => {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: { role: user?.role || "user" },
  });

  // যখনই user প্রপস পরিবর্তন হবে, ফর্ম রিসেট হবে
  useEffect(() => {
    if (user) {
      reset({ role: user.role || "user" });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/admin-update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id, role: data.role }),
      });

      const result = await res.json();
      if (result.success) {
        toast.success("ইউজার রোল আপডেট সফল!");
        document.getElementById("admin_edit_modal").close(); // মডাল ক্লোজ করা
        if (refreshProfile) refreshProfile();
      } else {
        toast.error(result.message || "আপডেট ব্যর্থ হয়েছে");
      }
    } catch (error) {
      toast.error("সার্ভার এরর! আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog id="admin_edit_modal" className="modal modal-bottom sm:modal-middle backdrop-blur-sm">
      <div className="modal-box p-0 bg-white border border-gray-100 rounded-3xl shadow-2xl overflow-hidden max-w-[350px]">
        
        {/* উপরের ডিজাইন অংশ */}
        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-6 text-center">
          <div className="relative w-20 h-20 mx-auto mb-3 border-4 border-white/30 rounded-2xl overflow-hidden shadow-lg">
            <Image 
              src={user?.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} 
              alt="user" fill className="object-cover" unoptimized
            />
          </div>
          <h3 className="text-white font-bold text-lg truncate px-2">{user?.name || "ব্যবহারকারী"}</h3>
          <p className="text-blue-100 text-xs truncate px-4 opacity-80">{user?.email}</p>
        </div>

        {/* ফর্ম অংশ */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="space-y-5">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2 px-1">
                এক্সেস লেভেল পরিবর্তন
              </label>
              <select 
                {...register("role")}
                className="select select-bordered w-full bg-gray-50 text-black border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-xl"
              >
                <option value="user">সদস্য (Member)</option>
                <option value="admin">অ্যাডমিন (Admin)</option>
              </select>
            </div>

            <div className="modal-action mt-0 flex gap-3">
              {/* ফর্ম মেথড ডায়ালগ ব্যবহার করলে বাটনে ক্লিক করলে অটো ক্লোজ হবে */}
              <button 
                type="button"
                onClick={() => document.getElementById("admin_edit_modal").close()}
                className="btn flex-1 bg-gray-100 hover:bg-gray-200 border-none text-gray-600 rounded-xl"
              >
                বাতিল
              </button>
              
              <button 
                type="submit" 
                disabled={loading} 
                className="btn flex-1 bg-indigo-600 hover:bg-indigo-700 border-none text-white rounded-xl shadow-lg shadow-indigo-200"
              >
                {loading ? <span className="loading loading-spinner loading-sm"></span> : "আপডেট করুন"}
              </button>
            </div>
          </div>
        </form>

        {/* মডালের বাইরে ক্লিক করলে ক্লোজ হওয়ার জন্য */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </div>
    </dialog>
  );
};

export default AdminUserUpdate;