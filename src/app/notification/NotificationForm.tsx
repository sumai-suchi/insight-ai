"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";

type User = {
  _id?: string;
  name: string;
  email: string;
  role?: "user" | "admin";
  status?: "active" | "blocked";
  discount?: number;
  image?: string;
};

const AddUserForm = () => {
  const [users, setUsers] = useState<User[]>([]);

  const createUser = async (newUser: User) => {
    try {
      const res = await fetch("/api/monitor/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (!res.ok) {
        const error = await res.json();
        console.error("Create user failed:", error);
        toast.error("Failed to create user");
        return;
      }

      const createdUser = await res.json();
      console.log("User created:", createdUser);
      setUsers((prev) => [...prev, createdUser]);
      toast.success("User created successfully!");
    } catch (err) {
      console.error("Error creating user:", err);
      toast.error("Error creating user");
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Add New User</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.currentTarget as HTMLFormElement;

          const nameInput = form.elements.namedItem("name") as HTMLInputElement;
          const emailInput = form.elements.namedItem("email") as HTMLInputElement;
          const roleInput = form.elements.namedItem("role") as HTMLSelectElement;
          const statusInput = form.elements.namedItem("status") as HTMLSelectElement;
          const discountInput = form.elements.namedItem("discount") as HTMLInputElement;

          createUser({
            name: nameInput.value,
            email: emailInput.value,
            role: roleInput.value as "user" | "admin",
            status: statusInput.value as "active" | "blocked",
            discount: Number(discountInput.value),
          });

          form.reset();
        }}
        className="flex flex-col gap-3"
      >
        <input
          name="name"
          placeholder="Name"
          required
          className="border p-2 rounded"
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          required
          className="border p-2 rounded"
        />
        <select
          name="role"
          className="border p-2 rounded"
          defaultValue="user"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <select
          name="status"
          className="border p-2 rounded"
          defaultValue="active"
        >
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
        <input
          name="discount"
          placeholder="Discount %"
          type="number"
          min={0}
          max={100}
          defaultValue={0}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add User
        </button>
      </form>

      {/* Optional: Display added users */}
      {users.length > 0 && (
        <ul className="mt-6 space-y-2">
          {users.map((user) => (
            <li key={user._id ?? user.email} className="border p-2 rounded">
              {user.name} ({user.email}) - Role: {user.role} - Status: {user.status} - Discount: {user.discount}%
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddUserForm;