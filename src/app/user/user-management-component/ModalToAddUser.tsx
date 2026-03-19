"use client";



import { useState } from "react";
import { toast } from "react-toastify";

type UserForm = {
  name: string;
  email: string;
  image: string;
  bio: string;
  role: string;
  status: string;
  discount: number;
  plan: string;
  article: number;
  emailVerified: boolean;
  isBlocked: boolean;
};

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
   addUserToTable: (user: any) => void;

};

export default function AddUserModal({ isOpen, setIsOpen ,addUserToTable}: Props) {
  const [user, setUser] = useState<UserForm>({
    name: "",
    email: "",
    image: "",
    bio: "",
    role: "user",
    status: "active",
    discount: 0,
    plan: "free",
    article: 0,
    emailVerified: false,
    isBlocked: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting user:", user);

    const newUser = {
      ...user,
      createdAt: new Date(),
      updatedAt: new Date(),
      joinedAt: new Date(),
    };
       
    const res = await fetch("/api/monitor/create-user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });
   
  console.log("API response:", res);
   if (res.status === 409) {
  toast.error("Email already exists!");
  return;
}

    if(res.ok) {
       toast.success("User added successfully!");
       
        const savedUser = await res.json();    
   // Update parent state instantly
    setIsOpen(false);
     addUserToTable(savedUser);       // Close modal
  } else {
    console.error("Failed to add user");
   toast.error("Failed to add user. Please try again.");
  }

    console.log(res);

    setIsOpen(false);
  };
 

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
      {/* Modal Card */}
      <div className="bg-white rounded-2xl rounded-t-4xl shadow-2xl w-full max-w-2xl p-8 animate-slideUp">
        <h3 className="text-2xl font-bold mb-6 text-purple-700">✨ Add New User</h3>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="input border p-2 w-full border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="input border p-2 w-full border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="image"
            placeholder="Profile Image URL"
            className="input border p-2 col-span-2 border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
            onChange={handleChange}
          />

          <textarea
            name="bio"
            placeholder="Bio"
            className="textarea border p-2 col-span-2 border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
            onChange={handleChange}
          />

          <select
            name="role"
            className="select border p-2 border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
            onChange={handleChange}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
          </select>

          <select
            name="plan"
            className="select border p-2 border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
            onChange={handleChange}
          >
            <option value="free">Free</option>
            <option value="pro">Pro</option>
            <option value="premium">Premium</option>
          </select>

          <select
            name="status"
            className="select border p-2 border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
            onChange={handleChange}
          >
            <option value="active">Active</option>
            <option value="inactive">Suspended</option>
            <option value="inactive">pending</option>
          </select>

          <input
            type="number"
            name="discount"
            placeholder="Discount %"
            className="input border border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
            onChange={handleChange}
          />

          <input
            type="number"
            name="article"
            placeholder="Articles"
            className="input border border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
            onChange={handleChange}
          />

          <label className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              name="emailVerified"
              className="checkbox checkbox-primary"
              onChange={handleChange}
            />
            Email Verified
          </label>

          <label className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              name="isBlocked"
              className="checkbox checkbox-error"
              onChange={handleChange}
            />
            Block User
          </label>

          {/* Buttons */}
          <div className="col-span-2 flex justify-end gap-4 mt-6">
            <button
              type="button"
              className="btn btn-outline btn-md"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-primary p-2 roun btn-md bg-purple-600 text-white hover:bg-purple-700 transition-all"
             
            >
              Add User
            </button>
          </div>
        </form>
      </div>

      {/* Tailwind Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out forwards;
        }

        @keyframes slideUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slideUp {
          animation: slideUp 0.35s ease-out forwards;
        }
      `}</style>
    </div>
  );
}