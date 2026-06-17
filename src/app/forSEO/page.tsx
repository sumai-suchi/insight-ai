"use client";

import Link from "next/link";
import Image from "next/image";

//
//
//
//

export default function ForSEO() {
  return (
    <main className="bg-gray-50 min-h-screen font-sans">
      {/* Article Header & Top Text */}
      <section className="max-w-7xl mx-auto pt-16 px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Boost Your Website SEO with InsightAI: The Ultimate Guide
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed mb-8">
          In the history of digital marketing, there is probably no greater leap
          forward than the integration of Artificial Intelligence into search
          strategies. While traditional SEO has had its ups and downs, the
          launch of InsightAI marks a new era of performance-driven results.
        </p>

        {/* Top Image Grid - ✅ images used */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="h-64 bg-gray-200 rounded-xl overflow-hidden relative shadow-inner">
            <Image
              src="https://i.ibb.co.com/vxzKHTfC/michal-kubalczyk-Wecngm-AT-KY-unsplash.jpg" // আপনার ছবি এখানে দিন
              alt="Detailed SEO audit dashboard interface"
              fill
              className="object-cover"
              sizes="(max-w-768px) 100vw, 33vw"
            />
          </div>
          <div className="h-64 bg-gray-200 rounded-xl overflow-hidden relative shadow-inner">
            <Image
              src="https://i.ibb.co.com/My7Y1qH9/thisisengineering-sb-Vu5zit-Zt0-unsplash.jpg" // আপনার ছবি এখানে দিন
              alt="AI powered keyword research tool interface"
              fill
              className="object-cover"
              sizes="(max-w-768px) 100vw, 33vw"
            />
          </div>
          <div className="h-64 bg-gray-200 rounded-xl overflow-hidden relative shadow-inner">
            <Image
              src="https://i.ibb.co.com/LG9gkzC/blake-wisz-Xn5-Fb-EM9564-unsplash.jpg" // আপনার ছবি এখানে দিন
              alt="Analytics chart showing significant website traffic growth"
              fill
              className="object-cover"
              sizes="(max-w-768px) 100vw, 33vw"
            />
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold mb-4">
          Can You Automate Your SEO Growth?
        </h2>
        <p className="text-gray-600 mb-6">
          Search Engine Optimization (SEO) is essential for any website that
          wants to attract more visitors. InsightAI provides a comprehensive
          AI-powered toolkit to help you analyze, optimize, and monitor your
          performance in real-time. Whether you are a blogger or a digital
          marketer, we make SEO simple.
        </p>

        {/* Highlighted Blockquote (Orange Border) */}
        <div className="border-l-4 border-orange-500 pl-6 my-10">
          <p className="text-xl italic text-gray-700">
            "The future of SEO isn't just about keywords; it's about
            understanding user intent through data. InsightAI bridges that gap
            by providing real-time actionable insights."
          </p>
        </div>

        <p className="text-gray-600 mb-10">
          Our AI engine scans your website, evaluates key metrics like Core Web
          Vitals, and provides suggestions to boost your score. It’s not just
          about ranking; it's about staying ahead of the competition.
        </p>

        {/* Mid-Content Image Duo - ✅ images used */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="h-72 bg-gray-200 rounded-2xl relative overflow-hidden shadow">
            <Image
              src="https://i.ibb.co.com/WWmvFXkb/park-ingyeom-wm0-Zdvf1ee-M-unsplash.jpg" // আপনার ছবি এখানে দিন
              alt="Advanced data analytics and trend visualization screen"
              fill
              className="object-cover"
              sizes="(max-w-768px) 100vw, 50vw"
            />
          </div>
          <div className="h-72 bg-gray-200 rounded-2xl relative overflow-hidden shadow">
            <Image
              src="https://i.ibb.co.com/NdQ0bqzC/daniil-komov-j-Kuu-Oj-4-V30-unsplash.jpg" // আপনার ছবি এখানে দিন
              alt="Real-time SEO optimization checklist and score dashboard"
              fill
              className="object-cover"
              sizes="(max-w-768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Features List Section */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold mb-6">Why Choose InsightAI?</h2>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">✓</span>
              <p>
                <strong>AI Keyword Suggestions:</strong> Discover search trends
                and competitor gaps instantly.
              </p>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">✓</span>
              <p>
                <strong>Content Optimization:</strong> Real-time tips for
                headings, meta tags, and readability.
              </p>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">✓</span>
              <p>
                <strong>Backlink Monitoring:</strong> Keep track of your
                authority and inbound link quality.
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/* Author Section - ✅ image used */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full flex-shrink-0 relative overflow-hidden border-2 border-white shadow-md">
            <Image
              src=" https://i.ibb.co.com/4Z5HRdq7/florinel-zone-6-KYl-Vl-JV35-Q-unsplash.jpg" // অথর এর ছবি এখানে দিন
              alt="Margaret Cortez - Senior SEO Specialist"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-grow">
            <h4 className="text-xl font-bold">Margaret Cortez</h4>
            <p className="text-gray-500 text-sm mb-2">
              Senior SEO Specialist at InsightAI
            </p>
            <div className="flex gap-2 mb-3">
              <span className="px-2 py-1 bg-white text-[10px] rounded border">
                SEO
              </span>
              <span className="px-2 py-1 bg-white text-[10px] rounded border">
                MARKETING
              </span>
              <span className="px-2 py-1 bg-white text-[10px] rounded border">
                AI TECH
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Helping brands reach the first page of Google with data-driven AI
              strategies.
            </p>
          </div>
        </div>
      </section>

      {/* Related Articles Section - ✅ images used in loop */}
      <section className="max-w-6xl mx-auto py-20 px-6">
        <h3 className="text-3xl font-bold text-center mb-12">
          Related Articles
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item, index) => (
            <div
              key={item}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition group"
            >
              <div className="h-48 bg-gray-200 relative">
                <Image
                  src={`https://i.ibb.co.com/wF9MJQPt/minh-pham-HI6gy-p-WBI-unsplash.jpg`} // related-article-1.jpg, etc.
                  alt={`Thumbnail for related article ${item}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-w-768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                  Strategy
                </span>
                <h4 className="text-xl font-bold mt-2 mb-3">
                  How to scale your traffic in 2026
                </h4>
                <p className="text-gray-500 text-sm mb-4">
                  Learn the secrets of organic growth using our latest AI
                  models...
                </p>
                <div className="flex items-center text-xs text-gray-400 gap-4">
                  <span>❤️ 120 Likes</span>
                  <span>👁️ 1.2k Views</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="text-center pb-20">
        <Link
          href="/auth/sign-up"
          className="bg-black text-white px-10 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition"
        >
          Start Optimizing Today
        </Link>
      </section>
    </main>
  );
}
