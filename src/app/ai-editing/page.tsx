import HeroAi from "@/components/aiEditing/HeroAi";
import NavAi from "@/components/aiEditing/NavAi";
import RevisionHistory from "@/components/aiEditing/RevisionHistory";
import React from "react";

const aiEditing = () => {
  return (
    <div>
      {/* <NavAi /> */}

      <HeroAi />
      <RevisionHistory />
    </div>
  );
};

export default aiEditing;
