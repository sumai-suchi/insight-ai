import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/mongoose-connect/connect-db";
import { Notification } from "@/lib/models/Notification";
import { auth } from "@/lib/auth/auth";

// --- (GET) ---
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { user } = session;

    const notifications = await Notification.find({
      $or: [
        { recipientId: user.id },
        { recipientRole: user.role },
        { recipientRole: "ALL" },
      ],
    })
      .sort({ createdAt: -1 })
      .limit(50);

    return NextResponse.json(notifications);
  } catch (error) {
    console.error("Notification Fetch Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// --- PATCH ---
export async function PATCH(req: NextRequest) {
  try {
    await connectDB();

    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, all } = await req.json();

    if (all) {
      await Notification.updateMany(
        {
          $or: [
            { recipientId: session.user.id },
            { recipientRole: session.user.role },
            { recipientRole: "ALL" },
          ],
          isRead: false,
        },
        { isRead: true },
      );
    } else {
      await Notification.findByIdAndUpdate(id, { isRead: true });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Notification Update Error:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectDB();

    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      await Notification.findByIdAndDelete(id);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  } catch (error) {
    console.error("Notification Delete Error:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
