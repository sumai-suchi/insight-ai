"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Lightbulb,
  LayoutDashboard,
  Newspaper,
  PenTool,
  Menu,
  X,
<<<<<<< HEAD
  User2,
  CreditCard,
=======
  LogOut,
  User2,
  
>>>>>>> a0359be006eece6cec13ca64d44f9e223377c8b1
} from "lucide-react";

import { useAuth } from "@/Context/AuthContext";
<<<<<<< HEAD
import { User } from "@/types/auth-type";
=======
import { SessionData} from "@/types/auth-type";
import type { IUser } from "@/lib/mongoose-connect/User";
>>>>>>> a0359be006eece6cec13ca64d44f9e223377c8b1
import SignOutButton from "./SignOutButton";

<<<<<<< HEAD
=======
// type SessionData = Awaited<
//   ReturnType<typeof authClient.getSession>
// >["data"];

// type AuthError = {
//   code?: string;
//   message?: string;
//   status: number;
//   statusText: string;
// };

>>>>>>> a0359be006eece6cec13ca64d44f9e223377c8b1
export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
<<<<<<< HEAD
  const [user, setUser] = useState<User | null>(null);
=======


  const [User, setUser] = useState<IUser | null>(null);
  
  // replace with your actual user object
>>>>>>> a0359be006eece6cec13ca64d44f9e223377c8b1

  const context = useAuth();
  const isHomePage = pathname === "/";

<<<<<<< HEAD
  useEffect(() => {
    setUser(context?.session?.user || null);
  }, [context?.session?.user]);
=======


const { session } = useAuth();
console.log("Current session in Navbar:", session);

