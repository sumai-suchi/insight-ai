"use client";

import { useuploadToCloudinary } from "@/app/Project-dashboard/hooks/useuploadToCloudinary";
import { authClient } from "@/lib/auth/auth-client";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";

export default function SignUpPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  // FIX: Hydration handling
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const hasMinLength = password.length >= 8;
  const hasNumber = /[0-9]/.test(password);
  const hasUpper = /[A-Z]/.test(password);

  // const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;
  //   setUploadingImage(true);
  //   setError("");

  //   const formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("upload_preset", "your_unsigned_preset"); 

  //   try {
  //     const res = await fetch(
  //       `https://api.cloudinary.com/v1_1/your_cloud_name/image/upload`, 
  //       { method: "POST", body: formData }
  //     );
  //     const data = await res.json();
  //     if (data.secure_url) setImage(data.secure_url);
  //     else setError("Image upload failed.");
  //   } catch (err) {
  //     setError("Cloudinary connection error.");
  //   } finally {
  //     setUploadingImage(false);
  //   }
  // };
const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  try {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setError("");

    // Optional validation
    if (!file.type.startsWith("image/")) {
      throw new Error("Please upload a valid image file.");
    }

    const imageUrl = await useuploadToCloudinary(file);
    setImage(imageUrl);

  } catch (err: any) {
    setError(err.message || "Upload failed");
  } finally {
    setUploadingImage(false);
  }
};

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirmPassword) return setError("Passwords do not match");
    if (!image) return setError("Please upload an avatar image");

    setLoading(true);
    await authClient.signUp.email(
      { email, password, name, image, callbackURL: "/" },
      {
        onSuccess: () => { setLoading(false); router.push("/"); },
        onError: (ctx) => { setError(ctx.error.message || "Sign up failed"); setLoading(false); },
      }
    );
  }

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({ provider: "google", callbackURL: "/dashboard" });
  };

  const handleGitHubSignIn = async () => {
    await authClient.signIn.social({ provider: "github", callbackURL: "/dashboard" });
  };

  // Animation Variants
  const containerVars: Variants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.5, staggerChildren: 0.1, ease: [0.23, 1, 0.32, 1] } 
    }
  };

  const itemVars: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 lg:p-12 bg-[#020617] relative overflow-hidden font-sans selection:bg-blue-500/30">
      
      {/* Ambient Glows */}
      <div className="absolute top-[-15%] left-[-10%] w-[60%] h-[60%] bg-blue-600/20 blur-[140px] rounded-full animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[60%] h-[60%] bg-emerald-500/10 blur-[140px] rounded-full animate-pulse pointer-events-none" style={{ animationDelay: '3s' }} />
      
      {/* FIX: Only render particles on client to avoid Math.random() mismatch */}
      {mounted && (
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{
                y: [0, -120, 0],
                x: [0, (i % 2 === 0 ? 30 : -30), 0],
                opacity: [0, 0.8, 0]
              }}
              transition={{ 
                duration: 5 + (i % 5), 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: i * 0.5
              }}
              className="absolute w-1 h-1 bg-blue-400 rounded-full"
              style={{ 
                left: `${(i * 17) % 100}%`, 
                top: `${(i * 13) % 100}%` 
              }}
            />
          ))}
        </div>
      )}

      <motion.div 
        variants={containerVars}
        initial="hidden"
        animate="visible"
        className="w-full max-w-6xl rounded-[3.5rem] border border-white/10 shadow-[0_0_80px_-15px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col lg:flex-row bg-[#0B1120]/60 backdrop-blur-3xl"
      >
        {/* LEFT SECTION: FORM */}
        <div className="flex-[1.3] p-8 lg:p-20 flex flex-col order-2 lg:order-1">
          <motion.div variants={itemVars} className="mb-12">
            <h1 className="text-5xl font-black text-white tracking-tighter mb-3 bg-gradient-to-br from-white via-white to-gray-500 bg-clip-text text-transparent">
              Create Account
            </h1>
            <p className="text-gray-400 font-medium">Join the next frontier of artificial intelligence.</p>
          </motion.div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.95 }}
                className="mb-8 bg-red-500/10 border border-red-500/20 text-red-400 p-5 rounded-3xl text-sm flex items-center gap-4"
              >
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-7">
            
            {/* AVATAR UPLOAD */}
            <motion.div variants={itemVars} className="relative group flex flex-col items-center p-6 bg-white/[0.03] border border-white/5 rounded-[2.5rem] transition-all hover:bg-white/[0.05] hover:border-white/10">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="relative w-28 h-28 rounded-full bg-[#020617] border-2 border-white/10 flex items-center justify-center cursor-pointer overflow-hidden transition-all duration-700 group-hover:border-blue-500 group-hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.6)]"
              >
                {image ? (
                  <motion.img initial={{ scale: 1.2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} src={image} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center group-hover:scale-110 transition-transform duration-500">
                    <span className="text-4xl text-gray-500">👤</span>
                  </div>
                )}
                {uploadingImage && (
                  <div className="absolute inset-0 bg-black/80 flex items-center justify-center backdrop-blur-md">
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full" />
                  </div>
                )}
              </div>
              <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
              <div className="mt-4 text-center">
                <p className="text-[10px] uppercase tracking-[0.3em] font-black text-blue-500 group-hover:text-blue-400 transition-colors">
                  {image ? "Biometric Linked" : "Initialize Identity"}
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={itemVars} className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-4 font-black">Operator Name</label>
                <input
                  type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name"
                  className="w-full px-7 py-4.5 bg-white/5 border border-white/10 rounded-3xl focus:ring-2 focus:ring-blue-600/40 focus:border-blue-500 outline-none transition-all text-white placeholder:text-gray-700"
                />
              </motion.div>
              <motion.div variants={itemVars} className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-4 font-black">Node Address</label>
                <input
                  type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"
                  className="w-full px-7 py-4.5 bg-white/5 border border-white/10 rounded-3xl focus:ring-2 focus:ring-blue-600/40 focus:border-blue-500 outline-none transition-all text-white placeholder:text-gray-700"
                />
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={itemVars} className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-4 font-black">Access Key</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"
                    className="w-full px-7 py-4.5 bg-white/5 border border-white/10 rounded-3xl focus:ring-2 focus:ring-blue-600/40 focus:border-blue-500 outline-none transition-all text-white placeholder:text-gray-700"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors">
                    {showPassword ? "✕" : "○"}
                  </button>
                </div>
              </motion.div>
              <motion.div variants={itemVars} className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-4 font-black">Confirm Key</label>
                <input
                  type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Verify"
                  className="w-full px-7 py-4.5 bg-white/5 border border-white/10 rounded-3xl focus:ring-2 focus:ring-blue-600/40 focus:border-blue-500 outline-none transition-all text-white placeholder:text-gray-700"
                />
              </motion.div>
            </div>

            <motion.div variants={itemVars} className="flex flex-wrap gap-2 py-2">
              <ValidationTag isValid={hasMinLength} text="8+ Char" />
              <ValidationTag isValid={hasNumber} text="Numeral" />
              <ValidationTag isValid={hasUpper} text="Caps" />
            </motion.div>

            <motion.button
              variants={itemVars}
              type="submit" disabled={loading || uploadingImage} 
              whileHover={{ scale: 1.01, filter: "brightness(1.1)" }} 
              whileTap={{ scale: 0.98 }}
              className="w-full py-5 rounded-[1.5rem] bg-gradient-to-r from-blue-600 to-blue-500 text-white font-black tracking-[0.2em] uppercase shadow-[0_20px_40px_-10px_rgba(37,99,235,0.3)] transition-all disabled:opacity-50 text-xs"
            >
              {loading ? "Decrypting..." : "Launch Interface"}
            </motion.button>

            <div className="relative py-4 flex items-center gap-4">
              <div className="flex-1 h-[1px] bg-white/5"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">Cross-Chain Auth</span>
              <div className="flex-1 h-[1px] bg-white/5"></div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <SocialBtn onClick={handleGoogleSignIn} icon="https://www.svgrepo.com/show/475656/google-color.svg" label="Google" />
              <SocialBtn onClick={handleGitHubSignIn} icon="https://www.svgrepo.com/show/475654/github-color.svg" label="GitHub" isGithub />
            </div>
          </form>
        </div>

        {/* RIGHT SECTION: BRANDING */}
        <div className="flex-1 relative overflow-hidden flex flex-col items-center justify-between p-12 lg:p-16 bg-gradient-to-br from-blue-600/20 via-transparent to-emerald-500/10 order-1 lg:order-2">
          
          <div className="relative z-10 w-full text-center lg:text-left space-y-10">
            <motion.div 
               animate={{ rotate: [0, 5, 0, -5, 0] }} 
               transition={{ duration: 6, repeat: Infinity }}
               className="inline-block p-8 rounded-[3rem] bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-inner"
            >
              <span className="text-6xl filter drop-shadow-2xl">⚡</span>
            </motion.div>
            
            <div className="space-y-5">
              <h2 className="text-5xl font-black text-white leading-[1.1] tracking-tighter">
                Rewrite <br/> 
                <span className="text-blue-500 italic">The Future.</span>
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs font-medium">
                Connect your consciousness to the most powerful AI journalism engine ever built.
              </p>
            </div>
          </div>

          <div className="relative z-10 w-full space-y-8">
            <motion.div 
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-2xl shadow-2xl relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-[10px] uppercase font-black text-emerald-400 tracking-widest mb-1">System Status</p>
                  <p className="text-3xl font-black text-white">Operational</p>
                </div>
                <div className="text-right">
                   <p className="text-[10px] uppercase font-black text-gray-500 tracking-widest mb-1">Uptime</p>
                   <p className="text-sm font-bold text-blue-400 font-mono">99.99%</p>
                </div>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                   initial={{ width: 0 }} 
                   animate={{ width: "100%" }} 
                   transition={{ duration: 3, ease: "circOut" }} 
                   className="h-full bg-gradient-to-r from-blue-600 to-emerald-400 shadow-[0_0_20px_rgba(59,130,246,0.5)]" 
                />
              </div>
            </motion.div>

            <p className="text-center text-gray-500 text-xs font-bold tracking-tight">
              Already synchronized? <Link href="/auth/sign-in" className="text-blue-500 hover:text-blue-400 transition-colors uppercase ml-1">Log In</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ValidationTag({ isValid, text }: { isValid: boolean, text: string }) {
  return (
    <motion.span 
      animate={{ 
        color: isValid ? "#34d399" : "#4b5563",
        borderColor: isValid ? "rgba(52, 211, 153, 0.3)" : "rgba(255, 255, 255, 0.1)"
      }}
      className={`px-5 py-2 rounded-full text-[9px] font-black tracking-widest uppercase border transition-all duration-500 ${
      isValid ? "bg-emerald-500/5" : "bg-white/[0.02]"
    }`}>
      {isValid ? "✓" : "○"} {text}
    </motion.span>
  );
}

function SocialBtn({ onClick, icon, label, isGithub }: any) {
  return (
    <motion.button
      type="button" 
      whileHover={{ y: -4, backgroundColor: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.2)" }} 
      whileTap={{ scale: 0.96 }} 
      onClick={onClick}
      className="flex items-center justify-center gap-3 py-4 border border-white/5 rounded-3xl transition-all text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] bg-white/[0.03]"
    >
      <img src={icon} className={`w-4 h-4 ${isGithub ? "invert opacity-80" : ""}`} alt={label} />
      {label}
    </motion.button>
  );
}