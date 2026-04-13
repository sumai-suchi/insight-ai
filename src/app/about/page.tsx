import React from "react";
import Hero from "./_components/Hero";
import Stats from "./_components/Stats";
import Story from "./_components/Story";
import Values from "./_components/Values";
import Jurney from "./_components/Jurney";
import Team from "./_components/Team";
import Community from "./_components/Community";

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
