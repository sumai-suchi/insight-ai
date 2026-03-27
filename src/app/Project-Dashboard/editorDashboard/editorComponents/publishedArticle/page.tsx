"use client";

import { Article } from "@/types/editor";
import { Clock, Calendar, User } from "lucide-react";

interface Props {
  articles: Article[];
}

const MOCK_ARTICLES: Article[] = [
  {
    _id: "art_7721",
    title: "The Impact of Solar Glass on Modern Skyscrapers",
    slug: "solar-glass-skyscrapers-2026",
    content: "<h1>Energy-Generating Windows</h1><p>Solar glass technology has reached a tipping point...</p>",
    excerpt: "How transparent photovoltaic cells are turning entire city skylines into vertical power plants.",
    featuredImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
    author: {
      _id: "auth_01",
      name: "Jordan Smith",
      email: "j.smith@architech.com",
      avatar: "https://i.pravatar.cc/150?u=jordan",
      role: "writer"
    },
    category: { _id: "cat_01", name: "Sustainability", slug: "sustainability" },
    tags: [
      { _id: "t_01", name: "Green Tech", slug: "green-tech" },
      { _id: "t_02", name: "Architecture", slug: "architecture" }
    ],
    status: "published",
    contentType: "ai_assisted",
    seo: {
      metaTitle: "Solar Glass Skyscrapers: The Future of Urban Energy",
      metaDescription: "Discover how solar glass is revolutionizing skyscraper design.",
      focusKeyword: "solar glass",
      score: 92
    },
    aiReview: {
      overallScore: 88,
      factualityScore: 95,
      toneScore: 80,
      grammarScore: 90,
      reviewedAt: "2026-03-24T10:00:00Z",
      issues: [
        {
          type: "tone",
          severity: "low",
          description: "The introduction sounds slightly too promotional.",
          originalText: "This incredible, world-changing technology is...",
          suggestion: "This technology is significantly impacting..."
        }
      ]
    },
    wordCount: 1250,
    readingTime: 6,
    publishedAt: "2026-03-25T08:00:00Z",
    createdAt: "2026-03-23T14:20:00Z",
    updatedAt: "2026-03-25T08:00:00Z"
  },
  {
    _id: "art_8832",
    title: "Why Rust is Replacing C++ in Systems Programming",
    slug: "rust-vs-cpp-systems-2026",
    content: "<p>Memory safety is no longer optional in the age of cyber-warfare...</p>",
    excerpt: "Analyzing the industry-wide shift toward memory-safe languages in core infrastructure.",
    author: {
      _id: "auth_02",
      name: "Sarah Chen",
      email: "schen@dev.io",
      role: "admin"
    },
    category: { _id: "cat_02", name: "Engineering", slug: "engineering" },
    tags: [{ _id: "t_03", name: "Rust", slug: "rust-lang" }],
    status: "scheduled",
    contentType: "manual",
    seo: {
      metaTitle: "Rust vs C++: The Systems Programming Shift",
      metaDescription: "Comparison of memory safety and performance in 2026.",
      focusKeyword: "Rust programming",
      score: 78
    },
    wordCount: 2100,
    readingTime: 11,
    scheduledFor: "2026-04-05T09:00:00Z",
    createdAt: "2026-03-20T11:00:00Z",
    updatedAt: "2026-03-22T16:45:00Z"
  },
  {
    _id: "art_9910",
    title: "Understanding Neumorphism in 2026 Web Design",
    slug: "neumorphism-trends-2026",
    content: "<p>The soft-UI trend is making a sophisticated comeback...</p>",
    excerpt: "How tactile, soft-shadow interfaces are being re-imagined for high-end dashboards.",
    featuredImage: "https://images.unsplash.com/photo-1558655146-d09347e92766",
    author: {
      _id: "auth_03",
      name: "Liam Foster",
      email: "liam@designweekly.com",
      avatar: "https://i.pravatar.cc/150?u=liam",
      role: "editor"
    },
    category: { _id: "cat_03", name: "Design", slug: "design" },
    tags: [{ _id: "t_04", name: "UI Design", slug: "ui-design" }],
    status: "draft",
    contentType: "ai_generated",
    seo: {
      metaTitle: "Neumorphism in 2026",
      metaDescription: "Is Neumorphism back? Let's look at the data.",
      focusKeyword: "neumorphism",
      score: 65
    },
    aiReview: {
      overallScore: 62,
      factualityScore: 50,
      toneScore: 70,
      grammarScore: 85,
      reviewedAt: "2026-03-26T14:30:00Z",
      issues: [
        {
          type: "hallucination",
          severity: "high",
          description: "AI referenced a 'Design Award 2027' which hasn't happened yet.",
          originalText: "Winner of the prestigious 2027 Global Design Award...",
          suggestion: "Remove specific future-dated award references."
        },
        {
          type: "factual",
          severity: "medium",
          description: "Incorrectly stated that Neumorphism was invented in 2022.",
          originalText: "First appearing in early 2022...",
          suggestion: "Correct date to late 2019/early 2020."
        }
      ]
    },
    wordCount: 850,
    readingTime: 4,
    createdAt: "2026-03-26T09:00:00Z",
    updatedAt: "2026-03-26T14:35:00Z"
  }
];

export default function PublishedArticles({ articles }: Props) {
  return (
    <div className="p-6">
      {/* Heading */}
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        📚 Published Articles
      </h1>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_ARTICLES.map((article) => (
          <div
            key={article._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border"
          >
            {/* Image */}
            <div className="h-48 w-full overflow-hidden">
              <img
                src={article.featuredImage || "/placeholder.jpg"}
                alt={article.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Content */}
            <div className="p-5 space-y-3">
              {/* Category + Status */}
              <div className="flex justify-between items-center">
                <span className="text-xs px-3 py-1 bg-purple-100 text-purple-600 rounded-full">
                  {article.category?.name}
                </span>

                <span className="text-xs px-3 py-1 bg-green-100 text-green-600 rounded-full">
                  Published
                </span>
              </div>

              {/* Title */}
              <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
                {article.title}
              </h2>

              {/* Excerpt */}
              <p className="text-sm text-gray-500 line-clamp-3">
                {article.excerpt}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {article.tags?.slice(0, 3).map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs bg-gray-100 px-2 py-1 rounded-full"
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>

              {/* Meta Info */}
              <div className="flex justify-between text-xs text-gray-400 pt-2 border-t">
                <div className="flex items-center gap-1">
                  <User size={14} />
                  {article.author?.name}
                </div>

                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  {article.readingTime} min
                </div>
              </div>

              <div className="flex justify-between text-xs text-gray-400">
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  {new Date(article.publishedAt || "").toLocaleDateString()}
                </div>

                <span>{article.wordCount} words</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}