import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { ObjectId } from "mongodb"; // এটি প্রয়োজন ID হ্যান্ডেল করতে
import { getUsers } from "@/app/(Backend)/lib/dbConnect";

// ক্লাউডিনারি কনফিগারেশন
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function PATCH(req) {
  try {
    const body = await req.json();
    const { userId, phone, image, imagePublicId } = body;

    if (!userId) {
      return NextResponse.json({ success: false, message: "ইউজার আইডি প্রয়োজন" }, { status: 400 });
    }

    const usersCollection = await getUsers();
    const query = { _id: new ObjectId(userId) };

    // ১. ডাটাবেস থেকে বর্তমান ইউজারকে খুঁজে বের করা (Native Driver স্টাইল)
    const currentUser = await usersCollection.findOne(query);
    
    if (!currentUser) {
      return NextResponse.json({ success: false, message: "ইউজার পাওয়া যায়নি" }, { status: 404 });
    }

    // ২. পুরনো ইমেজ ডিলিট করার লজিক
    if (imagePublicId && currentUser.imagePublicId) {
      try {
        await cloudinary.uploader.destroy(currentUser.imagePublicId);
      } catch (err) {
        console.error("Cloudinary Delete Error:", err);
      }
    }

    // ৩. ডাটাবেস আপডেট করা (Native Driver স্টাইল)
    const updateData = {};
    if (phone) updateData.phone = phone;
    if (image) updateData.image = image;
    if (imagePublicId) updateData.imagePublicId = imagePublicId;

    const result = await usersCollection.findOneAndUpdate(
      query,
      { $set: updateData },
      { returnDocument: "after" } // এটি আপডেট হওয়া নতুন ডাটা রিটার্ন করবে
    );

    return NextResponse.json({
      success: true,
      message: "প্রোফাইল আপডেট হয়েছে",
      result: result.value, // আপডেটেড ডাটা
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ success: false, message: "সার্ভার এরর" }, { status: 500 });
  }
}