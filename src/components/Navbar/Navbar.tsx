// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import NavLogo from "../../../public/NavLogo.png";
// import { useState, useCallback } from "react";
// import {
//   NavigationMenu,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   navigationMenuTriggerStyle,
// } from "../ui/navigation-menu";
// import { Products } from "./Components/Products";
// import Solutions from "./Components/Solutions";
// import News from "./Components/News";
// import Recorses from "./Components/Recorses";
// import { UserAvatar } from "./Components/Avatar";
// import { useAuth } from "@/Context/AuthContext";

// export default function Navbar() {
//   const { session } = useAuth();
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const isAuthed = !!session?.user;

//   const toggleMenu = useCallback(() => {
//     setMobileMenuOpen((prev) => !prev);
//   }, []);

//   return (
//     <nav className="bg-black text-white backdrop-blur-md shadow-lg sticky  top-0 z-50 ">
//       {/* 🔝 Navbar */}
//       <div className="mx-auto flex items-center justify-between py-6  px-4 lg:px-8 h-[70px]">
//         {/* Logo */}
//         <Link href="/" className="flex items-center">
//           <Image src={NavLogo} alt="Logo" width={120} height={60} />
//         </Link>

//         {/* 🖥 Desktop Menu */}
//         <div className="hidden lg:flex flex-1 justify-center ">
//           <NavigationMenu viewport={false}>
//             <NavigationMenuList className="bg-orange-600">
//               <Products />
//               <Solutions />
//               {/* stact page hobe */}
//               <Recorses />
//               <News />

//               <NavigationMenuItem>
//                 <NavigationMenuLink
//                   asChild
//                   className={navigationMenuTriggerStyle()}
//                 >
//                   <Link href="/pricing">Pricing</Link>
//                 </NavigationMenuLink>
//               </NavigationMenuItem>

//               <NavigationMenuItem>
//                 <NavigationMenuLink
//                   asChild
//                   className={navigationMenuTriggerStyle()}
//                 >
//                   <Link href="/dashboard">Dashboard</Link>
//                 </NavigationMenuLink>
//               </NavigationMenuItem>

//               <NavigationMenuItem>
//                 <NavigationMenuLink
//                   asChild
//                   className={navigationMenuTriggerStyle()}
//                 >
//                   <Link href="/all-articles">All article</Link>
//                 </NavigationMenuLink>
//               </NavigationMenuItem>
//             </NavigationMenuList>
//           </NavigationMenu>
//         </div>

//         {/* Right Side */}
//         <div className="hidden md:flex items-center gap-4">
//           {isAuthed ? (
//             <UserAvatar />
//           ) : (
//             <>
//               <Link href="/auth/sign-in">Log In</Link>
//               <Link href="/auth/sign-up">
//                 <button className="bg-blue-500 text-white px-4 py-2 rounded-full">
//                   Start
//                 </button>
//               </Link>
//             </>
//           )}
//         </div>

//         {/* 📱 Mobile Toggle Button */}
//         <button
//           onClick={toggleMenu}
//           className="lg:hidden p-2 text-white/80 hover:text-white transition-colors"
//           aria-label="Toggle Menu"
//         >
//           {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
//         </button>
//       </div>

//       {/* 🔥 Mobile Menu Overlay & Drawer */}
//       <AnimatePresence>
//         {mobileMenuOpen && (
//           <>
//             {/* Backdrop Blur Overlay */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setMobileMenuOpen(false)}
//               className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
//             />

//             {/* Side Drawer */}
//             <motion.div
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ type: "spring", damping: 25, stiffness: 200 }}
//               className="fixed top-0 right-0 w-[85%] max-w-sm h-full bg-neutral-900 border-l border-white/10 z-50 lg:hidden shadow-2xl"
//             >
//               <div className="flex flex-col h-full p-8">
//                 {/* Mobile Menu Header */}
//                 <div className="flex items-center justify-between mb-10">
//                   <Image src={NavLogo} alt="Logo" width={100} height={40} />
//                   <button onClick={() => setMobileMenuOpen(false)} className="p-2">
//                     <X size={24} />
//                   </button>
//                 </div>

