
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative bg-[#F9FAFB] min-h-[85vh] flex items-center overflow-hidden">
      {/* Optional: Subtle background decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50" />

      <div className="container mx-auto px-6 py-16 flex flex-col md:flex-row items-center relative z-10">
        {/* Left Content Column */}
        <div className="md:w-1/2 flex flex-col items-start text-left">
          <h1 className="text-[#1F2937] text-4xl md:text-6xl font-extrabold leading-[1.1] mb-6 tracking-tight">
            Create AI-Powered Content & <br />
            <span className="text-[#3B82F6] inline-block mt-2">
              Discover Personalized News
            </span>{" "}
            <span className="block md:inline">In One Platform</span>
          </h1>

          <p className="text-gray-600 text-lg md:text-xl mb-10 max-w-lg leading-relaxed">
            Generate SEO-optimized blogs, check plagiarism, and stay updated
            with trending news—all powered by advanced AI.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/sign-up" className="w-full sm:w-auto">
              <button className="w-full bg-[#3B82F6] hover:bg-blue-700 active:scale-95 text-white font-bold py-4 px-10 rounded-xl transition-all duration-200 shadow-lg shadow-blue-200">
                Get Started
              </button>
            </Link>

            <Link href="/editor" className="w-full sm:w-auto">
              <button className="w-full border-2 border-gray-200 text-[#1F2937] hover:border-[#3B82F6] hover:text-[#3B82F6] active:scale-95 font-bold py-4 px-10 rounded-xl transition-all duration-200 bg-white">
                Try AI Editor
              </button>
            </Link>
          </div>
        </div>

        {/* Right Illustration Column */}
        <div className="md:w-1/2 mt-16 md:mt-0 flex justify-center relative w-full h-[350px] md:h-[500px]">
          <div className="relative w-full h-full drop-shadow-2xl">
            <Image
              src="/Hero.jpg"
              alt="AI Content Platform Interface Preview"
              fill
              className="object-contain"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
