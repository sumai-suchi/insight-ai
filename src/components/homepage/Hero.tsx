import React from 'react'

function Hero() {
  return (
    <div>
      {/* <h1>Hero</h1>
        <p>This is the hero section of the homepage</p>
        <div className='flex gap-5 justify-between cone'>
          <Button>Get Started</Button>
          <Button>Try Ai Editor</Button>
        </div> */}
      <section className="bg-[#F9FAFB] min-h-[80vh] flex items-center">
        <div className="container mx-auto px-6 py-16 flex flex-col md:flex-row items-center">
          {/* Left Content Column */}
          <div className="md:w-1/2 flex flex-col items-start text-left">
            <h1 className="text-[#1F2937] text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              Create AI-Powered Content & <br />
              <span className="text-[#3B82F6]">
                Discover Personalized News
              </span>{" "}
              In One Platform
            </h1>

            <p className="text-[#1F2937] text-lg md:text-xl mb-10 opacity-90 max-w-lg">
              Generate SEO-optimized blogs, check plagiarism, and stay updated
              with trending news—all powered by advanced AI.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <div>
                <button className="bg-[#3B82F6] hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg transition duration-300 ease-in-out shadow-lg">
                  Get Started
                </button>
              </div>

              <div>
                <button className="border-2 border-[#3B82F6] text-[#3B82F6] hover:bg-blue-50 font-bold py-4 px-8 rounded-lg transition duration-300 ease-in-out">
                  Try AI Editor
                </button>
              </div>
            </div>
          </div>

          {/* Right Illustration Column */}
          <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
            <div className="relative w-full max-w-md h-[400px]">
              {/* Replace with your actual SVG or Image path */}
              {/* <Image
                src="/"
                alt=""
                layout="fill"
                objectFit="contain"
                priority
              /> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero