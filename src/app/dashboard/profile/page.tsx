"use client";

import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Camera,
  Lock,
  FileText,
  Bookmark,
  LogOut,
  ChevronDown,
  Edit3,
} from "lucide-react";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/Context/AuthContext";

const ProfileManagement = () => {
  const router = useRouter();
  const { refreshSession } = useAuth();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [saving, setSaving] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [language, setLanguage] = useState("English (US)");
  const [nationality, setNationality] = useState("Bangladeshi");
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [authorRequestSent, setAuthorRequestSent] = useState(false);
  const [showNationalityDropdown, setShowNationalityDropdown] = useState(false);

  const languages = [
    "English (US)",
    "English (UK)",
    "Bengali (বাংলা)",
    "Hindi",
    "Arabic",
    "French",
    "Spanish",
    "German",
    "Chinese (Simplified)",
    "Japanese",
  ];

  const nationalities = [
    "Bangladeshi",
    "Indian",
    "Pakistani",
    "American",
    "British",
    "Canadian",
    "Australian",
    "Saudi Arabian",
    "Emirati",
    "French",
    "German",
    "Japanese",
    "Chinese",
  ];

  const cardStyle = "bg-white rounded-2xl shadow-sm border border-gray-100 p-6";

  useEffect(() => {
    const fetchSession = async () => {
      const session = await authClient.getSession();
      if (!session?.data?.user) {
        router.push("/auth/sign-in");
        return;
      }
      const u = session.data.user;
      setUser(u);
      setName(u.name || "");
      setBio((u as any).bio || "");
      setLoading(false);
    };
    fetchSession();
  }, []);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setUser((prev: any) => ({ ...prev, image: previewUrl }));

    setImageUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("/api/profile/upload-image", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.imageUrl) {
        await authClient.updateUser({ image: data.imageUrl });
        setUser((prev: any) => ({ ...prev, image: data.imageUrl }));
      }
    } catch (err) {
      console.error("Image upload failed", err);
    } finally {
      setImageUploading(false);
    }
  };

  // saves both name and bio
  const handleSave = async () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }
    setSaving(true);
    await authClient.updateUser({ name, image: user?.image });

    // Save bio via API
    try {
      await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bio }),
      });
    } catch (err) {
      console.error("Bio save failed", err);
    }

    setUser((prev: any) => ({ ...prev, name, bio }));
    setSaving(false);
    setIsEditing(false);
  };

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/auth/sign-in");
  };

  const handlePasswordUpdate = async () => {
    if (!currentPassword || !newPassword) {
      setPasswordMsg("Please fill both fields.");
      return;
    }
    try {
      await authClient.changePassword({
        currentPassword,
        newPassword,
        revokeOtherSessions: true,
      });
      setPasswordMsg("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      setPasswordMsg("Failed to update password. Check your current password.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FB] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const joinedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <div className="min-h-screen bg-[#F8F9FB] py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* TOP SECTION */}
        <div
          className={`${cardStyle} mb-6 flex flex-col md:flex-row justify-between items-center gap-6`}
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative group">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />
              <img
                src={
                  user.image ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || "User")}&background=6366f1&color=fff`
                }
                alt="Profile"
                className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={imageUploading}
                className="absolute cursor-pointer bottom-1 right-1 bg-white p-2 rounded-full shadow-md border border-gray-100 hover:text-blue-600 transition disabled:opacity-50"
              >
                {imageUploading ? (
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Camera size={18} />
                )}
              </button>
            </div>
            <div className="text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <h1 className="text-2xl font-bold text-gray-900">
                  {user.name || "No Name"}
                </h1>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full uppercase">
                  {(user as any).role || "user"}
                </span>
              </div>
              <p className="text-gray-500 mt-1 flex items-center justify-center md:justify-start gap-1">
                <Mail size={14} /> {user.email}
              </p>
              {joinedDate && (
                <p className="text-sm text-gray-600 mt-1 italic">
                  Joined {joinedDate}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex cursor-pointer items-center gap-2 px-6 py-2.5 bg-[#6366F1] text-white rounded-xl font-semibold hover:bg-[#4F46E5] transition shadow-md disabled:opacity-60"
          >
            <Edit3 size={18} />
            {saving ? "Saving..." : isEditing ? "Save Profile" : "Edit Profile"}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div className={cardStyle}>
              <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                <User className="text-blue-500" /> Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={isEditing ? name : user.name || ""}
                    onChange={(e) => setName(e.target.value)}
                    disabled={!isEditing}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition disabled:opacity-70"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full p-3 bg-gray-100 border border-gray-200 rounded-xl cursor-not-allowed text-gray-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Bio
                  </label>
                  <textarea
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    disabled={!isEditing}
                    placeholder="Tell us about yourself..."
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition disabled:opacity-70"
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div className={cardStyle}>
              <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Lock className="text-red-500" /> Security & Password
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="password"
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-400 outline-none"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-400 outline-none"
                />
              </div>
              {passwordMsg && (
                <p
                  className={`mt-3 text-sm font-medium ${passwordMsg.includes("success") ? "text-green-600" : "text-red-500"}`}
                >
                  {passwordMsg}
                </p>
              )}
              <button
                onClick={handlePasswordUpdate}
                className="mt-4 cursor-pointer text-sm font-bold text-red-600 hover:underline"
              >
                Update Password
              </button>
            </div>

            {/* Posts & Saved */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={cardStyle}>
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FileText size={18} className="text-orange-500" /> My Posts
                </h3>
                <div className="text-center py-6 border-2 border-dashed border-gray-100 rounded-xl">
                  <p className="text-gray-400 text-sm">
                    You haven't posted any articles yet.
                  </p>
                </div>
              </div>
              <div className={cardStyle}>
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Bookmark size={18} className="text-green-500" /> Saved News
                </h3>
                <div className="text-center py-6 border-2 border-dashed border-gray-100 rounded-xl">
                  <p className="text-gray-400 text-sm">No saved blogs found.</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Account Options */}
          <div className="space-y-6">
            <div className={cardStyle}>
              <h2 className="text-lg font-bold text-gray-800 mb-6">
                Account Options
              </h2>
              <div className="space-y-4">
                {/* Language */}
                <div className="relative">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Language
                  </label>
                  <div
                    onClick={() => {
                      setShowLanguageDropdown(!showLanguageDropdown);
                      setShowNationalityDropdown(false);
                    }}
                    className="mt-1 flex items-center justify-between p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition"
                  >
                    <span className="font-medium text-gray-700">
                      {language}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${showLanguageDropdown ? "rotate-180" : ""}`}
                    />
                  </div>
                  {showLanguageDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                      {languages.map((lang) => (
                        <div
                          key={lang}
                          onClick={() => {
                            setLanguage(lang);
                            setShowLanguageDropdown(false);
                          }}
                          className={`px-4 py-2.5 cursor-pointer text-sm hover:bg-indigo-50 hover:text-indigo-700 transition ${language === lang ? "bg-indigo-50 text-indigo-700 font-semibold" : "text-gray-700"}`}
                        >
                          {lang}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Nationality */}
                <div className="relative">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Nationality
                  </label>
                  <div
                    onClick={() => {
                      setShowNationalityDropdown(!showNationalityDropdown);
                      setShowLanguageDropdown(false);
                    }}
                    className="mt-1 flex items-center justify-between p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition"
                  >
                    <span className="font-medium text-gray-700">
                      {nationality}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${showNationalityDropdown ? "rotate-180" : ""}`}
                    />
                  </div>
                  {showNationalityDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden max-h-48 overflow-y-auto">
                      {nationalities.map((nat) => (
                        <div
                          key={nat}
                          onClick={() => {
                            setNationality(nat);
                            setShowNationalityDropdown(false);
                          }}
                          className={`px-4 py-2.5 cursor-pointer text-sm hover:bg-indigo-50 hover:text-indigo-700 transition ${nationality === nat ? "bg-indigo-50 text-indigo-700 font-semibold" : "text-gray-700"}`}
                        >
                          {nat}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <hr className="my-6 border-gray-100" />

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center cursor-pointer gap-2 py-3 text-red-600 font-bold bg-red-50 hover:bg-red-100 rounded-xl transition"
              >
                <LogOut size={18} /> Logout Account
              </button>
            </div>

            {((user as any).role === "user" || !(user as any).role) && (
              <div className="bg-linear-to-br from-blue-600 to-purple-700 rounded-2xl p-6 text-white shadow-lg">
                <h3 className="font-bold text-lg mb-2">Want to write?</h3>
                <p className="text-sm opacity-90 mb-4">
                  Apply for an Author role to start publishing your own AI news
                  and blogs.
                </p>
                {authorRequestSent ? (
                  <div className="w-full py-3 bg-green-100 text-green-700 font-bold rounded-lg flex items-center justify-center gap-2 text-sm">
                    ✅ Request Submitted!
                  </div>
                ) : (
                  <button
                    onClick={() => setAuthorRequestSent(true)}
                    className="w-full cursor-pointer py-2 bg-white text-blue-700 font-bold rounded-lg hover:bg-opacity-90 transition"
                  >
                    Request Author Access
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;