useEffect(() => {
  if (session?.user) {
    console.log("User session found:", session.user);
    setUser({
    id: session.user.id,          // ✅ map id → _id
    name: session.user.name,
    email: session.user.email,
   
    image: session.user.image ?? null,
    role: "user",                  // default, or fetch from DB
    isBlocked: false,              // default
    discount: 0,                   // default
    createdAt: session.user.createdAt,
    updatedAt: session.user.updatedAt,
  });
  } else {
    setUser(null);
  }
}, [session]);
>>>>>>> a0359be006eece6cec13ca64d44f9e223377c8b1

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  if (pathname?.startsWith("/dashboard")) return null;

  const navLinks = [
<<<<<<< HEAD
    { name: "Home", href: "/", icon: <Home size={18} /> },
    { name: "Solutions", href: "/solutions", icon: <Lightbulb size={18} /> },
    { name: "AI Editor", href: "/dashboard", icon: <PenTool size={18} /> },
    { name: "News", href: "/news", icon: <Newspaper size={18} /> },
    {
      name: "Projects",
      href: "/Project-Dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    { name: "Pricing", href: "/pricing", icon: <CreditCard size={18} /> },
    { name: "Profile", href: "/dashboard/profile", icon: <User2 size={18} /> },
=======
    { name: "Home", href: "/", icon: <Home size={16} /> },
    { name: "Solutions", href: "/solutions", icon: <Lightbulb size={16} /> },
    { name: "News", href: "/news", icon: <Newspaper size={16} /> },
   
    { name: "Project-dashboard", href: "/Project-dashboard", icon: <PenTool size={16} /> },
    { name: "Profile", href: "/dashboard/profile", icon: <User2 size={16} /> },
>>>>>>> a0359be006eece6cec13ca64d44f9e223377c8b1
  ];

  const isTransparent = isHomePage && !scrolled;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
          isTransparent
            ? "bg-gradient-to-r from-[#57198A] to-[#382A86] py-4"
            : "bg-white/95 backdrop-blur-md border-b border-gray-100 py-3 shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12">
            {/* --- PERFECT LOGO SECTION --- */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                {/* Responsive Width: 
                   w-32 (128px) on mobile 
                   md:w-44 (176px) on tablet 
                   lg:w-52 (208px) on desktop 
                */}
                <div className="relative w-32 md:w-44 lg:w-52 h-60 top-[10px] aspect-[4/1]">
                  <Image
                    src="/ins-logo.png"
                    alt="Brand Logo"
                    fill
                    className="object-contain object-left"
                    priority
                  />
                </div>
              </Link>
            </div>

<<<<<<< HEAD
            {/* Desktop Nav */}
            <div className="hidden lg:flex flex-1 justify-center items-center space-x-1">
=======
          {/* Profile/Auth */}
          <div className="hidden md:flex items-center gap-4">
            {User ? (
              <SignOutButton></SignOutButton>
            ) : (
              <div className="flex gap-2">
                <Link href="/auth/sign-in">
                  <button
                    className={`font-medium cursor-pointer transition-colors px-3 py-2 ${
                      isTransparent ? "text-white" : "text-gray-600"
                    }`}
                  >
                    Log In
                  </button>
                </Link>
                <Link href="/auth/sign-up">
                  <button className="bg-[#3B82F6] hover:bg-blue-600 cursor-pointer text-white px-5 py-2 rounded-full font-semibold transition-all">
                    Start for free
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-1.5 rounded-md ${isTransparent ? "text-white" : "text-gray-600"}`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-64 bg-purple-100 shadow-2xl z-60 lg:hidden flex flex-col p-6"
          >
            <button onClick={() => setIsOpen(false)} className="self-end mb-6 text-gray-400">
              <X size={24} />
            </button>
            <div className="flex flex-col space-y-3">
>>>>>>> a0359be006eece6cec13ca64d44f9e223377c8b1
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    isTransparent
                      ? "text-white/90 hover:bg-white/10 hover:text-white"
                      : "text-slate-700 hover:text-purple-600 hover:bg-purple-50"
                  }`}
                >
                  <span
                    className={
                      isTransparent ? "text-purple-300" : "text-purple-600"
                    }
                  >
                    {link.icon}
                  </span>
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <SignOutButton />
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    href="/auth/sign-in"
                    className={`text-sm font-bold px-4 py-2 transition-colors ${
                      isTransparent
                        ? "text-white"
                        : "text-gray-600 hover:text-purple-600"
                    }`}
                  >
                    Log In
                  </Link>
                  <Link href="/auth/sign-up">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg transform transition-transform hover:scale-105 active:scale-95">
                      Start for free
                    </button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Toggle Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(true)}
                className={`p-2 rounded-xl transition-colors ${
                  isTransparent
                    ? "bg-white/10 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <Menu size={26} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- SIDEBAR SECTION --- */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] lg:hidden"
            />

            {/* Sidebar Pane */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-y-0 right-0 w-[85%] max-w-sm bg-white z-[120] lg:hidden flex flex-col shadow-2xl"
            >
              <div className="p-6 flex justify-between items-center border-b">
                <div className="relative w-52 h-40">
                  <Image
                    src="/ins-logo.png"
                    alt="Logo"
                    fill
                    className="object-contain object-left"
                  />
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-4 px-4 py-4 text-gray-700 hover:text-purple-700 hover:bg-purple-50 rounded-2xl transition-all font-bold border border-transparent active:scale-[0.98]"
                  >
                    <span className="text-purple-500 bg-purple-50 p-2 rounded-lg">
                      {link.icon}
                    </span>
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="p-6 border-t mt-auto bg-gray-50/50">
                {user ? (
                  <div className="w-full">
                    <SignOutButton />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-3">
                    <Link href="/auth/sign-in" onClick={() => setIsOpen(false)}>
                      <button className="w-full py-4 text-center font-bold text-gray-700 border-2 border-gray-200 rounded-2xl bg-white hover:bg-gray-50 transition-colors">
                        Log In
                      </button>
                    </Link>
                    <Link href="/auth/sign-up" onClick={() => setIsOpen(false)}>
                      <button className="w-full py-4 text-center font-bold text-white bg-blue-600 rounded-2xl shadow-xl shadow-blue-100">
                        Get Started Free
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Global Page Spacer */}
      {!isHomePage && <div className="h-20 w-full" />}
    </>
  );
}
