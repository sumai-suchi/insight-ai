// "use client";
// import { useState } from "react";
// import Image from "next/image";

// export default function ContactPage() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const res = await fetch("/api/contact", {
//       method: "POST",
//       body: JSON.stringify(form),
//     });

//     const data = await res.json();
//     if (data.message) alert(data.message);

//     setForm({ name: "", email: "", message: "" });
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//       <div className="grid md:grid-cols-2 gap-8 bg-white shadow-xl rounded-2xl p-6 max-w-5xl w-full">
//         {/* LEFT SIDE - SVG */}
//         <div className="hidden md:flex items-center justify-center">
//           <Image
//             src="/images/contact.svg"
//             alt="Contact Illustration"
//             width={400}
//             height={400}
//             className="w-full h-auto"
//           />
//         </div>

//         {/* RIGHT SIDE - FORM */}
//         <div>
//           <h2 className="text-3xl font-bold mb-2 text-gray-800">
//             Contact Support
//           </h2>
//           <p className="text-gray-500 mb-6">
//             Have a problem? Send us a message 👇
//           </p>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               type="text"
//               placeholder="Your Name"
//               className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//               required
//             />

//             <input
//               type="email"
//               placeholder="Your Email"
//               className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={form.email}
//               onChange={(e) => setForm({ ...form, email: e.target.value })}
//               required
//             />

//             <textarea
//               placeholder="Your Message"
//               rows={4}
//               className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={form.message}
//               onChange={(e) => setForm({ ...form, message: e.target.value })}
//               required
//             />

//             <button className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-semibold">
//               Send Message 🚀
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.message) alert(data.message);
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Submission failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0B0F1A] overflow-hidden px-4 py-12">
      {/* Background Orbs for Premium Look */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 grid md:grid-cols-2 gap-0 bg-[#151B2C]/80 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl max-w-6xl w-full overflow-hidden"
      >
        {/* LEFT SIDE - DECORATIVE & INFO */}
        <div className="relative hidden md:flex flex-col justify-between p-12 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Let&apos;s build something <br /> great together.
            </h1>
            <p className="text-blue-100 text-lg max-w-xs">
              Have a specific inquiry or just want to say hi? Fill out the form
              and our team will get back to you within 24 hours.
            </p>
          </div>

          <div className="relative w-full aspect-square max-w-[320px] mx-auto">
            {/* You can keep your SVG here, but a floating 3D-style image adds more 'premium' feel */}
            <Image
              src="/images/contact.svg"
              alt="Contact Illustration"
              fill
              className="object-contain drop-shadow-2xl animate-pulse-slow"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 text-sm font-medium text-blue-100">
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                📍
              </span>
              Mymensingh, Bangladesh
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - FORM */}
        <div className="p-8 md:p-14">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-white mb-2">
              Send a Message
            </h2>
            <div className="h-1 w-12 bg-blue-500 rounded-full" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="group">
              <label className="block text-sm font-medium text-gray-400 mb-2 group-focus-within:text-blue-400 transition-colors">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full bg-[#1E2638] border border-white/5 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-gray-600"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            <div className="group">
              <label className="block text-sm font-medium text-gray-400 mb-2 group-focus-within:text-blue-400 transition-colors">
                Email Address
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full bg-[#1E2638] border border-white/5 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-gray-600"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div className="group">
              <label className="block text-sm font-medium text-gray-400 mb-2 group-focus-within:text-blue-400 transition-colors">
                Message
              </label>
              <textarea
                placeholder="Tell us about your project..."
                rows={4}
                className="w-full bg-[#1E2638] border border-white/5 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-gray-600 resize-none"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-900/20 transition-all mt-4 flex items-center justify-center gap-2"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
              {!isSubmitting && <span className="text-xl">🚀</span>}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
