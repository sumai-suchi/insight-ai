import { auth } from "@/lib/auth/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session?.user)
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });

  const user = session.user;

  const formatted = {
    id: user.id,
    name: user.name || "No Name",
    email: user.email,
    bio: (user as any).bio || "",
    role: (user as any).role || "user",
    image: user.image || null,
    joinedDate: user.createdAt
      ? new Date(user.createdAt).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })
      : "",
    postsCount: (user as any).postsCount || 0,
    savedCount: (user as any).savedCount || 0,
    followersCount: (user as any).followersCount || 0,
  };

  return NextResponse.json(formatted);
}

export async function PATCH(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session?.user)
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });

  try {
    const body = await req.json();
    const { bio } = body;

    await auth.api.updateUser({
      headers: req.headers,
      body: { bio },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}