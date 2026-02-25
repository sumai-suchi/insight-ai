"use client";
import { motion } from "framer-motion";
import { signIn as signInClient } from "@/lib/auth/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signInClient({ email, password });

      if (result.error || !result.success) {
        setError(result.error ?? "Failed to sign in");
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
    <div className="min-h-screen flex items-center justify-center p-4 md:p-6 font-sans bg-[#F9FAFB]">
      <div className="w-full max-w-md lg:max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-130 bg-white">
        <div className="lg:w-[45%] relative overflow-hidden flex flex-col items-center justify-center p-8 lg:p-10 bg-[#1F2937]">
          {/* Blobs */}
          <div className="absolute top-0 left-0 w-32 h-32 lg:w-44 lg:h-44 rounded-br-[80px] opacity-20 bg-[#3B82F6]" />
          <div className="absolute bottom-0 right-0 w-40 h-28 lg:w-52 lg:h-36 rounded-tl-[60px] opacity-15 bg-[#10B981]" />

          <div className="relative z-10 flex flex-col items-center text-center gap-6">
            {/* Logo Name */}
            <div className="w-16 h-16 rounded-2xl flex items-center text-white justify-center border border-[#3B82F640] bg-[#3B82F615]">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20a6 6 0 0 0-12 0" /><circle cx="12" cy="10" r="4" /><circle cx="12" cy="12" r="10" /></svg>
            </div>

            <div>
              <h2 className="text-xl lg:text-2xl font-bold leading-snug text-white">
                Welcome back <br /> to InsightAI
              </h2>
              <p className="text-sm mt-2 max-w-50 text-[#9CA3AF]">
                Stay updated with the latest AI-powered news.
              </p>
            </div>

            {/* Feature pills - Hidden on very small screens to save space */}
            <div className="hidden sm:flex flex-col gap-3 w-full max-w-55">
              {[
                { icon: "🔒", label: "Secure AI-generated content" },
                { icon: "⚡", label: "Fast content creation & suggestions" },
                { icon: "🌍", label: "Access your Content anywhere" },
              ].map((f) => (
                <div key={f.label} className="flex items-center gap-3 rounded-xl px-4 py-2.5 bg-white/5">
                  <span className="text-base">{f.icon}</span>
                  <span className="text-xs font-medium text-[#E5E7EB] text-left">
                    {f.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Stat card */}
            <div className="rounded-2xl px-5 py-4 shadow-xl w-full max-w-55 bg-white text-left">
              <p className="text-[10px] font-semibold uppercase tracking-wider mb-1 text-[#FBBF24]">
                Project Summary
              </p>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-2xl font-bold text-[#1F2937]">08</p>
                  <p className="text-xs text-[#6B7280]">New Articles</p>
                </div>
                <div className="flex items-center gap-1 text-[#10B981]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 15l-6-6-6 6" />
                  </svg>
                  <span className="text-xs font-semibold">75%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*  Right Side  */}
        <div className="flex-1 p-8 lg:p-10 flex flex-col bg-white">
          <div className="flex items-center justify-end mb-8 lg:mb-10">

            <p className="text-sm text-[#6B7280]">
              New here?{" "}
              <Link href="/sign-up" className="font-semibold text-[#3B82F6] hover:underline">
                Sign up
              </Link>
            </p>
          </div>

          {/* Title */}
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold mb-1 text-[#1F2937]">Sign In</h1>
            <p className="text-sm text-[#6B7280]">Welcome back — we missed you!</p>
          </div>

          {/* Error banner */}
          {error && (
            <div className="mb-4 rounded-xl px-4 py-3 text-sm flex items-center gap-2 bg-[#FEF2F2] text-[#EF4444]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col flex-1">
            <div className="space-y-6 flex-1">
              {/* Email */}
              <div className={`relative flex items-center pb-3 border-b transition-colors ${email.includes("@") ? "border-[#10B981]" : "border-[#E5E7EB]"}`}>
                <svg className="mr-3 shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.8">
                  <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 7l10 7 10-7" />
                </svg>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="flex-1 text-sm bg-transparent outline-none text-[#1F2937]"
                />
                {email.includes("@") && (
                  <svg className="shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" /><path d="M9 12l2 2 4-4" />
                  </svg>
                )}
              </div>

              {/* Password */}
              <div className={`relative flex items-center pb-3 border-b transition-colors ${password.length > 0 ? "border-[#3B82F6]" : "border-[#E5E7EB]"}`}>
                <svg className="mr-3 shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.8">
                  <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={8}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="flex-1 text-sm bg-transparent outline-none text-[#1F2937]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[#9CA3AF] hover:text-[#FBBF24] transition-colors"
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <button
                    type="button"
                    onClick={() => setRememberMe(!rememberMe)}
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${rememberMe ? "bg-[#3B82F6] border-[#3B82F6]" : "bg-transparent border-[#D1D5DB]"}`}
                  >
                    {rememberMe && (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                        <path d="M5 12l5 5L20 7" />
                      </svg>
                    )}
                  </button>
                  <span className="text-xs text-[#6B7280]">Remember me</span>
                </label>

                <Link
                  href="/forgot-password"
                  className="text-xs font-semibold text-blue-500 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mt-10 flex flex-col items-center gap-4 mb-8 lg:mb-20">
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
                    Signing in…
                  </>
                ) : (
                  <>
                    Sign In
                    <span className="rounded-full p-1 transition-transform duration-200 group-hover:translate-x-1 bg-white/20">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </>
                )}
              </motion.button>
              <span className="text-sm font-medium text-gray-600 uppercase">or</span>
              {/* Google */}
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
      </div>
    </div>
  );
}