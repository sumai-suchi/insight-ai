import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";
import connectDB from "@/lib/mongoose-connect/connect-db";
import User from "@/lib/models/User";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized: Please log in" },
        { status: 401 },
      );
    }

    const body = await req.json();
    const { articleId } = body;

    if (!articleId) {
      return NextResponse.json({ error: "Missing articleId" }, { status: 400 });
    }

    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      { $addToSet: { readingHistory: articleId } },
      { new: true },
    );

    if (!updatedUser) {
      return NextResponse.json(
        { error: "User not found in database" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Reading history updated successfully",
    });
  } catch (error: any) {
    console.error("History API Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
