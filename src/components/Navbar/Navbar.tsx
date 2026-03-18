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
import { IUser } from "@/lib/mongoose-connect/User";
export default function Navbar() {
  //   type SessionUser = {
  //   id: string;
  //   name: string;
  //   email: string;
  //   emailVerified: boolean;
  //   image?: string | null;
  //   createdAt: Date;
  //   updatedAt: Date;
  // };

  const { session } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // const [User, setUser] = useState<SessionUser | null>(session?.user ?? null);

  const isAuthed = !!session?.user;

  // const handleLogout = async () => {
  //   await signOut({ redirect: true, callbackUrl: "/" });
  // };
  //  console.log(session)
  return (
    <nav className="bg-white lg:bg-opacity-60 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b-gray-300 border-opacity-30">
      <div className="mx-auto flex items-center px-4 md:py-2 lg:px-8">
        <div className="flex justify-between gap-4 flex-1">
          <div className="flex-none">
            <Link href="/" className="flex grow-0 items-center space-x-2">
              <Image
                src={NavLogo}
                alt="Insight AI Logo"
                width={200}
                height={100}
                className="rounded-full"
              />
            </Link>
          </div>
          <div className="justify-center hidden lg:flex grow">
            <NavigationMenu className="w-full" viewport={false}>
              <NavigationMenuList>
                <Products />
                <NavigationMenuList>
                  <Solutions />{" "}
                </NavigationMenuList>
                <NavigationMenuList>
                  <Recorses />
                </NavigationMenuList>
                <NavigationMenuList>
                  <News />
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      asChild
                      className={navigationMenuTriggerStyle()}
                    >
                      <Link href="/pricing">Pricing</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      asChild
                      className={navigationMenuTriggerStyle()}
                    >
                      <Link href="/dashboard">Dashboard</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex-none hidden md:flex">
            {" "}
            <div className=" grow-0 text-white text-xl items-center space-x-6">
              {isAuthed ? (
                <UserAvatar></UserAvatar>
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
          </div>
        </div>
        {/* Mobile Menu Button */}
        <button
          type="button"
          className="lg:hidden inline-flex ml-2 flex-none items-center justify-center p-2 rounded-md text-[#0d0d0e] hover:text-[#3B82F6] hover:bg-[#0F172A] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#3B82F6]"
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
          className="lg:hidden min-h-[95vh] flex-col justify-between flex"
          id="mobile-menu"
        >
          <div className="text-2xl px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-slate-700">
            <NavigationMenu
              className="w-full flex-col flex justify-start items-start"
              viewport={false}
            >
              <NavigationMenuList className="flex-col  gap-4 flex justify-start items-start w-full">
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
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link href="/dashboard">Dashboard</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="pt-4 md:hidden pb-3 border-t border-slate-700 border-opacity-30 space-y-3">
            {isAuthed ? (
              <UserAvatar></UserAvatar>
            ) : (
              <div className="text-white text-xl items-center space-x-6 flex justify-center">
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
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
