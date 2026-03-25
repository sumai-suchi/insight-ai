"use client";

import { usePathname } from "next/navigation";

import Footer from "./Footer";
import Navbar from "./Navbar/Navbar";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");
  const isProjectDashboard = pathname?.startsWith("/Project-Dashboard");

  return (
    <>
      {!isProjectDashboard && !isDashboard && <Navbar />}

      {children}
      
      {!isProjectDashboard && !isDashboard && <Footer />}
    </>
  );
}
