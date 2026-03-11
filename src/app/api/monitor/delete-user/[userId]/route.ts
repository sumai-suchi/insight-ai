// app/api/monitor/delete-user/[userId]/route.ts
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import {client} from "@/lib/auth/auth";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ userId: string }> } // params is now a Promise
) {
  const { userId } = await context.params; // ✅ unwrap the Promise

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }
  try {
    console.log("Connecting to MongoDB...");
    const db = client.db("Better_Auth");
    const usersCollection = db.collection("user"); // check your collection name

    const result = await usersCollection.deleteOne({
      _id: new ObjectId(userId),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete user error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}