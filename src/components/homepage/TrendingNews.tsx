import React from "react";
import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

// type
type Category =
  | "All"
  | "AI"
  | "Technology"
  | "Business"
  | "World"
  | "Health"
  | "Science";

interface NewsItem {
  id: number;
  rank: number;
  title: string;
  description?: string;
  category: Category;
  source: string;
  sourceInitial: string;
  timeAgo: string;
  views: string;
  isHero?: boolean;
  emoji: string;
}

// Mok Data
const newsData: NewsItem[] = [
  {
    id: 1,
    rank: 1,
    title:
      "OpenAI's New Model Can Now Reason Like a Human Expert — Experts Are Stunned",
    description:
      "The latest breakthrough in AI reasoning capabilities is reshaping how we think about machine intelligence. Researchers say this changes everything about how AI systems approach complex problem-solving tasks.",
    category: "AI",
    source: "TechCrunch",
    sourceInitial: "T",
    timeAgo: "3 hours ago",
    views: "128k reads",
    isHero: true,
    emoji: "🤖",
  },
  {
    id: 2,
    rank: 2,
    title: "Apple Plans to Launch AI-Powered Search Engine to Challenge Google",
    category: "Business",
    source: "Bloomberg",
    sourceInitial: "B",
    timeAgo: "5 hours ago",
    views: "84k reads",
    emoji: "🍎",
  },
  {
    id: 3,
    rank: 3,
    title:
      "Scientists Discover New Battery Tech That Charges Phones in 30 Seconds",
    category: "Technology",
    source: "Wired",
    sourceInitial: "W",
    timeAgo: "7 hours ago",
    views: "61k reads",
    emoji: "⚡",
  },
  {
    id: 4,
    rank: 4,
    title: "Global Stock Markets Hit Record Highs Amid AI Investment Surge",
    category: "Business",
    source: "Reuters",
    sourceInitial: "R",
    timeAgo: "9 hours ago",
    views: "47k reads",
    emoji: "📈",
  },
  {
    id: 5,
    rank: 5,
    title:
      "WHO Warns of New Health Risks From Ultra-Processed Foods in Young Adults",
    category: "Health",
    source: "BBC Health",
    sourceInitial: "B",
    timeAgo: "12 hours ago",
    views: "39k reads",
    emoji: "🌿",
  },
];

const categories: Category[] = [
  "All",
  "AI",
  "Technology",
  "Business",
  "World",
  "Health",
  "Science",
];

const categoryEmoji: Record<Category, string> = {
  All: "🌐",
  AI: "🤖",
  Technology: "💻",
  Business: "📈",
  World: "🌍",
  Health: "⚕️",
  Science: "🔬",
};

// animation Variants 

const fadeUp = {
   hidden:{opacity:0 , y:28},
   visible:(i:number) => ({
    opacity:1,
    y:0,
    transition:{delay:i * 0.08 , duration:0.5 ,ease:[0.22,1,0.36,1]}
   })
}

const TrendingNews = () => {
  return <div></div>;
};

export default TrendingNews;

// git add .
// git commit -m "তোমার কাজের বর্ণনা"
// git push origin Sifat-Ullah
