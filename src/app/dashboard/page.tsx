import Link from "next/link";
import React from "react";

export default function AIPage() {
  return (
    <div className="min-h-screen bg-[#0c234b] text-white font-sans relative">
      {/* Back Button - Top Left Corner */}
      <div className="absolute top-6 left-6 z-50">
        <Link
          href="/"
          className="flex items-center gap-2 px-5 py-3 bg-[#0F2854] hover:bg-[#1C4D8D] transition-all rounded-2xl text-sm font-medium border border-white/10 hover:border-[#1C4D8D]"
        >
          <span className="text-xl">←</span>
          <span>Back</span>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-6 pt-24 pb-16 text-center">
        <h2 className="text-6xl md:text-7xl font-bold leading-tight mb-6">
          Powerful AI for
          <br />
          Modern Writers
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
          Write better, faster, and with confidence. AI Edition + Plagiarism
          Checker in one place.
        </p>
      </div>

      {/* Two Feature Cards */}
      <div className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 gap-8">
          {/* AI Edition Card */}
          <div className="group bg-[#0F2854] rounded-3xl p-10 hover:scale-[1.02] transition-all duration-300 border border-white/5 hover:border-[#1C4D8D]">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-[#1C4D8D] flex items-center justify-center mb-8 text-4xl">
              ✨
            </div>
            <h3 className="text-4xl font-semibold mb-4">AI Edition</h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Intelligent writing assistant that helps you generate, rewrite,
              and improve your content with state-of-the-art AI models.
            </p>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-3">✓ Smart suggestions</li>
              <li className="flex items-center gap-3">
                ✓ Multiple writing styles
              </li>
              <li className="flex items-center gap-3">✓ Real-time editing</li>
              <li className="flex items-center gap-3">✓ Tone adjustment</li>
            </ul>

            {/* Fixed Link Button */}
            <Link
              href="/dashboard/templates"
              className="mt-10 block w-full py-4 bg-[#1C4D8D] hover:bg-white hover:text-[#0F2854] font-medium rounded-2xl transition-all text-center"
            >
              Explore AI Edition →
            </Link>
          </div>

          {/* Plagiarism Checker Card */}
          <div className="group bg-[#0F2854] rounded-3xl p-10 hover:scale-[1.02] transition-all duration-300 border border-white/5 hover:border-[#1C4D8D]">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-400 to-orange-500 flex items-center justify-center mb-8 text-4xl">
              🔍
            </div>
            <h3 className="text-4xl font-semibold mb-4">Plagiarism Checker</h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Advanced plagiarism detection with AI content identification. Get
              detailed reports and originality scores instantly.
            </p>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-3">✓ Deep web search</li>
              <li className="flex items-center gap-3">
                ✓ AI-generated content detection
              </li>
              <li className="flex items-center gap-3">
                ✓ Detailed similarity report
              </li>
              <li className="flex items-center gap-3">✓ PDF & Doc upload</li>
            </ul>

            {/* Fixed Link Button */}
            <Link
              href="/dashboard/plagiarism"
              className="mt-10 block w-full py-4 bg-[#1C4D8D] hover:bg-white hover:text-[#0F2854] font-medium rounded-2xl transition-all text-center"
            >
              Check Plagiarism Now →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}