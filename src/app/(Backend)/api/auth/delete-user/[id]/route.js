import { getUsers } from "@/app/(Backend)/lib/dbConnect";
import { requireAdmin } from "@/app/(Backend)/middlewares/adminMiddleware";
import { ObjectId } from "mongodb";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getCloudinaryPublicId = (image) => {
  if (!image) return null;
  if (typeof image === "object") return image.public_id || image.publicId || null;
  if (typeof image !== "string" || !image.includes("cloudinary")) return null;

  const withoutQuery = image.split("?")[0];
  const uploadParts = withoutQuery.split("/upload/");
  if (uploadParts.length < 2) return null;

  const pathAfterUpload = uploadParts[1].replace(/^v\d+\//, "");
  return pathAfterUpload.replace(/\.[^/.]+$/, "");
};

export async function DELETE(request, { params }) {
  try {
    const admin = await requireAdmin(request);
    if (!admin.success) return admin.response;

    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return Response.json(
        { success: false, message: "Invalid user id" },
        { status: 400 },
      );
    }

    const loggedInUserId = String(admin.user?._id || admin.user?.id || "");
    if (id === loggedInUserId) {
      return Response.json(
        { success: false, message: "You cannot delete your own account" },
        { status: 403 },
      );
    }

    const userCollection = await getUsers();
    const userToDelete = await userCollection.findOne({ _id: new ObjectId(id) });

    if (!userToDelete) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    if (userToDelete.role === "admin") {
      return Response.json(
        { success: false, message: "Admin users cannot be deleted" },
        { status: 403 },
      );
    }

    const publicId = getCloudinaryPublicId(userToDelete.image);
    if (publicId) {
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        console.error("Cloudinary delete error:", error);
      }
    }

    await userCollection.deleteOne({ _id: new ObjectId(id) });

    return Response.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Delete user API error:", error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
