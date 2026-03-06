import clientPromise  from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
         const db = client.db("Better_Auth");

    const users = await db
      .collection("user")
      .find({})
      .toArray();

    return NextResponse.json(users);

  } catch (error) {
    console.error("Error fetching users:", error);

    return NextResponse.json(
      { message: "Failed to fetch users" },
      { status: 500 }
    );
  }
}