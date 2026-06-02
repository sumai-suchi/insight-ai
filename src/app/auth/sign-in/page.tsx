// "use client";
// import { authClient } from "@/lib/auth/auth-client";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useState, Suspense, useEffect } from "react";
// import { useAuth } from "@/Context/AuthContext";

// function SignInForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const redirectTo = searchParams.get("redirect") || "/dashboard";

//   const { session, loading: sessionLoading, refreshSession } = useAuth();

//   useEffect(() => {
//     if (!sessionLoading && session?.user) {
//       router.push(redirectTo);
//     }
//   }, [session, sessionLoading, router, redirectTo]);

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     await authClient.signIn.email(
//       {
//         email,
//         password,
//         callbackURL: "/",
//       },
//       {
//         onSuccess: async () => {
//           await refreshSession();
//           setLoading(false);
//           router.push("/dashboard");
//         },
//         // onSuccess: (ctx) => {
//         //   setLoading(false);

//         //   // 🔥 email verify page এ পাঠাও
//         //   router.push(`/verify-email?email=${email}`);
//         // },
//         onError: (ctx) => {
//           setError(ctx.error.message);
//           setLoading(false);
//         },
//       },
//     );
//   }

//   const handleDemoLogin=async(email:any, password :any)=>{

//   await authClient.signIn.email(
//       {
//         email,
//         password,
//         callbackURL: "/",
//       },
//       {
//         onSuccess: async () => {
//           await refreshSession();
//           setLoading(false);
//           router.push("/dashboard");
//         },
//         onError: (ctx) => {
//           setError(ctx.error.message);
//           setLoading(false);
//         },
//       }
//     );
 

//   }

//   const handleGoogleSignIn = async () => {
//     await authClient.signIn.social({
//       provider: "google",
//       callbackURL: redirectTo,
//     });
//   };

//   const handleGitHubSignIn = async () => {
//     await authClient.signIn.social({
//       provider: "github",
//       callbackURL: redirectTo,
//     });
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-6 bg-linear-to-br from-slate-50 via-white to-blue-50">
//       <div className="w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row bg-white">
//         {/* LEFT PANEL */}
//         <div className="lg:w-[45%] relative bg-[#111827] text-white p-10 flex flex-col justify-center items-center overflow-hidden">
//           <div className="absolute top-0 left-0 w-40 h-40 bg-blue-500/20 rounded-br-[80px]" />
//           <div className="absolute bottom-0 right-0 w-48 h-32 bg-emerald-400/20 rounded-tl-[70px]" />

//           <div className="relative z-10 text-center space-y-6">
//             <div className="mb-8">
//               <span className="p-5 rounded-xl text-3xl border border-white/20 bg-white/10">
//                 🤖
//               </span>
//             </div>
//             <div>
//               <h2 className="text-2xl font-bold leading-snug">
//                 Welcome back <br /> to InsightAI
//               </h2>
//               <p className="text-sm text-gray-300 mt-2">
//                 Stay updated with AI-powered news and smart content.
//               </p>
//             </div>
//             <div className="space-y-3 pt-4">
//               <div className="flex items-center gap-3 bg-white/5 rounded-lg px-4 py-2">
//                 🔒 Secure AI content
//               </div>
//               <div className="flex items-center gap-3 bg-white/5 rounded-lg px-4 py-2">
//                 ⚡ Fast AI writing
//               </div>
//               <div className="flex items-center gap-3 bg-white/5 rounded-lg px-4 py-2">
//                 🌍 Access anywhere
//               </div>
//             </div>
//             <div className="bg-white text-black rounded-xl px-6 py-4 mt-6 shadow-md">
//               <p className="text-xs uppercase font-semibold text-yellow-500">
//                 Project Summary
//               </p>
//               <div className="flex items-end justify-between mt-2">
//                 <div>
//                   <p className="text-2xl font-bold">08</p>
//                   <p className="text-xs text-gray-500">New Articles</p>
//                 </div>
//                 <div className="text-green-500 text-sm font-semibold">+75%</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT PANEL */}
//         <div className="flex-1 p-10 flex flex-col">
//           <div className="flex justify-end text-sm text-gray-500 mb-6">
//             New here?
//             <Link
//               href="/auth/sign-up"
//               className="ml-1 text-blue-600 font-semibold hover:underline"
//             >
//               Sign up
//             </Link>
//           </div>

//           <div className="mb-8">
//             <h1 className="text-3xl font-bold text-gray-800">Sign In</h1>
//             <p className="text-sm text-gray-500">
//               Welcome back — we missed you!
//             </p>
//           </div>

//           {error && (
//             <div className="mb-4 bg-red-100 text-red-600 p-3 rounded-lg text-sm">
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* EMAIL */}
//             <div>
//               <label className="text-sm text-gray-600">Email</label>
//               <input
//                 type="email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="you@example.com"
//                 className="mt-1 w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
//               />
//             </div>

