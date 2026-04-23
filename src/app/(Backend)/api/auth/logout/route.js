import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();
    
    // ✅ দুটো cookie-ই delete করুন
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");

    return Response.json(
      { success: true, message: "Logged out successfully" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { success: false, message: "Logout failed", error: error.message },
      { status: 500 }
    );
  }
}