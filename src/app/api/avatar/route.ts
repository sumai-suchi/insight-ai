// app/api/avatar/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = `https://ui-avatars.com/api/?name=User&background=6366f1&color=fff&size=200`;
  const res = await fetch(url);
  const buffer = await res.arrayBuffer();

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "s-maxage=86400",
    },
  });
}