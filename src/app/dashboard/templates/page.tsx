"use client";
import { useState } from "react";
import SearchSection from "./SearchSection";
import TemplateList from "./TemplateList";

function Templates() {
  const [userSearchInput, setUserSearchInput] = useState<string>();
  return (
    <section className="flex flex-col bg-white">
      <SearchSection
        onSearchInput={(value: string) => setUserSearchInput(value)}
      />
      <TemplateList userSearchInput={userSearchInput} />
    </section>
  );
}

export default Templates;
