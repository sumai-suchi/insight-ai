import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { client } from "@/lib/auth/auth"; // reuse existing MongoClient

export async function PATCH(
  req: Request,
  context: { params: Promise<{ userId: string }> } // Next.js 14+ requires params to be awaited
) {
  try {
    const { userId } = await context.params;

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const db = client.db("Better_Auth");
    const usersCollection = db.collection("user"); // check collection name

    // Get the current user
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Toggle the block status
    const newStatus = !user.isBlocked;

    await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { isBlocked: newStatus } }
    );

    return NextResponse.json({
      message: `User has been ${newStatus ? "blocked" : "unblocked"} successfully`,
      isBlocked: newStatus,
    });
  } catch (error: any) {
    console.error("Block user error:", error);
    return NextResponse.json({ error: error.message || "Server error" }, { status: 500 });
  }
}