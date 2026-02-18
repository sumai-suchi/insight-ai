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
<<<<<<< HEAD
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
     <h1>Hello next.js</h1>
     <p>This is developer Siddique khan</p>
     <h1>Hi there! this is my first Next.js project</h1>
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-around py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <h1 className="text-3xl font-bold">Welcome to Insight AI</h1>
        <h2>this is hasan branch</h2>
        <h3>test perpose</h3>
        <h3>sumaiya here</h3>
=======
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
>>>>>>> 586598fdb98530136661731f8138900f10d4abd3
      </main>
    </>
  );
}
