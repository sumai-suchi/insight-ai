import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ListItem } from "./ListItem";

function News() {
  const NewsLinks = [
    { name: "Latest Updates", href: "/news" },
    { name: "Technology", href: "/news/technology" },
    { name: "Politics", href: "/news/politics" },
    { name: "Health", href: "/news/health" },
    { name: "Entertainment", href: "/news/entertainment" },
    { name: "Sports", href: "/news/sports" },
  ];
  return (
    <NavigationMenuItem className="">
      <NavigationMenuTrigger>News</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-2 grid-cols-2 w-[90vw] lg:w-80">
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