//             {/* PASSWORD */}
//             <div>
//               <label className="text-sm text-gray-600">Password</label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   required
//                   minLength={8}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="Enter password"
//                   className="mt-1 w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-4 top-3 text-gray-400 cursor-pointer"
//                 >
//                   👁
//                 </button>
//               </div>
//             </div>

//             {/* OPTIONS */}
//             <div className="flex justify-between text-sm">
//               <label className="flex items-center gap-2 text-gray-600">
//                 <input
//                   type="checkbox"
//                   checked={rememberMe}
//                   onChange={() => setRememberMe(!rememberMe)}
//                 />
//                 Remember me
//               </label>

//               <Link
//                 href="/forgot-password"
//                 className="text-blue-600 hover:underline"
//               >
//                 Forgot password?
//               </Link>
//             </div>

//             {/* LOGIN BUTTON */}
//             <motion.button
//               type="submit"
//               disabled={loading}
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.95 }}
//               className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition cursor-pointer"
//             >
//               {loading ? "Signing in..." : "Sign In"}
//             </motion.button>
           
//           <div className="flex gap-3 justify-around w-full">
            
//             <button className="bg-blue-400 text-white p-1 rounded-b-sm" onClick={()=>{handleDemoLogin("rabeya@gmail.com","Rabeya@123")}}> user</button>
//             <button className="bg-blue-400 text-white p-1 rounded-b-sm" onClick={()=>{handleDemoLogin("sumaiyamoina@gmail.com","Sumaiya@123")}}> admin</button>
//             <button className="bg-blue-400 text-white p-1 rounded-b-sm" onClick={()=>{handleDemoLogin("hatim@gmail.com","Hatim@123")}}>  editor</button>
//           </div>



//             <div className="flex items-center gap-4 text-sm text-gray-400">
//               <div className="flex-1 h-px bg-gray-200" /> OR{" "}
//               <div className="flex-1 h-px bg-gray-200" />
//             </div>

//             {/* GOOGLE */}
//             <motion.button
//               type="button"
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={handleGoogleSignIn}
//               className="w-full py-3 border rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition cursor-pointer"
//             >
//               <img
//                 src="https://www.svgrepo.com/show/475656/google-color.svg"
//                 className="w-5"
//               />
//               Continue with Google
//             </motion.button>

//             {/* GITHUB */}
//             <motion.button
//               type="button"
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={handleGitHubSignIn}
//               className="w-full py-3 border rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition cursor-pointer"
//             >
//               <img
//                 src="https://www.svgrepo.com/show/475654/github-color.svg"
//                 className="w-5"
//               />
//               Continue with GitHub
//             </motion.button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function SignInPage() {
//   return (
//     <Suspense
//       fallback={
//         <div className="min-h-screen flex items-center justify-center">
//           Loading...
//         </div>
//       }
//     >
//       <SignInForm />
//     </Suspense>
//   );
// }

