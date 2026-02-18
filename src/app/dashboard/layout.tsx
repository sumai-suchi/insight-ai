import DashboardNavbar from "@/components/Dashboard/DashboardNavbar";
import { SideNav } from "@/components/Dashboard/SideNav";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <SideNav />
      <div className=" md:ml-70">
        {" "}
        <DashboardNavbar />
        {children}
      </div>
    </div>
  );
}

export default layout;
