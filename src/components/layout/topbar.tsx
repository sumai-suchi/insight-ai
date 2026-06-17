// components/layout/Topbar.tsx
"use client";

import { useRouter } from "next/navigation";
import { Avatar } from "@/components/ui/EditorAvatar";

interface TopbarProps {
  editorName: string;
}

export function Topbar({ editorName }: TopbarProps) {
  const router = useRouter();
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const firstName = editorName.split(" ")[0];

  return (
    <div className="flex items-center justify-between py-5 mb-1">
      <div>
        <div className="text-[18px] font-medium text-gray-900 tracking-tight">
          Insight <span className="text-blue-600">ai</span>
        </div>
        <p className="text-[13px] text-gray-400 mt-0.5">
          Good morning, {firstName} — {today}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.push("/editor/notifications")}
          className="relative w-9 h-9 rounded-lg border border-gray-100 bg-white flex items-center justify-center hover:border-gray-200 transition-colors"
        >
          <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 stroke-gray-600" strokeWidth={1.2} strokeLinecap="round">
            <path d="M8 2a4.5 4.5 0 00-4.5 4.5v2.25L2 10.25V11.5h12v-1.25L12.5 8.75V6.5A4.5 4.5 0 008 2zM6.5 13a1.5 1.5 0 003 0" />
          </svg>
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
        </button>
        <Avatar name={editorName} size="md" />
        <button
          onClick={() => router.push("/editor/articles/new")}
          className="text-[13px] font-medium px-4 h-9 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          + New article
        </button>
      </div>
    </div>
  );
}