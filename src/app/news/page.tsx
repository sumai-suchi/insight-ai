import { Suspense } from "react";
import NewsFeed from "@/components/NewsFeed";

export const metadata = { title: "News Feed" };

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Wrapping NewsFeed in Suspense allows Next.js to 
          render the rest of the page statically while 
          waiting for client-side search params.
      */}
      <Suspense fallback={<div className="p-8 text-center">Loading news...</div>}>
        <NewsFeed />
      </Suspense>
    </main>
  );
}