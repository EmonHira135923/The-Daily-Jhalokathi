import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();
    
    // কুকি থেকে refreshToken মুছে ফেলা
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