import React from "react";
import {
  Sparkles,
  Newspaper,
  Edit3,
  RefreshCw,
  Settings,
  Shield,
  Save,
  FileText,
  Sliders,
  LayoutTemplate,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";

export default function SolutionsPage() {
  return (
    <main className="w-full flex-col font-sans">
      {/* SECTION 1: HERO */}
      <section className="w-full bg-[#3B2B85] text-white pt-24 pb-32 px-4 relative overflow-hidden flex flex-col items-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm mb-8">
            <Sparkles className="w-4 h-4 text-purple-300" />
            <span className="text-sm font-medium tracking-wide text-purple-100">
              Complete Content & News Platform
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
            Create AI-Powered Content & <br className="hidden md:block" /> Discover Personalized News
          </h1>

          <p className="text-lg md:text-xl text-purple-200 mb-10 max-w-3xl">
            Generate high-quality content, optimize for SEO, and get trending news tailored to you — all in one powerful platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-14">
            <button className="flex items-center justify-center gap-2 bg-white text-purple-900 px-8 py-3.5 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              <Sparkles className="w-5 h-5" />
              Try AI Editor
            </button>
            <button className="flex items-center justify-center gap-2 bg-transparent border-2 border-white/30 text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              <Newspaper className="w-5 h-5" />
              Explore News Feed
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {["AI Content Editor", "Personalized News", "SEO Optimization", "Plagiarism Check"].map((feature, i) => (
              <span key={i} className="px-4 py-2 rounded-full border border-white/20 bg-white/5 text-sm font-medium text-purple-100">
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Hero Image / Dashboard Mockup */}
        <div className="max-w-5xl mx-auto mt-16 relative z-10 w-full px-4">
          <div className="relative rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-white/5 p-2">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-800">
              <img
                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80"
                alt="Platform Dashboard Preview"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating Stats */}
            <div className="absolute -left-2 sm:-left-6 bottom-12 bg-white p-4 rounded-xl shadow-xl border border-gray-100 animate-bounce duration-[3000ms]">
              <div className="text-xs text-gray-500 font-medium mb-1">Content Generated</div>
              <div className="text-2xl font-bold text-gray-900">50,000+</div>
            </div>

            <div className="absolute -right-2 sm:-right-6 top-24 bg-white p-4 rounded-xl shadow-xl border border-gray-100 animate-bounce delay-1000 duration-[3000ms]">
              <div className="text-xs text-gray-500 font-medium mb-1">Active Users</div>
              <div className="text-2xl font-bold text-gray-900">12,500+</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: CAPABILITIES GRID */}
      <section className="w-full bg-slate-50 py-24 px-4 flex flex-col items-center">
        <div className="max-w-6xl w-full mx-auto">
          {/* Section Heading */}
          <div className="flex flex-col items-center text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 mb-6 font-semibold text-sm">
              <Sparkles className="w-4 h-4" />
              Content Creation Powerhouse
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              AI-Powered Content Solutions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Everything you need to create high-quality, SEO-optimized content faster than ever before.
            </p>
          </div>

          {/* Grid Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {/* Example Card */}
            {[{
              icon: <Edit3 className="w-6 h-6" />,
              title: "AI Blog/Article Generator",
              description: "Generate high-quality content instantly with advanced AI."
            },{
              icon: <RefreshCw className="w-6 h-6" />,
              title: "Content Rewriter",
              description: "Paraphrase and rewrite content to make it unique."
            },{
              icon: <Settings className="w-6 h-6" />,
              title: "SEO Suggestions",
              description: "Optimize content with real-time SEO recommendations."
            },{
              icon: <Shield className="w-6 h-6" />,
              title: "Plagiarism Checker",
              description: "Ensure originality by scanning billions of sources."
            }].map((card, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-5">
                  {card.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{card.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>

          {/* Feature Showcase Block */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 flex flex-col md:flex-row">
            <div className="p-10 md:p-14 flex-1 flex flex-col justify-center">
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Create Content in Seconds</h3>

              <ul className="space-y-5 mb-10">
                {[
                  "Generate blog posts, articles, and marketing copy instantly",
                  "Check for plagiarism and ensure 100% originality",
                  "Get real-time SEO suggestions to rank higher",
                  "Save drafts automatically and never lose your work"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}