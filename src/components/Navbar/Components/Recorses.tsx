import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ListItem } from "./ListItem";

function Recorses() {
  const resources = [
    { name: "Blog", href: "/blog" },
    { name: "Affiliate Program", href: "/affiliate-program" },
    // static page hobe
    // { name: "Ambassador Program", href: "/ambassador-program" },
  ];
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
      <NavigationMenuContent className="bg-black p-5">
        <ul className="grid grid-cols-1 md:grid-cols-2 w-96 bg-black text-white">
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

export default Recorses;