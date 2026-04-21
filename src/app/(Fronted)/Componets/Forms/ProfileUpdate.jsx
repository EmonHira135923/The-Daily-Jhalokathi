"use client";
import { uploadToCloudinary } from "@/app/(Backend)/lib/cloudinary";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Image from "next/image";

const ProfileUpdate = ({ user, refreshProfile }) => {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null); // ছবির প্রিভিউয়ের জন্য

  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      phone: user?.phone || "",
    },
  });

  // যখনই user ডাটা চেঞ্জ হবে বা মডাল ওপেন হবে, তখন ফর্মের ভ্যালু আপডেট হবে
  useEffect(() => {
    if (user) {
      reset({ phone: user.phone || "" });
      setPreview(user.image || null);
    }
  }, [user, reset]);

  // নতুন ছবি সিলেক্ট করলে প্রিভিউ দেখানোর লজিক
  const profileImageWatcher = watch("profileImage");
  useEffect(() => {
    if (profileImageWatcher && profileImageWatcher[0]) {
      const file = profileImageWatcher[0];
      setPreview(URL.createObjectURL(file));
    }
  }, [profileImageWatcher]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let imageData = null;

      if (data.profileImage && data.profileImage[0]) {
        imageData = await uploadToCloudinary(data.profileImage[0]);
      }

      const updatePayload = {
        userId: user._id,
        phone: data.phone,
        ...(imageData && { 
          image: imageData.secure_url, 
          imagePublicId: imageData.public_id 
        }),
      };

      const res = await fetch("/api/auth/update-profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatePayload),
      });

      const result = await res.json();

      if (result.success) {
        toast.success("প্রোফাইল আপডেট হয়েছে!");
        document.getElementById("my_modal_5").close();
        if (refreshProfile) refreshProfile();
      }
    } catch (error) {
      toast.error("আপডেট করা সম্ভব হয়নি");
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle backdrop-blur-md">
      <div className="modal-box bg-white border-t-4 border-green-600">
        <h3 className="font-bold text-lg text-green-700 flex items-center gap-2">
          <span className="p-1 bg-green-100 rounded-lg">📝</span> প্রোফাইল আপডেট
        </h3>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="py-6 space-y-4 text-center sm:text-left">
            
            {/* ছবির প্রিভিউ অংশ */}
            <div className="flex flex-col items-center gap-2 mb-4">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-green-100 shadow-inner">
                <Image 
                  src={preview || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} 
                  alt="Preview" 
                  fill 
                  className="object-cover"
                />
              </div>
              <p className="text-[10px] text-gray-400 uppercase font-bold">বর্তমান ছবি</p>
            </div>

            {/* ইমেজ ইনপুট */}
            <div>
              <label className="text-xs font-bold text-gray-500 mb-1 block uppercase">নতুন প্রোফাইল ছবি</label>
              <input 
                type="file" 
                {...register("profileImage")} 
                className="file-input file-input-bordered file-input-success w-full bg-white text-black" 
              />
            </div>

            {/* ফোন নম্বর ইনপুট */}
            <div>
              <label className="text-xs font-bold text-gray-500 mb-1 block uppercase">ফোন নম্বর</label>
              <input 
                type="text" 
                {...register("phone")} 
                className="input input-bordered w-full bg-white text-black border-gray-200 focus:border-green-600 outline-none" 
                placeholder="ফোন নম্বর দিন" 
              />
            </div>
          </div>

          <div className="modal-action">
            <div className="flex gap-2 w-full sm:w-auto">
              <button 
                type="button" 
                onClick={() => document.getElementById("my_modal_5").close()} 
                className="btn btn-ghost flex-1 sm:flex-none text-gray-500"
              >
                বাতিল
              </button>
              <button 
                type="submit" 
                disabled={loading} 
                className="btn bg-green-600 hover:bg-green-700 text-white border-none flex-1 sm:flex-none px-8"
              >
                {loading ? <span className="loading loading-spinner"></span> : "সেভ করুন"}
              </button>
            </div>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default ProfileUpdate;