"use client";

import { authClient } from "@/lib/auth/auth-client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function VerifyEmailPage() {
  const params = useSearchParams();
  const email = params.get("email");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleResend = async () => {
    if (!email) return;

    setLoading(true);

    await authClient.sendVerificationEmail({
      email,
    });

    setLoading(false);
    setMessage("Verification email sent again!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">Check your email 📩</h1>

        <p className="text-gray-500">
          We sent a verification link to <b>{email}</b>
        </p>

        <button
          onClick={handleResend}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {loading ? "Sending..." : "Resend Email"}
        </button>

        {message && <p className="text-green-500">{message}</p>}
      </div>
    </div>
  );
}