import { App } from "@/types/appType";
import Link from "next/link";
import React from "react";

interface AppCardProps {
  app: App;
}
const AppCard: React.FC<AppCardProps> = ({ app }) => {
  return (
    <a
      href={app.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow space-x-4"
    >
      <img
        src={app.icon}
        alt={`${app.name} icon`}
        className="w-12 h-12 rounded-md"
      />
      <div>
        <h3 className="text-lg font-semibold">{app.name}</h3>
        <p>
          This is a very useful and user-friendly app that makes tasks easier
          and more efficient.
        </p>
      </div>
    </a>
  );
};

export default AppCard;
