import NewsFeed from "@/components/NewsFeed";

export const metadata = { title: "News Feed" };

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <NewsFeed />
    </main>
  );
}
