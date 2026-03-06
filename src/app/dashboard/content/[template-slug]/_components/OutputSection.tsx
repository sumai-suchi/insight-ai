"use client";

import Tiptap from "@/components/text-editor";
import React from "react";
import { useTemplateOutput } from "./TemplateOutputContext";

function OutputSection() {
  const { content, isLoading, error } = useTemplateOutput();
  console.log("OutputSection render", { content });
  return (
    <div className="flex flex-col gap-2">
      {isLoading && (
        <p className="text-sm text-muted-foreground">Generating content...</p>
      )}
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Tiptap content={content} />
    </div>
  );
}

export default OutputSection;
