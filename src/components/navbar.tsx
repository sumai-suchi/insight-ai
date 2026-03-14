"use client";

import React, { useEffect, useMemo, useState } from "react";
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
  CreditCard,
  User2,
} from "lucide-react";

import { useAuth } from "@/Context/AuthContext";
import SignOutButton from "./SignOutButton";

// type SessionData = Awaited<
//   ReturnType<typeof authClient.getSession>
// >["data"];

// type AuthError = {
//   code?: string;
//   message?: string;
//   status: number;
//   statusText: string;
// };

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { session } = useAuth();
  const isHomePage = pathname === "/";
  const isAuthed = !!session?.user;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  if (pathname?.startsWith("/dashboard")) return null;

  const navLinks = useMemo(
    () => [
      { name: "Home", href: "/", icon: <Home size={18} /> },
      { name: "Solutions", href: "/solutions", icon: <Lightbulb size={18} /> },
      { name: "News", href: "/news", icon: <Newspaper size={18} /> },
      { name: "Projects", href: "/Project-dashboard", icon: <LayoutDashboard size={18} /> },
      { name: "Pricing", href: "/pricing", icon: <CreditCard size={18} /> },
      { name: "Profile", href: "/dashboard/profile", icon: <User2 size={18} /> },
    ],
    [],
  );

  const isTransparent = isHomePage && !scrolled;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-100 transition-all duration-300 ${
          isTransparent
            ? "bg-linear-to-r from-[#57198A] to-[#382A86] py-4"
            : "bg-white/95 backdrop-blur-md border-b border-gray-100 py-3 shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12">
            {/* --- PERFECT LOGO SECTION --- */}
            <div className="shrink-0">
              <Link href="/" className="flex items-center">
                {/* Responsive Width: 
                   w-32 (128px) on mobile 
                   md:w-44 (176px) on tablet 
                   lg:w-52 (208px) on desktop 
                */}
                <div className="relative w-32 md:w-44 lg:w-52 h-60 top-[10px] aspect-4/1">
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

            {/* Desktop nav links */}
            <div className="hidden lg:flex flex-1 justify-center items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={`${link.name}:${link.href}`}
                    href={link.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                      isTransparent
                        ? "text-white/90 hover:bg-white/10 hover:text-white"
                        : isActive
                          ? "text-purple-700 bg-purple-50"
                          : "text-slate-700 hover:text-purple-700 hover:bg-purple-50"
                    }`}
                  >
                    <span className={isTransparent ? "text-purple-200" : "text-purple-600"}>
                      {link.icon}
                    </span>
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Auth (desktop) + hamburger (mobile) */}
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-3">
                {isAuthed ? (
                  <SignOutButton />
                ) : (
                  <>
                    <Link
                      href="/auth/sign-in"
                      className={`font-medium cursor-pointer transition-colors px-3 py-2 ${
                        isTransparent ? "text-white" : "text-gray-600 hover:text-purple-700"
                      }`}
                    >
                      Log In
                    </Link>
                    <Link href="/auth/sign-up">
                      <button className="bg-[#3B82F6] hover:bg-blue-600 cursor-pointer text-white px-5 py-2 rounded-full font-semibold transition-all">
                        Start for free
                      </button>
                    </Link>
                  </>
                )}
              </div>

              <div className="lg:hidden flex items-center">
                <button
                  type="button"
                  aria-label={isOpen ? "Close menu" : "Open menu"}
                  onClick={() => setIsOpen((v) => !v)}
                  className={`p-2 rounded-md ${isTransparent ? "text-white" : "text-gray-600"}`}
                >
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
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
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-110 lg:hidden"
            />

            {/* Sidebar Pane */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-y-0 right-0 w-[85%] max-w-sm bg-white z-120 lg:hidden flex flex-col shadow-2xl"
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
                    key={`${link.name}:${link.href}`}
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
                {isAuthed ? (
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