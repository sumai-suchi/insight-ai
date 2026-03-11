"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Globe,
  BookOpen,
  Video,
  Code2,
  Users,
  ChevronDown,
  Send,
  ArrowRight,
} from "lucide-react";

const faqs = [
  {
    q: "How quickly will I receive a response?",
    a: "Our support team typically responds to all inquiries within 24 hours during business days. For urgent matters, use our live chat for instant assistance.",
  },
  {
    q: "What information should I include in my message?",
    a: "Please provide as much detail as possible about your question or issue. Include your account email, relevant screenshots, and steps to reproduce any problems.",
  },
  {
    q: "Do you offer phone support?",
    a: "Yes! Phone support is available Monday through Friday, 9am-6pm PST. Premium and Enterprise customers have access to priority phone support.",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    /* PAGE WRAPPER */
    <div className="min-h-screen bg-[#F9FAFB] text-black overflow-x-hidden">
      <div className="bg-linear-to-r from-purple-900 to-indigo-900 text-white pb-10 pt-40 px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-violet-300 mb-6 tracking-widest uppercase">
            We're Here to Help
          </span>
          <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight mb-5 tracking-tight">
            Get in{" "}
            <span className="bg-linear-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          <p className="text-white text-lg max-w-xl mx-auto font-light">
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* CONTACT CARDS SECTION */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
          >
            {/* EMAIL CARD */}
            <div>
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-white border border-violet-500/20 rounded-2xl p-5 cursor-pointer"
              >
                <div className="text-violet-400 mb-3">
                  <Mail size={50} />
                </div>
                <p className="text-black font-semibold text-lg">Email Us</p>
                <p className="text-gray-600 text-base mt-1 mb-3">
                  Responds within 24 hours
                </p>
                <p className="text-base font-medium text-purple-600">
                  support@insightai.com
                </p>
              </motion.div>
            </div>

            {/* PHONE CARD */}
            <div>
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-white border border-violet-500/20 rounded-2xl p-5 cursor-pointer"
              >
                <div className="text-violet-400 mb-3">
                  <Phone size={50} />
                </div>
                <p className="text-black font-semibold text-lg">Call Us</p>
                <p className="text-gray-600 text-base mt-1 mb-3">
                  Mon-Fri, 9am–6pm PST
                </p>
                <p className="text-base font-medium text-purple-600">
                  +1 (555) 123-4567
                </p>
              </motion.div>
            </div>

            {/* LIVE CHAT CARD */}
            <div>
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-white border border-violet-500/20 rounded-2xl p-5 cursor-pointer"
              >
                <div className="text-fuchsia-400 mb-3">
                  <MessageCircle size={50} />
                </div>
                <p className="text-black font-semibold text-lg">Live Chat</p>
                <p className="text-gray-600 text-base mt-1 mb-3">
                  Available 24/7
                </p>
                <p className="text-base font-medium text-purple-600">
                  Start Chat →
                </p>
              </motion.div>
            </div>

            {/* VISIT CARD */}
            <div>
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-white border border-violet-500/20 rounded-2xl p-5 cursor-pointer"
              >
                <div className="text-violet-400 mb-3">
                  <MapPin size={50} />
                </div>
                <p className="text-black font-semibold text-lg">Visit Us</p>
                <p className="text-gray-600 text-base mt-1 mb-3">
                  Come say hello
                </p>
                <p className="text-base font-medium text-purple-600">
                  123 AI Street, San Francisco
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* FORM + SIDEBAR */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
          {/* FORM SECTION */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white border border-gray-200 rounded-3xl p-8 shadow-2xl"
            >
              <h2 className="flex items-center gap-3 text-2xl font-semibold mb-5 tracking-tight text-gray-900">
                <span className="bg-[#8987ff] text-white p-2 rounded-xl flex items-center justify-center">
                  <Send size={28} strokeWidth={1.75} />
                </span>
                Send us a Message
              </h2>

              <p className="text-gray-500 text-sm mb-8">
                We'll get back to you within 24 hours.
              </p>

              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-600 text-sm"
                  >
                    Message sent! We'll respond within 24 hours.
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider mb-4 block">
                      Your Name *
                    </label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      placeholder="Enter Your Name"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#8987ff] transition"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider mb-4 block">
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      placeholder="Enter Your Email"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#8987ff] transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wider mb-4 block">
                    Subject *
                  </label>
                  <input
                    required
                    value={form.subject}
                    onChange={(e) =>
                      setForm({ ...form, subject: e.target.value })
                    }
                    placeholder="How can we help?"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#8987ff] transition"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wider mb-4 block">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={10}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    placeholder="Tell us more about your question or issue..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#8987ff] transition resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full cursor-pointer py-2.5 rounded-xl bg-linear-to-r from-purple-600 to-indigo-600 text-white font-semibold text-base flex items-center justify-center gap-2 hover:opacity-90 transition"
                >
                  <Send size={30} /> Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* SIDEBAR SECTION */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="space-y-5"
            >
              {/* OFFICE HOURS CARD */}
              <div className="bg-linear-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
                <div className="flex items-center gap-2 mb-5">
                  <Clock size={50} className="text-violet-400" />
                  <h3 className="text-black font-semibold text-lg">
                    Office Hours
                  </h3>
                </div>
                {[
                  { day: "Monday - Friday", hours: "9am - 6pm" },
                  { day: "Saturday", hours: "10am - 4pm" },
                  { day: "Sunday", hours: "Closed" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center py-2.5 border-b border-white/5 last:border-0"
                  >
                    <span className="text-gray-600 text-sm">{item.day}</span>
                    <span
                      className={`text-sm font-medium ${item.hours === "Closed" ? "text-red-400" : "text-gray-700 text-semibold"}`}
                    >
                      {item.hours}
                    </span>
                  </div>
                ))}
                <p className="text-gray-600 text-base mt-4">
                  All times in Pacific Standard Time (PST)
                </p>
              </div>

              {/* GLOBAL PRESENCE CARD */}
              <div className="bg-purple-50 border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-5">
                  <Globe size={30} className="text-purple-600" />
                  <h3 className="font-semibold text-lg tracking-tight text-gray-900">
                    Global Presence
                  </h3>
                </div>

                {[
                  { city: "San Francisco HQ", addr: "123 AI Street, CA 94105" },
                  { city: "New York Office", addr: "456 Tech Ave, NY 10001" },
                  {
                    city: "London Office",
                    addr: "789 Innovation Rd, EC1A 1BB",
                  },
                ].map((loc, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 py-2.5 border-b border-gray-100 last:border-0"
                  >
                    <MapPin
                      size={20}
                      className="text-gray-400 mt-0.5 shrink-0"
                    />

                    <div>
                      <p className="text-gray-900 text-sm font-medium">
                        {loc.city}
                      </p>
                      <p className="text-gray-500 text-xs">{loc.addr}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* QUICK LINKS CARD */}
              <div className="bg-linear-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
                <h3 className="font-semibold text-sm mb-4 tracking-tight text-gray-900">
                  Quick Links
                </h3>

                <div className="space-y-2">
                  {[
                    { icon: <BookOpen size={14} />, label: "Knowledge Base" },
                    { icon: <Video size={14} />, label: "Video Tutorials" },
                    { icon: <Code2 size={14} />, label: "API Documentation" },
                    { icon: <Users size={14} />, label: "Community Forum" },
                  ].map((link, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 hover:text-gray-900 text-sm transition"
                    >
                      {link.icon}
                      {link.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* FAQ SECTION */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-16"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-2 tracking-tight text-gray-900">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-500 text-base">
                Quick answers to common questions
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-3">
              {/* FAQ ITEM 1 */}
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === 0 ? null : 0)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="text-base font-medium text-purple-600">
                    {faqs[0].q}
                  </span>

                  <motion.div
                    animate={{ rotate: openFaq === 0 ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown
                      size={16}
                      className="text-gray-400 shrink-0 ml-4"
                    />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openFaq === 0 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="px-6 pb-5 text-sm text-gray-600 leading-relaxed">
                        {faqs[0].a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* FAQ ITEM 2 */}
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="text-base font-medium text-purple-600">
                    {faqs[1].q}
                  </span>

                  <motion.div
                    animate={{ rotate: openFaq === 1 ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown
                      size={16}
                      className="text-gray-400 shrink-0 ml-4"
                    />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openFaq === 1 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="px-6 pb-5 text-sm text-gray-600 leading-relaxed">
                        {faqs[1].a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* FAQ ITEM 3 */}
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="text-base font-medium text-purple-600">
                    {faqs[2].q}
                  </span>

                  <motion.div
                    animate={{ rotate: openFaq === 2 ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown
                      size={16}
                      className="text-gray-400 shrink-0 ml-4"
                    />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openFaq === 2 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="px-6 pb-5 text-sm text-gray-600 leading-relaxed">
                        {faqs[2].a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA BANNER SECTION */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="relative overflow-hidden rounded-3xl bg-linear-to-r from-purple-600 via-indigo-600 to-purple-600 p-12 text-white text-center shadow-sm border border-gray-200"
          >
            <h2 className="text-2xl font-bold mb-3 tracking-tight text-white">
              Need Immediate Assistance?
            </h2>

            <p className="text-white text-lg max-w-xl mx-auto mb-8">
              Our live chat support is available 24/7 to help you with any
              urgent questions or issues.
            </p>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mx-auto cursor-pointer flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-purple-600 font-semibold text-base transition"
            >
              <Send size={30} /> Start Live Chat
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
