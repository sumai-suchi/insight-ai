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
      description: "Write blogs, newsletters, and social media posts.",
      icon: <div className="w-6 h-6 bg-blue-400 rounded-full" />,
    },
    {
      title: "Articles",
      link: "/articles", // This is the main articles/news page
      description: "Create, read, and manage high-quality articles.",
      icon: <div className="w-6 h-6 bg-green-400 rounded-full" />,
    },
    {
      title: "AI News Digest",
      link: "/news",
      description: "Summarize trending news and articles daily, curated by AI.",
      icon: <div className="w-6 h-6 bg-yellow-400 rounded-full" />,
    },
    {
      title: "AI Summarizer",
      link: "/products/ai-summarizer",
      description: "Condense long articles, reports, and research papers.",
      icon: <div className="w-6 h-6 bg-purple-400 rounded-full" />,
    },
    {
      title: "AI Headlines & Titles",
      link: "/products/ai-headlines",
      description: "Generate catchy headlines and titles.",
      icon: <div className="w-6 h-6 bg-pink-400 rounded-full" />,
    },
    {
      title: "AI SEO Optimizer",
      link: "/products/ai-seo-optimizer",
      description: "Optimize your content with AI-driven keywords.",
      icon: <div className="w-6 h-6 bg-red-400 rounded-full" />,
    },
    // {
    //   title: "Insight Connect",
    //   link: "/products/insight-connect",
    //   description: "Chat live with real humans for instant help or guidance.",
    //   icon: <div className="w-6 h-6 bg-teal-400 rounded-full" />,
    // },
    // {
    //   title: "API / Integrations",
    //   link: "/products/api-integrations",
    //   description: "Connect your AI tools to your apps, CMS, or workflows.",
    //   icon: <div className="w-6 h-6 bg-gray-400 rounded-full" />,
    // },
  ];
  return (
    <NavigationMenuItem className="w-full">
      <NavigationMenuTrigger className="w-full">Products</NavigationMenuTrigger>
      <NavigationMenuContent className="w-500px">
        <ul className="grid  grid-cols-1 md:grid-cols-3 gap-2 w-200   ">
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
