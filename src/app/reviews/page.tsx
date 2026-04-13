"use client";

import { useSessionContext } from "@/lib/auth/session-context";
import { useState, useEffect } from "react";

interface ReviewFormData {
  name: string;
  email: string;
  image: string;
  rating: number;
  comment: string;
}

export default function ReviewForm() {
  const { user, isLoading } = useSessionContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState<ReviewFormData>({
    name: "",
    email: "",
    image: "",
    rating: 0,
    comment: "",
  });
  console.log("usre is", form);

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        image: user.image || "",
      }));
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.rating === 0) return alert("Please select a rating!");

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Something went wrong");

      alert("Review submitted successfully!");
      setForm((prev) => ({ ...prev, rating: 0, comment: "" }));
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading)
    return (
      <div className="text-center mt-20 animate-pulse text-gray-600">
        Loading form...
      </div>
    );
  if (!user)
    return (
      <div className="text-center mt-20 text-gray-600 font-medium">
        Please login to leave a review.
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4">
      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* Header Section */}
        <div className="bg-[#0F2854] p-8 text-white">
          <h2 className="text-3xl font-bold tracking-tight">Leave a Review</h2>
          <p className="text-blue-100 mt-2 opacity-90">
            Share your experience with our community.
          </p>
        </div>

        <div className="p-8">
          {/* User Info Card */}
          <div className="flex items-center gap-4 mb-8 p-4 bg-gray-50 rounded-xl border border-gray-100">
            {form.image ? (
              <img
                src={form.image}
                alt={form.name}
                className="w-14 h-14 rounded-full border-2 border-[#1C4D8D] object-cover"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-[#1C4D8D] flex items-center justify-center text-white font-bold">
                {form.name.charAt(0)}
              </div>
            )}
            <div>
              <p className="font-bold text-[#0F172A] text-lg leading-tight">
                {form.name}
              </p>
              <p className="text-sm text-gray-600">{form.email}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating Selector */}
            <div>
              <label className="block text-[#0F172A] font-semibold mb-3">
                How would you rate your experience?
              </label>
              <div className="flex items-center gap-3">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({ ...prev, rating: num }))
                    }
                    className={`w-12 h-12 rounded-lg font-bold transition-all duration-200 border-2 ${
                      form.rating >= num
                        ? "bg-[#1C4D8D] border-[#1C4D8D] text-white shadow-md scale-105"
                        : "bg-white border-gray-200 text-gray-400 hover:border-[#1C4D8D]"
                    }`}
                  >
                    {num}
                  </button>
                ))}
                <span className="ml-2 text-gray-600 text-sm font-medium">
                  {form.rating > 0 ? `${form.rating}/5 Stars` : "Select stars"}
                </span>
              </div>
            </div>

            {/* Comment Area */}
            <div>
              <label className="block text-[#0F172A] font-semibold mb-2">
                Your Feedback
              </label>
              <textarea
                name="comment"
                value={form.comment}
                onChange={handleChange}
                placeholder="Tell us what you liked or how we can improve..."
                className="w-full p-4 border border-gray-200 rounded-xl text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent transition-all min-h-[120px] resize-none"
                required
              />
            </div>

            {/* Action Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#0F2854] hover:bg-[#1C4D8D] text-white hover:-translate-y-1"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Post Review"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
