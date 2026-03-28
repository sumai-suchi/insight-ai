import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ListItem } from "./ListItem";

function News() {
  const NewsLinks = [
    {
      name: "Latest Updates",
      href: "/news",
      description:
        "Stay updated with the latest breaking news and trending stories from around the world.",
    },
    {
      name: "Technology",
      href: "/news?category=technology",
      description:
        "Explore the newest tech trends, innovations, gadgets, and startup news.",
    },
    {
      name: "Business",
      href: "/news?category=business",
      description:
        "Get insights on political events, government decisions, and global affairs.",
    },
    {
      name: "Marketing",
      href: "/news?category=marketing",
      description:
        "Read about health tips, medical news, fitness, and wellness updates.",
    },

    {
      name: "Startups",
      href: "/news?category=startups",
      description:
        "Follow the latest sports news, match updates, and athlete highlights.",
    },
  ];
  return (
    <NavigationMenuItem className="">
      <NavigationMenuTrigger>News</NavigationMenuTrigger>
      <NavigationMenuContent className="bg-black p-5">
        <ul className="grid grid-cols-1 md:grid-cols-2 w-96 bg-black text-white">
          {NewsLinks.map((news) => (
            <ListItem
              key={news.name}
              title={news.name}
              href={news.href}
            ></ListItem>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

export default News;
