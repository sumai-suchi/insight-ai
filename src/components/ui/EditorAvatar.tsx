// components/ui/Avatar.tsx
import { getInitials } from "@/lib/utils/editor";
import { cn } from "@/lib/utils";

const colorMap = [
  "bg-blue-50 text-blue-700",
  "bg-amber-50 text-amber-700",
  "bg-violet-50 text-violet-700",
  "bg-teal-50 text-teal-700",
  "bg-rose-50 text-rose-700",
  "bg-green-50 text-green-700",
];

function pickColor(name: string): string {
  const idx = name.charCodeAt(0) % colorMap.length;
  return colorMap[idx];
}

interface AvatarProps {
  name: string;
  size?: "sm" | "md";
  className?: string;
}

export function Avatar({ name, size = "md", className }: AvatarProps) {
  const sizeClass = size === "sm" ? "w-6 h-6 text-[10px]" : "w-8 h-8 text-xs";
  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center font-medium flex-shrink-0",
        sizeClass,
        pickColor(name),
        className
      )}
    >
      {getInitials(name)}
    </div>
  );
}