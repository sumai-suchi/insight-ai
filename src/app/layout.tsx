import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "swiper/css";
import "swiper/css/pagination";

import { SessionProvider } from "@/lib/auth/session-context";
import ConditionalLayout from "@/components/ConditionalLayout";
import { AuthProvider } from "@/Context/AuthContext";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Insight AI",
  description: "AI Content Writing & News Platform for your business",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
  className={`${geistSans.variable} ${geistMono.variable} antialiased`}
>
  <SessionProvider>
    <AuthProvider>
      <ConditionalLayout>{children}</ConditionalLayout>
    </AuthProvider>
    <ToastContainer />
  </SessionProvider>
</body>
    </html>
  );
}
