import Features from "@/components/homepage/Features";
import Hero from "@/components/homepage/Hero";
import HowItWorks from "@/components/homepage/HowItWorks";
<<<<<<< HEAD
import OutputPreview from "@/components/homepage/OutputPreview";
import AiDemoChat from "@/components/homepage/AiDemoChat";
=======
>>>>>>> a56ed66d779f646390a604e106be8e704d2e0431
import TrendingNews from "@/components/homepage/TrendingNews";
import Testimonials from "@/components/homepage/Testimonials";

export default function Home() {
  return (
    <>
      {/* <Navbar /> */}
<<<<<<< HEAD
      <main className="flex min-h-screen w-full  flex-col items-center justify-center  gap-10 bg-white dark:bg-black">
        <Hero />
        {/* <AiDemoChat /> */}
        <Features />
        <HowItWorks />
        <TrendingNews />
        {/* <OutputPreview /> */}
=======
      <main className="flex min-h-screen w-full  flex-col items-center justify-center mt-15 gap-10 bg-white dark:bg-black">
        <Hero />
        <Features />
        <HowItWorks />
        <TrendingNews />
>>>>>>> a56ed66d779f646390a604e106be8e704d2e0431
        <Testimonials />
      </main>
      {/* <Footer /> */}
    </>
  );
}
