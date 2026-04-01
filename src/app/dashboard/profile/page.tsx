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
  const [imgSrc, setImgSrc] = useState<string>("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [language, setLanguage] = useState("English (US)");
  const [nationality, setNationality] = useState("Bangladeshi");
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showNationalityDropdown, setShowNationalityDropdown] = useState(false);
  const [authorRequestSent, setAuthorRequestSent] = useState(false);

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

  // Your requested elegant card style
  const cardStyle = {
    background:
      "linear-gradient(135deg, rgba(15,40,84,0.95) 0%, rgba(28,77,141,0.85) 100%)",
    border: "1px solid rgba(28,77,141,0.5)",
    boxShadow:
      "0 8px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
    borderRadius: "24px",
  };

  const inputStyle =
    "w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/30 transition-all duration-300 backdrop-blur-md";

  const getFixedImageUrl = (imageUrl: string | null, userName: string) => {
    if (imageUrl) {
      return imageUrl.replace("=s96-c", "=s400-c").replace("=s96", "=s400");
    }
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(userName || "User")}&background=1E3A8A&color=fff&size=200`;
  };

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
      setImgSrc(getFixedImageUrl(u.image || null, u.name || "User"));
      setLoading(false);
    };
    fetchSession();
  }, [router]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setImgSrc(previewUrl);

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
        setImgSrc(getFixedImageUrl(data.imageUrl, user?.name || "User"));
      }
    } catch (err) {
      console.error("Image upload failed", err);
    } finally {
      setImageUploading(false);
    }
  };

  const handleSave = async () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }
    setSaving(true);
    await authClient.updateUser({ name, image: user?.image });

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
    refreshSession();
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
      <div className="min-h-screen bg-[#0A1428] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const fallbackSrc = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=1E3A8A&color=fff&size=200`;
  const joinedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <div className="min-h-screen bg-[#0A1428] py-12 px-4 md:px-6 text-white">
      <div className="max-w-6xl mx-auto">
        {/* Top Profile Header */}
        <div
          className="mb-8 p-8 relative overflow-hidden"
          style={{
            ...cardStyle,
            background:
              "linear-gradient(135deg, rgba(15,40,84,0.98) 0%, rgba(28,77,141,0.9) 100%)",
          }}
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative group">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />
              <div className="w-32 h-32 rounded-3xl p-1.5 bg-gradient-to-br from-blue-400 to-cyan-400">
                <img
                  src={imgSrc || fallbackSrc}
                  alt="Profile"
                  className="w-full h-full rounded-3xl object-cover border-4 border-[#0A1428]"
                  onError={() => setImgSrc(fallbackSrc)}
                />
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={imageUploading}
                className="absolute -bottom-1 -right-1 bg-[#0A1428] p-3 rounded-2xl border border-white/20 hover:border-blue-400 transition-all"
              >
                {imageUploading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Camera size={20} className="text-white" />
                )}
              </button>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <h1 className="text-4xl font-semibold tracking-tight">
                  {user.name || "No Name"}
                </h1>
                <span className="px-4 py-1 text-xs font-medium bg-white/10 border border-white/20 rounded-full">
                  {(user as any).role || "User"}
                </span>
              </div>
              <p className="text-blue-200 mt-2 flex items-center justify-center md:justify-start gap-2 text-lg">
                <Mail size={18} /> {user.email}
              </p>
              {joinedDate && (
                <p className="text-blue-300/70 mt-1">
                  Member since {joinedDate}
                </p>
              )}
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-3 px-10 py-4 bg-white text-[#1C4D8D] font-semibold rounded-2xl hover:bg-blue-100 active:scale-95 transition-all shadow-lg"
            >
              <Edit3 size={20} />
              {saving
                ? "Saving..."
                : isEditing
                  ? "Save Changes"
                  : "Edit Profile"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Information */}
            <div style={cardStyle} className="p-8">
              <h2 className="text-2xl font-semibold mb-8 flex items-center gap-3">
                <User size={26} className="text-blue-300" /> Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-blue-200 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={isEditing ? name : user.name || ""}
                    onChange={(e) => setName(e.target.value)}
                    disabled={!isEditing}
                    className={inputStyle}
                  />
                </div>
                <div>
                  <label className="block text-sm text-blue-200 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className={`${inputStyle} opacity-70 cursor-not-allowed`}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-blue-200 mb-2">
                    Bio
                  </label>
                  <textarea
                    rows={4}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    disabled={!isEditing}
                    placeholder="Tell us about yourself..."
                    className={`${inputStyle} resize-y min-h-[110px]`}
                  />
                </div>
              </div>
            </div>

            {/* Security */}
            <div style={cardStyle} className="p-8">
              <h2 className="text-2xl font-semibold mb-8 flex items-center gap-3">
                <Lock size={26} className="text-rose-300" /> Security & Password
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="password"
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className={inputStyle}
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={inputStyle}
                />
              </div>
              {passwordMsg && (
                <p
                  className={`mt-5 text-sm ${passwordMsg.includes("success") ? "text-green-400" : "text-rose-400"}`}
                >
                  {passwordMsg}
                </p>
              )}
              <button
                onClick={handlePasswordUpdate}
                className="mt-6 text-blue-300 hover:text-white font-medium transition"
              >
                Update Password →
              </button>
            </div>

            {/* Posts & Saved */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div style={cardStyle} className="p-8">
                <h3 className="flex items-center gap-3 text-xl font-medium mb-6">
                  <FileText size={24} className="text-orange-300" /> My Posts
                </h3>
                <div className="text-center py-14 border border-white/10 rounded-2xl bg-white/5">
                  <p className="text-blue-200/70">No articles published yet.</p>
                </div>
              </div>

              <div style={cardStyle} className="p-8">
                <h3 className="flex items-center gap-3 text-xl font-medium mb-6">
                  <Bookmark size={24} className="text-emerald-300" /> Saved News
                </h3>
                <div className="text-center py-14 border border-white/10 rounded-2xl bg-white/5">
                  <p className="text-blue-200/70">No saved items found.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Preferences */}
            <div style={cardStyle} className="p-8">
              <h2 className="text-2xl font-semibold mb-8">Preferences</h2>
              <div className="space-y-6">
                {/* Language Dropdown */}
                <div className="relative">
                  <label className="block text-sm text-blue-200 mb-2">
                    Language
                  </label>
                  <div
                    onClick={() => {
                      setShowLanguageDropdown(!showLanguageDropdown);
                      setShowNationalityDropdown(false);
                    }}
                    className="flex items-center justify-between bg-white/10 border border-white/20 rounded-2xl px-5 py-4 cursor-pointer hover:bg-white/15 transition"
                  >
                    <span>{language}</span>
                    <ChevronDown
                      className={`transition-transform ${showLanguageDropdown ? "rotate-180" : ""}`}
                    />
                  </div>
                  {showLanguageDropdown && (
                    <div className="absolute z-20 w-full mt-2 bg-[#1C4D8D] border border-white/20 rounded-2xl overflow-hidden shadow-2xl">
                      {languages.map((lang) => (
                        <div
                          key={lang}
                          onClick={() => {
                            setLanguage(lang);
                            setShowLanguageDropdown(false);
                          }}
                          className={`px-5 py-3.5 hover:bg-white/10 cursor-pointer transition ${language === lang ? "bg-white/15" : ""}`}
                        >
                          {lang}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Nationality Dropdown */}
                <div className="relative">
                  <label className="block text-sm text-blue-200 mb-2">
                    Nationality
                  </label>
                  <div
                    onClick={() => {
                      setShowNationalityDropdown(!showNationalityDropdown);
                      setShowLanguageDropdown(false);
                    }}
                    className="flex items-center justify-between bg-white/10 border border-white/20 rounded-2xl px-5 py-4 cursor-pointer hover:bg-white/15 transition"
                  >
                    <span>{nationality}</span>
                    <ChevronDown
                      className={`transition-transform ${showNationalityDropdown ? "rotate-180" : ""}`}
                    />
                  </div>
                  {showNationalityDropdown && (
                    <div className="absolute z-20 w-full mt-2 bg-[#1C4D8D] border border-white/20 rounded-2xl overflow-hidden shadow-2xl max-h-60 overflow-y-auto">
                      {nationalities.map((nat) => (
                        <div
                          key={nat}
                          onClick={() => {
                            setNationality(nat);
                            setShowNationalityDropdown(false);
                          }}
                          className={`px-5 py-3.5 hover:bg-white/10 cursor-pointer transition ${nationality === nat ? "bg-white/15" : ""}`}
                        >
                          {nat}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-white/10">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-3 py-4 text-red-300 font-medium bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-2xl transition"
                >
                  <LogOut size={20} /> Logout
                </button>
              </div>
            </div>

            {/* Writer Program */}
            {((user as any).role === "user" || !(user as any).role) && (
              <div
                className="p-8 rounded-3xl relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(15,40,84,0.9) 0%, rgba(28,77,141,0.8) 100%)",
                  border: "1px solid rgba(59, 130, 246, 0.4)",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
                }}
              >
                <h3 className="text-2xl font-semibold mb-4">Writer Program</h3>
                <p className="text-blue-200/80 mb-8 leading-relaxed">
                  Apply to become an author and start publishing your own
                  content.
                </p>
                {authorRequestSent ? (
                  <div className="py-4 text-center bg-green-500/20 text-green-300 rounded-2xl border border-green-500/30 font-medium">
                    Request Sent Successfully
                  </div>
                ) : (
                  <button
                    onClick={() => setAuthorRequestSent(true)}
                    className="w-full py-4 bg-white text-[#1C4D8D] font-semibold rounded-2xl hover:bg-blue-100 transition active:scale-95"
                  >
                    Apply for Access
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
