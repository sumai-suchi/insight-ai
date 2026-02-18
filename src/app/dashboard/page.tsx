import Sidebar from "@/components/dashboard/Sidebar";
import React from "react";

function DashboardPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-white dark:bg-black">
      {/* Main Content Area (Placeholder for Editor) */}
      <div className="flex-1 p-8">
         <div className="border border-dashed border-gray-300 dark:border-gray-700 rounded-lg h-full flex items-center justify-center bg-gray-50 dark:bg-zinc-900">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Main Editor Area</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Start writing or select a template...</p>
            </div>
         </div>
      </div>
      
      {/* Sidebar / Tools Panel */}
      <Sidebar />
    </div>
  );
}

export default DashboardPage;
