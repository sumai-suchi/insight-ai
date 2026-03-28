import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ListItem } from "./ListItem";

const productLinks = [
  { title: "AI Content Writer",    link: "/products/ai-content-writer",  description: "Write blogs, newsletters, and social media posts with AI." },
  { title: "Articles",             link: "/articles",                     description: "Create, read, and manage high-quality articles."           },
  { title: "AI News Digest",       link: "/news",                         description: "Summarize trending news and articles daily, curated by AI."},
  { title: "AI Summarizer",        link: "/products/ai-summarizer",       description: "Condense long articles, reports, and research papers."     },
  { title: "AI Headlines & Titles",link: "/products/ai-headlines",        description: "Generate catchy headlines and titles instantly."           },
  { title: "AI SEO Optimizer",     link: "/products/ai-seo-optimizer",    description: "Optimize your content with AI-driven keywords."           },
  { title: "Insight Connect",      link: "/products/insight-connect",     description: "Chat live with real humans for instant help or guidance."  },
  { title: "API / Integrations",   link: "/products/api-integrations",    description: "Connect AI tools to your apps, CMS, or workflows."        },
];

export const Products = () => (
  <NavigationMenuItem>
    <NavigationMenuTrigger className="!text-white/75 hover:!text-white !bg-transparent hover:!bg-white/8">
      Product
    </NavigationMenuTrigger>
    <NavigationMenuContent>
      <ul
        className="grid grid-cols-2 gap-1 p-3 w-[520px]"
        style={{
          background: "linear-gradient(145deg, rgba(10,18,40,0.97) 0%, rgba(15,40,84,0.95) 100%)",
          border: "1px solid rgba(28,77,141,0.35)",
          borderRadius: "14px",
          backdropFilter: "blur(20px)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        }}
      >
        {productLinks.map((p) => (
          <ListItem key={p.title} title={p.title} href={p.link}>
            {p.description}
          </ListItem>
        ))}
      </ul>
    </NavigationMenuContent>
  </NavigationMenuItem>
);
