"use client";


import { NewsAPIArticle } from "@/types/news";
import Image from "next/image";
// ...existing code...

interface ArticleCardProps {
  article: NewsAPIArticle;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <div className="bg-white rounded shadow p-4 flex flex-col gap-2">
      <h2 className="text-lg font-semibold">{article.title}</h2>
      {article.urlToImage && (
        <Image
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-48 object-cover rounded"
        />
      )}
      <p className="text-gray-700 text-sm">{article.description}</p>
      <div className="flex justify-between items-center mt-2">
        <span className="text-xs text-gray-400">
          {article.author || "Unknown author"}
        </span>
        <span className="text-xs text-gray-400">
          {new Date(article.publishedAt).toLocaleString()}
        </span>
      </div>
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline mt-2"
      >
        Read more
      </a>
    </div>
  );
}
