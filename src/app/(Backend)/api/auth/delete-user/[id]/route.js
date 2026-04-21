import { getUsers } from "@/app/(Backend)/lib/dbConnect";
import { ObjectId } from "mongodb";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    // ১. টোকেন চেক (কুকি অথবা হেডার উভয় জায়গা থেকেই চেক করবে)
    const cookieStore = await cookies();
    let token = cookieStore.get("token")?.value;

    if (!token) {
      const authHeader = request.headers.get("authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
    }

    if (!token) {
      return Response.json({ success: false, message: "লগইন করা নেই!" }, { status: 401 });
    }

    // ২. JWT ডিকোড করা
    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET);
    const loggedInUserId = decoded._id || decoded.id; 

    // ৩. সুরক্ষা: নিজের আইডি ডিলিট রোধ
    if (id === String(loggedInUserId)) {
      return Response.json({ 
        success: false, 
        message: "আপনি নিজেকে ডিলিট করতে পারবেন না!" 
      }, { status: 403 });
    }

    const userCollection = await getUsers();
    const user = await userCollection.findOne({ _id: new ObjectId(id) });

    if (!user) {
      return Response.json({ success: false, message: "ইউজার পাওয়া যায়নি" }, { status: 404 });
    }

    // ৪. ক্লাউডিনারি থেকে ইমেজ ডিলিট
    if (user.image && user.image.includes("cloudinary.com")) {
      try {
        const publicId = user.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      } catch (err) { console.error("Cloudinary Error", err); }
    }

    // ৫. ডাটাবেস থেকে ডিলিট
    await userCollection.deleteOne({ _id: new ObjectId(id) });

    return Response.json({ success: true, message: "সফলভাবে ডিলিট করা হয়েছে" });

  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}