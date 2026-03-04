"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import Footer from "./Footer";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");
  const isProjectDashboard = pathname?.startsWith("/Project-dashboard");

  return (
    <>
      {/* Navbar handles its own visibility check */}
      {!isProjectDashboard && <Navbar />}
      {/* Add padding-top for fixed navbar when not in dashboard */}
      {children}
      {/* Hide footer in dashboard */}
      {!isProjectDashboard && !isDashboard && <Footer />}
    </>
  );
}
