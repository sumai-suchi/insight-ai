import React from "react";
import { Menu, MessageCircle } from "lucide-react";

interface DashboardNavbarProps {
  onToggleSide: () => void;
  onToggleChat: () => void;
}

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({
  onToggleSide,
  onToggleChat,
}) => {
  return (
    <div className="flex justify-between items-center h-16 px-6 bg-gray-100">
      <button
        onClick={onToggleSide}
        className="p-2 rounded hover:bg-gray-200 focus:outline-none"
        aria-label="Toggle sidebar"
      >
        <Menu className="w-6 h-6" />
      </button>

      <h2 className="text-lg font-semibold">Ai Content Generation</h2>

      <button
        onClick={onToggleChat}
        className="p-2 rounded hover:bg-gray-200 focus:outline-none"
        aria-label="Toggle chat"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
};

export default DashboardNavbar;
