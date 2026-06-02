"use client";

import { useEffect, useState } from "react";
import { Trash2, Ban, CheckCircle, Gift, Shield, UserPlus, Award, Slash } from "lucide-react";
import { useAuth } from "@/Context/AuthContext";
import ModalToAddUser from "./user-management-component/ModalToAddUser";
import UserToolbar from "./user-management-component/ToolBar";

type StatCardProps = {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  change: string;
  accentColor: string;
};

type Stats = {
  totalUsers: number;
  activeUsers: number;
  proPlans: number;
  suspended: number;
};

export default function UserManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const { session } = useAuth();

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/users/stats");
      if (!res.ok) throw new Error("Failed to fetch stats");
      const data: Stats = await res.json();
      setStats(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async (searchValue = "", statusValue = "all") => {
    try {
      setSearch(searchValue);
      setStatus(statusValue);
      const res = await fetch(`/api/monitor/user?search=${searchValue}&status=${statusValue}`);
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchUsers();
  }, []);

  const deleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`/api/monitor/delete-user/${userId}`, { method: "DELETE" });
      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== userId));
        fetchStats();
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const toggleBlockUser = async (userId: string) => {
    try {
      const res = await fetch(`/api/monitor/block-user/${userId}`, { method: "PATCH" });
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) =>
          prev.map((user) => (user._id === userId ? { ...user, isBlocked: data.isBlocked } : user))
        );
        fetchStats();
      }
    } catch (error) {
      console.error("Block error:", error);
    }
  };

  const cards = [
    { title: "Total Users", value: stats?.totalUsers ?? 0, icon: <UserPlus size={20} />, accentColor: "blue", change: "+12%" },
    { title: "Active Users", value: stats?.activeUsers ?? 0, icon: <CheckCircle size={20} />, accentColor: "green", change: "+8%" },
    { title: "Pro Plans", value: stats?.proPlans ?? 0, icon: <Award size={20} />, accentColor: "purple", change: "+15%" },
    { title: "Suspended", value: stats?.suspended ?? 0, icon: <Slash size={20} />, accentColor: "red", change: "-3%" },
  ];

  return (
    <div className="min-h-screen bg-[#050a18] text-white p-6 lg:p-10">
      {/* Background Glow Effect */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white">
              User <span className="text-blue-500">Management</span>
            </h1>
            <p className="text-gray-400 mt-1">Control and monitor your AI community</p>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 transition-all rounded-xl font-semibold shadow-[0_0_20px_rgba(37,99,235,0.3)]"
          >
            <UserPlus size={18} /> Add New User
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {cards.map((stat, idx) => (
            <StatCard key={idx} {...stat} />
          ))}
        </div>

        {/* Toolbar & Filter */}
        <div className="bg-[#0d1425]/50 border border-white/10 backdrop-blur-md p-4 rounded-2xl mb-6">
          <UserToolbar onSearch={(searchValue, statusValue) => fetchUsers(searchValue, statusValue || status)} />
        </div>

        {/* Main Table Container */}
        <div className="bg-[#0d1425]/50 border border-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-gray-300 text-sm uppercase tracking-wider">
                  <th className="p-5 font-semibold">User Details</th>
                  <th className="p-5 font-semibold">Role & Plan</th>
                  <th className="p-5 font-semibold">Stats</th>
                  <th className="p-5 font-semibold">Status</th>
                  <th className="p-5 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-white/5 transition-colors group">
                    <td className="p-5">
                      <div className="flex items-center gap-4">
                        <img
                          src={user.image || "/avatar.jpg"}
                          className="w-11 h-11 rounded-full ring-2 ring-blue-500/20 group-hover:ring-blue-500/50 transition-all"
                          alt="avatar"
                        />
                        <div>
                          <p className="font-bold text-white">{user.name || "Anonymous"}</p>
                          <p className="text-sm text-gray-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-blue-400 capitalize">{user.role}</span>
                        <span className="text-xs text-gray-500 uppercase tracking-tighter">{user.plan || "Free"} Plan</span>
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="text-sm">
                        <p className="text-gray-300">{user.article || 0} Articles</p>
                        <p className="text-xs text-green-500">{user.discount}% Discount</p>
                      </div>
                    </td>
                    <td className="p-5">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                        !user.isBlocked 
                          ? "bg-green-500/10 border-green-500/20 text-green-500" 
                          : "bg-red-500/10 border-red-500/20 text-red-500"
                      }`}>
                        {user.isBlocked ? "BLOCKED" : "ACTIVE"}
                      </span>
                    </td>
                    <td className="p-5">
                      <div className="flex items-center justify-center gap-2">
                        <ActionButton onClick={() => toggleBlockUser(user._id)} icon={user.isBlocked ? <CheckCircle size={16}/> : <Ban size={16} />} color="yellow" tooltip="Toggle Block" />
                        <ActionButton onClick={() => deleteUser(user._id)} icon={<Trash2 size={16} />} color="red" tooltip="Delete" />
                        <ActionButton onClick={() => {}} icon={<Shield size={16} />} color="purple" tooltip="Permissions" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ModalToAddUser isOpen={isOpen} setIsOpen={setIsOpen} addUserToTable={(u) => { setUsers([...users, u]); fetchStats(); }} />
    </div>
  );
}

const StatCard = ({ title, value, icon, change, accentColor }: StatCardProps) => {
  const colors: any = {
    blue: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    green: "text-green-500 bg-green-500/10 border-green-500/20",
    purple: "text-purple-500 bg-purple-500/10 border-purple-500/20",
    red: "text-red-500 bg-red-500/10 border-red-500/20",
  };

  return (
    <div className="bg-[#0d1425]/60 border border-white/10 p-6 rounded-2xl backdrop-blur-sm hover:border-white/20 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${colors[accentColor]}`}>
          {icon}
        </div>
        <span className={`text-xs font-bold ${change.startsWith("+") ? "text-green-400" : "text-red-400"}`}>
          {change}
        </span>
      </div>
      <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
      <p className="text-3xl font-bold mt-1 text-white group-hover:scale-105 transition-transform origin-left">
        {typeof value === "number" ? value.toLocaleString() : value}
      </p>
    </div>
  );
};

const ActionButton = ({ icon, onClick, color, tooltip }: any) => {
  const colors: any = {
    red: "hover:bg-red-500/20 text-red-400 border-red-500/30",
    yellow: "hover:bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    purple: "hover:bg-purple-500/20 text-purple-400 border-purple-500/30",
  };
  return (
    <button
      onClick={onClick}
      title={tooltip}
      className={`p-2.5 rounded-lg border transition-all ${colors[color]} bg-transparent backdrop-blur-md`}
    >
      {icon}
    </button>
  );
};