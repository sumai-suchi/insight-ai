// components/PersonalizedNewsFeed.tsx
export default function PersonalizedNewsFeed() {
  const categories = ['AI', 'Tech', 'Marketing', 'Business'];
  const posts = [
    { title: "AI Models Reach Human-Level Writing", category: "AI", time: "2h ago" },
    { title: "SEO Trends for 2026", category: "Marketing", time: "4h ago" },
    { title: "Content Creation Tools Evolve", category: null, time: null },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <span className="text-orange-600 text-2xl">📰</span> Personalized News Feed
        </h2>
        <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">
          View All
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`
              px-3 py-1 rounded-full text-sm font-medium
              ${cat === 'AI' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {posts.map((post, i) => (
          <div
            key={i}
            className="p-4 border border-gray-200 rounded-lg hover:border-purple-200 transition-colors group flex justify-between items-start gap-4"
          >
            <div>
              <h3 className="font-medium text-gray-900 group-hover:text-purple-700">
                {post.title}
              </h3>
              <div className="mt-1.5 flex items-center gap-3 text-sm text-gray-500">
                {post.category && (
                  <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                    {post.category}
                  </span>
                )}
                {post.time && <span>{post.time}</span>}
              </div>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded opacity-60 group-hover:opacity-100">
              <span className="text-xl">📑</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}