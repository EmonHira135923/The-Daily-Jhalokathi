import React from "react";

const ProfileUpdate = () => {
  return (
    <div>
      <dialog
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle backdrop-blur-md"
      >
        <div className="modal-box bg-white border-t-4 border-green-600">
          <h3 className="font-bold text-lg text-green-700 flex items-center gap-2">
            <span className="p-1 bg-green-100 rounded-lg">📝</span>
            প্রোফাইল আপডেট করুন
          </h3>

          <div className="py-6 space-y-4">
            {/* ইমেজ ফিল্ড */}
            <div>
              <label className="text-xs font-bold text-gray-500 mb-1 block uppercase">
                নতুন প্রোফাইল ছবি
              </label>
              <input
                type="file"
                className="file-input file-input-bordered file-input-success w-full bg-white border-gray-200"
              />
            </div>

            {/* ফোন নম্বর ফিল্ড */}
            <div>
              <label className="text-xs font-bold text-gray-500 mb-1 block uppercase">
                ফোন নম্বর
              </label>
              <input
                type="text"
                placeholder="017XXXXXXXX"
                className="input input-bordered w-full bg-white text-black border-gray-200 focus:border-green-600 outline-none"
              />
            </div>
          </div>

          <div className="modal-action">
            <form method="dialog" className="flex gap-2 w-full sm:w-auto">
              <button className="btn btn-ghost flex-1 sm:flex-none">
                বাতিল
              </button>
              <button className="btn bg-green-600 hover:bg-green-700 text-white border-none flex-1 sm:flex-none px-8">
                সেভ করুন
              </button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default ProfileUpdate;
