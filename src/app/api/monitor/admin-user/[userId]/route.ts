import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { client } from "@/lib/auth/auth";

// PATCH = update user (block, role, discount)
// DELETE = remove user
export async function PATCH(
  req: Request,
  context: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await context.params;

    if (!userId) return NextResponse.json({ error: "User ID required" }, { status: 400 });

    const db = client.db("Better_Auth");
    const usersCollection = db.collection("user");

    const body = await req.json(); // expects { isBlocked?, role?, discount? }
    const updates: any = {};

    if (typeof body.isBlocked === "boolean") updates.isBlocked = body.isBlocked;
    if (body.role) updates.role = body.role;
    if (typeof body.discount === "number") updates.discount = body.discount;

    if (Object.keys(updates).length === 0)
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });

    const result = await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: updates }
    );

    if (result.matchedCount === 0)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json({ message: "User updated successfully", updates });
  } catch (error: any) {
    console.error("Admin PATCH user error:", error);
    return NextResponse.json({ error: error.message || "Server error" }, { status: 500 });
  }
}
