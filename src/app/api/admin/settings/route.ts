import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongoose-connect/connect-db";
import { Settings } from "@/lib/models/Settings";

export async function GET() {
  try {
    await connectMongo();
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: Request) {
  try {
    await connectMongo();
    const body = await req.json();
    const updatedSettings = await Settings.findOneAndUpdate({}, body, {
      new: true,
      upsert: true,
    });
    return NextResponse.json(updatedSettings);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 },
    );
  }
}
