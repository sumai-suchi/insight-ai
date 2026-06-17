import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ListItem } from "./ListItem";

const newsLinks = [
  { name: "Latest Updates", href: "/news" },
  { name: "Technology", href: "news?category=technology" },
  { name: "Business", href: "/news?category=business" },
  { name: "Marketing", href: "/news?category=market" },
  { name: "Startups", href: "/news?category=startups" },
];

export default function News() {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="!text-white/75 hover:!text-white !bg-transparent hover:!bg-white/8">
        News
      </NavigationMenuTrigger>
      <NavigationMenuContent
        style={{
          background:
            "linear-gradient(145deg, rgba(10,18,40,0.97) 0%, rgba(15,40,84,0.95) 100%)",
          border: "1px solid rgba(28,77,141,0.35)",
          borderRadius: "14px",
          backdropFilter: "blur(20px)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        }}
      >
        <ul className="grid grid-cols-2 gap-1 p-3 w-[340px]">
          {newsLinks.map((n) => (
            <ListItem key={n.name} title={n.name} href={n.href} />
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
