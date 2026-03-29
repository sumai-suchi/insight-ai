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
import { useState, useCallback, useEffect } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { Products } from "./Components/Products";

import News from "./Components/News";
import Recorses from "./Components/Recorses";
import Solutions from  "./Components/Solutions";
import { UserAvatar } from "./Components/Avatar";
import { useAuth } from "@/Context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu, LayoutDashboard, FileText, Tag } from "lucide-react";

const NAV_LINKS = [
  { href: "/pricing",      label: "Pricing",     icon: Tag           },
  { href: "/dashboard",    label: "Dashboard",   icon: LayoutDashboard },
  { href: "/all-articles", label: "All Articles",icon: FileText      },
];

const MOBILE_LINKS = [
  { href: "/products",     label: "Products"     },
  { href: "/solutions",    label: "Solutions"    },
  { href: "/resources",    label: "Resources"    },
  { href: "/news",         label: "News"         },
  { href: "/pricing",      label: "Pricing"      },
  { href: "/dashboard",    label: "Dashboard"    },
  { href: "/all-articles", label: "All Articles" },
];

export default function Navbar({ isHome = false }: { isHome?: boolean }) {
  const { session } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const isAuthed = !!session?.user;

  const toggleMenu = useCallback(() => setMobileOpen((p) => !p), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /* ── Solid brand style for non-home pages ── */
  const solidStyle = {
    background: "linear-gradient(135deg, #020c1f 0%, #0F2854 60%, #0a1628 100%)",
    backdropFilter: "none",
    WebkitBackdropFilter: "none",
    borderBottom: "1px solid rgba(28,77,141,0.35)",
    boxShadow: "0 4px 32px rgba(0,0,0,0.4)",
  };

  /* ── Glassy style for home page ── */
  const glassStyle = {
    background: scrolled ? "rgba(8,15,35,0.82)" : "transparent",
    backdropFilter: scrolled ? "blur(24px)" : "blur(0px)",
    WebkitBackdropFilter: scrolled ? "blur(24px)" : "blur(0px)",
    borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
    boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.4)" : "none",
  };

  const navStyle = isHome ? glassStyle : solidStyle;

  return (
    <>
      <nav
        className={`${isHome ? "fixed" : "sticky"} top-0 left-0 right-0 z-50 w-full transition-all duration-500`}
        style={navStyle}
      >
        <div className="mx-auto flex items-center justify-between h-[68px] px-4 lg:px-8 max-w-[1400px]">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center shrink-0">
            <Image src={NavLogo} alt="Insight AI" width={110} height={44} priority />
          </Link>

          {/* ── Desktop nav ── */}
          <div className="hidden lg:flex flex-1 justify-center">
            <NavigationMenu viewport={false}>
              <NavigationMenuList className="gap-0.5">
                <Products />
                <Solutions></Solutions>
                <Recorses />
                <News />
                {NAV_LINKS.map(({ href, label }) => (
                  <NavigationMenuItem key={href}>
                    <NavigationMenuLink
                      asChild
                      className={navigationMenuTriggerStyle()}
                    >
                      <Link
                        href={href}
                        className="!text-white/75 hover:!text-white !bg-transparent hover:!bg-white/8 transition-colors"
                      >
                        {label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* ── Desktop right ── */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {isAuthed ? (
              <UserAvatar />
            ) : (
              <>
                <Link
                  href="/auth/sign-in"
                  className="text-sm font-medium text-white/70 hover:text-white transition-colors px-3 py-1.5"
                >
                  Log In
                </Link>
                <Link href="/auth/sign-up">
                  <motion.button
                    whileHover={{ scale: 1.04, boxShadow: "0 0 24px rgba(28,77,141,0.6)" }}
                    whileTap={{ scale: 0.97 }}
                    className="px-5 py-2 rounded-full text-sm font-semibold text-white transition-all"
                    style={{
                      background: "linear-gradient(135deg, #1C4D8D 0%, #0F2854 100%)",
                      border: "1px solid rgba(28,77,141,0.6)",
                      boxShadow: "0 2px 16px rgba(28,77,141,0.35)",
                    }}
                  >
                    Get Started
                  </motion.button>
                </Link>
              </>
            )}
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={toggleMenu}
            aria-label="Toggle menu"
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg text-white/80 hover:text-white hover:bg-white/8 transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* ── Mobile overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              className="fixed top-0 right-0 z-50 h-full w-[300px] flex flex-col lg:hidden"
              style={{
                background: "linear-gradient(160deg, #0a1228 0%, #0F2854 100%)",
                borderLeft: "1px solid rgba(28,77,141,0.4)",
                boxShadow: "-20px 0 60px rgba(0,0,0,0.5)",
              }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Mobile header */}
              <div
                className="flex items-center justify-between px-5 h-[68px] shrink-0"
                style={{ borderBottom: "1px solid rgba(28,77,141,0.3)" }}
              >
                <Image src={NavLogo} alt="Insight AI" width={90} height={36} />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-white/8 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile links */}
              <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
                {MOBILE_LINKS.map(({ href, label }, i) => (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04 }}
                  >
                    <Link
                      href={href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/6 transition-all text-sm font-medium"
                      style={{ border: "1px solid transparent" }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(28,77,141,0.3)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.borderColor = "transparent";
                      }}
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Mobile auth */}
              <div
                className="px-5 py-6 shrink-0 space-y-3"
                style={{ borderTop: "1px solid rgba(28,77,141,0.3)" }}
              >
                {isAuthed ? (
                  <UserAvatar />
                ) : (
                  <>
                    <Link
                      href="/auth/sign-in"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center w-full py-2.5 rounded-xl text-sm font-medium text-white/70 hover:text-white transition-colors"
                      style={{ border: "1px solid rgba(28,77,141,0.35)" }}
                    >
                      Log In
                    </Link>
                    <Link href="/auth/sign-up" onClick={() => setMobileOpen(false)}>
                      <button
                        className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
                        style={{
                          background: "linear-gradient(135deg, #1C4D8D 0%, #0F2854 100%)",
                          border: "1px solid rgba(28,77,141,0.6)",
                          boxShadow: "0 4px 20px rgba(28,77,141,0.4)",
                        }}
                      >
                        Get Started Free
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
