import Link from "next/link";
import { ReactNode } from "react";
export type ActionItem = {
  icon: ReactNode;
  label: string;
  gradient: string;
  href: string;
};

export default function ActionCard({ icon, label, gradient, href }: ActionItem) {
  return (
    <Link
      href={href}
      className={`flex flex-col items-center justify-center p-4 rounded-2xl shadow-md cursor-pointer bg-linear-to-r ${gradient} text-white hover:scale-105 transition`}
    >
      {/* Icon */}
      <div className="mb-2">{icon}</div>

      {/* Label */}
      <span className="font-semibold text-sm text-center">{label}</span>
    </Link>
  );
}