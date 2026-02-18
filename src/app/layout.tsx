import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { getSession } from "@/lib/auth/auth"; // server-side helper

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SynapseNews",
  description: "AI Content Writing & News Platform",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sessionResult = await getSession();
  const initialUser = sessionResult?.user ?? null;

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar initialUser={initialUser} />
        {children}
      </body>
    </html>
  );
}
