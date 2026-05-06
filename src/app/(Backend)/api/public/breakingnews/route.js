import { NextResponse } from "next/server";
import { getBreakingNews } from "@/app/(Backend)/lib/dbConnect";
import { toPublicBreakingNews } from "@/app/(Backend)/lib/publicDtos";

export async function GET() {
  try {
    const collection = await getBreakingNews();

    await collection.createIndex(
      { createdAt: 1 },
      { expireAfterSeconds: 86400 },
    );

    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    await collection.deleteMany({
      createdAt: { $lt: twentyFourHoursAgo },
    });

    const result = await collection
      .find(
        {},
        {
          projection: {
            title: 1,
          },
        },
      )
      .sort({ createdAt: -1 })
      .limit(10)
      .toArray();

    return NextResponse.json(
      { success: true, data: result.map(toPublicBreakingNews) },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to fetch public breaking news" },
      { status: 500 },
    );
  }
}
