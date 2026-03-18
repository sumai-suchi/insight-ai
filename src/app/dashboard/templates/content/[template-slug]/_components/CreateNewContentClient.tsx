"use client";

import React from "react";
import FormSection from "./FormSection";
import OutputSection from "./OutputSection";

import { TemplateOutputProvider } from "./TemplateOutputContext";
import { TEMPLATE } from "../../../TemplateList";

interface PROPS {
  selectedTemplate?: TEMPLATE;
}

function CreateNewContentClient({ selectedTemplate }: PROPS) {
  return (
    <TemplateOutputProvider>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 p-5">
        <FormSection selectedTemplate={selectedTemplate} />
        <OutputSection />
      </div>
    </TemplateOutputProvider>
  );
}

export default CreateNewContentClient;
