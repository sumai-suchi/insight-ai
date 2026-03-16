export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Success Icon */}
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-green-100 p-3">
            <svg
              className="w-12 h-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Payment Successful 🎉
        </h1>
        <p className="text-gray-600 mb-8">
          Thank you for your purchase! Your transaction has been completed, and
          a receipt has been emailed to you.
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-200">
            View Order Summary
          </button>
          <button className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-lg transition duration-200">
            Return to Dashboard
          </button>
        </div>

        {/* Footer Support */}
        <p className="mt-8 text-sm text-gray-500">
          Having trouble?{" "}
          <a href="#" className="text-indigo-600 hover:underline">
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
}
