import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/mongoose-connect/connect-db";
import Review from "@/lib/models/Review";

export async function POST(req: NextRequest) {
  try {
    await connectMongo();

    const body = await req.json();

    const review = await Review.create(body);

    return NextResponse.json({ success: true, data: review }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
export async function GET() {
  try {
    await connectMongo();

    // সব রিভিউ খুঁজে বের করা এবং নতুনগুলো আগে দেখানো (Descending order)
    const reviews = await Review.find({}).sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        count: reviews.length,
        data: reviews,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
