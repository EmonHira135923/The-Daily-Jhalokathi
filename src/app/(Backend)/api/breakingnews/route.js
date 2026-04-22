import { NextResponse } from "next/server";
import { getBreakingNews } from "../../lib/dbConnect";

// ─────────────────────────────────────────────
// GET → সব Breaking News দেখাবে (latest first)
// 24hr old auto remove + max 10 items maintain
// ─────────────────────────────────────────────
export async function GET() {
  try {
    const collection = await getBreakingNews();

    // TTL Index (24 hours পরে auto delete)
    await collection.createIndex(
      { createdAt: 1 },
      { expireAfterSeconds: 86400 }
    );

    // Safety cleanup (older than 24h)
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    await collection.deleteMany({
      createdAt: { $lt: twentyFourHoursAgo },
    });

    const result = await collection
      .find({})
      .sort({ createdAt: -1 })
      .limit(10)
      .toArray();

    const normalizedResult = result.map((item) => ({
      ...item,
      id: item._id.toString(),
    }));

    return NextResponse.json(
      { success: true, data: normalizedResult },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

// ─────────────────────────────────────────────
// POST → নতুন Breaking News Add করবে
// max 10 হলে oldest delete হবে
// ─────────────────────────────────────────────
export async function POST(request) {
  try {
    const collection = await getBreakingNews();
    const { title } = await request.json();

    if (!title) {
      return NextResponse.json(
        { success: false, message: "টাইটেল প্রয়োজন" },
        { status: 400 }
      );
    }

    // Add new news
    const result = await collection.insertOne({
      title,
      createdAt: new Date(),
    });

    // Count total docs
    const total = await collection.countDocuments();

    // যদি 10 এর বেশি হয় oldest remove
    if (total > 10) {
      const extra = total - 10;

      const oldestDocs = await collection
        .find({})
        .sort({ createdAt: 1 })
        .limit(extra)
        .toArray();

      const idsToDelete = oldestDocs.map((item) => item._id);

      await collection.deleteMany({
        _id: { $in: idsToDelete },
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "ব্রেকিং নিউজ যোগ হয়েছে!",
        insertedId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}