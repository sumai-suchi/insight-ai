"use client";
import { History, RotateCcw, Clock, FileEdit } from "lucide-react";
import { useState } from "react";

interface Revision {
  id: string;
  timestamp: string;
  editorNote: string;
  author: string;
  contentPreview: string;
}

const initialRevisions: Revision[] = [
  {
    id: "1",
    timestamp: "Oct 24, 2023 • 02:30 PM",
    editorNote: "Improved SEO keywords for the introduction.",
    author: "Siddique Khan",
    contentPreview: "In the rapidly evolving world of AI...",
  },
  {
    id: "2",
    timestamp: "Oct 24, 2023 • 11:15 AM",
    editorNote: "Corrected grammar in the second paragraph.",
    author: "Siddique Khan",
    contentPreview: "Artificial intelligence is changing how we...",
  },
  {
    id: "3",
    timestamp: "Oct 23, 2023 • 04:45 PM",
    editorNote: "Initial draft with basic structure.",
    author: "Siddique Khan",
    contentPreview: "AI content creation is the future of...",
  },
];

const RevisionHistory: React.FC = () => {
  const [revisions, setRevisions] = useState(initialRevisions);

  const handleRestore = (id: string) => {
    const version = revisions.find((r) => r.id === id);
    if (version) {
      alert(`Restoring version from: ${version.timestamp}`);
      // Logic to update your main content state would go here
    }
  };

  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden max-w-6xl mx-auto my-12">
      {/* Header */}
      <div className="bg-[#F9FAFB] px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
            <History size={20} />
          </div>
          <h2 className="text-[#1F2937] font-bold text-lg">
            History / Revisions
          </h2>
        </div>
        <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">
          Last 5 Edits
        </span>
      </div>

      {/* Revision List */}
      <div className="divide-y divide-gray-50">
        {revisions.map((rev) => (
          <div
            key={rev.id}
            className="group px-6 py-5 hover:bg-blue-50/30 transition-colors duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <FileEdit
                  size={18}
                  className="text-gray-400 group-hover:text-blue-500 transition-colors"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Clock size={14} className="text-gray-400" />
                  <p className="text-sm font-semibold text-gray-700">
                    {rev.timestamp}
                  </p>
                  <span className="text-[10px] px-2 py-0.5 bg-gray-100 rounded text-gray-500 font-bold uppercase">
                    {rev.author}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-1 leading-relaxed italic">
                  &quot;{rev.editorNote}&quot;
                </p>
                <p className="text-gray-400 text-xs truncate max-w-[280px] md:max-w-md">
                  Preview: {rev.contentPreview}
                </p>
              </div>
            </div>

            <button
              onClick={() => handleRestore(rev.id)}
              className="flex items-center justify-center gap-2 self-start md:self-center px-4 py-2 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:border-blue-200 hover:text-blue-600 hover:bg-white active:scale-95 transition-all duration-200"
            >
              <RotateCcw size={14} />
              Restore
            </button>
          </div>
        ))}
      </div>

      {/* Empty State Footer */}
      <div className="px-6 py-4 bg-[#F9FAFB]/50 text-center border-t border-gray-100">
        <button className="text-blue-600 text-xs font-bold hover:underline">
          View Full Version History
        </button>
      </div>
    </section>
  );
};

export default RevisionHistory;
