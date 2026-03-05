"use client";

import { useEffect, useState } from "react";
import { Trash2, Ban, CheckCircle, Gift, Shield } from "lucide-react";

type User = {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin";
  status: "active" | "blocked";
  discount: number;
};

export default function UserManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/admin/users");
        const data = await res.json();
        console.log("Fetched users:", data);
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;

  const deleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const toggleBlockUser = (id: number) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? { ...user, status: user.status === "active" ? "blocked" : "active" }
          : user
      )
    );
  };

  const giveDiscount = (id: number) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, discount: 20 } : user
      )
    );
  };

  const makeAdmin = (id: number) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, role: "admin" } : user
      )
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 to-purple-100 pt-20 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-3xl p-10">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-800">
            👩‍💼 User Management Dashboard
          </h1>
          <p className="text-gray-500 mt-2">
            Manage users, control access, and apply discounts.
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-purple-600 text-white text-left">
                <th className="p-4 rounded-l-xl">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Status</th>
                <th className="p-4">Discount</th>
                <th className="p-4 rounded-r-xl text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                   key={user._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-4 font-medium">{user.name}</td>
                  <td className="p-4 text-gray-600">{user.email}</td>
                  <td className="p-4 capitalize">{user.role}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        user.status === "active"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4">{user.discount}%</td>

                  {/* Actions */}
                  <td className="p-4 flex flex-wrap gap-3 justify-center">
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                    >
                      <Trash2 size={18} />
                    </button>

                    <button
                      onClick={() => toggleBlockUser(user.id)}
                      className="p-2 bg-yellow-100 text-yellow-600 rounded-lg hover:bg-yellow-200 transition"
                    >
                      {user.status === "active" ? (
                        <Ban size={18} />
                      ) : (
                        <CheckCircle size={18} />
                      )}
                    </button>

                    <button
                      onClick={() => giveDiscount(user.id)}
                      className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                    >
                      <Gift size={18} />
                    </button>

                    <button
                      onClick={() => makeAdmin(user.id)}
                      className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition"
                    >
                      <Shield size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}