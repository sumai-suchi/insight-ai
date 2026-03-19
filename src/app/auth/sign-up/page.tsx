"use client";

import GithubBtn from "@/components/GithubBtn";
import GoogleBtn from "@/components/GoogleBtn";
import { authClient } from "@/lib/auth/auth-client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
  const router = useRouter();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [image,setImage] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [showPassword,setShowPassword] = useState(false);
  const [role, setRole] = useState<"user" | "editor">("user");

  const [error,setError] = useState("");
  const [loading,setLoading] = useState(false);

  const hasMinLength = password.length >= 8;
  const hasNumber = /[0-9]/.test(password);
  const hasUpper = /[A-Z]/.test(password);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

     const { data } = await authClient.signUp.email({
        email, // user email address
        password, // user password -> min 8 characters by default
        name, // user display name
        image,
      
        callbackURL: "/" // A URL to redirect to after the user verifies their email
    }, {
        onRequest: (ctx) => {
          console.log("Sign up request started", ctx);
        },
        onSuccess: (ctx) => {
          setLoading(false);
          console.log("success", ctx);
          router.push("/dashboard");
        },
        onError: (ctx) => {
          console.log(ctx.error.message);
          setError(ctx.error.message || "Sign up failed");
          setLoading(false);
        },
      },
    );
    console.log("Sign up response:", data);
  }

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  };

  const handleGitHubSignIn = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-24 bg-[#F9FAFB]">
      <div className="w-full max-w-md lg:max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row bg-white">
        {/* LEFT FORM */}
    <div className="flex-1 p-8 lg:p-10 flex flex-col">
  {/* Top */}
  <div className="flex justify-end mb-8">
    <p className="text-sm text-gray-500">
      Already a member?
      <Link
        href="/auth/sign-in"
        className="ml-1 font-semibold text-blue-500 hover:underline"
      >
        Sign in
      </Link>
    </p>
  </div>

  {/* Title */}
  <div className="mb-8">
    <h1 className="text-3xl font-bold text-gray-800">
      Create Account
    </h1>
    <p className="text-sm text-gray-500">
      Start creating AI powered articles today
    </p>
  </div>

  {/* Error */}
  {error && (
    <div className="mb-5 bg-red-50 text-red-500 p-3 rounded-lg text-sm">
      {error}
    </div>
  )}

  {/* Form */}
  <form onSubmit={handleSubmit} className="space-y-6">
    {/* Name */}
    <input
      type="text"
      required
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Full Name"
      className="w-full border-b border-gray-300 pb-2 outline-none focus:border-blue-500"
    />

    {/* Email */}
    <input
      type="email"
      required
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Email Address"
      className="w-full border-b border-gray-300 pb-2 outline-none focus:border-blue-500"
    />

    {/* Image */}
    <input
      type="text"
      required
      value={image}
      onChange={(e) => setImage(e.target.value)}
      placeholder="Image URL"
      className="w-full border-b border-gray-300 pb-2 outline-none focus:border-blue-500"
    />

    {/* Password */}
    <div>
      <div className="flex items-center border-b border-gray-300 pb-2">
        <input
          type={showPassword ? "text" : "password"}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="flex-1 outline-none"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="text-gray-400 text-sm"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      {/* Validation */}
      {password && (
        <div className="mt-3 text-xs space-y-1">
          <p className={hasMinLength ? "text-green-500" : "text-gray-400"}>
            ✓ Minimum 8 characters
          </p>
          <p className={hasNumber ? "text-green-500" : "text-gray-400"}>
            ✓ Contains a number
          </p>
          <p className={hasUpper ? "text-green-500" : "text-gray-400"}>
            ✓ Contains uppercase letter
          </p>
        </div>
      )}
    </div>

    {/* Confirm Password */}
    <input
      type="password"
      required
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      placeholder="Confirm Password"
      className="w-full border-b border-gray-300 pb-2 outline-none focus:border-blue-500"
    />

    {/* 🔥 Role Selection (Dropdown) */}
    <div>
      <label className="text-sm text-gray-500 mb-2 block">
        Select Role
      </label>

      <div className="relative">
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as "user" | "editor")}
          className="w-full appearance-none border border-gray-300 rounded-lg px-3 py-2 pr-10 outline-none focus:border-blue-500"
        >
          <option value="user">User</option>
          <option value="editor">Editor</option>
        </select>

        {/* Arrow */}
        <span className="absolute right-3 top-2.5 text-gray-400 pointer-events-none">
          ▼
        </span>
      </div>
    </div>

    {/* Submit */}
    <motion.button
      type="submit"
      disabled={loading}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
      className="w-full py-3 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600"
    >
      {loading ? "Creating Account..." : "Create Account"}
    </motion.button>

    {/* Divider */}
    <div className="flex items-center gap-3 text-sm text-gray-400">
      <div className="flex-1 h-px bg-gray-200" />
      OR
      <div className="flex-1 h-px bg-gray-200" />
    </div>

    {/* Google */}
    <motion.button
      type="button"
      onClick={handleGoogleSignIn}
      className="w-full py-3 border rounded-full flex items-center justify-center gap-2"
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        className="w-5"
      />
      Continue with Google
    </motion.button>

    {/* GitHub */}
    <motion.button
      type="button"
      onClick={handleGitHubSignIn}
      className="w-full py-3 border rounded-full flex items-center justify-center gap-2"
    >
      <img
        src="https://www.svgrepo.com/show/475654/github-color.svg"
        className="w-5"
      />
      Continue with GitHub
    </motion.button>
  </form>
</div>
        {/* RIGHT SIDE */}
        <div className="lg:w-[45%] relative overflow-hidden flex flex-col items-center justify-center p-8 lg:p-10 bg-[#1F2937] text-white">
          <div className="absolute top-0 left-0 w-40 h-40 bg-blue-500/20 rounded-br-[80px]" />
          <div className="absolute bottom-0 right-0 w-48 h-32 bg-emerald-400/20 rounded-tl-[70px]" />

          <div className="relative z-10 text-center space-y-6">
            <div className="mb-8">
              <span className="p-5 rounded-xl text-3xl items-center border border-white/20 bg-white/10">
                🤖
              </span>
            </div>
            <h2 className="text-2xl font-bold">Welcome to InsightAI</h2>
            <p className="text-sm text-gray-300 max-w-xs">
              Generate articles, manage AI content and stay updated with the
              latest AI powered news.
            </p>
            <div className="bg-white text-black rounded-xl px-6 py-4 shadow-md">
              <p className="text-xs uppercase font-semibold text-yellow-500">
                Articles Generated Today
              </p>
              <p className="text-3xl font-bold">12</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
