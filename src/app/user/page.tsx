"use client";

import { useEffect, useState } from "react";
import { Trash2, Ban, CheckCircle, Gift, Shield } from "lucide-react";
import { toast } from "react-toastify";


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
      const res = await fetch("/api/monitor/user");
      console.log("Fetch response:", res);
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      console.log("Users fetched:", data);
      setUsers(data); // <-- Update the state!
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchUsers();
}, []);

  if (loading) return <p>Loading users...</p>;

const deleteUser = async (userId: string) => {
   if (!userId) {
    console.error("No userId provided");
    return;
  }

  try {
    const res = await fetch(`/api/monitor/delete-user/${userId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const err = await res.json();
      console.error("Delete failed:", err);
      return;
    }
     setUsers((prev) => prev.filter((user) => user._id !== userId));
    const data = await res.json();
    console.log("Delete success:", data);
  } catch (error) {
    console.error("Fetch error:", error);
  }
};
  

const toggleBlockUser = async (userId: string) => {
  try {
    const res = await fetch(`/api/monitor/block-user/${userId}`, { method: "PATCH" });
    const data = await res.json();

    if (!res.ok) {
      console.error("Block failed:", data);
      return;
    }

    console.log(data.message);


    // Update UI state
    setUsers((prev) =>
      prev.map((user) =>
        user._id === userId ? { ...user, isBlocked: data.isBlocked } : user
      )
    );
    console.log(users)
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

 // Update role or discount
const updateUser = async (userId: string, role?: string, discount?: number) => {
  const res = await fetch(`/api/monitor/admin-user/${userId}`, {
    method: "PATCH",
    body: JSON.stringify({ role, discount }),
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  console.log("Update response:", data);
  if (res.ok)
    setUsers(prev =>
      prev.map(u =>
        u._id === userId ? { ...u, role: role ?? u.role, discount: discount ?? u.discount } : u
      )
    );
}

  const makeAdmin = (id: number) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, role: "admin" } : user
      )
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 to-purple-100 pt-20 px-4 sm:px-8 lg:px-16">
      <div className="w-full mx-auto bg-white shadow-2xl rounded-3xl p-10">
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

                <th className="p-3 rounded-l-xl">Name</th>
                <th className="p-3 ">Image</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Status</th>
                <th className="p-3">Discount</th>
                <th className="p-3 rounded-r-xl text-center">Actions</th>

              </tr>
            </thead>

            <tbody>
              {users?.map((user) => (
                <tr
                   key={user._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-4 font-medium">{user.name}</td>
                  <td className="p-4">
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="p-4 text-gray-600">{user.email}</td>
                  <td className="p-4 capitalize">{user.role}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        user.isBlocked === false
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {user.isBlocked === false ? "Active" : "Blocked"}
                    </span>
                  </td>
                  <td className="p-4">{user.discount}%</td>

                  {/* Actions */}
                  <td className="p-4 flex flex-wrap gap-3 justify-center">
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                    >
                      <Trash2 size={18} />
                    </button>

                    <button
                      onClick={() => toggleBlockUser(user._id)}
                      className="p-2 bg-yellow-100 text-yellow-600 rounded-lg hover:bg-yellow-200 transition"
                    >
                      {user.isBlocked === true ? (
                           <CheckCircle size={18} />
                      ) : (
                     
                        <Ban size={18} />
                      )}
                    </button>

                    <button
                      onClick={() => updateUser(user._id, user.role, 20)}
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