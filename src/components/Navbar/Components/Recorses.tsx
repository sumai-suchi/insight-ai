import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import React from "react";
import { ListItem } from "./ListItem";

function Recorses() {
  const resources = [
    { name: "Blog", href: "/blog" },
    { name: "Knowledge Base", href: "/knowledge-base" },
    { name: "Enterprise API", href: "/enterprise-api" },
    { name: "Affiliate Program", href: "/affiliate-program" },
    { name: "Ambassador Program", href: "/ambassador-program" },
  ];
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid grid-cols-1 md:grid-cols-2 w-96">
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

//Blog
// Knowledge base
// Enterprise API
// Affiliate program
// Ambassador program
