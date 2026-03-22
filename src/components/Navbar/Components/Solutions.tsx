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
      link: "/solutions/education",
      description:
        "Empower educators and students with AI-driven tools to enhance learning experiences, foster creativity, and improve academic outcomes.",
    },
    {
      title: "For SEO",
      link: "/solutions/seo",
      description:
        "Boost your search engine rankings and drive organic traffic with our AI-powered SEO solutions that optimize content and identify growth opportunities.",
    },
    {
      title: "For Writers",
      link: "/solutions/writers",
      description:
        "Unleash your creativity and overcome writer's block with our AI writing assistant, designed to help writers of all levels craft compelling content effortlessly.",
    },
  ];
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="lg:w-4xl">
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

export default Solutions;
