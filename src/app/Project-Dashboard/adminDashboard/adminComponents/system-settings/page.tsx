"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Cpu,
  Palette,
  Save,
  Globe,
  Lock,
  Zap,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface SystemSettingsData {
  siteName: string;
  supportEmail: string;
  isMaintenanceMode: boolean;
  defaultAIModel: string;
  aiApiKey: string;
  allow2FA: boolean;
  allowSocialLogin: boolean;
  allowRegistration: boolean;
}

export default function SystemSettings() {
  const [activeTab, setActiveTab] = useState("general");
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const [settings, setSettings] = useState<SystemSettingsData>({
    siteName: "InSight-AI",
    supportEmail: "",
    isMaintenanceMode: false,
    defaultAIModel: "Gemini 1.5 Pro",
    aiApiKey: "",
    allow2FA: false,
    allowSocialLogin: true,
    allowRegistration: true,
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/admin/settings");
        const data = await res.json();
        if (data) setSettings(data);
      } catch (err) {
        showStatus("error", "Failed to load settings.");
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const showStatus = (type: "success" | "error", message: string) => {
    setStatus({ type, message });
    setTimeout(() => setStatus({ type: null, message: "" }), 4000);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) showStatus("success", "Changes saved successfully!");
      else throw new Error();
    } catch (error) {
      showStatus("error", "Error saving changes.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0A1228]">
        <RefreshCw className="animate-spin text-cyan-400" size={32} />
      </div>
    );
  }

  return (
    <div className="bg-[#0A1228] min-h-screen relative overflow-x-hidden pb-24 text-white">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 -right-24 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Status Notification */}
      <AnimatePresence>
        {status.type && (
          <motion.div
            initial={{ y: -50, opacity: 0, x: "-50%" }}
            animate={{ y: 0, opacity: 1, x: "-50%" }}
            exit={{ y: -50, opacity: 0, x: "-50%" }}
            className={`fixed top-10 left-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl ${
              status.type === "success"
                ? "bg-emerald-500/90 border border-emerald-400"
                : "bg-red-500/90 border border-red-400"
            } backdrop-blur-md`}
          >
            {status.type === "success" ? (
              <CheckCircle2 size={20} />
            ) : (
              <AlertCircle size={20} />
            )}
            <span className="font-bold text-sm tracking-wide">
              {status.message}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 py-10 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center lg:text-left"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase mb-4 bg-blue-900/30 border border-blue-500/30 text-blue-300">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Core Engine Control
          </span>
          <h1 className="text-3xl font-black uppercase">
            System{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Settings
            </span>
          </h1>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10 relative z-10">
          {/* Sidebar */}
          <div className="w-full lg:w-72 space-y-3">
            <TabButton
              active={activeTab === "general"}
              onClick={() => setActiveTab("general")}
              icon={<Globe size={20} />}
              label="General Config"
              accent="#3b82f6"
            />
            <TabButton
              active={activeTab === "ai"}
              onClick={() => setActiveTab("ai")}
              icon={<Cpu size={20} />}
              label="AI Model Engine"
              accent="#06b6d4"
            />
            <TabButton
              active={activeTab === "security"}
              onClick={() => setActiveTab("security")}
              icon={<ShieldCheck size={20} />}
              label="Security & Auth"
              accent="#10b981"
            />
            <TabButton
              active={activeTab === "appearance"}
              onClick={() => setActiveTab("appearance")}
              icon={<Palette size={20} />}
              label="Appearance"
              accent="#ec4899"
            />
          </div>

          {/* Content Area */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 rounded-[2.5rem] p-6 md:p-10 relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(15,40,84,0.7) 0%, rgba(10,18,40,0.9) 100%)",
              border: "1px solid rgba(255,255,255,0.05)",
              boxShadow:
                "0 20px 50px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            {activeTab === "general" && (
              <div className="space-y-10 relative z-10">
                <SectionHeader
                  title="Site Information"
                  subtitle="Platform core identification and contact."
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <InputField
                    label="Site Platform Name"
                    value={settings.siteName}
                    onChange={(e) =>
                      setSettings({ ...settings, siteName: e.target.value })
                    }
                  />
                  <InputField
                    label="Admin Support Email"
                    value={settings.supportEmail}
                    onChange={(e) =>
                      setSettings({ ...settings, supportEmail: e.target.value })
                    }
                  />
                </div>
                <div className="p-6 rounded-3xl bg-blue-500/5 border border-blue-500/10 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-lg text-blue-100">
                      Maintenance Mode
                    </h4>
                    <p className="text-[10px] text-blue-200/40 uppercase font-bold tracking-widest mt-1">
                      Restrict user access globally
                    </p>
                  </div>
                  <Toggle
                    active={settings.isMaintenanceMode}
                    onClick={() =>
                      setSettings({
                        ...settings,
                        isMaintenanceMode: !settings.isMaintenanceMode,
                      })
                    }
                  />
                </div>
              </div>
            )}

            {activeTab === "ai" && (
              <div className="space-y-10 relative z-10">
                <SectionHeader
                  title="AI Core Configuration"
                  subtitle="Select the neural engine powering your content."
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {["Gemini 1.5 Pro", "GPT-4o", "Claude 3.5"].map((m) => (
                    <ModelCard
                      key={m}
                      name={m}
                      active={settings.defaultAIModel === m}
                      onClick={() =>
                        setSettings({ ...settings, defaultAIModel: m })
                      }
                    />
                  ))}
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-black text-cyan-400/70 uppercase tracking-[0.2em] ml-1">
                    Secure API Engine Key
                  </label>
                  <div className="relative group">
                    <Lock
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-400/50 group-focus-within:text-cyan-400 transition-colors"
                      size={18}
                    />
                    <input
                      type="password"
                      value={settings.aiApiKey}
                      onChange={(e) =>
                        setSettings({ ...settings, aiApiKey: e.target.value })
                      }
                      className="w-full pl-14 pr-6 py-5 bg-[#0A1228]/60 rounded-2xl border border-white/5 focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10 outline-none font-mono text-cyan-100"
                      placeholder="••••••••••••••••••••••••••••"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-6 relative z-10">
                <SectionHeader
                  title="Authentication Layer"
                  subtitle="Configure user access and security protocols."
                />
                <CheckboxItem
                  label="Enable Two-Factor Auth (2FA)"
                  description="Adds an extra security layer for all accounts."
                  checked={settings.allow2FA}
                  onChange={() =>
                    setSettings({ ...settings, allow2FA: !settings.allow2FA })
                  }
                  accent="#10b981"
                />
                <CheckboxItem
                  label="Social Auth (Google/GitHub)"
                  description="Permit users to authenticate via OAuth providers."
                  checked={settings.allowSocialLogin}
                  onChange={() =>
                    setSettings({
                      ...settings,
                      allowSocialLogin: !settings.allowSocialLogin,
                    })
                  }
                  accent="#3b82f6"
                />
                <CheckboxItem
                  label="Public Registration"
                  description="Allow new users to create accounts on the platform."
                  checked={settings.allowRegistration}
                  onChange={() =>
                    setSettings({
                      ...settings,
                      allowRegistration: !settings.allowRegistration,
                    })
                  }
                  accent="#06b6d4"
                />
              </div>
            )}

            {activeTab === "appearance" && (
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-500 border border-pink-500/20">
                  <Palette size={40} />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tight">
                  Theme Studio
                </h3>
                <p className="text-white/40 text-sm max-w-xs">
                  Custom Themes: In Development (coming soon).
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Save Button */}
      <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-30">
        <motion.button
          onClick={handleSave}
          disabled={isSaving}
          whileHover={{
            scale: 1.04,
            boxShadow: "0 0 36px rgba(28,77,141,0.6)",
          }}
          whileTap={{ scale: 0.97 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 rounded-xl text-sm font-semibold text-white transition-all group disabled:opacity-50"
          style={{
            background: "linear-gradient(135deg, #1C4D8D 0%, #0F2854 100%)",
            border: "1px solid rgba(28,77,141,0.6)",
            boxShadow: "0 4px 24px rgba(28,77,141,0.4)",
          }}
        >
          <div className="flex items-center gap-2">
            {isSaving ? (
              <RefreshCw className="w-4 h-4 animate-spin text-cyan-300" />
            ) : (
              <Save className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            )}
            <span className="tracking-wide">
              {isSaving ? "Syncing..." : "Save Changes"}
            </span>
          </div>
        </motion.button>
      </div>
    </div>
  );
}

function TabButton({
  active,
  icon,
  label,
  onClick,
  accent,
}: {
  active: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  accent: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-6 py-5 rounded-2xl font-bold transition-all relative group ${active ? "text-white" : "text-white/40 hover:text-white"}`}
    >
      {active && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 z-0"
          style={{
            background: `linear-gradient(135deg, ${accent}cc 0%, ${accent}66 100%)`,
          }}
        />
      )}
      <div className="relative z-10 flex items-center gap-4 uppercase tracking-tight text-xs font-black">
        {icon} {label}
      </div>
    </button>
  );
}

function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-6">
      <h3 className="text-2xl font-black uppercase tracking-tight text-white">
        {title}
      </h3>
      <p className="text-white/40 text-sm font-medium">{subtitle}</p>
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="space-y-2 group">
      <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-1">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="w-full px-6 py-5 bg-white/5 rounded-2xl border border-white/5 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 outline-none text-sm font-bold text-white transition-all shadow-inner"
      />
    </div>
  );
}

function Toggle({ active, onClick }: { active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-14 h-7 rounded-full transition-all relative ${active ? "bg-cyan-500" : "bg-white/10"}`}
    >
      <motion.div
        animate={{ x: active ? 32 : 4 }}
        className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-lg"
      />
    </button>
  );
}

function ModelCard({
  name,
  active,
  onClick,
}: {
  name: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`p-6 rounded-[2rem] border-2 cursor-pointer transition-all relative overflow-hidden group ${active ? "border-cyan-500 bg-cyan-500/10" : "border-white/5 bg-white/5 hover:border-white/20"}`}
    >
      <div className="flex justify-between items-start relative z-10">
        <Zap size={22} className={active ? "text-cyan-400" : "text-white/20"} />
        {active && (
          <motion.div
            layoutId="activeModel"
            className="w-2 h-2 rounded-full bg-cyan-400"
          />
        )}
      </div>
      <h4
        className={`font-black uppercase mt-4 transition-colors ${active ? "text-white" : "text-white/40"}`}
      >
        {name}
      </h4>
    </div>
  );
}

function CheckboxItem({
  label,
  description,
  checked,
  onChange,
  accent,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
  accent: string;
}) {
  return (
    <div
      onClick={onChange}
      className="flex items-start gap-5 p-6 rounded-[2rem] bg-white/5 hover:bg-white/[0.08] transition-all cursor-pointer border border-transparent hover:border-white/10 group"
    >
      <div
        className={`mt-1 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${checked ? "border-transparent" : "border-white/20"}`}
        style={{
          backgroundColor: checked ? accent : "transparent",
          boxShadow: checked ? `0 0 15px ${accent}66` : "none",
        }}
      >
        {checked && <CheckCircle2 size={14} className="text-white" />}
      </div>
      <div>
        <h4
          className={`text-sm font-black uppercase transition-colors ${checked ? "text-white" : "text-white/60"}`}
        >
          {label}
        </h4>
        <p className="text-xs text-white/30 font-medium mt-0.5">
          {description}
        </p>
      </div>
    </div>
  );
}
