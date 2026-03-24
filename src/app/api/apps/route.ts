import App from "@/lib/models/Apps";
import connectMongo from "@/lib/mongoose-connect/connect-db";
import { NextRequest, NextResponse } from "next/server";

// POST method: insert apps
export async function POST(req: NextRequest) {
  try {
    await connectMongo();

    const apps = await req.json(); // expecting array of objects

    if (!Array.isArray(apps) || apps.length === 0) {
      return NextResponse.json(
        { message: "No data provided" },
        { status: 400 },
      );
    }

    const inserted = await App.insertMany(apps, { ordered: false });

    return NextResponse.json(
      { message: "Data inserted", inserted },
      { status: 201 },
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 },
    );
  }
}

// GET method: fetch all apps
export async function GET(req: NextRequest) {
  try {
    await connectMongo();

    const apps = await App.find().sort({ featured: -1, name: 1 });
    // featured apps first, then alphabetical

    return NextResponse.json(apps, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 },
    );
  }
}
