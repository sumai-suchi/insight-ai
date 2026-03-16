import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import React from "react";
import { ListItem } from "./ListItem";
export interface ProductLinks {
  title: string;
  link: string;
  description: string;
  icon: React.ReactNode;
}

export const Products = () => {
  const productLinks: ProductLinks[] = [
      {
    title: "AI Content Writer",
    link: "/products/ai-content-writer",
    description:
      "Write blogs, newsletters, and social media posts quickly with AI-powered suggestions.",
    icon: <div className="w-6 h-6 bg-blue-400 rounded-full" />,
  },
 {
  title: "Articles",
  link: "/articles", // This is the main articles/news page
  description:
    "Create, read, and manage high-quality articles instantly. Access all published content on the Articles page.",
  icon: <div className="w-6 h-6 bg-green-400 rounded-full" />,
},
  {
    title: "AI News Digest",
    link: "/news",
    description:
      "Summarize trending news and articles daily, curated by AI for you.",
    icon: <div className="w-6 h-6 bg-yellow-400 rounded-full" />,
  },
  {
    title: "AI Summarizer",
    link: "/products/ai-summarizer",
    description:
      "Condense long articles, reports, and research papers into quick summaries.",
    icon: <div className="w-6 h-6 bg-purple-400 rounded-full" />,
  },
  {
    title: "AI Headlines & Titles",
    link: "/products/ai-headlines",
    description:
      "Generate catchy headlines and titles for blogs, emails, or news content.",
    icon: <div className="w-6 h-6 bg-pink-400 rounded-full" />,
  },
  {
    title: "AI SEO Optimizer",
    link: "/products/ai-seo-optimizer",
    description:
      "Optimize your content with AI-driven keywords, meta tags, and structure for better visibility.",
    icon: <div className="w-6 h-6 bg-red-400 rounded-full" />,
  },
  {
    title: "Insight Connect",
    link: "/products/insight-connect",
    description:
      "Chat live with real humans for instant help, guidance, or problem-solving through our WebSocket-powered support.",
    icon: <div className="w-6 h-6 bg-teal-400 rounded-full" />,
  },
  {
    title: "API / Integrations",
    link: "/products/api-integrations",
    description:
      "Connect your AI tools to your apps, CMS, or workflows for seamless automation.",
    icon: <div className="w-6 h-6 bg-gray-400 rounded-full" />,
  },
  ];
  return (
    <NavigationMenuItem className="hidden md:flex">
      <NavigationMenuTrigger>Products</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-2 grid-cols-2 w-150">
          {productLinks.map((product) => (
            <ListItem
              key={product.title}
              title={product.title}
              href={product.link}
            >
              {product.description}
            </ListItem>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};
