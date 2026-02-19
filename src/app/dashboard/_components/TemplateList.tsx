"use client";
import Templates from "@/lib/templates";
import TemplateCard from "./TemplateCard";
import { useEffect } from "react";

export interface TEMPLATE {
  name: string;
  desc: string;
  icon: string;
  category: string;
  slug: string;
  aiPrompt: string;
  form?: FORM[];
}
export interface FORM {
  label: string;
  field: string;
  name: string;
  required?: boolean;
}

function TemplateList({ userSearchInput }: any) {
  const filteredTemplates = Templates.filter((template) => {
    const searchTerm = userSearchInput?.toLowerCase() || "";
    return (
      template.name.toLowerCase().includes(searchTerm) ||
      template.desc.toLowerCase().includes(searchTerm) ||
      template.category.toLowerCase().includes(searchTerm)
    );
  });
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-4 md:p-10">
      {filteredTemplates.map((item: TEMPLATE) => (
        <TemplateCard {...item} key={item.slug} />
      ))}
    </div>
  );
}

export default TemplateList;
