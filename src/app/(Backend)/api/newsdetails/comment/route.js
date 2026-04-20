import { NextResponse } from "next/server";
import { getComments, getReplies } from "@/app/(Backend)/lib/dbConnect";
import { ObjectId } from "mongodb";

// GET - সব কমেন্ট অথবা নির্দিষ্ট newsId এর কমেন্ট
export async function GET(request) {
  try {
    const commentsCollection = await getComments();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const newsId = searchParams.get("newsId");

    let query = {};

    if (id) {
      try {
        query._id = new ObjectId(id);
      } catch {
        return NextResponse.json({ success: false, error: "Invalid ID" }, { status: 400 });
      }
    }

    if (newsId) {
      query.newsId = newsId;
      query.approved = true; // Only show approved comments
    }

    const result = await commentsCollection
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

// POST - নতুন কমেন্ট যোগ করুন
export async function POST(request) {
  try {
    const commentsCollection = await getComments();
    const body = await request.json();

    const { name, email, comment, newsId } = body;

    // Validation
    if (!name || !email || !comment || !newsId) {
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

    if (comment.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: "মন্তব্য কমপক্ষে ৫ অক্ষরের হতে হবে" },
        { status: 400 }
      );
    }

    const newComment = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      comment: comment.trim(),
      newsId,
      createdAt: new Date(),
      approved: true, // Auto-approve for now
    };

    const result = await commentsCollection.insertOne(newComment);

    return NextResponse.json(
      {
        success: true,
        message: "মন্তব্য সফলভাবে পাঠানো হয়েছে",
        data: { ...newComment, id: result.insertedId.toString() },
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// DELETE - কমেন্ট মুছুন (admin)
export async function DELETE(request) {
  try {
    const commentsCollection = await getComments();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "ID প্রয়োজন" }, { status: 400 });
    }

    const result = await commentsCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: "কমেন্ট পাওয়া যায়নি" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "কমেন্ট মুছে ফেলা হয়েছে" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}