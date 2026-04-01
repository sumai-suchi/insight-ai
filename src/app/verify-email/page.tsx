"use client";

import { authClient } from "@/lib/auth/auth-client";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

// 1. Move the logic into a separate internal component
function VerifyEmailContent() {
  const params = useSearchParams();
  const email = params.get("email");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleResend = async () => {
    if (!email) return;

    setLoading(true);
    try {
      await authClient.sendVerificationEmail({
        email,
      });
      setMessage("Verification email sent again!");
    } catch (error) {
      setMessage("Failed to send email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center space-y-4">
      <h1 className="text-2xl font-bold">Check your email 📩</h1>

      <p className="text-gray-500">
        We sent a verification link to <b>{email ?? "your email"}</b>
      </p>

      <button
        onClick={handleResend}
        disabled={loading || !email}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
      >
        {loading ? "Sending..." : "Resend Email"}
      </button>

      {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
    </div>
  );
}

// 2. The main page component wraps the content in Suspense
export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Suspense fallback={<p>Loading...</p>}>
        <VerifyEmailContent />
      </Suspense>
    </div>
  );
}