//                 {/* Navigation Links */}
//                 <div className="flex flex-col space-y-4">
//                   {menuItems.map((item, index) => (
//                     <motion.div
//                       key={item.name}
//                       initial={{ opacity: 0, x: 20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: index * 0.05 }}
//                     >
//                       <Link
//                         href={item.href}
//                         onClick={() => setMobileMenuOpen(false)}
//                         className="flex items-center justify-between group py-3 border-b border-white/5 text-lg font-medium text-white/70 hover:text-white transition-all"
//                       >
//                         {item.name}
//                         <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-blue-500" />
//                       </Link>
//                     </motion.div>
//                   ))}
//                 </div>

//                 {/* Bottom Section */}
//                 <div className="mt-auto pt-8 border-t border-white/10">
//                   {isAuthed ? (
//                     <div className="flex items-center gap-4">
//                       <UserAvatar />
//                       <span className="text-sm font-medium">Your Account</span>
//                     </div>
//                   ) : (
//                     <div className="grid grid-cols-2 gap-4">
//                       <Link
//                         href="/auth/sign-in"
//                         onClick={() => setMobileMenuOpen(false)}
//                         className="flex items-center justify-center py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors"
//                       >
//                         Log In
//                       </Link>
//                       <Link
//                         href="/auth/sign-up"
//                         onClick={() => setMobileMenuOpen(false)}
//                         className="flex items-center justify-center py-3 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold"
//                       >
//                         Start
//                       </Link>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </nav>
//   );
// }
"use client";

import Link from "next/link";
import Image from "next/image";
import NavLogo from "../../../public/NavLogo.png";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
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

  const menuItems = [
    { name: "Products", href: "/products" },
    { name: "Solutions", href: "/solutions" },
    { name: "Resources", href: "/resources" },
    { name: "News", href: "/news" },
    { name: "Pricing", href: "/pricing" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "All Articles", href: "/all-articles" },
  ];

  return (
    <nav className="bg-black text-white backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="mx-auto flex items-center justify-between py-6 px-4 lg:px-8 h-[70px]">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src={NavLogo} alt="Logo" width={120} height={60} priority />
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
                <Link href="/pricing" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Pricing
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/dashboard" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Dashboard
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/all-articles" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    All article
                  </NavigationMenuLink>
                </Link>
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
              <Link
                href="/auth/sign-in"
                className="hover:text-blue-400 transition-colors"
              >
                Log In
              </Link>
              <Link href="/auth/sign-up">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-full transition-all active:scale-95 text-sm font-medium">
                  Start
                </button>
              </Link>
            </>
          )}
        </div>

        {/* 📱 Mobile Toggle Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden p-2 text-white hover:opacity-80 transition-opacity"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* 🔥 Mobile Menu Overlay & Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/70 z-40 lg:hidden"
            />

            {/* Side Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-[85%] max-w-sm h-full bg-black border-l border-white/20 z-50 lg:hidden shadow-2xl"
            >
              <div className="flex flex-col h-full p-8 text-white">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between mb-10">
                  <Image src={NavLogo} alt="Logo" width={100} height={40} />
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col space-y-1">
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between group py-4 border-b border-white/10 text-lg font-medium text-white hover:text-blue-400 transition-all"
                      >
                        {item.name}
                        <ArrowRight
                          size={18}
                          className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-blue-500"
                        />
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom Section */}
                <div className="mt-auto pt-8 border-t border-white/20">
                  {isAuthed ? (
                    <div className="flex items-center gap-4">
                      <UserAvatar />
                      <span className="text-sm font-medium text-white">
                        My Profile
                      </span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      <Link
                        href="/auth/sign-in"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-center py-3 rounded-xl border border-white/30 text-white hover:bg-white/10 transition-colors"
                      >
                        Log In
                      </Link>
                      <Link
                        href="/auth/sign-up"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-center py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all active:scale-95"
                      >
                        Start
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
