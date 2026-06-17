export default function CancelPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
        {/* Warning/Cancel Icon */}
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-amber-50 p-4">
            <svg
              className="w-10 h-10 text-amber-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Payment Cancelled
        </h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          It looks like the checkout process was interrupted. No charges were
          made to your account. Ready to give it another go?
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-3 rounded-lg transition duration-200">
            Return to Checkout
          </button>
          <button className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-lg transition duration-200 shadow-sm">
            Go Back to Cart
          </button>
        </div>

        {/* Support Section */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Need help?{" "}
            <a
              href="#"
              className="font-medium text-amber-600 hover:text-amber-700"
            >
              Talk to our team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
