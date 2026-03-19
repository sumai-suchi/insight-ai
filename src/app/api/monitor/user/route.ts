import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongoose-connect/connect-db";
import { UserCurd } from "@/lib/mongoose-connect/User";
import mongoose from "mongoose";

export async function GET(request: Request) {
  console.log("Received request to fetch users");

  try {
    await connectMongo();
    console.log("Mongo connected to:", mongoose.connection.db?.databaseName);

    const { searchParams } = new URL(request.url);
    console.log("checking",searchParams)

    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "all";

    const query: any = {};

    /* -------- SEARCH BY NAME OR EMAIL -------- */
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    /* -------- FILTER BY STATUS -------- */
    if (status !== "all") {
      query.status = status;
    }

    const users = await UserCurd.find(query).sort({ createdAt: -1 });

    return NextResponse.json(users);
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}