"use client";
import { motion } from "framer-motion";

export default function Features() {
  const features = [
    {
      title: "AI Content Generation",
      desc: "Create high-quality, engaging content in seconds using advanced AI models.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-blue-600"
        >
          <path d="M12 3a9 9 0 0 0-9 9v7c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-7a9 9 0 0 0-9-9Z" />
          <circle cx="12" cy="8" r="2" />
        </svg>
      ),
      borderColor: "hover:border-blue-400",
    },
    {
      title: "News Summarization",
      desc: "Get the gist of long news articles instantly with AI-powered summaries.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-emerald-600"
        >
          <path d="M4 6h16" />
          <path d="M4 12h10" />
          <path d="M4 18h16" />
        </svg>
      ),
      borderColor: "hover:border-emerald-400",
    },
    {
      title: "AI SEO Optimization",
      desc: "Rank higher on Google with AI-driven SEO keywords and meta strategies.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-purple-600"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      ),
      borderColor: "hover:border-purple-400",
    },
    {
      title: "AI Article Writing",
      desc: "Generate full-length, fact-checked articles optimized for your niche.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-orange-600"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
      borderColor: "hover:border-orange-400",
    },
    {
      title: "Manual Editing Mode",
      desc: "Full control over your content with our advanced rich-text editor.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-pink-600"
        >
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      ),
      borderColor: "hover:border-pink-400",
    },
    {
      title: "AI Title Generation",
      desc: "Catchy and viral-ready titles that grab attention immediately.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-yellow-600"
        >
          <path d="M4 7V4h16v3" />
          <path d="M12 4v16" />
        </svg>
      ),
      borderColor: "hover:border-yellow-400",
    },
    {
      title: "Smart Bookmarks",
      desc: "Organize and save your favorite AI-generated drafts for future use.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-red-600"
        >
          <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
        </svg>
      ),
      borderColor: "hover:border-red-400",
    },
  ];

  return (
    <section className="bg-white py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Black Heading Section */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-blue-600 font-bold tracking-widest uppercase text-sm"
          >
            Future of Content Creation
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight"
          >
            Supercharge Your Workflow with <br />
            <span className="text-blue-600">AI Intelligence</span>
          </motion.h2>
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg">
            Everything you need to generate, optimize, and manage
            high-performing content 10x faster.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -8 }}
              className={`group relative p-8 rounded-3xl bg-gray-50 border border-gray-100 shadow-sm transition-all duration-300 ${item.borderColor} hover:shadow-xl hover:bg-white`}
            >
              <div className="relative z-10">
                {/* Icon Box */}
                <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white shadow-sm mb-6 group-hover:scale-110 transition-transform duration-300 border border-gray-50">
                  {item.icon}
                </div>

                {/* Text Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  {item.desc}
                </p>
              </div>

              {/* Hover Indicator */}
              <div className="mt-6 flex items-center text-blue-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Try it now</span>
                <svg
                  className="ml-2 w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14m-7-7 7 7-7 7" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
