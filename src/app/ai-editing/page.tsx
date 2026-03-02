import AiEditingInfo from "@/components/aiEditing/AiEditingInfo";
import HeroAi from "@/components/aiEditing/HeroAi";
// import RevisionHistory from "@/components/aiEditing/RevisionHistory";
import React from "react";

const aiEditing = () => {
  return (
    <div className="max-w-7xl mx-auto pt-16 px-6">
      <HeroAi />
      <AiEditingInfo />
      {/* <RevisionHistory /> */}
    </div>
  );
};

export default aiEditing;
