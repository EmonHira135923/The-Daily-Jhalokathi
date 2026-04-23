import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getContactform } from "../../lib/dbConnect";

// GET All Messages - অ্যাডমিন প্যানেলের জন্য
export async function GET(request) {
  try {
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
    const contactFormCollection = await getContactform();
    const { name, email, subject, message } = await request.json();

    // ভ্যালিডেশন
    if (!name || !email || !message) {
      return NextResponse.json({
        success: false,
        message: "নাম, ইমেইল এবং বার্তা থাকা বাধ্যতামূলক।",
      }, { status: 400 });
    }

    const result = await contactFormCollection.insertOne({
      name,
      email,
      subject: subject || "No Subject",
      message,
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