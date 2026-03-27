"use client";
import { useState } from "react";
import Image from "next/image";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (data.message) alert(data.message);

    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="grid md:grid-cols-2 gap-8 bg-white shadow-xl rounded-2xl p-6 max-w-5xl w-full">
        {/* LEFT SIDE - SVG */}
        <div className="hidden md:flex items-center justify-center">
          <Image
            src="/images/contact.svg"
            alt="Contact Illustration"
            width={400}
            height={400}
            className="w-full h-auto"
          />
        </div>

        {/* RIGHT SIDE - FORM */}
        <div>
          <h2 className="text-3xl font-bold mb-2 text-gray-800">
            Contact Support
          </h2>
          <p className="text-gray-500 mb-6">
            Have a problem? Send us a message 👇
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />

            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
            />

            <button className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-semibold">
              Send Message 🚀
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
