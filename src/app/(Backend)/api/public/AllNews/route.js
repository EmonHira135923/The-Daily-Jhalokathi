import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getNews } from "@/app/(Backend)/lib/dbConnect";
import { toPublicNews } from "@/app/(Backend)/lib/publicDtos";

export async function GET(request) {
  try {
    const newsCollection = await getNews();
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const id = searchParams.get("id");

    let query = {};
    if (slug) query.slug = slug.trim().toLowerCase();
    if (id) {
      if (!ObjectId.isValid(id)) {
        return NextResponse.json(
          { success: false, message: "Invalid news id" },
          { status: 400 },
        );
      }
      query._id = new ObjectId(id);
    }

    const result = await newsCollection
      .find(query, {
        projection: {
          title: 1,
          slug: 1,
          description: 1,
          content: 1,
          image: 1,
          thumbnail: 1,
          time: 1,
          date: 1,
          featured: 1,
          side: 1,
          createdAt: 1,
        },
      })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(
      { success: true, data: result.map(toPublicNews) },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to fetch public news" },
      { status: 500 },
    );
  }
}
