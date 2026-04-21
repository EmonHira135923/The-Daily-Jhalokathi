"use client";
import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import AdminUserUpdate from "../../Forms/Admin/AdminUserUpdate";

const AllUserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [currentAdminId, setCurrentAdminId] = useState(null);

  const DEFAULT_AVATAR = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

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
      }
    } catch (error) {
      toast.error("সার্ভার কানেকশন এরর!");
    } finally {
      // কৃত্রিমভাবে একটু দেরি করানো যাতে স্কেলিটন বোঝা যায় (ঐচ্ছিক)
      setTimeout(() => setLoading(false), 500);
    }
  }, []);

  useEffect(() => {
    fetchMyProfile();
    getAllUsers();
  }, [fetchMyProfile, getAllUsers]);

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
        setUsers((prev) => prev.filter((u) => (u._id?.$oid || u._id) !== userIdToDelete));
        document.getElementById("delete_confirm_modal").close();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("ডিলিট করতে সমস্যা হয়েছে!");
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 font-banglafont text-black">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold">সদস্য তালিকা</h2>
          <p className="text-sm text-gray-500">
            Total Users: {loading ? <span className="animate-pulse inline-block w-4 h-4 bg-gray-200 rounded"></span> : users.length}
          </p>
        </div>
        <button onClick={getAllUsers} className="btn btn-sm btn-ghost border-gray-200">🔄 রিফ্রেশ</button>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-50 text-gray-700">
              <th>ইউজার</th>
              <th>যোগাযোগ</th>
              <th>রোল</th>
              <th className="text-center">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody>
            {/* --- লোডিং স্কেলিটন --- */}
            {loading && [1, 2, 3, 4, 5].map((item) => (
              <tr key={item} className="animate-pulse border-b border-gray-50">
                <td>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl"></div>
                    <div className="space-y-2">
                      <div className="h-3 w-24 bg-gray-200 rounded"></div>
                      <div className="h-2 w-16 bg-gray-100 rounded"></div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="space-y-2">
                    <div className="h-3 w-32 bg-gray-200 rounded"></div>
                    <div className="h-2 w-20 bg-gray-100 rounded"></div>
                  </div>
                </td>
                <td><div className="h-6 w-16 bg-gray-100 rounded-full"></div></td>
                <td>
                  <div className="flex justify-center gap-2">
                    <div className="h-3 w-10 bg-gray-100 rounded"></div>
                    <div className="h-3 w-10 bg-gray-100 rounded"></div>
                  </div>
                </td>
              </tr>
            ))}

            {/* --- আসল ডাটা --- */}
            {!loading && users.map((user) => {
              const userId = user._id?.$oid ? String(user._id.$oid) : String(user._id);
              const isMe = currentAdminId === userId;
              let imageLink = user.image?.secure_url || (typeof user.image === "string" ? user.image : DEFAULT_AVATAR);

              return (
                <tr key={userId} className="hover:bg-gray-50/50 border-b border-gray-50">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden border">
                        <Image src={imageLink} alt="user" fill className="object-cover" unoptimized />
                      </div>
                      <div>
                        <div className="font-bold text-[14px]">
                          {user.name} {isMe && <span className="text-blue-600 text-[10px] ml-1">(আপনি)</span>}
                        </div>
                        <div className="text-[10px] text-gray-400">ID: {userId?.slice(-6)}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="text-[13px]">{user.email}</div>
                    <div className="text-[11px] text-gray-400">{user.phone || "No Phone"}</div>
                  </td>
                  <td>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${user.role === "admin" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
                      {user.role === "admin" ? "অ্যাডমিন" : "সদস্য"}
                    </span>
                  </td>
                  <td className="text-center">
                    <div className="flex justify-center gap-2">
                      <button onClick={() => {setSelectedUser(user); document.getElementById("admin_edit_modal").showModal();}} className="text-blue-600 text-xs">এডিট</button>
                      <button onClick={() => {setUserToDelete(user); document.getElementById("delete_confirm_modal").showModal();}} disabled={isMe} className={`text-xs font-bold ${isMe ? "text-gray-300" : "text-red-600"}`}>
                        {isMe ? "Protected" : "ডিলিট"}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* মডালগুলো আগের মতোই থাকবে... */}
      <dialog id="delete_confirm_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white text-black">
          <h3 className="font-bold text-lg text-red-600">আপনি কি নিশ্চিত?</h3>
          <p className="py-4 text-gray-600">আপনি কি সত্যিই <b>{userToDelete?.name}</b>-কে ডিলিট করতে চান?</p>
          <div className="modal-action">
            <form method="dialog"><button className="btn btn-sm">বাতিল</button></form>
            <button onClick={confirmDelete} className="btn btn-sm bg-red-600 text-white border-none">হ্যাঁ, ডিলিট করুন</button>
          </div>
        </div>
      </dialog>

      <AdminUserUpdate user={selectedUser} refreshProfile={getAllUsers} />
    </div>
  );
};

export default AllUserPage;