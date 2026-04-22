import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getNews } from "../../lib/dbConnect";

// ১. GET: সব খবর পড়ার জন্য
export async function GET(request) {
  try {
    const newsCollection = await getNews();
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const id = searchParams.get("id");

    let query = {};
    if (slug) query.slug = slug.trim().toLowerCase();
    if (id) query._id = new ObjectId(id);

    const result = await newsCollection.find(query).sort({ createdAt: -1 }).toArray();

    // ডেট ফরম্যাটিং লজিক (আগের মতই থাকবে)
    const normalizedResult = result.map((item) => ({
      ...item,
      id: item._id.toString(),
      formattedDate: new Date(item.createdAt).toLocaleDateString("bn-BD", {
        day: "numeric", month: "long", year: "numeric",
      })
    }));

    return NextResponse.json({ success: true, data: normalizedResult });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// ২. POST: নতুন খবর (অ্যাডমিন দ্বারা)
export async function POST(request) {
  try {
    const newsCollection = await getNews();
    const data = await request.json();

    /* Front-end থেকে data যেভাবে আসবে:
      {
        title: "...",
        slug: "...",
        thumbnail: "cloudinary_url",
        blocks: [
          { type: "paragraph", value: "..." },
          { type: "subheading", value: "..." },
          { type: "quote", value: "..." },
          { type: "image", value: "optional_extra_image_url" }
        ],
        category: "..."
      }
    */

    if (!data.title || !data.slug) {
      return NextResponse.json({ success: false, message: "শিরোনাম ও স্ল্যাগ প্রয়োজন" }, { status: 400 });
    }

    const newPost = {
      title: data.title,
      slug: data.slug.trim().toLowerCase(),
      thumbnail: data.thumbnail, // Cloudinary থেকে আসা মেইন ইমেজ
      blocks: data.blocks || [],  // এখানে সাব-হেডিং, কোট সব থাকবে
      category: data.category,
      authorId: data.authorId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await newsCollection.insertOne(newPost);
    return NextResponse.json({ success: true, insertedId: result.insertedId }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// ৩. PATCH: আপডেট করার জন্য
export async function PATCH(request) {
  try {
    const newsCollection = await getNews();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const data = await request.json();

    if (!id) return NextResponse.json({ success: false, message: "ID প্রয়োজন" }, { status: 400 });

    const { _id, ...updateData } = data;
    const result = await newsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...updateData, updatedAt: new Date() } }
    );

    return NextResponse.json({ success: true, message: "আপডেট সফল" });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// ৪. DELETE: ডিলিট করার জন্য
export async function DELETE(request) {
  try {
    const newsCollection = await getNews();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const result = await newsCollection.deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ success: true, message: "ডিলিট সফল" });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}