import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ListItem } from "./ListItem";

function Solutions() {
  const solutions = [
    {
      title: "For Education",
      link: "/education",
      description:
        "Empower educators and students with AI-driven tools to enhance learning experiences, foster creativity, and improve academic outcomes.",
    },
    {
      title: "For SEO",
      link: "/forSEO",
      description:
        "Boost your search engine rankings and drive organic traffic with our AI-powered SEO solutions that optimize content and identify growth opportunities.",
    },
    {
      title: "For Writers",
      link: "/AIWriting",
      description:
        "Unleash your creativity and overcome writer's block with our AI writing assistant, designed to help writers of all levels craft compelling content effortlessly.",
    },
  ];
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
      <NavigationMenuContent className="bg-black p-5">
        <ul className="grid grid-cols-1 md:grid-cols-2 w-96 bg-black text-white">
          {solutions.map((solution) => (
            <ListItem
              key={solution.title}
              title={solution.title}
              href={solution.link}
            >
              {solution.description}
            </ListItem>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
