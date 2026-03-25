import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";
import connectDB from "@/lib/mongoose-connect/connect-db";
import User from "@/lib/models/User";

export async function GET() {
  try {
    await connectDB();
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const user = await User.findOne({ email: session.user.email });
    return NextResponse.json({
      preferences: user?.preferences || { categories: [], tags: [] },
    });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { categories, tags } = await req.json();
    await User.findOneAndUpdate(
      { email: session.user.email },
      { preferences: { categories, tags } },
      { new: true },
    );
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
