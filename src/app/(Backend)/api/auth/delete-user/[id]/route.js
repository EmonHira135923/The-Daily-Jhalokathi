import { getUsers } from "@/app/(Backend)/lib/dbConnect";
import { ObjectId } from "mongodb";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// ১. ক্লাউডিনারি কনফিগারেশন (ভেরিফাইড)
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // নিশ্চিত করুন এটি ঠিক আছে
});

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    console.log("--- DELETE REQUEST STARTED ---");
    console.log("Target User ID:", id);

    // ২. টোকেন ও অথরাইজেশন চেক
    const cookieStore = await cookies();
    let token = cookieStore.get("token")?.value;

    if (!token) {
      const authHeader = request.headers.get("authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
    }

    if (!token) return Response.json({ success: false, message: "লগইন করা নেই!" }, { status: 401 });

    // ৩. JWT ভেরিফিকেশন
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET);
    } catch (err) {
      return Response.json({ success: false, message: "অকার্যকর টোকেন!" }, { status: 403 });
    }

    const loggedInUserId = decoded._id || decoded.id;
    const loggedInUserRole = decoded.role;

    // ৪. ডিলিট করা ইউজারের তথ্য ডাটাবেস থেকে খোঁজা
    const userCollection = await getUsers();
    const userToDelete = await userCollection.findOne({ _id: new ObjectId(id) });

    if (!userToDelete) return Response.json({ success: false, message: "ইউজার পাওয়া যায়নি" }, { status: 404 });

    // ৫. সিকিউরিটি লজিক
    if (id === String(loggedInUserId)) return Response.json({ success: false, message: "নিজেকে ডিলিট করা সম্ভব নয়" }, { status: 403 });
    if (userToDelete.role === "admin") return Response.json({ success: false, message: "অ্যাডমিন ডিলিট করা সম্ভব নয়" }, { status: 403 });

    // ৬. ক্লাউডিনারি থেকে ইমেজ ডিলিট (Console Log যুক্ত)
    if (userToDelete.image) {
      console.log("User Image Data:", userToDelete.image); // এটি টার্মিনালে চেক করুন
      
      try {
        let publicId = null;

        // আপনার আপলোড ফাংশন অনুযায়ী অবজেক্ট চেক
        if (userToDelete.image.public_id) {
          publicId = userToDelete.image.public_id;
        } 
        // যদি ডাটাবেজে শুধুমাত্র স্ট্রিং থাকে
        else if (typeof userToDelete.image === "string" && userToDelete.image.includes("cloudinary")) {
          const parts = userToDelete.image.split("/");
          const fileName = parts.pop(); // image.jpg
          publicId = fileName.split(".")[0]; 
          
          // যদি ফোল্ডার থাকে (যেমন: users/image123)
          if (parts.length > 0 && userToDelete.image.includes("/upload/v")) {
             // 'v123456/' এর পরের অংশটুকু নেওয়ার চেষ্টা
             publicId = userToDelete.image.split().pop().split('.')[0]; 
          }
        }

        if (publicId) {
          console.log("Attempting to delete Public ID:", publicId);
          const cloudRes = await cloudinary.uploader.destroy(publicId);
          console.log("Cloudinary API Response:", cloudRes); // এখানে 'ok' বা 'not found' দেখাবে
        } else {
          console.log("No Public ID found to delete.");
        }
      } catch (err) {
        console.error("Cloudinary Logic Error:", err);
      }
    }

    // ৭. ডাটাবেস থেকে ডিলিট
    const result = await userCollection.deleteOne({ _id: new ObjectId(id) });
    console.log("Database Delete Result:", result);

    return Response.json({ success: true, message: "সফলভাবে ডিলিট করা হয়েছে" });

  } catch (error) {
    console.error("Critical API Error:", error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}