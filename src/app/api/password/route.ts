import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth"; // BetterAuth instance

export async function PATCH(req: NextRequest) {
  const { userId, oldPassword, newPassword } = await req.json();
  try {
    const { oldPassword, newPassword } = await req.json();

    const result = await auth.api.changePassword({
      body: {
        currentPassword: oldPassword,
        newPassword: newPassword,
      },
    });

    return NextResponse.json({
      message: "Password updated successfully",
      data: result,
    });

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 400 }
    );
  }
}
