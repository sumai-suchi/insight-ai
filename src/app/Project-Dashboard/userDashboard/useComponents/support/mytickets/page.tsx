"use client";
import { useState } from "react";

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
      console.log("i am in try");
      const res = await fetch("/api/ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log("i am after fetch", data);

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
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Submit a Ticket</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          placeholder="Subject"
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Describe your issue"
          required
          rows={5}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="general">General</option>
          <option value="technical">Technical</option>
          <option value="billing">Billing</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Ticket"}
        </button>

        {success && (
          <p className="text-green-600 font-medium mt-2">{success}</p>
        )}
      </form>
    </div>
  );
}
