// "use client";

// import Image from "next/image";

// export default function EduArticles() {
//   const articles = [
//     {
//       title: "AI is Transforming Modern Education",
//       desc: "Artificial Intelligence is reshaping how students learn with personalized content.",
//       img: "https://images.unsplash.com/photo-1581090700227-4c4a2b75d9c9",
//     },
//     {
//       title: "Top 10 Tech Trends in 2026",
//       desc: "Explore the latest innovations shaping the future of technology worldwide.",
//       img: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f",
//     },
//     {
//       title: "Health Tips for Students",
//       desc: "Simple daily habits that improve focus and mental health.",
//       img: "https://images.unsplash.com/photo-1556228720-195a672e8a03",
//     },
//     {
//       title: "Global Politics Update",
//       desc: "A quick overview of recent global political developments.",
//       img: "https://images.unsplash.com/photo-1529101091764-c3526daf38fe",
//     },
//     {
//       title: "Entertainment Buzz",
//       desc: "Latest movies, music, and celebrity news you should not miss.",
//       img: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc",
//     },
//   ];

//   return (
//     <section className="bg-white text-black py-16 px-4">
//       <div className="max-w-6xl mx-auto">
//         {/* Newspaper Title */}
//         <h1 className="text-4xl font-bold text-center border-b-4 border-black pb-4 mb-10 tracking-wide">
//           InsightAI Daily
//         </h1>

//         {/* Grid Layout */}
//         <div className="grid md:grid-cols-3 gap-6">
//           {/* Main Big Article */}
//           <div className="md:col-span-2 border-r pr-4">
//             <Image
//               src={articles[0].img}
//               alt="article"
//               width={800}
//               height={400}
//               className="w-full h-64 object-cover mb-4"
//             />
//             <h2 className="text-2xl font-bold mb-2">{articles[0].title}</h2>
//             <p className="text-gray-700">{articles[0].desc}</p>
//           </div>

//           {/* Side Articles */}
//           <div className="space-y-6">
//             {articles.slice(1).map((item, i) => (
//               <div key={i} className="border-b pb-4">
//                 <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
//                 <p className="text-sm text-gray-600">{item.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Bottom Articles */}
//         <div className="grid md:grid-cols-2 gap-6 mt-10 border-t pt-6">
//           {articles.slice(1, 3).map((item, i) => (
//             <div key={i}>
//               <Image
//                 src={item.img}
//                 alt="article"
//                 width={400}
//                 height={200}
//                 className="w-full h-40 object-cover mb-3"
//               />
//               <h3 className="font-semibold text-lg">{item.title}</h3>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function EduArticles() {
  const articles = [
    {
      title: "AI is Transforming Modern Education",
      category: "Technology",
      date: "March 28, 2026",
      desc: "Artificial Intelligence is reshaping how students learn with personalized content and adaptive learning algorithms that cater to individual needs.",
      img: "https://images.unsplash.com/photo-1581090700227-4c4a2b75d9c9",
    },
    {
      title: "Top 10 Tech Trends in 2026",
      category: "Innovation",
      date: "March 27, 2026",
      desc: "Explore the latest innovations shaping the future of technology worldwide, from quantum computing to sustainable energy solutions.",
      img: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f",
    },
    {
      title: "Health Tips for Students",
      category: "Lifestyle",
      date: "March 26, 2026",
      desc: "Simple daily habits that improve focus, mental clarity, and overall well-being during intense study sessions.",
      img: "https://images.unsplash.com/photo-1556228720-195a672e8a03",
    },
    {
      title: "Global Politics Update",
      category: "World",
      date: "March 25, 2026",
      desc: "A quick overview of recent global political developments and their impact on international trade.",
      img: "https://images.unsplash.com/photo-1529101091764-c3526daf38fe",
    },
    {
      title: "Entertainment Buzz",
      category: "Culture",
      date: "March 25, 2026",
      desc: "Latest movies, music, and celebrity news you should not miss this weekend.",
      img: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc",
    },
    {
      title: "The Future of Remote Work",
      category: "Business",
      date: "March 24, 2026",
      desc: "How companies are adapting to a hybrid workforce in the post-digital era.",
      img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    },
  ];

  return (
    <section className="bg-[#f9f9f9] text-black py-16 px-6 font-serif">
      <div className="max-w-7xl mx-auto">
        {/* Newspaper Header */}
        <div className="text-center mb-12 border-b-2 border-black pb-6">
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-2">
            InsightAI Daily
          </h1>
          <div className="flex justify-between items-center text-sm font-sans font-bold uppercase tracking-widest border-t border-black pt-2">
            <span>Vol. 12 • No. 45</span>
            <span className="hidden md:block underline decoration-2 offset-4">
              The Future of Information
            </span>
            <span>{new Date().toDateString()}</span>
          </div>
        </div>

        {/* Main Section */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Column: Side Articles (1 Col) */}
          <div className="lg:col-span-1 space-y-8 border-r-0 lg:border-r border-gray-300 pr-0 lg:pr-6">
            {articles.slice(3, 6).map((item, i) => (
              <motion.div
                whileHover={{ x: 5 }}
                key={i}
                className="group cursor-pointer border-b border-gray-200 pb-6 last:border-0"
              >
                <span className="text-xs font-sans font-bold text-blue-600 uppercase">
                  {item.category}
                </span>
                <h3 className="font-bold text-xl leading-tight group-hover:text-gray-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 mt-2 font-sans line-clamp-2">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Center Column: Featured Article (2 Cols) */}
          <div className="lg:col-span-2 border-r-0 lg:border-r border-gray-300 pr-0 lg:pr-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="cursor-pointer group"
            >
              <div className="overflow-hidden mb-4 bg-gray-200">
                <Image
                  src={articles[4].img}
                  alt="main article"
                  width={800}
                  height={500}
                  className="w-full h-[400px] object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
                />
              </div>
              <span className="inline-block bg-black text-white text-xs px-2 py-1 mb-3 font-sans uppercase tracking-widest">
                Featured Story
              </span>
              <h2 className="text-3xl md:text-5xl font-bold leading-none mb-4 italic">
                {articles[0].title}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3">
                {articles[0].desc}
              </p>
            </motion.div>
          </div>

          {/* Right Column: Mini Cards (1 Col) */}
          <div className="lg:col-span-1 space-y-6">
            <h4 className="text-xl font-bold border-b-4 border-black inline-block mb-4 italic">
              Trending Now
            </h4>
            {articles.slice(1, 3).map((item, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative h-32 w-full mb-2 overflow-hidden">
                  <Image
                    src={item.img}
                    alt="side"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-bold text-lg leading-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-400 mt-1 font-sans uppercase">
                  {item.date}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Horizontal Grid */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12 border-t-4 border-black pt-8">
          {articles.map((item, i) => (
            <div
              key={i}
              className="flex flex-col gap-3 group cursor-pointer border-r border-gray-200 last:border-0 pr-4"
            >
              <div className="h-40 relative">
                <Image
                  src={item.img}
                  alt="thumb"
                  fill
                  className="object-cover grayscale group-hover:grayscale-0"
                />
              </div>
              <p className="text-[10px] font-sans font-black text-red-600 uppercase tracking-widest">
                {item.category}
              </p>
              <h3 className="font-bold text-md leading-tight group-hover:underline underline-offset-2">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
