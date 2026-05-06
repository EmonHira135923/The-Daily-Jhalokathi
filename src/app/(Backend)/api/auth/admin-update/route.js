import { getUsers } from "@/app/(Backend)/lib/dbConnect";
import { requireAdmin } from "@/app/(Backend)/middlewares/adminMiddleware";
import { ObjectId } from "mongodb";

export async function PATCH(request) {
  try {
    const admin = await requireAdmin(request);
    if (!admin.success) return admin.response;

    const { userId, role } = await request.json(); // শুধু রোল রিসিভ করবে

    if (!userId || !role) {
      return Response.json({ success: false, message: "Missing Data" }, { status: 400 });
    }

    const userCollection = await getUsers();
    await userCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { role, updated_at: new Date() } }
    );

    return Response.json({ success: true, message: "Role Updated" });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
