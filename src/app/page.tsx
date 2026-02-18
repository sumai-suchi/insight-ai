import Footer from "@/components/Footer";
import Features from "@/components/homepage/Features";
import Hero from "@/components/homepage/Hero";
import HowItWorks from "@/components/homepage/HowItWorks";
import Testimonials from "@/components/homepage/Testimonials";
import TrendingNews from "@/components/homepage/TrendingNews";
import Navbar from "@/components/navbar";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {" "}
      <Navbar />
      <main className="flex min-h-screen w-full max-w-7xl flex-col items-center justify-center mx-auto gap-10 py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Hero />
        <Features />
        <HowItWorks />
        <TrendingNews />
        <Testimonials />
        <Footer />
      </main>
    </>
  );
}
