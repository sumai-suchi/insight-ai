"use client";

import React, { useState, useEffect } from "react";
import {
  FiShield,
  FiLock,
  FiSave,
  FiAlertTriangle,
  FiCheckCircle,
  FiLayers,
  FiUser,
  FiEdit3,
} from "react-icons/fi";
import axios from "axios";

const MODULES = [
  {
    id: "articles",
    name: "Articles Management",
    permissions: ["view", "create", "edit", "delete", "publish"],
  },
  {
    id: "users",
    name: "User Management",
    permissions: ["view", "edit", "block", "delete"],
  },
  {
    id: "analytics",
    name: "System Analytics",
    permissions: ["view", "export"],
  },
];

const RolesPermissionsPage = () => {
  const [roles, setRoles] = useState<any[]>([]);
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("/api/roles");
        const iconMap: any = {
          admin: <FiShield />,
          editor: <FiEdit3 />,
          user: <FiUser />,
        };

        const data = res.data.map((r: any) => ({
          ...r,
          icon: iconMap[r.roleId] || <FiUser />,
          isLocked: r.roleId === "admin",
        }));

        setRoles(data);
        setSelectedRole(data[0]);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRoles();
  }, []);

  const handleToggle = (moduleId: string, perm: string) => {
    if (selectedRole?.isLocked) return;

    const currentPerms = selectedRole.permissions[moduleId] || [];
    const newPerms = currentPerms.includes(perm)
      ? currentPerms.filter((p: string) => p !== perm)
      : [...currentPerms, perm];

    const updatedRole = {
      ...selectedRole,
      permissions: { ...selectedRole.permissions, [moduleId]: newPerms },
    };

    setSelectedRole(updatedRole);
    setRoles(
      roles.map((r) => (r.roleId === selectedRole.roleId ? updatedRole : r)),
    );
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await axios.patch("/api/roles", {
        roleId: selectedRole.roleId,
        permissions: selectedRole.permissions,
      });
      setTimeout(() => setIsSaving(false), 1500);
    } catch (err) {
      console.error(err);
      setIsSaving(false);
    }
  };

  // --- Loader Section ---
  if (isLoading || !selectedRole)
    return (
      <div className="min-h-screen bg-[#0A1228] flex flex-col items-center justify-center gap-4">
        {/* Animated Spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-blue-400 font-black tracking-[0.3em] uppercase text-xs animate-pulse">
          INITIALIZING ENGINE...
        </p>
      </div>
    );

  return (
    <div className="relative min-h-screen w-full bg-[#0A1228] text-white p-6 md:p-10 font-sans overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter mb-2 bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
              Role & Permissions
            </h1>
            <p className="text-blue-400/60 font-bold uppercase text-[10px] tracking-[0.2em] border-l-2 border-blue-500 pl-4">
              InsightAI Access Control System
            </p>
          </div>
          <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white/60">
              System Active
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-6 flex items-center gap-2">
              <FiLayers /> Access Levels
            </h2>
            <div className="space-y-3">
              {roles.map((role) => (
                <div
                  key={role.roleId}
                  onClick={() => setSelectedRole(role)}
                  className={`p-5 rounded-[2rem] border cursor-pointer transition-all relative overflow-hidden group ${
                    selectedRole.roleId === role.roleId
                      ? "bg-blue-600 border-blue-500 shadow-xl"
                      : "bg-white/[0.03] border-white/10"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span
                      className={`text-[10px] font-black uppercase tracking-widest ${
                        selectedRole.roleId === role.roleId
                          ? "text-blue-100"
                          : "text-blue-400"
                      }`}
                    >
                      {role.count} Accounts
                    </span>
                    {role.isLocked && (
                      <FiLock size={12} className="text-white/40" />
                    )}
                  </div>
                  <h3 className="font-black text-xl tracking-tight uppercase flex items-center gap-2">
                    <span className="opacity-50">{role.icon}</span> {role.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          {/* Permissions Grid */}
          <div className="lg:col-span-3">
            <div className="bg-white/[0.03] backdrop-blur-md rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden">
              <div className="p-8 border-b border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/[0.01]">
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tighter">
                    {selectedRole.name} Control
                  </h2>
                  <p className="text-white/40 text-xs font-bold uppercase tracking-wide">
                    {selectedRole.description}
                  </p>
                </div>
                <button
                  onClick={handleSave}
                  disabled={selectedRole.isLocked || isSaving}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-black uppercase text-[10px] tracking-widest transition-all ${
                    isSaving
                      ? "bg-emerald-500"
                      : "bg-blue-600 hover:bg-blue-500 disabled:opacity-30"
                  }`}
                >
                  {isSaving ? (
                    <>
                      <FiCheckCircle /> Saved
                    </>
                  ) : (
                    <>
                      <FiSave /> Update Privileges
                    </>
                  )}
                </button>
              </div>

              <div className="p-8 space-y-10">
                {selectedRole.isLocked && (
                  <div className="mb-8 p-5 bg-blue-500/10 border border-blue-400/20 rounded-2xl flex items-center gap-4 text-blue-400">
                    <FiAlertTriangle size={24} className="shrink-0" />
                    <p className="text-[10px] font-black uppercase tracking-widest">
                      Administrative privileges are hardcoded for system
                      stability.
                    </p>
                  </div>
                )}

                {MODULES.map((module) => (
                  <div key={module.id}>
                    <div className="flex items-center gap-4 mb-5">
                      <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-400/80">
                        {module.name}
                      </h3>
                      <div className="h-[1px] flex-1 bg-white/5" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {module.permissions.map((perm) => {
                        const isActive =
                          selectedRole.permissions[module.id]?.includes(perm);
                        return (
                          <div
                            key={perm}
                            onClick={() => handleToggle(module.id, perm)}
                            className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${
                              selectedRole.isLocked
                                ? "cursor-not-allowed"
                                : "hover:border-blue-500/40"
                            } ${
                              isActive
                                ? "bg-blue-500/5 border-blue-500/30"
                                : "bg-transparent border-white/5 opacity-40"
                            }`}
                          >
                            <span className="text-[10px] font-black uppercase tracking-widest">
                              {perm}
                            </span>
                            <div
                              className={`w-8 h-4 rounded-full relative transition-all ${
                                isActive
                                  ? "bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                                  : "bg-white/10"
                              }`}
                            >
                              <div
                                className={`absolute top-1 w-2 h-2 rounded-full bg-white transition-all ${
                                  isActive ? "left-5" : "left-1"
                                }`}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RolesPermissionsPage;
