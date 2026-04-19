import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getNews } from "../../lib/dbConnect";

// ১. GET All News - খবর পড়ার জন্য (টাইম এবং ডেট ফরম্যাটিং সহ)
export async function GET(request) {
  try {
    const newsCollection = await getNews();
    
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const id = searchParams.get("id");
    
    let query = {};
    if (slug) {
      query.slug = slug.trim().toLowerCase();
    }
    if (id) {
      try {
        query._id = new ObjectId(id);
      } catch (error) {
        return NextResponse.json({
          success: false,
          error: "Invalid news id",
        }, { status: 400 });
      }
    }

    const result = await newsCollection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    const normalizedResult = result.map((item) => {
      const dateObj = new Date(item.createdAt);

      // --- তারিখ ফরম্যাট করা (যেমন: ১৮ এপ্রিল, ২০২৬) ---
      const formattedDate = dateObj.toLocaleDateString("bn-BD", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      // --- রিলেটিভ টাইম ক্যালকুলেশন (যেমন: ৫ মিনিট আগে) ---
      const now = new Date();
      const diffInMinutes = Math.floor((now - dateObj) / (1000 * 60));
      let timeAgo = "এই মাত্র";

      if (diffInMinutes >= 60 && diffInMinutes < 1440) {
        timeAgo = `${Math.floor(diffInMinutes / 60).toLocaleString("bn-BD")} ঘণ্টা আগে`;
      } else if (diffInMinutes >= 1440) {
        timeAgo = `${Math.floor(diffInMinutes / 1440).toLocaleString("bn-BD")} দিন আগে`;
      } else if (diffInMinutes > 0) {
        timeAgo = `${diffInMinutes.toLocaleString("bn-BD")} মিনিট আগে`;
      }

      return {
        ...item,
        id: item._id.toString(),
        slug: item.slug?.toLowerCase(),
        date: formattedDate, // ফ্রন্টএন্ডে ব্যবহারের জন্য
        time: timeAgo,       // ফ্রন্টএন্ডে ব্যবহারের জন্য
      };
    });

    return NextResponse.json({
      success: true,
      data: normalizedResult,
    }, { status: 200 });

  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message,
    }, { status: 500 });
  }
}

// ২. POST News - নতুন খবর যোগ করার জন্য (Dynamic Blocks সহ)
export async function POST(request) {
  try {
    const newsCollection = await getNews();
    const data = await request.json();

    // ভ্যালিডেশন: টাইটেল এবং স্ল্যাগ মাস্ট, সাথে কন্টেন্ট ব্লক থাকতে হবে
    if (!data.title || !data.slug || (!data.content && !data.blocks)) {
      return NextResponse.json({
        success: false,
        message: "শিরোনাম, স্ল্যাগ এবং খবরের বিস্তারিত অংশ থাকা বাধ্যতামূলক।",
      }, { status: 400 });
    }

    const result = await newsCollection.insertOne({
      ...data,
      // যদি blocks থাকে তবে সেটা সেভ হবে, নতুবা আগের মত content
      createdAt: new Date(), 
    });

    return NextResponse.json({
      success: true,
      message: "নিউজটি সফলভাবে ডাটাবেসে যোগ করা হয়েছে!",
      insertedId: result.insertedId,
    }, { status: 201 });

  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message,
    }, { status: 500 });
  }
}