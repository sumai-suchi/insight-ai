// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import Image from "next/image";

// import { motion, AnimatePresence } from "framer-motion";
// import Img from "../../public/NavLogo.png";
// import SignOutButton from "./SignOutButton";

// export default function Navbar() {
//   // const { user, loading } = useSessionContext();
//   const pathname = usePathname();
//   const [isOpen, setIsOpen] = useState(false);

//   // Hide navbar in dashboard
//   if (pathname?.startsWith("/dashboard")) {
//     return null;
//   }

//   const navLinks = [
//     { name: "Dashboard", href: "/dashboard" },
//     { name: "Project-Dashboard", href: "/project-dashboard" },
//     { name: "AI Editing info", href: "/ai-editing-pageInfo" },
//     { name: "AI Editing", href: "/ai-editing" },
//     { name: "News", href: "/news" },
//   ];

//   return (
//     <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50 transition-all duration-300">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo + Home Link */}
//           <Link
//             href="/"
//             className="flex items-center gap-2 text-xl font-semibold text-primary"
//           >
//             <Image
//               height={60}
//               width={125}
//               className="rounded-md object-contain w-auto h-auto"
//               src={Img.src}
//               alt="Insight AI Logo"
//             />
//           </Link>

//           {/* Desktop Navigation Links */}
//           <div className="hidden md:flex items-center space-x-8">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.name}
//                 href={link.href}
//                 className="text-gray-600 hover:text-[#3B82F6] font-medium transition-colors"
//               >
//                 {link.name}
//               </Link>
//             ))}
//           </div>

//           {/* Profile/Auth Section */}
//           <div className="hidden md:flex items-center gap-4">
//             {/* {user ? ( */}
//             <>
//               <SignOutButton />
//             </>
//             {/* ) : ( */}
//             <>
//               <Link href="/auth/sign-in">
//                 <button className="text-gray-600 hover:text-[#3B82F6] font-medium transition-colors px-3 py-2">
//                   Log In
//                 </button>
//               </Link>
//               <Link href="/auth/sign-up">
//                 <button className="bg-[#3B82F6] hover:bg-blue-600 text-white px-5 py-2 rounded-full font-semibold transition-all transform hover:scale-105">
//                   Start for free
//                 </button>
//               </Link>
//             </>
//             {/* )} */}
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden flex items-center">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="text-gray-600 hover:text-gray-900 focus:outline-none"
//             >
//               <svg
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 {isOpen ? (
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 ) : (
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M4 6h16M4 12h16m-7 6h7"
//                   />
//                 )}
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Sidebar (Animated) */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
//           >
//             <div className="px-4 pt-2 pb-6 space-y-2">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.name}
//                   href={link.href}
//                   onClick={() => setIsOpen(false)}
//                   className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#3B82F6] hover:bg-blue-50 rounded-md"
//                 >
//                   {link.name}
//                 </Link>
//               ))}
//               <div className="pt-4 border-t border-gray-100">
//                 {/* {user ? ( */}
//                 <div className="space-y-2">
//                   <div className="px-3 py-2">
//                     <p className="text-sm font-medium text-gray-900">
//                       {/* {user.name} */}
//                     </p>
//                     {/* <p className="text-xs text-gray-500">{user.email}</p> */}
//                   </div>
//                   <SignOutButton />
//                 </div>
//                 {/* ) : ( */}
//                 <>
//                   <Link href="/auth/sign-in">
//                     <button
//                       onClick={() => setIsOpen(false)}
//                       className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-[#3B82F6] hover:bg-blue-50 rounded-md mb-2"
//                     >
//                       Log In
//                     </button>
//                   </Link>
//                   <Link href="/auth/sign-up">
//                     <button
//                       onClick={() => setIsOpen(false)}
//                       className="w-full bg-[#3B82F6] text-white px-4 py-3 rounded-lg font-bold"
//                     >
//                       Start for free
//                     </button>
//                   </Link>
//                 </>
//                 {/* )} */}
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//   );
// }

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
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import Img from "../../public/NavLogo.png";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // শুধুমাত্র হোম পেজে ট্রান্সপারেন্ট ইফেক্ট কাজ করবে
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      // ২০ পিক্সেল স্ক্রল করলেই স্টেট চেঞ্জ হবে
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const router = useRouter();

const handleNavClick = async (link: any, e: React.MouseEvent) => {
  if (link.logout) {
    e.preventDefault();

    await authClient.signOut();
    alert("Signed out successfully");

    router.push("/"); // redirect after logout
  }
};

  if (pathname?.startsWith("/dashboard")) return null;

  const navLinks = [
    { name: "Home", href: "/", icon: <Home size={16} /> },
    { name: "Solutions", href: "/solutions", icon: <Lightbulb size={16} /> },
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard size={16} />,
    },
    {
      name: "Project-Dashboard",
      href: "/Project-dashboard",
      icon: <LayoutDashboard size={16} />,
    },
    { name: "News", href: "/news", icon: <Newspaper size={16} /> },
    { name: "AI Editor", href: "/ai-editing", icon: <PenTool size={16} /> },
    { name: "Profile", href: "/profile", icon: <User size={16} /> },
    { name: "Logout", href: "#", icon: <LogOut size={16} />, logout: true },
  ];

  // কন্ডিশনাল স্টাইল: হোম পেজে না থাকলে অথবা স্ক্রল করলে সাদা ব্যাকগ্রাউন্ড হবে
  const isTransparent = isHomePage && !scrolled;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isTransparent
          ? "bg-transparent py-2"
          : "bg-white/95 backdrop-blur-sm border-b border-gray-100 py-1 shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          {" "}
          {/* Height কমিয়ে h-12 করা হয়েছে */}
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <Image
                height={32}
                width={32}
                className="object-contain"
                src={Img.src}
                alt="Logo"
              />
            </div>
            <span
              className={`text-lg font-bold tracking-tight transition-colors ${isTransparent ? "text-white" : "text-gray-900"}`}
            >
              ContentAI <span className="text-purple-500">Pro</span>
            </span>
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(link, e)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  isTransparent
                    ? "text-white/90 hover:text-white hover:bg-white/10"
                    : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
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

          {/* Profile/Auth Section */}
          {/* <div className="hidden md:flex items-center gap-4">
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
          </div> */}

          {/* Mobile Menu Button */}
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

      {/* Mobile Sidebar (Animated) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-y-0 right-0 w-64 bg-white shadow-2xl z-60 lg:hidden flex flex-col p-6"
          >
            <div className="flex justify-end mb-6">
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

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
