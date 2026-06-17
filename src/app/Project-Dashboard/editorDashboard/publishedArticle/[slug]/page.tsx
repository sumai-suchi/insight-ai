import { Article as ArticleType } from "@/types/editor";
import { Calendar, Clock, ChevronLeft, Share2, Bookmark } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Use an absolute URL for Server-side fetching
const API_BASE = process.env.BETTER_AUTH_URL 


async function getArticle(slug: string): Promise<ArticleType | null> {
  try {
    // Corrected the path to match standard API structures
    const res = await fetch(`${API_BASE}/api/articles/published/${slug}`, {
      next: { revalidate: 3600 },
    });
    
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

// Added async to the component and correctly typed the Promise for params
export default async function ArticleDetails({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  // 1. AWAIT the params to get the slug (Required in Next.js 15)
  const { slug } = await params;

  // 2. Fetch article data
  const article = await getArticle(slug);

  // 3. Handle 404
  if (!article) notFound();

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Navigation Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Ensure this link goes back to the correct dashboard path */}
          <Link href="/Project-dashboard/editorDashboard/publishedArticle" className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
            <ChevronLeft size={20} />
            <span className="font-medium text-sm">Back to Feed</span>
          </Link>
          <div className="flex gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"><Share2 size={18} /></button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"><Bookmark size={18} /></button>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <header className="max-w-4xl mx-auto px-6 pt-12 pb-8 text-center">
        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold uppercase tracking-widest">
          {article.category?.name || "Uncategorized"}
        </span>
        <h1 className="mt-6 text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
          {article.title}
        </h1>
        <p className="mt-6 text-xl text-gray-500 italic max-w-2xl mx-auto">
          "{article.excerpt}"
        </p>
      </header>

      {/* 3. Featured Image */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="relative h-[300px] md:h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl">
          <img
            src={article.featuredImage || "/placeholder.jpg"}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* 4. Article Info & Content */}
      <main className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-12 mt-12 pb-24">
        
        {/* Main Content */}
        <article>
          <div className="flex items-center gap-6 mb-10 text-sm text-gray-500 border-b pb-6">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              {article.publishedAt 
                ? new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                : "Date not available"}
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              {article.readingTime || "5"} min read
            </div>
          </div>

          {/* HTML Content Render */}
          <div 
            className="prose prose-lg prose-purple max-w-none 
            prose-headings:font-bold prose-headings:text-gray-900 
            prose-p:text-gray-700 prose-p:leading-relaxed
            prose-img:rounded-2xl prose-strong:text-gray-900"
            dangerouslySetInnerHTML={{ __html: article.content }} 
          />

          {/* Tags */}
          <div className="mt-16 pt-8 border-t flex flex-wrap gap-2">
            {article.tags?.map((tag) => (
              <span key={tag._id} className="px-4 py-2 bg-gray-50 text-gray-600 rounded-xl text-sm border border-gray-100 hover:bg-gray-100 cursor-pointer transition-colors">
                #{tag.name}
              </span>
            ))}
          </div>
        </article>

        {/* Sidebar: Author Info */}
        <aside className="space-y-8">
          <div className="sticky top-24 p-6 bg-gray-50 rounded-3xl border border-gray-100">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Written By</h3>
            <div className="flex items-center gap-4 mb-4">
              <img 
                src={article.author?.avatar || "https://i.pravatar.cc/150"} 
                className="w-12 h-12 rounded-full object-cover" 
                alt={article.author?.name} 
              />
              <div>
                <p className="font-bold text-gray-900">{article.author?.name || "Unknown Author"}</p>
                <p className="text-xs text-purple-600 font-medium capitalize">{article.author?.role || "Contributor"}</p>
              </div>
            </div>
            <button className="w-full py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold hover:shadow-md transition-all">
              Follow Author
            </button>
          </div>
        </aside>
      </main>
    </div>
  );
}