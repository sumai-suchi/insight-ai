// pages/api/admin/create-user.ts
import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongoose-connect/connect-db";
import { UserCurd } from "@/lib/mongoose-connect/User";

export async function POST(req: Request) {
  try {
    await connectMongo();
    const body = await req.json();

    const newUser = await UserCurd.create({
      name: body.name,
      email: body.email,
      role: body.role || "user",
      status: body.status || "active",
      discount: body.discount || 0,
      image: body.image || "",
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (err) {
    console.error("Create user error:", err);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}