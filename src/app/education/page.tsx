import React from "react";
import Features from "./components/Fetrues";

import Benefits from "./components/Benefits";
import CTA from "./components/CTA";
import EduHero from "./components/EduHero";
import EduArticles from "./components/EduArticles";

const page = () => {
  return (
    <div>
      <EduHero></EduHero>
      <Features></Features>
      <EduArticles></EduArticles>
      <Benefits />
      <CTA />
    </div>
  );
};

export default page;
