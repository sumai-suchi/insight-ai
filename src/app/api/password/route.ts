import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth"; // BetterAuth instance

export async function PATCH(req: NextRequest) {
  const { userId, oldPassword, newPassword } = await req.json();
  try {
    await auth.updatePassword(userId, oldPassword, newPassword);
    return NextResponse.json({ message: "Password updated successfully" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
