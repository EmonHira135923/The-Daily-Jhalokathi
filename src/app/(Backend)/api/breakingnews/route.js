import { NextResponse } from "next/server";
import { getBreakingNews } from "../../lib/dbConnect";

export async function GET() {
  try {
    const collection = await getBreakingNews();
    
    // ১. ডাটাবেস লেভেলে TTL Index তৈরি করা (একবার রান হলেই হবে)
    // এটি ২৪ ঘণ্টা (৮৬৪০০ সেকেন্ড) পর অটোমেটিক ডিলিট করে দিবে
    await collection.createIndex({ "createdAt": 1 }, { expireAfterSeconds: 86400 });

    // ২. শুধুমাত্র গত ২৪ ঘণ্টার ডাটা খুঁজে বের করা (Safety Filter)
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    const result = await collection
      .find({ createdAt: { $gte: twentyFourHoursAgo } }) 
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

export async function POST(request) {
  try {
    const collection = await getBreakingNews();
    const { title } = await request.json();

    if (!title) {
      return NextResponse.json({ success: false, message: "টাইটেল প্রয়োজন" }, { status: 400 });
    }

    // নিউজ ইনসার্ট করার সময় বর্তমান সময় (Date Object) পাঠানো জরুরি
    const result = await collection.insertOne({
      title,
      createdAt: new Date(), 
    });

    return NextResponse.json({
      success: true,
      message: "ব্রেকিং নিউজ যোগ হয়েছে!",
      insertedId: result.insertedId,
    }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}