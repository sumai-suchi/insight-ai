"use client";
import { useState } from "react";
import SearchSection from "./SearchSection";
import TemplateList from "./TemplateList";

function Templates() {
  const [userSearchInput, setUserSearchInput] = useState<string>();
  return (
    <section className="flex flex-col bg-[#4988C4]">
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
