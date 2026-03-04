import { INews } from "@/types/news";
import Image from "next/image";
import Link from "next/link";

export default function NewsCard({ news }: { news: INews }) {
  return (
    <Link
      href={news.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden border border-gray-100"
    >
      <div className="relative h-48 bg-gray-200">
        {news.urlToImage ? (
          <Image
            src={news.urlToImage}
            alt={news.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl">
            📰
          </div>
        )}
        <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full capitalize">
          {news.category}
        </span>
      </div>

      <div className="p-4">
        <p className="text-xs text-gray-400 mb-1">
          {news.sourceName} •{" "}
          {new Date(news.publishedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>

        <h3 className="font-semibold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {news.title}
        </h3>

        {news.description && (
          <p className="text-sm text-gray-500 mt-2 line-clamp-2">
            {news.description}
          </p>
        )}
      </div>
    </Link>
  );
}
