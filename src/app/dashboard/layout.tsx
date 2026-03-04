import React from "react";
import { SideNav } from "./_components/SideNav";
import DashboardNavbar from "./_components/DashboardNavbar";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <SideNav />
      <div className=" md:ml-50 lg:ml-70">
        <DashboardNavbar />
        {children}
      </div>
    </div>
  );
}

export default layout;
