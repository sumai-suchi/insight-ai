"use client";
import React, { useEffect, useState } from "react";
import { Trash2, ShieldAlert, Mail, Calendar } from "lucide-react";

interface IContact {
  _id: string;
  name: string;
  email: string;
  message: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const UserContacts = () => {
  const [contacts, setContacts] = useState<IContact[]>([]);

  useEffect(() => {
    fetch("/api/contact")
      .then((res) => res.json())
      .then((data) => {
        if (data.contacts) {
          setContacts(data.contacts);
        }
      })
      .catch((err) => console.error("Error fetching contacts:", err));
  }, []);

  return (
    <div className="w-full p-6 bg-[#f3e8ff] min-h-screen">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Contact Management</h1>
        <p className="text-gray-500 text-sm font-medium">
          Manage and monitor all user inquiries
        </p>
      </div>

      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            {/* Table Header */}
            <thead>
              <tr className="bg-purple-700 text-bleck">
                <th className="px-6 py-4 font-semibold text-sm">User Name</th>
                <th className="px-6 py-4 font-semibold text-sm">
                  Email Address
                </th>
                <th className="px-6 py-4 font-semibold text-sm">
                  Message Inquiry
                </th>
                <th className="px-6 py-4 font-semibold text-sm">
                  Submitted At
                </th>
                <th className="px-6 py-4 font-semibold text-sm">Status</th>
                <th className="px-6 py-4 font-semibold text-sm text-center">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-100">
              {contacts.length > 0 ? (
                contacts.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {/* Name */}
                    <td className="px-6 py-4 text-sm font-bold text-gray-800 capitalize">
                      {item.name}
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="text-gray-400" />
                        {item.email}
                      </div>
                    </td>

                    {/* Message */}
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-[200px]">
                      <p className="truncate" title={item.message}>
                        {item.message}
                      </p>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-gray-400" />
                        {new Date(item.createdAt).toLocaleDateString("en-GB")}
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-md text-xs font-bold uppercase
                        ${item.status === "new" ? "bg-blue-100 text-blue-600" : "bg-green-100 text-green-600"}`}
                      >
                        {item.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          title="Delete"
                          className="p-2 text-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition-all active:scale-95"
                        >
                          <Trash2 size={16} />
                        </button>
                        <button
                          title="Report/Flag"
                          className="p-2 text-yellow-600 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-all active:scale-95"
                        >
                          <ShieldAlert size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-16 text-gray-400">
                    <div className="flex flex-col items-center gap-2">
                      <p className="text-lg font-medium">
                        No contact messages found
                      </p>
                      <p className="text-sm">
                        New messages from users will appear here.
                      </p>
                    </div>
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

export default UserContacts;
