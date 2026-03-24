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
  ChevronUp,
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
        {/* fallback to empty string if image is missing */}
        <div className="flex items-center justify-end px-4 lg:justify-between">
          <img
            src={session?.user?.image || "/avatar.jpg"} // "" or null or undefined → fallback
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
          <div className="ml-2 flex items-center">
            <div className="">
              <p className="text-lg text-black font-medium">
                {session?.user?.name}
              </p>
              <p className="text-sm text-gray-500">{session?.user?.email}</p>
            </div>
            <div className="text-black">
              <ChevronDown className="hidden lg:flex" />
              <ChevronUp className="lg:hidden" />
            </div>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-50">
        <DropdownMenuGroup>
          <Link href="/Project-Dashboard">
            <DropdownMenuItem>
              <LayoutDashboard />
              Dashboard
            </DropdownMenuItem>
          </Link>
          <Link href="/dashboard/account">
            <DropdownMenuItem>
              <BadgeCheckIcon />
              Account
            </DropdownMenuItem>
          </Link>
          <Link href="/dashboard/billing">
            <DropdownMenuItem>
              <CreditCardIcon />
              Billing
            </DropdownMenuItem>
          </Link>
          <Link href="/dashboard/notifications">
            <DropdownMenuItem>
              <BellIcon />
              Notifications
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => authClient.signOut()}>
          <LogOutIcon />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
