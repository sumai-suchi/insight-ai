"use client";

import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { X, User, Mail, Upload, FileText, Shield, Zap, Loader2, CheckCircle2 } from "lucide-react";
import { useuploadToCloudinary } from "@/app/Project-dashboard/hooks/useuploadToCloudinary"; // Adjust path as necessary

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

export default function AddUserModal({ isOpen, setIsOpen, addUserToTable }: Props) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
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
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await useuploadToCloudinary(file);
      setUser((prev) => ({ ...prev, image: url }));
      toast.success("Profile image synced with Cloudinary!");
    } catch (error: any) {
      toast.error(error.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (uploading) return toast.info("Please wait for image upload to finish.");

    const res = await fetch("/api/monitor/create-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...user, createdAt: new Date() }),
    });

    if (res.status === 409) return toast.error("Email already exists!");

    if (res.ok) {
      toast.success("User initialized successfully!");
      const savedUser = await res.json();
      setIsOpen(false);
      addUserToTable(savedUser);
    } else {
      toast.error("Failed to sync user data.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#050a18]/80 backdrop-blur-md" onClick={() => setIsOpen(false)} />

      <div className="relative w-full max-w-2xl bg-[#0d1425] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Glow Decor */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-600/10 blur-[80px] rounded-full" />
        
        <div className="relative p-8 pb-0 flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-black tracking-tight text-white uppercase italic">
              Initialize <span className="text-blue-500">New Admin</span>
            </h3>
            <p className="text-gray-400 text-sm mt-1">Direct system-level account provisioning.</p>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/5 rounded-xl text-gray-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="relative p-8 grid grid-cols-2 gap-5">
          
          {/* Custom Cloudinary Upload Section */}
          <div className="col-span-2">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              className="hidden" 
              accept="image/*" 
            />
            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`group relative flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-6 transition-all cursor-pointer 
                ${user.image ? 'border-green-500/40 bg-green-500/5' : 'border-white/10 bg-white/[0.02] hover:border-blue-500/50 hover:bg-blue-500/5'}`}
            >
              {uploading ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="animate-spin text-blue-500" size={32} />
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Uploading...</span>
                </div>
              ) : user.image ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="relative">
                    <img src={user.image} alt="Preview" className="w-16 h-16 rounded-xl object-cover ring-2 ring-green-500/50" />
                    <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1"><CheckCircle2 size={12} className="text-white"/></div>
                  </div>
                  <span className="text-[10px] font-bold text-green-400 uppercase">Change Image</span>
                </div>
              ) : (
                <>
                  <Upload className="text-gray-500 group-hover:text-blue-500 transition-colors mb-2" size={24} />
                  <p className="text-sm font-bold text-gray-400 group-hover:text-white transition-colors">Upload Avatar to Cloudinary</p>
                  <p className="text-[10px] text-gray-600 uppercase mt-1">PNG, JPG up to 5MB</p>
                </>
              )}
            </div>
          </div>

          <div className="relative group col-span-2 md:col-span-1">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={16} />
            <input
              type="text"
              name="name"
              placeholder="Display Name"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
              onChange={handleChange}
              required
            />
          </div>

          <div className="relative group col-span-2 md:col-span-1">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={16} />
            <input
              type="email"
              name="email"
              placeholder="System Email"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
              onChange={handleChange}
              required
            />
          </div>

          <div className="relative group col-span-2">
            <FileText className="absolute left-4 top-4 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={16} />
            <textarea
              name="bio"
              placeholder="Bio / System Notes"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all min-h-[90px]"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-500 ml-1">Access Level</label>
            <select name="role" className="bg-white/5 border border-white/10 rounded-xl p-3.5 text-white focus:outline-none appearance-none" onChange={handleChange}>
              <option className="bg-[#0d1425]" value="user">User</option>
              <option className="bg-[#0d1425]" value="admin">admin</option>
              <option className="bg-[#0d1425]" value="editor">editor</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-500 ml-1">Plan</label>
            <select name="plan" className="bg-white/5 border border-white/10 rounded-xl p-3.5 text-white focus:outline-none appearance-none" onChange={handleChange}>
              <option className="bg-[#0d1425]" value="free">Free</option>
              <option className="bg-[#0d1425]" value="pro">Pro</option>
            </select>
          </div>

          {/* Toggles */}
          <div className="col-span-2 flex flex-wrap gap-8 py-3 border-y border-white/5 my-2">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" name="emailVerified" className="hidden peer" onChange={handleChange} />
              <div className="w-5 h-5 rounded-md border border-white/20 flex items-center justify-center peer-checked:bg-blue-600 transition-all">
                <Shield size={12} className="text-white" />
              </div>
              <span className="text-xs font-bold text-gray-400 group-hover:text-white transition-colors uppercase tracking-widest">Verify</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" name="isBlocked" className="hidden peer" onChange={handleChange} />
              <div className="w-5 h-5 rounded-md border border-white/20 flex items-center justify-center peer-checked:bg-red-600 transition-all">
                <Zap size={12} className="text-white" />
              </div>
              <span className="text-xs font-bold text-gray-400 group-hover:text-white transition-colors uppercase tracking-widest">Restrict</span>
            </label>
          </div>

          <div className="col-span-2 flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-6 py-3 text-gray-500 hover:text-white font-bold transition-colors"
            >
              Discard
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {uploading ? "Uploading Assets..." : "Complete Setup"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}