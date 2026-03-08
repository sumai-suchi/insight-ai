import React from "react";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Story from "./components/Story";
import Values from "./components/Values";
import Jurney from "./components/Jurney";
import Team from "./components/Team";
import Community from "./components/Community";

export default function page() {
  return (
    <main className="flex min-h-screen w-full  flex-col items-center justify-center mt-15 gap-10 bg-white dark:bg-black">
      <Hero />
      <Stats />
      <Story />
      <Values />
      <Jurney />
      <Team />
      <Community />
    </main>
  );
}
