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

  return (
    <>
      {/* Navbar handles its own visibility check */}
      <Navbar />
      {/* Add padding-top for fixed navbar when not in dashboard */}
      <div className={!isDashboard ? "pt-16" : ""}>{children}</div>
      {/* Hide footer in dashboard */}
      {!isDashboard && <Footer />}
    </>
  );
}

