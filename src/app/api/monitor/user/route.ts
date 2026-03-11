import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongoose-connect/connect-db";
import { UserCurd } from "@/lib/mongoose-connect/User";
import mongoose from "mongoose";


export async function GET() {
    console.log("Received request to fetch users");
  try {
    await connectMongo();
    console.log("Mongo connected to:", mongoose.connection.db?.databaseName);
    const users = await UserCurd.find();
    return NextResponse.json(users);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}