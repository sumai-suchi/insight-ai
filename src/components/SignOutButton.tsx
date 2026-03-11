"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth/auth-client";
import { LogOut, User2, Settings } from "lucide-react";
import { useAuth } from "@/Context/AuthContext";
import Link from "next/link";

const SignOutButton = () => {
  const router = useRouter();
  const { session, refreshSession } = useAuth();
  const [open, setOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const user = session?.user;

  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=6366f1&color=fff&size=200`;

  const getImageSrc = () => {
    if (imgError || !user?.image) return fallbackAvatar;
    // Remove size restrictions from Google URL for better loading
    return user.image.replace("=s96-c", "=s200-c").replace("=s96", "=s200");
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Reset image error when user changes
  useEffect(() => {
    setImgError(false);
  }, [user?.image]);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          refreshSession();
          router.push("/auth/sign-in");
        },
      },
    });
  };

  return (
    <div className="relative" ref={ref}>
      {/* Avatar Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center cursor-pointer gap-2 focus:outline-none"
      >
        <img
          src={getImageSrc()}
          alt="Profile"
          referrerPolicy="no-referrer"
          crossOrigin="anonymous"
          className="w-9 h-9 rounded-full border-2 border-purple-400 object-cover shadow-sm"
          onError={() => setImgError(true)}
        />
        <span className="hidden md:block text-sm font-semibold text-white max-w-25 truncate">
          {user?.name || "User"}
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
          <div className="px-4 py-2 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-1">
              <img
                src={getImageSrc()}
                alt="Profile"
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
                className="w-8 h-8 rounded-full object-cover"
                onError={() => setImgError(true)}
              />
              <div>
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            </div>
          </div>
          <Link
            href="/dashboard/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition"
          >
            <User2 size={15} /> Profile
          </Link>
          <Link
            href="/dashboard/settings"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition"
          >
            <Settings size={15} /> Settings
          </Link>
          <hr className="my-1 border-gray-100" />
          <button
            onClick={handleSignOut}
            className="flex items-center cursor-pointer gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition w-full text-left"
          >
            <LogOut size={15} /> Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default SignOutButton;
