import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { getUsers } from "@/app/(Backend)/lib/dbConnect";

export async function GET(request) {
  try {
    const authHeader = request.headers.get("authorization");

    // ১. টোকেন চেক করা
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return Response.json(
        { success: false, message: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    // ২. টোকেন ভেরিফাই করা
    let decoded;
    try {
      // আপনার .env থেকে সিক্রেট কী ব্যবহার
      decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);
    } catch (err) {
      return Response.json(
        { success: false, message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // ৩. ডাটাবেস থেকে ইউজার খোঁজা
    const userCollection = await getUsers();
    
    // সিকিউরিটি চেক: যদি decoded অবজেক্টে _id না থাকে
    if (!decoded?._id) {
      return Response.json({ success: false, message: "Invalid token payload" }, { status: 400 });
    }

    const user = await userCollection.findOne({
      _id: new ObjectId(decoded._id),
    });

    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // ৪. সেনসিটিভ ডাটা রিমুভ করা
    const { password, ...userWithoutPassword } = user;

    return Response.json(
      {
        message: "User profile fetched successfully",
        success: true,
        result: userWithoutPassword, // পাসওয়ার্ড বাদে সব তথ্য পাঠানো হচ্ছে
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        message: "Internal server error",
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}