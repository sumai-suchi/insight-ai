import Features from "@/components/homepage/Features";
import HowItWorks from "@/components/homepage/HowItWorks";
import NewsData from "@/components/homepage/NewsData";
import Testimonials from "@/components/homepage/Testimonials";
import HeroSection from "@/components/hero/HeroSection";
import FAQSection from "@/components/homepage/FAQSection";
import NewsletterSection from "@/components/homepage/NewsletterSection";
import PlatformSlider from "@/components/homepage/PlatformSlider";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col" style={{ background: "linear-gradient(135deg, #020c1f 0%, #0F2854 45%, #0a1628 100%)" }}>
      <HeroSection />
      <Features />
      <PlatformSlider />
      <HowItWorks />
      <NewsData />
      <Testimonials />
      <FAQSection />
      <NewsletterSection />
    </main>
  );
}
