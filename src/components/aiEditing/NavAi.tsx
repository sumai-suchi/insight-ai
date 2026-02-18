"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import React from "react";

const NavAi: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "News", href: "/news" },
    { name: "AI Editor", href: "/ai-editor" },
  ];

  return <div></div>;
};

export default NavAi;
