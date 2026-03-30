import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ListItem } from "./ListItem";

export default function Solutions() {
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
        <NavigationMenuTrigger className="!text-white/75 hover:!text-white !bg-transparent hover:!bg-white/8">
        Solutions
      </NavigationMenuTrigger>
      <NavigationMenuContent className=""
        style={{
            background: "linear-gradient(145deg, rgba(10,18,40,0.97) 0%, rgba(15,40,84,0.95) 100%)",
            border: "1px solid rgba(28,77,141,0.35)",
            borderRadius: "14px",
            backdropFilter: "blur(20px)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          }}>
        <ul className="grid grid-cols-1 md:grid-cols-2 w-96  text-white "
      >
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
