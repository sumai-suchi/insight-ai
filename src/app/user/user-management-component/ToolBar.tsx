"use client";

import { useState } from "react";

type Props = {
  onSearch: (search: string, status?: string) => void;
};

export default function UserToolbar({ onSearch }: Props) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onSearch(value, status);
  };

  const handleFilter = (value: string) => {
    setStatus(value);
    onSearch(search, value);
  };

  const exportUsers = async () => {
    const res = await fetch("/api/users/export");
    const data = await res.json();

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "users.json";
    a.click();
  };

  const importUsers = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    const users = JSON.parse(text);

    await fetch("/api/users/import", {
      method: "POST",
      body: JSON.stringify(users),
    });

    alert("Users Imported");
  };

  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">

      {/* Search */}
      <input
        type="text"
        placeholder="Search users by name or email..."
        value={search}
        onChange={handleSearch}
        className="border rounded-lg px-4 py-2 w-150"
      />

      {/* Filters */}
      <div className="flex gap-2">

        <button
          onClick={() => handleFilter("all")}
          className={`px-4 py-2 rounded-md 
           
               "bg-black/20 text-white hover:text-black"
          `}
        >
          All
        </button>

        <button
          onClick={() => handleFilter("active")}
          className={`px-4 py-2 rounded-md 
         
        
              "bg-black/20 text-white hover:text-black"
          `}
        >
          Active
        </button>

        <button
          onClick={() => handleFilter("blocked")}
          className={`px-4 py-2 rounded-md 
           
          
               "bg-blue-500 text-white hover:text-black"
          `}
        >
          Blocked
        </button>

        {/* <button
          onClick={() => handleFilter("pending")}
          className={`px-4 py-2 rounded-md ${
            status === "pending"
              ? "bg-purple-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Pending
        </button> */}

      </div>

      {/* Export */}
      {/* <button
        onClick={exportUsers}
        className="ml-auto bg-gray-200 px-4 py-2 rounded-md"
      >
        Export
      </button> */}

      {/* Import */}
      {/* <label className="bg-gray-200 px-4 py-2 rounded-md cursor-pointer">
        Import
        <input
          type="file"
          hidden
          onChange={importUsers}
        />
      </label> */}
      

    </div>
  );
}