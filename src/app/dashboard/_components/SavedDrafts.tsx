// components/SavedDrafts.tsx
import { Eye, Share2 } from 'lucide-react';

export default function SavedDrafts() {
  const drafts = [
    { title: "The Future of AI Content", words: 850, time: "2 hours ago", seo: 85, seoColor: "text-green-600 bg-green-100" },
    { title: "Social Media Marketing Tips", words: 1200, time: "1 day ago", seo: 78, seoColor: "text-yellow-600 bg-yellow-100" },
    { title: "Email Campaign Ideas", words: null, time: null, seo: null, seoColor: "" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <span className="text-blue-600 text-2xl">📝</span> Saved Drafts & Templates
        </h2>
        <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {drafts.map((draft, i) => (
          <div
            key={i}
            className="p-4 border border-gray-200 rounded-lg hover:border-purple-200 transition-colors group"
          >
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-gray-900 group-hover:text-purple-700">
                {draft.title}
              </h3>
              <div className="flex gap-2 opacity-70 group-hover:opacity-100">
                <button className="p-1 hover:bg-gray-100 rounded">
                  <Eye className="h-4 w-4 text-gray-600" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <Share2 className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
              {draft.words && <span>{draft.words} words</span>}
              {draft.time && <span>• {draft.time}</span>}
              {draft.seo && (
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${draft.seoColor}`}>
                  SEO: {draft.seo}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}