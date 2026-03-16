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
    <DropdownMenu hover>
      <DropdownMenuTrigger asChild>
        {/* fallback to empty string if image is missing */}
  <img
  src={session?.user?.image || "/avatar.jpg"} // "" or null or undefined → fallback
  alt="User Avatar"
  className="w-10 h-10 rounded-full"
/>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <Link href="/Project-dashboard">
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