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
}

export const Products = () => {
  const productLinks: ProductLinks[] = [
    {
      title: "AI Content Writer",
      link: "/dashboard/templates",

      description: "Write blogs, newsletters, and social media posts.",
    },
    {
      title: "Articles",
      link: "/all-articles", // This is the main articles/news page
      description: "Create, read, and manage high-quality articles.",
    },
    {
      title: "AI News Digest",
      link: "/news",
      description: "Summarize trending news and articles daily, curated by AI.",
    },
    {
      title: "AI Summarizer",
      link: "/products/ai-summarizer",
      description: "Condense long articles, reports, and research papers.",
    },

    {
      title: "AI SEO Optimizer",
      link: "/Project-Dashboard/editorDashboard/editeArticle",
      description: "Optimize your content with AI-driven keywords.",
    },

    {
      title: "API / Integrations",
      link: "/ai-editor",
      description: "Connect your AI tools to your apps, CMS, or workflows.",
    },
  ];
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>Product</NavigationMenuTrigger>
      <NavigationMenuContent className="bg-black p-5">
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-2 w-96 bg-black text-white">
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
