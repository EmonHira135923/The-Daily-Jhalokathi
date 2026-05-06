import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getContactform } from "../../lib/dbConnect";
import { requireAdmin } from "@/app/(Backend)/middlewares/adminMiddleware";
import { requireAuth } from "@/app/(Backend)/middlewares/authMiddleware";

// GET All Messages - অ্যাডমিন প্যানেলের জন্য
export async function GET(request) {
  try {
    const admin = await requireAdmin(request);
    if (!admin.success) return admin.response;

    const contactFormCollection = await getContactform();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    let query = {};
    if (id) {
      try {
        query._id = new ObjectId(id);
      } catch (error) {
        return NextResponse.json({ success: false, error: "Invalid ID" }, { status: 400 });
      }
    }

    const result = await contactFormCollection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    const normalizedResult = result.map((item) => ({
      ...item,
      id: item._id.toString(),
    }));

    return NextResponse.json({ success: true, data: normalizedResult }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// POST Message - কন্টাক্ট ফরম থেকে ডেটা সেভ করার জন্য
export async function POST(request) {
  try {
    const auth = await requireAuth(request);
    if (!auth.success) return auth.response;

    const contactFormCollection = await getContactform();
    const { name, subject, message } = await request.json();
    const email = auth.user?.email?.trim().toLowerCase();
    const normalizedName = typeof name === "string" ? name.trim() : "";
    const normalizedSubject = typeof subject === "string" ? subject.trim() : "";
    const normalizedMessage = typeof message === "string" ? message.trim() : "";

    // ভ্যালিডেশন
    if (!normalizedName || !email || !normalizedMessage) {
      return NextResponse.json({
        success: false,
        message: "নাম, ইমেইল এবং বার্তা থাকা বাধ্যতামূলক।",
      }, { status: 400 });
    }

    const result = await contactFormCollection.insertOne({
      name: normalizedName,
      email,
      subject: normalizedSubject || "No Subject",
      message: normalizedMessage,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: "বার্তাটি সফলভাবে গ্রহণ করা হয়েছে!",
      insertedId: result.insertedId,
    }, { status: 201 });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message,
    }, { status: 500 });
  }
}

// DELETE Message - অ্যাডমিন প্যানেল থেকে মেসেজ ডিলিট করার জন্য
export async function DELETE(request) {
  try {
    const admin = await requireAdmin(request);
    if (!admin.success) return admin.response;

    const contactFormCollection = await getContactform();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID required" },
        { status: 400 }
      );
    }

    let query = {};
    try {
      query._id = new ObjectId(id);
    } catch (error) {
      return NextResponse.json(
        { success: false, error: "Invalid ID" },
        { status: 400 }
      );
    }

    const result = await contactFormCollection.deleteOne(query);

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Message not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "বার্তাটি সফলভাবে ডিলিট করা হয়েছে!",
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
