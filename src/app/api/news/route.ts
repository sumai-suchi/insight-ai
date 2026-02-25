import { NextRequest, NextResponse } from "next/server";
import { NewsApiResponse } from "@/types/news";

export async function GET(request: NextRequest): Promise<NextResponse> {
  // const { searchParams } = new URL(request.url);
  // const category = searchParams.get("category") ?? "technology";
  // const page = searchParams.get("page") ?? "1";
  // const pageSize = searchParams.get("pageSize") ?? "9";

  const category = request.nextUrl.searchParams.get("category") ?? "technology";
  const page = request.nextUrl.searchParams.get("page") ?? "1";
  const pageSize = request.nextUrl.searchParams.get("pageSize") ?? "9";

  try {
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?category=${category}&language=en&page=${page}&pageSize=${pageSize}&apiKey=${process.env.NEWS_API_KEY}`,
      { next: { revalidate: 3600 } },
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch news" },
        { status: res.status },
      );
    }

    const data: NewsApiResponse = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("News API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
