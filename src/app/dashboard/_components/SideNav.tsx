import { FolderKanban, Home, ScrollText, Settings, CircleUserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const SideNav = () => {
  const navLinks = [
    { name: "Home", icon: Home, href: "/dashboard" },
    { name: "Projects", icon: FolderKanban, href: "/dashboard/projects" },
    { name: "Instructions", icon: ScrollText, href: "/dashboard/instructions" },
    { name: "Settings", icon: Settings, href: "/dashboard/settings" },
    { name: "Profile", icon: CircleUserRound, href: "/dashboard/profile" },
  ];
  return (
    <aside className="h-screen fixed w-50 lg:w-70 hidden md:block p-5 shadow-sm border">
      <Link href="/" className="flex justify-center">
        <Image
          src="/Logo.png"
          alt="Insight AI Logo"
          width={150}
          height={50}
          className="mb-6 rounded"
        />
      </Link>
      <div className="mt-4">
        {navLinks.map((link) => (
          <Link
            href={link.href}
            key={link.name}
            className="flex lg:ml-4 items-center mb-2 font-bold text-lg lg:text-xl hover:bg-gray-100 rounded-md p-2"
          >
            <i className="mr-2">
              <link.icon className="w-4 h-4" />
            </i>
            <h3 className="block px-4 py-2 ">{link.name}</h3>
          </Link>
        ))}
      </div>
    </aside>
  );
};
