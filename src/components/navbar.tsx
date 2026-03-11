"use client";

import React, { useState, useEffect } from "react";

  // import the auth client
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
  LogOut,
  User2,
  
} from "lucide-react";

import Img from "../../public/NavLogo.png";
import { authClient } from "@/lib/auth/auth-client";
import { useAuth } from "@/Context/AuthContext";
import { SessionData} from "@/types/auth-type";
import type { IUser } from "@/lib/mongoose-connect/User";
import SignOutButton from "./SignOutButton";
// import {   User } from "@/types/auth-type";

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


  const [User, setUser] = useState<IUser | null>(null);
  
  // replace with your actual user object

  const isHomePage = pathname === "/";



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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname?.startsWith("/dashboard")) return null;

  const navLinks = [
    { name: "Home", href: "/", icon: <Home size={16} /> },
    { name: "Solutions", href: "/solutions", icon: <Lightbulb size={16} /> },
    { name: "AI Editor", href: "/dashboard", icon: <PenTool size={16} /> },
    { name: "News", href: "/news", icon: <Newspaper size={16} /> },
    { name: "AI Editor", href: "/ai-editing", icon: <PenTool size={16} /> },
    { name: "Project-dashboard", href: "/Project-dashboard", icon: <PenTool size={16} /> },
    { name: "Profile", href: "/dashboard/profile", icon: <User2 size={16} /> },
  ];

  const isTransparent = isHomePage && !scrolled;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300  ${
        isTransparent
          ? "bg-transparent bg-linear-to-r from-[#57198A] to-[#382A86] py-2"
          : "bg-white/95 backdrop-blur-sm border-b border-gray-100 py-1 shadow-sm"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            
            <span
              className={`text-lg font-bold tracking-tight transition-colors ${
                isTransparent ? "text-purple-600" : "text-white"
              }`}
            >
              <Image src={'/ins-logo.png'} alt="Logo" width={250} height={30} className="inline-block absolute -top-20 left-50 mr-2" />

            
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  isTransparent
                    ? "text-white/90 hover:text-white hover:bg-white/10"
                    : "text-purple-950 hover:text-purple-600 hover:bg-purple-50"
                }`}
              >
                <span className={isTransparent ? "text-purple-300" : "text-purple-600"}>
                  {link.icon}
                </span>
                {link.name}
              </Link>
            ))}
          </div>

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
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors text-sm font-medium"
                >
                  <span className="text-purple-500">{link.icon}</span>
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}