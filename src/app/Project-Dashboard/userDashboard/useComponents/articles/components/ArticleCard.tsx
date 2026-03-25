interface Article {
  _id: string;
  title: string;
  content: string;
  status: "draft" | "pending" | "published" | "rejected";
  createdAt: string;
  image?: string; // optional image URL
}

const statusColor = {
  draft: "bg-gray-200 text-gray-700",
  pending: "bg-yellow-200 text-yellow-700",
  published: "bg-green-200 text-green-700",
  rejected: "bg-red-200 text-red-700",
};

const ArticleCard = ({
  article,
  onSubmit,
}: {
  article: Article;
  onSubmit: (id: string) => void;
}) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition duration-300 flex flex-col">
      {/* Image */}
      {article.image ? (
        <div className="h-48 w-full overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="h-48 w-full bg-gray-100 flex items-center justify-center text-gray-400 font-semibold">
          No Image
        </div>
      )}

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title */}
        <h2 className="text-xl font-bold mb-2 line-clamp-2">
          {article.title || "Untitled Article"}
        </h2>

        {/* Content Preview */}
        <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-1">
          {article.content}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto">
          {/* Status Badge */}
          <span
            className={`px-3 py-1 text-xs rounded-full font-medium ${statusColor[article.status]}`}
          >
            {article.status.toUpperCase()}
          </span>

          {/* Submit Button */}
          {article.status === "draft" && (
            <button
              onClick={() => onSubmit(article._id)}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-700 transition"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;