import Footer from "@/components/Footer";
import Features from "@/components/homepage/Features";
import Hero from "@/components/homepage/Hero";
import HowItWorks from "@/components/homepage/HowItWorks";
import OutputPreview from "@/components/homepage/OutputPreview";
import Testimonials from "@/components/homepage/Testimonials";
import TrendingNews from "@/components/homepage/TrendingNews";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen w-full flex-col items-center justify-center bg-white dark:bg-black sm:items-start">
        <Hero />
        <Features />
        <HowItWorks />
        {/* <TrendingNews /> */}
        <Testimonials />
        <OutputPreview></OutputPreview>
      </main>
      <Footer />
    </>

  );
}
