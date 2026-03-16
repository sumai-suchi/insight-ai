import { NextResponse } from "next/server";
import client from "@/lib/mongoose-connect/connect-db";
import connectMongo from "@/lib/mongoose-connect/connect-db";
import { UserCurd } from "@/lib/mongoose-connect/User";


export async function GET() {
   try {
    // Connect to MongoDB via Mongoose
    console.log("Connecting to MongoDB... stats route");
    await connectMongo();

    // Fetch stats using Mongoose
    const totalUsers = await  UserCurd.countDocuments({});
    const activeUsers = await UserCurd.countDocuments({ status: "active" });
    const proPlans = await UserCurd.countDocuments({ role: "pro" });
    const suspended = await UserCurd.countDocuments({ isBlocked: true });
    console.log("Stats fetched:", { totalUsers, activeUsers, proPlans, suspended });

    return NextResponse.json({
      totalUsers,
      activeUsers,
      proPlans,
      suspended,
    });
  } catch (err) {
    console.error("Error fetching stats:", err);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}