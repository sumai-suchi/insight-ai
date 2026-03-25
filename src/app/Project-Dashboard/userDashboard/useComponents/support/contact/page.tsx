"use client";
import { useState } from "react";

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
    if (data.message) {
      alert(data.message);
    }
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Contact Support</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full border p-2"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Your Email"
          className="w-full border p-2"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <textarea
          placeholder="Your Message"
          className="w-full border p-2"
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />

        <button className="bg-blue-500 text-white px-4 py-2">
          Send Message
        </button>
      </form>
    </div>
  );
}