"use client";
import { authClient } from "@/lib/auth/auth-client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense, useEffect } from "react";
import { useAuth } from "@/Context/AuthContext";
import authClient from "@/lib/auth/auth-client";

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";

  const { session, loading: sessionLoading, refreshSession } = useAuth();

  useEffect(() => {
    if (!sessionLoading && session?.user) {
      router.push(redirectTo);
    }
  }, [session, sessionLoading, router, redirectTo]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    await authClient.signIn.email(
      { email, password, callbackURL: "/" },
      {
        onSuccess: async () => {
          await refreshSession();
          setLoading(false);
          router.push("/dashboard");
        },
        onError: (ctx) => {
          setError(ctx.error.message);
          setLoading(false);
        },
      }
    );
  }

  const handleDemoLogin = async (email: any, password: any) => {
    setLoading(true);
    await authClient.signIn.email(
      { email, password, callbackURL: "/" },
      {
        onSuccess: async () => {
          await refreshSession();
          setLoading(false);
          router.push("/dashboard");
        },
        onError: (ctx) => {
          setError(ctx.error.message);
          setLoading(false);
        },
      }
    );
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({ provider: "google", callbackURL: redirectTo });
  };

  const handleGitHubSignIn = async () => {
    await authClient.signIn.social({ provider: "github", callbackURL: redirectTo });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#020617] relative overflow-hidden">
      {/* Background Decorative Elements (Matching Home Page Glows) */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-5xl rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col lg:flex-row bg-[#0B1120]/80 backdrop-blur-xl"
      >
        {/* LEFT PANEL - Branding & Stats */}
        <div className="lg:w-[40%] relative bg-gradient-to-b from-blue-600/10 to-transparent p-12 flex flex-col justify-between border-r border-white/5">
          <div className="relative z-10">
            <Link href="/" className="text-2xl font-bold tracking-tighter text-white flex items-center gap-2">
              Insight-<span className="text-blue-400">AI</span>
            </Link>
            
            <div className="mt-16 space-y-8">
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-bold leading-tight text-white"
              >
                The Future of <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                  AI News Briefs
                </span>
              </motion.h2>
              
              <div className="space-y-4">
                {[
                  { icon: "⚡", text: "AI-Powered Intelligence" },
                  { icon: "🌍", text: "Multi-language Support" },
                  { icon: "🛡️", text: "Professional Smart Editor" }
                ].map((item, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + (i * 0.1) }}
                    key={i} 
                    className="flex items-center gap-3 text-gray-400 text-sm font-medium"
                  >
                    <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">{item.icon}</span>
                    {item.text}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-10">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
                <p className="text-[10px] uppercase tracking-widest text-blue-400 font-bold mb-3">System Status</p>
                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-3xl font-bold text-white">2M+</p>
                        <p className="text-xs text-gray-500">Articles Generated</p>
                    </div>
                    <div className="h-2 w-16 bg-blue-500/20 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: "75%" }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="h-full bg-blue-500" 
                        />
                    </div>
                </div>
             </div>
          </div>
        </div>

        {/* RIGHT PANEL - Login Form */}
        <div className="flex-1 p-8 lg:p-14 flex flex-col">
          <div className="flex justify-end text-sm mb-10">
            <span className="text-gray-500">New here?</span>
            <Link href="/auth/sign-up" className="ml-2 text-blue-400 font-semibold hover:text-blue-300 transition">
              Create account
            </Link>
          </div>

          <div className="mb-10">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-400">Sign in to continue your AI journey.</p>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl text-sm"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="mt-2 w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white transition-all placeholder:text-gray-600"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Password</label>
                <Link href="/forgot-password"  className="text-xs text-blue-400 hover:underline">Forgot?</Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white transition-all placeholder:text-gray-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.01, backgroundColor: "#3b82f6" }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-2xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/20 transition-all disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Sign In to Insight-AI"}
            </motion.button>

            {/* Role Demo Buttons - Styled like tags from homepage */}
            <div className="pt-4">
               <p className="text-[10px] text-center text-gray-500 uppercase tracking-[0.2em] mb-4">Quick Demo Access</p>
               <div className="flex gap-2 justify-center">
                  {[
                    { label: "User", email: "rabeya@gmail.com", pass: "Rabeya@123" },
                    { label: "Admin", email: "sumaiyamoina@gmail.com", pass: "Sumaiya@123" },
                    { label: "Editor", email: "hatim@gmail.com", pass: "Hatim@123" }
                  ].map((demo) => (
                    <button 
                      key={demo.label}
                      type="button"
                      onClick={() => handleDemoLogin(demo.email, demo.pass)}
                      className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[11px] text-gray-300 hover:bg-blue-600 hover:text-white transition-all"
                    >
                      {demo.label}
                    </button>
                  ))}
               </div>
            </div>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#0B1120] px-4 text-gray-500">Or continue with</span></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                type="button" 
                onClick={handleGoogleSignIn}
                className="flex items-center justify-center gap-2 py-3 border border-white/10 rounded-2xl hover:bg-white/5 transition text-gray-300 text-sm"
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4" alt="Google" />
                Google
              </button>
              <button 
                type="button" 
                onClick={handleGitHubSignIn}
                className="flex items-center justify-center gap-2 py-3 border border-white/10 rounded-2xl hover:bg-white/5 transition text-gray-300 text-sm"
              >
                <img src="https://www.svgrepo.com/show/475654/github-color.svg" className="w-4 invert" alt="GitHub" />
                GitHub
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#020617] flex items-center justify-center text-blue-400 animate-pulse">Initializing Insight-AI...</div>}>
      <SignInForm />
    </Suspense>
  );
}