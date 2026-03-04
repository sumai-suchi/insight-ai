import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { incrementFailedAttempts, resetFailedAttempts } from "@/lib/auth/userExtra";

export async function POST(req: Request) {

  const { email, password } = await req.json();
console.log("Login attempt", { email });
  try {

    // 🔹 Correct BetterAuth server login
    const res = await auth.api.signInEmail({
      body: {
        email, 
        password
      }
    });

    if (!res?.user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 }
      );
    }

    // 🔹 Successful login → reset attempts
    await resetFailedAttempts(email);

    return NextResponse.json({ data: res });

  } catch (err) {

    console.log(err);

    // 🔹 Failed login → increment attempts
    await incrementFailedAttempts(email);

    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 400 }
    );
  }
}