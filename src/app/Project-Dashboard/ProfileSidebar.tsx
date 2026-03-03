"use client";
import { motion } from "framer-motion";
import { User, Bell, Settings, Crown } from "lucide-react";

export const ProfileSidebar = () => (
  <div className="bg-white p-8 rounded-[24px] shadow-sm border border-slate-100 w-full max-w-95">
    {/* Header */}
    <div className="flex items-center gap-2 text-[#2D31A6] mb-8">
      <User className="w-6 h-6" />
      <h2 className="text-xl font-bold">Profile & Settings</h2>
    </div>

    {/* User Profile */}
    <div className="flex flex-col items-center mb-8">
      <div className="w-24 h-24 bg-[#6366F1] rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-lg shadow-indigo-100">
        JD
      </div>
      <h3 className="text-xl font-bold text-slate-800">John Doe</h3>
      <p className="text-slate-400 text-sm">john@example.com</p>
    </div>

    {/* Pro Plan Card */}
    <div className="bg-[#FFFBEB] border-2 border-[#FCD34D] rounded-2xl p-5 mb-8 relative overflow-hidden group">
      <div className="flex items-center gap-2 text-[#B45309] font-bold text-sm mb-1">
        <Crown className="w-4 h-4" />
        Pro Plan
      </div>
      <p className="text-[#D97706] text-xs mb-4">Unlimited content generation</p>
      <button className="w-full bg-[#D97706] hover:bg-[#B45309] text-white py-3 rounded-xl font-bold text-sm transition-all shadow-md shadow-amber-100">
        Manage Subscription
      </button>
    </div>

    {/* Monthly Usage */}
    <div className="space-y-6">
      <div>
        <div className="flex justify-between items-center text-sm font-bold mb-3">
          <span className="text-slate-600">Monthly Usage</span>
          <span className="text-slate-800">78%</span>
        </div>
        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "78%" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-[#A855F7] h-full rounded-full shadow-[0_0_8px_rgba(168,85,247,0.4)]"
          />
        </div>
      </div>

      {/* Quick Links */}
      <div className="space-y-4 pt-4 border-t border-slate-50">
        <button className="flex items-center justify-between w-full group">
          <div className="flex items-center gap-3 text-slate-700 font-bold text-sm">
            <Bell className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transition" />
            Notifications
          </div>
          <span className="text-[#A855F7] text-xs font-bold uppercase">On</span>
        </button>
        
        <button className="flex items-center gap-3 text-slate-700 font-bold text-sm group">
          <Settings className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transition" />
          Settings
        </button>
      </div>
    </div>
  </div>
);