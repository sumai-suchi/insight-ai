"use client";
import { useState } from "react";
import SearchSection from "./_components/SearchSection";
import TemplateList from "./_components/TemplateList";

function Dashboard() {
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

export default Dashboard;
