"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp as signUpClient } from "@/lib/auth/auth-client";

export default function SignUpPage() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const hasMinLength = password.length >= 8;
  const hasNumberOrSymbol = /[0-9!@#$%^&*]/.test(password);
  const hasMixedCase = /[a-z]/.test(password) && /[A-Z]/.test(password);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!hasMinLength) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      const result = await signUpClient({ name, email, password });

      if (result.error || !result.success) {
        setError(result.error ?? "Failed to sign up");
      } else {
        router.refresh();
        router.push("/dashboard");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-6 font-sans bg-gray-50">
      <div className="w-full max-w-md lg:max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-130">

        {/* Left Form */}
        <div className="flex-1 p-8 md:p-10 flex flex-col bg-white">

          <div className="flex items-center justify-end mb-8">

            <p className="text-sm text-gray-500">
              Already a member?{" "}
              <Link href="/sign-in" className="font-semibold text-blue-500 hover:text-blue-600 transition-colors">
                Sign in
              </Link>
            </p>
          </div>

          {/* Title */}
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-1 text-gray-800">Sign Up</h1>
            <p className="text-sm text-gray-500">
              Create, manage, and protect your <br /> AI-generated content and news.
            </p>
          </div>

          {/* Error banner */}
          {error && (
            <div className="mb-4 rounded-xl px-4 py-3 text-sm flex items-center gap-2 bg-red-50 text-red-500 border border-red-100 animate-in fade-in slide-in-from-top-1">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col flex-1">
            <div className="space-y-5 flex-1">
              {/* Name */}
              <div className={`relative flex items-center border-b pb-2 transition-colors ${name ? 'border-emerald-500' : 'border-gray-200'}`}>
                <svg className="mr-3 shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.8">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="flex-1 text-sm bg-transparent outline-none text-gray-800 placeholder-gray-400"
                />
                {name && (
                  <svg className="shrink-0 text-emerald-500" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" /><path d="M9 12l2 2 4-4" />
                  </svg>
                )}
              </div>

              {/* Email */}
              <div className={`relative flex items-center border-b pb-2 transition-colors ${email.includes("@") ? 'border-emerald-500' : 'border-gray-200'}`}>
                <svg className="mr-3 shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.8">
                  <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 7l10 7 10-7" />
                </svg>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="flex-1 text-sm bg-transparent outline-none text-gray-800 placeholder-gray-400"
                />
                {email.includes("@") && (
                  <svg className="shrink-0 text-emerald-500" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" /><path d="M9 12l2 2 4-4" />
                  </svg>
                )}
              </div>

              {/* Password */}
              <div>
                <div className={`relative flex items-center border-b pb-2 transition-colors ${password.length > 0 ? 'border-blue-500' : 'border-gray-200'}`}>
                  <svg className="mr-3 shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.8">
                    <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="flex-1 text-sm bg-transparent outline-none text-gray-800 placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-amber-400 transition-colors"
                  >
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Password hint */}
                {password.length > 0 && (
                  <div className="mt-3 space-y-1.5">
                    <p className={`text-[11px] flex items-center gap-1.5 transition-colors ${hasMinLength ? 'text-emerald-500' : 'text-red-400'}`}>
                      {hasMinLength ? (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <path d="M5 12l5 5L20 7" />
                        </svg>
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-current inline-block" />
                      )}
                      At least 8 characters
                    </p>

                    <p className={`text-[11px] flex items-center gap-1.5 transition-colors ${hasNumberOrSymbol ? 'text-emerald-500' : 'text-gray-400'}`}>
                      {hasNumberOrSymbol ? (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <path d="M5 12l5 5L20 7" />
                        </svg>
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-current inline-block" />
                      )}
                      One number or symbol
                    </p>

                    <p className={`text-[11px] flex items-center gap-1.5 transition-colors ${hasMixedCase ? 'text-emerald-500' : 'text-gray-400'}`}>
                      {hasMixedCase ? (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <path d="M5 12l5 5L20 7" />
                        </svg>
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-current inline-block" />
                      )}
                      Lowercase and uppercase
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className={`relative flex items-center border-b pb-2 transition-colors ${confirmPassword.length > 0 ? (confirmPassword === password ? 'border-emerald-500' : 'border-red-500') : 'border-gray-200'}`}>
                <svg className="mr-3 shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.8">
                  <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-Type Password"
                  className="flex-1 text-sm bg-transparent outline-none text-gray-800 placeholder-gray-400"
                />
                {confirmPassword.length > 0 && (
                  <span className="shrink-0">
                    {confirmPassword === password ? (
                      <svg className="text-emerald-500" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" /><path d="M9 12l2 2 4-4" />
                      </svg>
                    ) : (
                      <svg className="text-red-500" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" /><path d="M15 9l-6 6M9 9l6 6" />
                      </svg>
                    )}
                  </span>
                )}
              </div>
            </div>

            {/* Button */}
            <div className="mt-8 flex flex-wrap justify-center items-center gap-4">
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={!loading ? { scale: 1.02 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
                className="flex cursor-pointer w-full justify-center items-center gap-2 text-sm font-semibold px-6 py-3 rounded-full shadow-md transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed group bg-[#3B82F6] text-white hover:bg-[#2563EB]"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity=".2" /><path d="M21 12a9 9 0 00-9-9" />
                    </svg>
                    Creating account…
                  </>
                ) : (
                  <>
                    Register
                    <span className="rounded-full p-1 transition-transform duration-200 group-hover:translate-x-1 bg-white/20">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </>
                )}
              </motion.button>

              <span className="text-sm font-medium text-gray-600 uppercase">or</span>

              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full cursor-pointer px-6 py-2.5 rounded-full flex items-center justify-center border-2 border-gray-200 hover:border-[#4285f4] hover:bg-sky-50 transition-all duration-200 shadow-sm group"
              >
                <h4 className="mr-2 font-medium text-gray-700">Google</h4>
                <svg width="18" height="18" viewBox="0 0 24 24" className="transition-transform duration-200 group-hover:translate-x-1">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
              </motion.button>
            </div>
          </form>
        </div>

        {/* Right Panel */}
        <div className="hidden lg:flex w-[45%] relative overflow-hidden flex-col items-center justify-center p-8 gap-6 bg-gray-900">

          <div className="absolute top-0 right-0 w-40 h-40 rounded-bl-[80px] opacity-20 bg-blue-500" />
          <div className="absolute bottom-0 left-0 w-48 h-32 rounded-tr-[60px] opacity-15 bg-emerald-500" />

          <div className="relative z-10 rounded-2xl p-5 w-52 shadow-2xl bg-white">
            <p className="text-xs font-semibold mb-1 text-amber-500 uppercase tracking-wider">AI Generated Today</p>
            <p className="text-3xl font-bold text-gray-900">05</p>
          </div>
          <div className="relative z-10 rounded-2xl p-6 w-80 shadow-2xl flex gap-4 items-start bg-white">
            <div className="flex flex-col gap-2 flex-1 pt-1">
              <div className="h-2 rounded-full w-full bg-blue-500" />
              <div className="h-2 rounded-full w-4/5 bg-gray-100" />
              <div className="h-2 rounded-full w-3/5 bg-red-200" />
              <div className="h-2 rounded-full w-4/5 mt-1 bg-yellow-500" />
              <div className="h-2 rounded-full w-full bg-gray-100" />
            </div>
            <div className="shrink-0 w-60 text-right">
              <div className="mb-2 text-amber-500 flex justify-end">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="8" cy="15" r="3" />
                  <path d="M11 15h6a2 2 0 000-4h-1.5M10.5 9a2 2 0 100-4H7l-2 9" />
                </svg>
              </div>
              <p className="text-[15px] font-bold leading-tight text-gray-900">Your data stays,<br />private and secure.</p>
              <p className="text-[12px] mt-2 leading-tight text-gray-500">We protect your AI-generated content and personal information.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}