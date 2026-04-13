"use client";
import { useState } from "react";
import SearchSection from "./SearchSection";
import TemplateList from "./TemplateList";

function Templates() {
  const [userSearchInput, setUserSearchInput] = useState<string>();
  return (
    <section
      className="flex flex-col min-h-screen"
      style={{ background: "#0c234b" }}
    >
      <SearchSection
        onSearchInput={(value: string) => setUserSearchInput(value)}
      />
      <div className="flex-1 flex flex-col">
        <TemplateList userSearchInput={userSearchInput} />
      </div>
    </section>
  );
}

export default Templates;
