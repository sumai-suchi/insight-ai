export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB]">
      <div className="text-center p-10 bg-white rounded-2xl shadow-lg max-w-sm">
        <div className="text-6xl mb-4">📧</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Check Your Email!
        </h1>
        <p className="text-gray-500 text-sm">
          তোমার email-এ একটি verification link পাঠানো হয়েছে। Link-এ click করলে
          account active হবে।
        </p>
        <p className="text-gray-400 text-xs mt-4">
          Email না পেলে Spam folder চেক করো।
        </p>
      </div>
    </div>
  );
}
