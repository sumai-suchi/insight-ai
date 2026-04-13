"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";
import Navbar from "./Navbar/Navbar";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");
  const isProjectDashboard = pathname?.startsWith("/Project-Dashboard");
  const isHome = pathname === "/";

  return (
    <>
      {!isProjectDashboard && !isDashboard && <Navbar isHome={isHome} />}
      {children}
      {!isProjectDashboard && !isDashboard && <Footer />}
    </>
  );
}
