import { notFound } from "next/navigation";
import connectMongo from "@/lib/mongoose-connect/connect-db";
import NewArticle from "@/lib/models/NewArticle";
import ArticlePreview from "@/components/ArticlePreview";

// Updated Interface for Next.js 15 (params is now a Promise)
interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PreviewPage({ params }: PageProps) {
  // 1. Await the params to unwrap the Promise (Required in Next.js 15)
  const { slug } = await params;

  try {
    // 2. Connect to Database
    await connectMongo();

    // 3. Fetch the specific article by slug
    // Ensure 'slug' exists in your NewArticle Schema
    const articleData = await NewArticle.findOne({ slug }).lean();

    // 4. If no article exists with that slug, show 404
    if (!articleData) {
      console.error(`Article not found for slug: ${slug}`);
      return notFound();
    }

    // 5. Serialize data for the Client Component
    const serializedArticle = JSON.parse(JSON.stringify(articleData));

    return (
      <div className="min-h-screen bg-[#0A192F] py-12 px-4">
        <div className="max-w-8xl mx-auto">
          {/* Preview Header */}
          <div className="mb-10 flex items-center justify-between border-b border-[#BDE8F5]/10 pb-6">
            <div>
              <h1 className="text-[#BDE8F5] text-sm font-black uppercase tracking-[0.2em]">Mode: Article Preview</h1>
              <p className="text-[#BDE8F5]/50 text-xs mt-1">This is how your story will appear to readers.</p>
            </div>
            {/* Note: window.close() only works if the tab was opened via window.open() */}
            <button 
              className="text-[10px] font-bold text-[#4988C4] border border-[#4988C4]/30 px-3 py-1 rounded hover:bg-[#4988C4]/10 transition-all"
            >
              PREVIEW MODE
            </button>
          </div>

          {/* 6. Render your component */}
          <ArticlePreview article={serializedArticle} />
        </div>
      </div>
    );
  } catch (error: any) {
    // Handle specific NEXT_NOT_FOUND error to avoid double logging
    if (error.digest?.includes('NEXT_HTTP_ERROR_FALLBACK')) {
        throw error;
    }
    
    console.error("Preview Fetch Error:", error);
    return (
      <div className="text-red-400 p-20 text-center font-mono">
        Failed to load preview. <br />
        <span className="text-xs opacity-50">{error.message}</span>
      </div>
    );
  }
}