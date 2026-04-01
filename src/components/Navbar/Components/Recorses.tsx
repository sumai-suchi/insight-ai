import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ListItem } from "./ListItem";

export default function Recorses() {
  const resources = [
    { name: "Blog", href: "/blog" },
    { name: "Affiliate Program", href: "/affiliate-program" },
    // static page hobe
    // { name: "Ambassador Program", href: "/ambassador-program" },
  ];
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="!text-white/75 hover:!text-white !bg-transparent hover:!bg-white/8">
        Resources
      </NavigationMenuTrigger>
      <NavigationMenuContent className=""
       style={{
            background: "linear-gradient(145deg, rgba(10,18,40,0.97) 0%, rgba(15,40,84,0.95) 100%)",
            border: "1px solid rgba(28,77,141,0.35)",
            borderRadius: "14px",
            backdropFilter: "blur(20px)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          }}>
        <ul className="grid grid-cols-1 md:grid-cols-2 w-96 "
       >
          {resources.map((resource) => (
            <ListItem
              key={resource.name}
              title={resource.name}
              href={resource.href}
            ></ListItem>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
