// components/PlagiarismChecker.tsx
export default function PlagiarismChecker() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-5 flex items-center gap-2">
        <span className="text-red-600 text-2xl">🛡️</span> Plagiarism Checker
      </h2>

      <div className="flex flex-col items-center mb-6">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              className="text-gray-200"
              strokeWidth="10"
              stroke="currentColor"
              fill="transparent"
              r="40"
              cx="50"
              cy="50"
            />
            <circle
              className="text-green-500 transition-all duration-1000"
              strokeWidth="10"
              strokeDasharray={251}
              strokeDashoffset={251 * (1 - 0.98)}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="40"
              cx="50"
              cy="50"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold text-green-600">98%</span>
          </div>
        </div>
        <p className="mt-3 text-lg font-medium text-gray-800">Latest Originality Score</p>
        <p className="text-green-600 font-medium">Excellent! Your content is unique</p>
      </div>

      <div className="mb-5">
        <div className="flex justify-between text-sm text-gray-600 mb-1.5">
          <span>Scans Remaining</span>
          <span>23 / 50</span>
        </div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full"
            style={{ width: '46%' }} // 23/50 ≈ 46%
          />
        </div>
      </div>

      <button className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors shadow-sm">
        Run Plagiarism Check
      </button>
    </div>
  );
}