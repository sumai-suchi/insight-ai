/* eslint-disable @next/next/no-img-element */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BadgeCheckIcon,
  BellIcon,
  ChevronDown,
  CreditCardIcon,
  LayoutDashboard,
  LogOutIcon,
} from "lucide-react";
import { authClient } from "@/lib/auth/auth-client";
import Link from "next/link";
import { useAuth } from "@/Context/AuthContext";

export function UserAvatar() {
  const { session } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl transition-all outline-none"
          style={{
            border: "1px solid rgba(28,77,141,0.3)",
            background: "rgba(15,40,84,0.4)",
          }}
        >
          <img
            src={session?.user?.image || "/avatar.jpg"}
            alt="User Avatar"
            className="w-8 h-8 rounded-full object-cover ring-2 ring-[rgba(28,77,141,0.5)]"
          />
          <div className="hidden sm:flex flex-col items-start">
            <p className="text-sm font-medium text-white leading-none">
              {session?.user?.name}
            </p>
            <p className="text-xs text-white/40 leading-none mt-0.5 max-w-[120px] truncate">
              {session?.user?.email}
            </p>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-white/40" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-52 p-1.5"
        style={{
          background:
            "linear-gradient(145deg, rgba(10,18,40,0.97) 0%, rgba(15,40,84,0.95) 100%)",
          border: "1px solid rgba(28,77,141,0.35)",
          borderRadius: "12px",
          backdropFilter: "blur(20px)",
          boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
        }}
      >
        <DropdownMenuGroup>
          {[
            {
              href: "/Project-dashboard",
              icon: LayoutDashboard,
              label: "Dashboard",
            },
            {
              href: "/dashboard/account",
              icon: BadgeCheckIcon,
              label: "Account",
            },
            {
              href: "/dashboard/billing",
              icon: CreditCardIcon,
              label: "Billing",
            },
            {
              href: "/dashboard/notifications",
              icon: BellIcon,
              label: "Notifications",
            },
          ].map(({ href, icon: Icon, label }) => (
            <Link href={href} key={label}>
              <DropdownMenuItem className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/6 cursor-pointer transition-colors text-sm">
                <Icon className="w-4 h-4 text-blue-400" />
                {label}
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator
          className="my-1.5"
          style={{ background: "rgba(28,77,141,0.3)" }}
        />

        <DropdownMenuItem
          onClick={() => authClient.signOut()}
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-red-400/80 hover:text-red-400 hover:bg-red-500/8 cursor-pointer transition-colors text-sm"
        >
          <LogOutIcon className="w-4 h-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
