"use client";
import React, { useEffect, useState } from "react";
import { Trash2, ShieldAlert, Gift, UserCog } from "lucide-react";

interface ITickets {
  name: string;
  email: string;
  subject: string;
  message: string;
  category: "billing" | "technical" | "general";
  createdAt: string; // API থেকে সাধারণত string আসে, তাই string রাখা ভালো
  status?: string; // ডাটাতে স্ট্যাটাস থাকলে এটি দেখাবে
}

const UserTickets = () => {
  const [tickets, setTickets] = useState<ITickets[]>([]);

  useEffect(() => {
    fetch("/api/ticket")
      .then((res) => res.json())
      .then((data) => {
        // নিশ্চিত করুন যে API থেকে data.tickets এ অ্যারে আসছে
        if (data.tickets) {
          setTickets(data.tickets);
        }
      })
      .catch((err) => console.error("Error fetching tickets:", err));
  }, []);

  return (
    <div className="w-full p-6 bg-[#f3e8ff] min-h-screen">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            {/* Table Header - এটি বডির বাইরে থাকবে */}
            <thead>
              <tr className="bg-purple-600 text-white">
                <th className="px-6 py-4 font-semibold text-sm">Name</th>
                <th className="px-6 py-4 font-semibold text-sm">Email</th>
                <th className="px-6 py-4 font-semibold text-sm">Subject</th>
                <th className="px-6 py-4 font-semibold text-sm">Category</th>
                <th className="px-6 py-4 font-semibold text-sm">Message</th>
                <th className="px-6 py-4 font-semibold text-sm">Last joined</th>
                <th className="px-6 py-4 font-semibold text-sm">Status</th>
                <th className="px-6 py-4 font-semibold text-sm text-center">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-100">
              {tickets.length > 0 ? (
                tickets.map((ticket, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-bold text-gray-800">
                      {ticket.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {ticket.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {ticket.subject}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium capitalize 
                        ${
                          ticket.category === "billing"
                            ? "bg-blue-100 text-blue-600"
                            : ticket.category === "technical"
                              ? "bg-orange-100 text-orange-600"
                              : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {ticket.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-[150px]">
                      {ticket.message}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-green-100 text-green-600 px-3 py-1 rounded-md text-xs font-bold">
                        {ticket.status || "Active"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-1.5 text-red-500 bg-red-50 rounded-md hover:bg-red-100 transition-colors">
                          <Trash2 size={16} />
                        </button>
                        <button className="p-1.5 text-yellow-600 bg-yellow-50 rounded-md hover:bg-yellow-100 transition-colors">
                          <ShieldAlert size={16} />
                        </button>
                        <button className="p-1.5 text-blue-500 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
                          <Gift size={16} />
                        </button>
                        <button className="p-1.5 text-purple-600 bg-purple-50 rounded-md hover:bg-purple-100 transition-colors">
                          <UserCog size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-10 text-gray-400">
                    No tickets found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserTickets;
