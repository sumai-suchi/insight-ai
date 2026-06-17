"use client";

import Link from "next/link";
import Image from "next/image";
import NavLogo from "../../../../public/NavLogo.png";
import { useState } from "react";

import { useAuth } from "@/Context/AuthContext";
import { UserAvatar } from "@/components/Navbar/Components/Avatar";
import { Menu } from "lucide-react";
interface DashboardNavbarProps {
  onToggleSide: () => void;
  isOpen: boolean;
}
export default function DashboardNavbar({
  onToggleSide,
  isOpen,
}: DashboardNavbarProps) {
  // const handleLogout = async () => {
  //   await signOut({ redirect: true, callbackUrl: "/" });
  // };
  //  console.log(session)
  return (
    <nav className="bg-white lg:bg-opacity-60 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b-gray-300 border-opacity-30">
      <div className="mx-auto flex items-center px-4 md:py-2 lg:px-8">
        <div className="flex justify-between gap-4 flex-1">
          <div className="flex items-center gap-4">
            {!isOpen && (
              <button
                onClick={onToggleSide}
                className="p-2 rounded hover:bg-gray-200 focus:outline-none"
                aria-label="Toggle sidebar"
              >
                <Menu className="w-6 h-6" />
              </button>
            )}
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
          <div className="flex-none hidden md:flex">
            <div className=" grow-0 text-white text-xl items-center space-x-6">
              <UserAvatar></UserAvatar>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
