import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { getUsers } from "@/app/(Backend)/lib/dbConnect";
import { cookies } from "next/headers";

export async function GET(request) {
  try {
    let token = null;

    // ১. প্রথমে Authorization header চেক করুন
    const authHeader = request.headers.get("authorization");
    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    // ২. header না থাকলে cookie থেকে নিন
    if (!token) {
      const cookieStore = await cookies();
      token = cookieStore.get("accessToken")?.value;
    }

    // ৩. কোনোটাই না থাকলে Unauthorized
    if (!token) {
      return Response.json(
        { success: false, message: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    // ৪. token verify করুন
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);
    } catch (err) {
      return Response.json(
        { success: false, message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    if (!decoded?._id) {
      return Response.json(
        { success: false, message: "Invalid token payload" },
        { status: 400 }
      );
    }

    // ৫. DB থেকে user আনুন
    const userCollection = await getUsers();
    const user = await userCollection.findOne({
      _id: new ObjectId(decoded._id),
    });

    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // ৬. password বাদ দিয়ে পাঠান
    const { password, ...userWithoutPassword } = user;

    return Response.json(
      {
        message: "User profile fetched successfully",
        success: true,
        result: userWithoutPassword,
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