import Features from "@/components/homepage/Features";
import Hero from "@/components/homepage/Hero";
import HowItWorks from "@/components/homepage/HowItWorks";
import OutputPreview from "@/components/homepage/OutputPreview";
import AiDemoChat from "@/components/homepage/AiDemoChat";
import TrendingNews from "@/components/homepage/TrendingNews";
import Testimonials from "@/components/homepage/Testimonials";

export default function Home() {
  return (
    <>
      {/* <Navbar /> */}
      <main className="flex min-h-screen w-full  flex-col items-center justify-center  gap-10 bg-white dark:bg-black">
        <Hero />
        {/* <AiDemoChat /> */}
        <Features />
        <HowItWorks />
        <TrendingNews />
        {/* <OutputPreview /> */}
        <Testimonials />
      </main>
      {/* <Footer /> */}
    </>
  );
}
