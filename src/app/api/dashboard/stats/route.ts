import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose-connect/connect-db";
import mongoose from "mongoose";
import User from "@/lib/models/User";

export const revalidate = 0;

export async function GET(request: Request) {
  try {
    await connectDB();

    const articlesCollection = mongoose.connection.db?.collection("articles");

    const { searchParams } = new URL(request.url);
    const range = parseInt(searchParams.get("range") || "7");

    // time
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    startDate.setDate(startDate.getDate() - (range - 1));

    const [
      totalArticles,
      totalUsers,
      totalAdmins,
      totalEditors,
      recentArticlesCursor,
      chartDataRaw, 
    ] = await Promise.all([
      articlesCollection?.countDocuments() || 0,
      User.countDocuments(),
      User.countDocuments({ role: "admin" }),
      User.countDocuments({ role: "editor" }),
      articlesCollection?.find({}).sort({ createdAt: -1 }).limit(5).toArray(),
      articlesCollection
        ?.aggregate([
          { $match: { createdAt: { $gte: startDate } } },
          {
            $group: {
              _id: {
                $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
              },
              amt: { $sum: 1 },
              aiCount: {
                $sum: { $cond: [{ $eq: ["$isAiGenerated", true] }, 1, 0] },
              },
            },
          },
        ])
        .toArray(),
    ]);

    const recentArticles = recentArticlesCursor || [];

    const dynamicChartData = [];
    for (let i = 0; i < range; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);

      const dateStr = currentDate.toISOString().split("T")[0]; 
      const label = currentDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      const found = chartDataRaw?.find((d) => d._id === dateStr);

      const posts = found?.amt || 0;
      const aiPosts = found?.aiCount || 0;

      dynamicChartData.push({
        name: label,
        amt: posts,
        pv: posts * 150, 
        uv: posts > 0 ? aiPosts * 100 + 200 : 0,
      });
    }

    // SEO Score
    const seoData = await articlesCollection
      ?.aggregate([{ $group: { _id: null, avgScore: { $avg: "$seoScore" } } }])
      .toArray();
    const avgSeoScore =
      seoData && seoData.length > 0 ? Math.round(seoData[0].avgScore) : 0;

    return NextResponse.json({
      success: true,
      data: {
        totalArticles,
        aiGenerations:
          (await articlesCollection?.countDocuments({ isAiGenerated: true })) ||
          0,
        totalUsers,
        totalAdmins,
        totalEditors,
        avgSeoScore,
        chartData: dynamicChartData,
        recentArticles,
      },
    });
  } catch (error: any) {
    console.error("Dashboard Stats Error:", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
