import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ListItem } from "./ListItem";

const solutions = [
  {
    title: "For Education",
    link: "/solutions/education",
    description: "Empower educators and students with AI-driven tools to enhance learning and creativity.",
  },
  {
    title: "For SEO",
    link: "/solutions/seo",
    description: "Boost rankings and drive organic traffic with AI-powered SEO content optimization.",
  },
  {
    title: "For Writers",
    link: "/solutions/writers",
    description: "Overcome writer's block and craft compelling content effortlessly with AI assistance.",
  },
];

export default function Solutions() {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="!text-white/75 hover:!text-white !bg-transparent hover:!bg-white/8">
        Solutions
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul
          className="grid grid-cols-1 gap-1 p-3 w-[340px]"
          style={{
            background: "linear-gradient(145deg, rgba(10,18,40,0.97) 0%, rgba(15,40,84,0.95) 100%)",
            border: "1px solid rgba(28,77,141,0.35)",
            borderRadius: "14px",
            backdropFilter: "blur(20px)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          }}
        >
          {solutions.map((s) => (
            <ListItem key={s.title} title={s.title} href={s.link}>
              {s.description}
            </ListItem>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
