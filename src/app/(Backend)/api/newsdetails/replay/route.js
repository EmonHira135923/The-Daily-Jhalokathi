import { NextResponse } from "next/server";
import { getReplies } from "@/app/(Backend)/lib/dbConnect";
import { ObjectId } from "mongodb";

// GET - সব রিপ্লাই অথবা নির্দিষ্ট commentId এর রিপ্লাই
export async function GET(request) {
  try {
    const repliesCollection = await getReplies();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const commentId = searchParams.get("commentId");

    let query = {};

    if (id) {
      try {
        query._id = new ObjectId(id);
      } catch {
        return NextResponse.json({ success: false, error: "Invalid ID" }, { status: 400 });
      }
    }

    if (commentId) {
      query.commentId = commentId;
      query.approved = true; // Only show approved replies
    }

    const result = await repliesCollection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    const normalizedResult = result.map((item) => ({
      ...item,
      id: item._id.toString(),
      _id: item._id.toString(),
    }));

    return NextResponse.json({ success: true, data: normalizedResult }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// POST - নতুন রিপ্লাই যোগ করুন
export async function POST(request) {
  try {
    const repliesCollection = await getReplies();
    const body = await request.json();

    const { name, email, reply, commentId, newsId } = body;

    // Validation
    if (!name || !email || !reply || !commentId || !newsId) {
      return NextResponse.json(
        { success: false, error: "সব ঘর পূরণ করুন" },
        { status: 400 }
      );
    }

    if (name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "নাম কমপক্ষে ২ অক্ষরের হতে হবে" },
        { status: 400 }
      );
    }

    if (reply.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: "রিপ্লাই কমপক্ষে ৫ অক্ষরের হতে হবে" },
        { status: 400 }
      );
    }

    const newReply = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      reply: reply.trim(),
      commentId,
      newsId,
      createdAt: new Date(),
      approved: true, // Auto-approve for now
    };

    const result = await repliesCollection.insertOne(newReply);

    return NextResponse.json(
      {
        success: true,
        message: "রিপ্লাই সফলভাবে পাঠানো হয়েছে",
        data: { ...newReply, id: result.insertedId.toString() },
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// DELETE - রিপ্লাই মুছুন (owner বা admin)
export async function DELETE(request) {
  try {
    const repliesCollection = await getReplies();
    const { searchParams } = new URL(request.url);
    const queryId = searchParams.get("id");
    const body = await request.json().catch(() => ({}));
    const id = queryId || body.id;
    const requesterEmail = (body.email || "").trim().toLowerCase();
    const adminEmails = process.env.ADMIN_EMAILS
      ? process.env.ADMIN_EMAILS.split(",").map((email) => email.trim().toLowerCase())
      : ["admin@dailyjhalokathi.com"];

    if (!id || !requesterEmail) {
      return NextResponse.json(
        { success: false, error: "ID এবং ইমেইল প্রয়োজন" },
        { status: 400 }
      );
    }

    const reply = await repliesCollection.findOne({ _id: new ObjectId(id) });
    if (!reply) {
      return NextResponse.json({ success: false, error: "রিপ্লাই পাওয়া যায়নি" }, { status: 404 });
    }

    const isAdmin = adminEmails.includes(requesterEmail);
    if (reply.email !== requesterEmail && !isAdmin) {
      return NextResponse.json(
        { success: false, error: "আপনি এই রিপ্লাইটি মুছতে পারবেন না" },
        { status: 403 }
      );
    }

    const result = await repliesCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: "কিছু সমস্যা হয়েছে" }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "রিপ্লাই মুছে ফেলা হয়েছে" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}