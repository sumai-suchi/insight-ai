"use client";

import Tiptap from "@/components/text-editor";
import React from "react";
import { useTemplateOutput } from "./TemplateOutputContext";

function OutputSection() {
  const { content, isLoading, error } = useTemplateOutput();
<<<<<<< HEAD

=======
  console.log("OutputSection render", { content });
>>>>>>> a56ed66d779f646390a604e106be8e704d2e0431
  return (
    <div className="flex flex-col gap-2">
      {isLoading && (
        <p className="text-sm text-muted-foreground">Generating content...</p>
      )}
<<<<<<< HEAD
      {error && (
        <p className="text-sm text-destructive">
          {error}
        </p>
      )}
=======
      {error && <p className="text-sm text-destructive">{error}</p>}
>>>>>>> a56ed66d779f646390a604e106be8e704d2e0431
      <Tiptap content={content} />
    </div>
  );
}

export default OutputSection;
