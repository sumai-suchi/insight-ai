"use client";
import { useState } from "react";
import Image from "next/image";

interface TicketFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  category: "general" | "technical" | "billing";
}

export default function TicketForm() {
  const [form, setForm] = useState<TicketFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: "general",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      const res = await fetch("/api/ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccess("Ticket submitted successfully!");
        setForm({
          name: "",
          email: "",
          subject: "",
          message: "",
          category: "general",
        });
      } else {
        alert(data.error || "Error submitting ticket.");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting ticket123.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="grid md:grid-cols-2 gap-10 bg-white rounded-2xl shadow-xl p-6 max-w-5xl w-full">
        {/* 🔥 LEFT SIDE SVG */}
        <div className="hidden md:flex items-center justify-center">
          <Image
            src="/images/contact.svg" // path ঠিক রাখবে
            alt="Ticket Illustration"
            width={400}
            height={400}
            className="w-full h-auto"
          />
        </div>

        {/* 🔥 RIGHT SIDE FORM */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Submit a Ticket
          </h2>
          <p className="text-gray-500 mb-6">
            Describe your issue and our team will help you 👇
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="Subject"
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Describe your issue"
              required
              rows={4}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="general">General</option>
              <option value="technical">Technical</option>
              <option value="billing">Billing</option>
            </select>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-semibold disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Ticket 🚀"}
            </button>

            {success && (
              <p className="text-green-600 font-medium mt-2">{success}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
