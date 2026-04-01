"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Custom Colors:
// Deep Navy: #0F2854 | Royal: #1C4D8D | Sky: #4988C4 | Mist: #BDE8F5

const EditorApplyForm = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    resume: null,
    linkedin: '',
    github: '',
    portfolio: '',
  });

  // Mock initial data based on your provided info
  const userData = {
    _id: "69b3de68a10784145c465da9",
    name: "Sumaiya",
    email: "sumaiyamoina@gmail.com",
    image: "https://i.ibb.co.com/v6HcCMNN/dmxffni837f1xrj8pki9xgrl.jpg",
    plan: "free",
    articleCount: 0
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Add your axios/fetch logic here to update the MongoDB role
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#BDE8F5]/30 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#BDE8F5]"
      >
        {/* Header Section */}
        <div className="bg-[#0F2854] p-8 text-center relative">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="relative w-24 h-24 mx-auto mb-4 border-4 border-[#4988C4] rounded-full overflow-hidden"
          >
            <Image 
              src={userData.image} 
              alt={userData.name} 
              fill 
              className="object-cover"
            />
          </motion.div>
          <h1 className="text-2xl font-bold text-white">Apply for Editor Role</h1>
          <p className="text-[#BDE8F5] text-sm opacity-80">User ID: {userData._id}</p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Read-only Name */}
            <div>
              <label className="block text-sm font-semibold text-[#1C4D8D] mb-2">Full Name</label>
              <input 
                type="text" 
                value={userData.name} 
                disabled 
                className="w-full px-4 py-2 bg-[#f8fafc] border border-[#BDE8F5] rounded-lg text-gray-500 cursor-not-allowed"
              />
            </div>

            {/* Read-only Email */}
            <div>
              <label className="block text-sm font-semibold text-[#1C4D8D] mb-2">Email Address</label>
              <input 
                type="text" 
                value={userData.email} 
                disabled 
                className="w-full px-4 py-2 bg-[#f8fafc] border border-[#BDE8F5] rounded-lg text-gray-500 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Editable Bio Section */}
          <div>
            <label className="block text-sm font-semibold text-[#1C4D8D] mb-2">Update Professional Bio</label>
            <textarea 
              required
              placeholder="Tell the admin why you'd be a great editor..."
              rows={4}
              className="w-full px-4 py-2 border border-[#4988C4] rounded-lg focus:ring-2 focus:ring-[#4988C4] outline-none transition-all"
            />
          </div>

          {/* Stats Summary */}
          <div className="bg-[#BDE8F5]/20 p-4 rounded-xl flex justify-between items-center border border-[#BDE8F5]">
            <div className="text-center flex-1">
              <p className="text-xs text-[#1C4D8D] uppercase font-bold">Current Plan</p>
              <p className="text-lg font-semibold text-[#0F2854] capitalize">{userData.plan}</p>
            </div>
            <div className="w-[1px] h-10 bg-[#4988C4]/30"></div>
            <div className="text-center flex-1">
              <p className="text-xs text-[#1C4D8D] uppercase font-bold">Total Articles</p>
              <p className="text-lg font-semibold text-[#0F2854]">{userData.articleCount}</p>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className="w-full py-4 bg-[#1C4D8D] hover:bg-[#0F2854] text-white font-bold rounded-xl transition-colors shadow-lg shadow-[#1C4D8D]/30 flex justify-center items-center"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Submit Application"
            )}
          </motion.button>

          <p className="text-center text-xs text-[#4988C4]">
            Your application will be reviewed by an administrator.
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default EditorApplyForm;