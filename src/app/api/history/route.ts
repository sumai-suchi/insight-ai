// import History from "@/lib/models/History";
// import connectMongo from "@/lib/mongoose-connect/connect-db";
// import { NextResponse } from "next/server";

// export async function POST(req: NextResponse) {
//   const body = await req.json();
//   const { userId, article } = body;

//   await connectMongo();

//   const historyData = {
//     userId,
//     articleId: article._id,
//     title: article.title,
//     url: article.url,
//     urlToImage: article.urlToImage,
//     sourceName: article.sourceName,
//     category: article.category,
//     publishedAt: article.publishedAt,
//     readAt: new Date(),
//   };

//   const result = await History.findOneAndReplace(
//     {
//       userId,
//       articleId: article._id,
//     },
//     historyData,
//     { upsert: true, new: true },
//   );

//   return NextResponse.json(result);
// }
import History from "@/lib/models/History";
import connectMongo from "@/lib/mongoose-connect/connect-db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, article } = body;

    if (!userId || !article?._id) {
      return NextResponse.json(
        { success: false, message: "Missing userId or article data." },
        { status: 400 },
      );
    }

    await connectMongo();

    const historyData = {
      userId,
      articleId: article._id,
      title: article.title,
      url: article.url,
      urlToImage: article.urlToImage,
      sourceName: article.sourceName,
      category: article.category,
      publishedAt: article.publishedAt,
      readAt: new Date(),
    };

    const result = await History.findOneAndReplace(
      { userId, articleId: article._id },
      historyData,
      { upsert: true, new: true },
    );

    return NextResponse.json({
      success: true,
      message: "History saved successfully.",
      data: result,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Error saving history" },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId) {
      return NextResponse.json({ error: "userId is reqired" }, { status: 400 });
    }

    await connectMongo();

    const historyData = await History.find({ userId })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: historyData,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch history" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    await connectMongo();

    if (!id) {
      return NextResponse.json(
        { message: "History not found" },
        { status: 404 },
      );
    }

    await History.findByIdAndDelete(id);
    return NextResponse.json({
      success: true,
      message: "History deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to delete history" },
      { status: 500 },
    );
  }
}
