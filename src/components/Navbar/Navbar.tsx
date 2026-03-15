"use client";

import Link from "next/link";
import Image from "next/image";
import NavLogo from "../../../public/NavLogo.png";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { Products } from "./Components/Products";
import Solutions from "./Components/Solutions";
import News from "./Components/News";
import Recorses from "./Components/Recorses";
import { UserAvatar } from "./Components/Avatar";
import { Button } from "../ui/button";
import { useAuth } from "@/Context/AuthContext";
import { User } from "lucide-react";
export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { session } = useAuth();
  const isAuthed = !!session?.user;
  // const handleLogout = async () => {
  //   await signOut({ redirect: true, callbackUrl: "/" });
  // };

  return (
    <nav className="bg-opacity-60 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b-gray-300 border-opacity-30">
      <div className="mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src={NavLogo}
              alt="Insight AI Logo"
              width={200}
              height={100}
              className="rounded-full"
            />
          </Link>

          {/* Desktop Navigation */}
          {/* <div className="hidden md:flex text-2xl items-center space-x-6"> */}
          <NavigationMenu className="flex-1 w-full">
            <NavigationMenuList>
              <Products />
              <Solutions />
              <Recorses />
              <News />
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="/pricing">Pricing</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex text-white text-2xl items-center space-x-6">
            {isAuthed ? (
              <UserAvatar />
            ) : (
              <>
                <Link
                  href="/auth/sign-in"
                  className={`font-medium cursor-pointer text-black transition-colors px-3 py-2`}
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

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-[#F8FAFC] hover:text-[#3B82F6] hover:bg-[#0F172A] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#3B82F6]"
            aria-controls="mobile-menu"
            aria-expanded="false"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className="md:hidden min-h-[90vh] flex-col justify-between flex"
            id="mobile-menu"
          >
            <div className="px-2 pt-2 pb-3 text-white space-y-1 sm:px-3 border-t border-slate-700">
              nav
            </div>
            <div className="pt-4 pb-3 text-white border-t border-slate-700 border-opacity-30 space-y-3">
              auth
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
