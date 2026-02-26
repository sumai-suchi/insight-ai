"use client";

import { authClient } from "@/lib/auth/auth-client";
import { motion } from "framer-motion";
// import { signIn as signInClient } from "@/lib/auth/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [showPassword,setShowPassword] = useState(false);
  const [rememberMe,setRememberMe] = useState(false);
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(false);
  const [lockUntil,setLockUntil] = useState("");

  const router = useRouter();

  async function handleSubmit(e:React.FormEvent){
    e.preventDefault();
    setError("");
    setLoading(true);

   const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

  const data = await res.json();

  if (!res.ok) {
  if (res.status === 403 && data.lockUntil) {
    setLockUntil(new Date(data.lockUntil).toLocaleString());
  }
  setError(data.error || "Invalid credentials");
  setLoading(false);
  return;
}

// Success → redirect
router.push("/dashboard");
setLoading(false);

 
  }

   const handleGoogleSignIn = async () => {
   
   const data = await authClient.signIn.social({
    provider: "google",
  });
  
  console.log(data);
  }

  const handleGitHubSignIn = async () => {
   
     const data = await authClient.signIn.social({
        provider: "github"
    })
  console.log(data);
  }

  return (

    <div className="min-h-screen flex items-center justify-center p-6 bg-linear-to-br from-slate-50 via-white to-blue-50">

      <div className="w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row bg-white">

        {/* LEFT PANEL */}

        <div className="lg:w-[45%] relative bg-[#111827] text-white p-10 flex flex-col justify-center items-center overflow-hidden">

          <div className="absolute top-0 left-0 w-40 h-40 bg-blue-500/20 rounded-br-[80px]" />
          <div className="absolute bottom-0 right-0 w-48 h-32 bg-emerald-400/20 rounded-tl-[70px]" />

          <div className="relative z-10 text-center space-y-6">

            {/* Logo */}

            <div className="w-16 h-16 flex items-center justify-center rounded-xl border border-white/20 bg-white/10">
              🤖
            </div>

            <div>
              <h2 className="text-2xl font-bold leading-snug">
                Welcome back <br/> to InsightAI
              </h2>

              <p className="text-sm text-gray-300 mt-2">
                Stay updated with AI-powered news and smart content.
              </p>
            </div>

            {/* Features */}

            <div className="space-y-3 pt-4">

              <div className="flex items-center gap-3 bg-white/5 rounded-lg px-4 py-2">
                🔒 Secure AI content
              </div>

              <div className="flex items-center gap-3 bg-white/5 rounded-lg px-4 py-2">
                ⚡ Fast AI writing
              </div>

              <div className="flex items-center gap-3 bg-white/5 rounded-lg px-4 py-2">
                🌍 Access anywhere
              </div>

            </div>

            {/* Stats */}

            <div className="bg-white text-black rounded-xl px-6 py-4 mt-6 shadow-md">

              <p className="text-xs uppercase font-semibold text-yellow-500">
                Project Summary
              </p>

              <div className="flex items-end justify-between mt-2">

                <div>
                  <p className="text-2xl font-bold">08</p>
                  <p className="text-xs text-gray-500">
                    New Articles
                  </p>
                </div>

                <div className="text-green-500 text-sm font-semibold">
                  +75%
                </div>

              </div>

            </div>

          </div>
        </div>


        {/* RIGHT PANEL */}

        <div className="flex-1 p-10 flex flex-col">

          <div className="flex justify-end text-sm text-gray-500 mb-6">

            New here?

            <Link
              href="/auth/sign-up"
              className="ml-1 text-blue-600 font-semibold hover:underline"
            >
              Sign up
            </Link>

          </div>


          {/* Title */}

          <div className="mb-8">

            <h1 className="text-3xl font-bold text-gray-800">
              Sign In
            </h1>

            <p className="text-sm text-gray-500">
              Welcome back — we missed you!
            </p>

          </div>


          {/* Error */}

          {error && (

            <div className="mb-4 bg-red-100 text-red-600 p-3 rounded-lg text-sm">
              {error}
            </div>

          )}


          {/* FORM */}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Email */}

            <div>

              <label className="text-sm text-gray-600">
                Email
              </label>

              <input
                type="email"
                required
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1 w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />

            </div>


            {/* Password */}

            <div>

              <label className="text-sm text-gray-600">
                Password
              </label>

              <div className="relative">

                <input
                  type={showPassword ? "text":"password"}
                  required
                  minLength={8}
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="mt-1 w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />

                <button
                  type="button"
                  onClick={()=>setShowPassword(!showPassword)}
                  className="absolute right-4 top-3 text-gray-400"
                >
                  👁
                </button>

              </div>

            </div>


            {/* Remember */}

            <div className="flex justify-between text-sm">

              <label className="flex items-center gap-2 text-gray-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={()=>setRememberMe(!rememberMe)}
                />
                Remember me
              </label>

              <Link
                href="/forgot-password"
                className="text-blue-600 hover:underline"
              >
                Forgot password?
              </Link>

            </div>


            {/* Login Button */}

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{scale:1.03}}
              whileTap={{scale:0.95}}
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
            >

              {loading ? "Signing in..." : "Sign In"}

            </motion.button>


            {/* Divider */}

            <div className="flex items-center gap-4 text-sm text-gray-400">

              <div className="flex-1 h-px bg-gray-200"/>

              OR

              <div className="flex-1 h-px bg-gray-200"/>

            </div>


            {/* Google Login */}

            <motion.button
              type="button"
              whileHover={{scale:1.03}}
              whileTap={{scale:0.95}}
              onClick={handleGoogleSignIn}
              className="w-full py-3 border rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition"
            >

              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="w-5"
              />

              Continue with Google

            </motion.button>
             <motion.button
              type="button"
              whileHover={{scale:1.03}}
              whileTap={{scale:0.95}}
              onClick={handleGitHubSignIn}
              className="w-full py-3 border rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition"
            >

              <img
                src="https://www.svgrepo.com/show/475654/github-color.svg"
                className="w-5"
              />

              Continue with GitHub

            </motion.button>

          </form>

        </div>

      </div>

    </div>

  );
}