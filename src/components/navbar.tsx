"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { motion, AnimatePresence } from "framer-motion";
import Img from "../../public/NavLogo.png";
import SignOutButton from "./SignOutButton";
import { useSessionContext } from "@/lib/auth/session-context";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";

export default function Navbar() {
  const { user } = useSessionContext();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Hide navbar in dashboard
  if (pathname?.startsWith("/dashboard")) {
    return null;
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "AI Editing", href: "/ai-editing" },
    { name: "News", href: "/news" },
  ];

  // Prevent hydration mismatch by not rendering until session is loaded
  // if (loading) {
  //   return (
  //     <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50 transition-all duration-300">
  //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  //         <div className="flex justify-between items-center h-16">
  //           {/* Placeholder during loading */}
  //         </div>
  //       </div>
  //     </nav>
  //   );
  // }

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo + Home Link */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-semibold text-primary"
          >
            <Image
              height={100}
              width={150}
              className="rounded-md object-contain w-auto h-auto"
              src={Img.src}
              alt="Insight AI Logo"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-[#3B82F6] font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Profile/Auth Section */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                              <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="relative h-8 w-8 rounded-full focus:outline-none">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-[#3B82F6] text-white">
                          {user.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>        
                    
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenuSeparator />
                    <SignOutButton />
              </>
            ) : (
              <>
                <Link href="/auth/sign-in">
                  <button className="text-gray-600 hover:text-[#3B82F6] font-medium transition-colors px-3 py-2">
                    Log In
                  </button>
                </Link>
                <Link href="/auth/sign-up">
                  <button className="bg-[#3B82F6] hover:bg-blue-600 text-white px-5 py-2 rounded-full font-semibold transition-all transform hover:scale-105">
                    Start for free
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar (Animated) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#3B82F6] hover:bg-blue-50 rounded-md"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-100">
                {user ? (
                  <div className="space-y-2">
                    <div className="px-3 py-2">
                      <p className="text-sm font-medium text-gray-900">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <SignOutButton />
                  </div>
                 ) : (
                  <>
                    <Link href="/auth/sign-in">
                      <button
                        onClick={() => setIsOpen(false)}
                        className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-[#3B82F6] hover:bg-blue-50 rounded-md mb-2"
                      >
                        Log In
                      </button>
                    </Link>
                    <Link href="/auth/sign-up">
                      <button
                        onClick={() => setIsOpen(false)}
                        className="w-full bg-[#3B82F6] text-white px-4 py-3 rounded-lg font-bold"
                      >
                        Start for free
                      </button>
                    </Link>
                  </>
                 )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
