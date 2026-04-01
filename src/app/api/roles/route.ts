import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Role } from "@/lib/models/Role";
import mongoose from "mongoose";

export async function GET() {
  try {
    await connectToDatabase();

    const rolesData = await Role.find({}).sort({ createdAt: 1 });


    const usersCollection = mongoose.connection.collection("user");

    const rolesWithDynamicCount = await Promise.all(
      rolesData.map(async (role) => {

        const dynamicCount = await usersCollection.countDocuments({
          role: role.roleId,
        });

        return {
          ...role.toObject(),
          count: dynamicCount,
        };
      }),
    );

    return NextResponse.json(rolesWithDynamicCount);
  } catch (error: any) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch roles", details: error.message },
      { status: 500 },
    );
  }
}


export async function PATCH(req: Request) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const { roleId, permissions } = body;

    if (!roleId || !permissions) {
      return NextResponse.json(
        { error: "roleId and permissions are required" },
        { status: 400 },
      );
    }

    const updatedRole = await Role.findOneAndUpdate(
      { roleId: roleId },
      { $set: { permissions: permissions } },
      { new: true },
    );

    if (!updatedRole) {
      return NextResponse.json({ error: "Role not found" }, { status: 404 });
    }

    return NextResponse.json(updatedRole);
  } catch (error: any) {
    console.error("PATCH Error:", error);
    return NextResponse.json(
      { error: "Failed to update permissions", details: error.message },
      { status: 500 },
    );
  }
}
