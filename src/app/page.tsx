import Footer from "@/components/Footer";
import Features from "@/components/homepage/Features";
import Hero from "@/components/homepage/Hero";
import HowItWorks from "@/components/homepage/HowItWorks";
import Testimonials from "@/components/homepage/Testimonials";
import TrendingNews from "@/components/homepage/TrendingNews";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 py-32  bg-white dark:bg-black sm:items-start">
      <Hero />
      <Features />
      <HowItWorks />
      <TrendingNews />
      <Testimonials />
      <Footer />
    </main>
  );
}
