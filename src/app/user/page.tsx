"use client";

import { useEffect, useState } from "react";
import { Trash2, Ban, CheckCircle, Gift, Shield } from "lucide-react";
import { toast } from "react-toastify";
import { UserPlus, Download, Upload } from "lucide-react";
import {  Award, Slash } from "lucide-react";
import { useAuth } from "@/Context/AuthContext";
import ModalToAddUser from "./user-management-component/ModalToAddUser";
import { IUser } from "@/lib/mongoose-connect/User";
import UserToolbar from "./user-management-component/ToolBar";



// type User = {
//   id: number;
//   name: string;
//   email: string;
//   role: "user" | "admin";
//   status: "active" | "blocked";
//   discount: number;
// };

type StatCardProps = {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  change: string;
  bgColor: string;
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
      const { session, error, loading: authLoading } = useAuth();

    const [filter, setFilter] = useState("All");



    const addUserToTable = (newUser: any) => {
          setUsers((prev) => [...prev, newUser]);
        fetchStats(); // also refresh stats
       };

      async function fetchStats() {
      

      try {
        const res = await fetch("/api/users/stats"); // Your GET API route
        if (!res.ok) throw new Error("Failed to fetch stats");
        const data: Stats = await res.json();
        setStats(data);
        console.log("Stats fetched:", data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }


     console.log(stats)
    useEffect(() => {
  

    fetchStats();
  }, []);

   const fetchUsers = async (searchValue = "", statusValue = "all") => {
  
    try {
      setSearch(searchValue);
     setStatus(statusValue);

    const res = await fetch(
      `/api/monitor/user?search=${searchValue}&status=${statusValue}`
    )
      console.log("Fetch response:", res);
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      console.log("Users fetched:", data);
      setUsers(data); // <-- Update the state!
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

 useEffect(() => {
 

  fetchUsers();
  
}, []);



const deleteUser = async (userId: string) => {
  if (!userId) {
    console.error("No userId provided");
    return;
  }

  try {
    const res = await fetch(`/api/monitor/delete-user/${userId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Failed to delete user");
    }
   
    const data = await res.json();
    console.log("Delete success:", data);
      fetchStats(); // Refresh stats after deletion
    // Remove user from UI
    setUsers((prev) => prev.filter((user) => user._id !== userId));

  } catch (error) {
    console.error("Delete error:", error);
  }
};

const toggleBlockUser = async (userId: string) => {
  try {
    const res = await fetch(`/api/monitor/block-user/${userId}`, { method: "PATCH" });
    const data = await res.json();

    if (!res.ok) {
      console.error("Block failed:", data);
      return;
    }
     fetchStats(); // Refresh stats after blocking/unblocking
    console.log(data.message);


    // Update UI state
    setUsers((prev) =>
      prev.map((user) =>
        user._id === userId ? { ...user, isBlocked: data.isBlocked } : user
      )
    );
    console.log(users)
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

 // Update role or discount
const updateUser = async (userId: string, role?: string, discount?: number) => {
  const res = await fetch(`/api/monitor/admin-user/${userId}`, {
    method: "PATCH",
    body: JSON.stringify({ role, discount }),
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  console.log("Update response:", data);
  if (res.ok)
    setUsers(prev =>
      prev.map(u =>
        u._id === userId ? { ...u, role: role ?? u.role, discount: discount ?? u.discount } : u
      )
    );
}  



  const makeAdmin = (id: number) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, role: "admin" } : user
      )
    );
  };
 
 
  // Cards data for rendering
  const cards = [
  {
    title: "Total Users",
    value: stats?.totalUsers ?? 0, // fallback 0
    icon: <UserPlus size={24} />,
    bgColor: "bg-purple-500",
    change: "+12%",
  },
  {
    title: "Active Users",
    value: stats?.activeUsers ?? 0,
    icon: <CheckCircle size={24} />,
    bgColor: "bg-green-500",
    change: "+8%",
  },
  {
    title: "Pro Plans",
    value: stats?.proPlans ?? 0,
    icon: <Award size={24} />,
    bgColor: "bg-blue-500",
    change: "+15%",
  },
  {
    title: "Suspended",
    value: stats?.suspended ?? 0,
    icon: <Slash size={24} />,
    bgColor: "bg-red-500",
    change: "-3%",
  },
];
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-100 to-purple-200 pt-10px px-4 sm:px-8 lg:px-16">
       <div className="p-8  min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-500">Manage and monitor all platform users</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

    
           <UserToolbar onSearch={(searchValue: string, statusValue?: string) =>
          fetchUsers(searchValue, statusValue || status)}></UserToolbar>
          
        
           <div className="flex items-center  justify-between mb-4">
            <div>

            </div>
            <div>
               <button className="flex items-center  px-4 py-2 rounded-lg text-sm bg-purple-500 text-white hover:bg-purple-600"
          
            onClick={() => {
              setIsOpen(true)
              
          
            }}>
            <UserPlus size={16} /> Add User
          </button>
        
            </div>
           </div>

   
       <ModalToAddUser isOpen={isOpen} setIsOpen={setIsOpen}  addUserToTable={addUserToTable} />

      {/* Placeholder for Users Table */}
      <div className="bg-white rounded-xl shadow-md p-6">
      
       

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-purple-600 text-white text-left">

                <th className="p-3 rounded-l-xl">Name</th>
                <th className="p-3 ">Image</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Permision</th>
                <th className="p-3">Discount</th>
                <th className="p-3">Plan</th>
                <th className="p-3">Article</th>
                <th className="p-3">Last joined</th>
                 <th className="p-3 ">Status</th>
                <th className="p-3 rounded-r-xl text-center">Actions</th>
               
                

              </tr>
            </thead>

            <tbody>
              {users?.map((user) => (
                <tr
                   key={user._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-4 font-medium">{user.name || session?.user?.name || "User"}</td>
                  <td className="p-4">
                    <img
                      src={user.image || "/avatar.jpg"}
                      alt={user.name || session?.user?.name || "User Avatar"}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="p-4 text-gray-600">{user.email || session?.user?.email || "Email"}</td>
                  <td className="p-4 capitalize">{user.role}</td>
                 <td className="p-4">
  <span
    className={`px-3 py-1 rounded-full text-sm font-medium ${
      user.status === "active"
        ? "bg-green-100 text-green-600"
        : user.status === "suspended"
        ? "bg-red-100 text-red-600"
        : "bg-yellow-100 text-yellow-600" // pending
    }`}
  >
    {user.status === "active"
      ? "Active"
      : user.status === "suspended"
      ? "Suspended"
      : "Pending"}
  </span>
</td>
                  <td className="p-4">{user.discount}%</td>
                  <td className="p-4 capitalize">{user.plan}</td>
                  <td className="p-4 capitalize">{user.article}</td>
                  <td className="p-4 capitalize">{user.joinedAt}</td>
                   <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        user.isBlocked === false
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {user.isBlocked === false ? "Active" : "Blocked"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-4 flex flex-wrap gap-3 justify-center">
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                    >
                      <Trash2 size={18} />
                    </button>

                    <button
                      onClick={() => toggleBlockUser(user._id)}
                      className="p-2 bg-yellow-100 text-yellow-600 rounded-lg hover:bg-yellow-200 transition"
                    >
                      {user.isBlocked === true ? (
                           <CheckCircle size={18} />
                      ) : (
                     
                        <Ban size={18} />
                      )}
                    </button>

                    <button
                      onClick={() => updateUser(user._id, user.role, 20)}
                      className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                    >
                      <Gift size={18} />
                    </button>

                    <button
                      onClick={() => makeAdmin(user.id)}
                      className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition"
                    >
                      <Shield size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </div>
      
  
  );
}

const StatCard = ({ title, value, icon, change, bgColor }: StatCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 flex items-center justify-center rounded-lg ${bgColor} text-white`}>
          {icon}
        </div>
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-sm text-gray-500">{title}</p>
        </div>
      </div>
      <span className={`text-sm ${change.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
        {change}
      </span>
    </div>
  );
};