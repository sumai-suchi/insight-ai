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
      title: "AI Text Detector",
      link: "/products/ai-text-detector",
      description:
        "Detect AI content made with the most advanced AI writing tools such as ChatGPT, Google Gemini, Claude and much more.",
      icon: <div className="w-6 h-6 bg-gray-300 rounded-full" />,
    },
    {
      title: "Writing Feedback",
      link: "/products/writing-feedback",
      description:
        "Get instant, easy-to-implement insights to supercharge your content.",
      icon: <div className="w-6 h-6 bg-gray-300 rounded-full" />,
    },
    {
      title: "Plagiarism Checker",
      link: "/products/plagiarism-checker",
      description:
        "Ensure the originality of your content with our cutting-edge plagiarism detection technology.",
      icon: <div className="w-6 h-6 bg-gray-300 rounded-full" />,
    },
    {
      title: "HUMN-1 Website Certification",
      link: "/products/humn-1-certification",
      description:
        "The first website certification. Boost your engagements, foster trust with your audience, and outrank AI generated content on search engines.",
      icon: <div className="w-6 h-6 bg-gray-300 rounded-full" />,
    },
    {
      title: "AI Image Detector",
      link: "/products/ai-image-detector",
      description:
        "Detect Images and Deepfakes generated with Midjourney, DALL-E, Stable diffusion and more.",
      icon: <div className="w-6 h-6 bg-gray-300 rounded-full" />,
    },
    {
      title: "Fact Checker Tool",
      link: "/products/fact-checker-tool",
      description:
        "Instantly verify facts, spot misinformation, and detect AI hallucinations in your content.",
      icon: <div className="w-6 h-6 bg-gray-300 rounded-full" />,
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
