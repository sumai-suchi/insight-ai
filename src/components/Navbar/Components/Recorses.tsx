import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ListItem } from "./ListItem";

const resources = [
  { name: "Blog",                href: "/blog"               },
  { name: "Knowledge Base",      href: "/knowledge-base"     },
  { name: "Enterprise API",      href: "/enterprise-api"     },
  { name: "Affiliate Program",   href: "/affiliate-program"  },
  { name: "Ambassador Program",  href: "/ambassador-program" },
];

export default function Recorses() {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="!text-white/75 hover:!text-white !bg-transparent hover:!bg-white/8">
        Resources
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul
          className="grid grid-cols-1 gap-1 p-3 w-[280px]"
          style={{
            background: "linear-gradient(145deg, rgba(10,18,40,0.97) 0%, rgba(15,40,84,0.95) 100%)",
            border: "1px solid rgba(28,77,141,0.35)",
            borderRadius: "14px",
            backdropFilter: "blur(20px)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          }}
        >
          {resources.map((r) => (
            <ListItem key={r.name} title={r.name} href={r.href} />
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
