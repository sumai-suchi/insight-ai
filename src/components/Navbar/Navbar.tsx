"use client";

import Link from "next/link";
import Image from "next/image";
import NavLogo from "../../../public/NavLogo.png";
import { useState, useCallback } from "react";
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
import { useAuth } from "@/Context/AuthContext";

export default function Navbar() {
  const { session } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAuthed = !!session?.user;

  const toggleMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  return (
    <nav className="bg-black text-white backdrop-blur-md shadow-lg sticky  top-0 z-50 ">

      {/* 🔝 Navbar */}
      <div className="mx-auto flex items-center justify-between py-6  px-4 lg:px-8 h-[70px]">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src={NavLogo} alt="Logo" width={120} height={60} />
        </Link>

        {/* 🖥 Desktop Menu */}
        <div className="hidden lg:flex flex-1 justify-center">
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              <Products />
              <Solutions />
              <Recorses />
              <News />

              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/pricing">Pricing</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/dashboard">Dashboard</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/all-articles">All article</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>


            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthed ? (
            <UserAvatar />
          ) : (
            <>
              <Link href="/auth/sign-in">Log In</Link>
              <Link href="/auth/sign-up">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-full">
                  Start
                </button>
              </Link>
            </>
          )}
        </div>

        {/* 📱 Mobile Button */}
        <button onClick={toggleMenu} className="lg:hidden text-2xl">
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* 🔥 Overlay */}
      <div
        onClick={() => setMobileMenuOpen(false)}
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* 📱 Mobile Menu (NO NavigationMenu HERE) */}
      <div
        className={`lg:hidden fixed top-0 left-0 w-full h-screen bg-white z-50
        transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col h-full justify-between">

          {/* Links */}
          <div className="px-6 pt-10 space-y-6 text-lg">
            <Link href="/products">Products</Link>
            <Link href="/solutions">Solutions</Link>
            <Link href="/resources">Resources</Link>
            <Link href="/news">News</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/dashboard">Dashboard</Link>
          </div>

          {/* Bottom */}
          <div className="pb-8 border-t pt-4 text-center">
            {isAuthed ? (
              <UserAvatar />
            ) : (
              <div className="flex justify-center gap-4">
                <Link href="/auth/sign-in">Log In</Link>
                <Link href="/auth/sign-up">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-full">
                    Start
                  </button>
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}