// "use client";

// import Tiptap from "@/components/text-editor";
// import React from "react";
// import { useTemplateOutput } from "./TemplateOutputContext";

// function OutputSection() {
//   const { content, isLoading, error } = useTemplateOutput();
//   console.log("OutputSection render", { content });
//   return (
//     <div className="flex flex-col gap-2">
//       {isLoading && (
//         <p className="text-sm text-muted-foreground">Generating content...</p>
//       )}
//       {error && <p className="text-sm text-destructive">{error}</p>}
//       <Tiptap content={content} />
//     </div>
//   );
// }

// export default OutputSection;
"use client";

import Tiptap from "@/components/text-editor";
import React from "react";
import { useTemplateOutput } from "./TemplateOutputContext";

function OutputSection() {
  const { content, isLoading, error } = useTemplateOutput();

  return (
    <div className="bg-[#0F2854] border border-white/10 rounded-3xl p-8 min-h-[600px] flex flex-col">
      {/* Status Messages */}
      {isLoading && (
        <div className="mb-6 p-4 bg-[#0c234b] border border-[#1C4D8D]/30 rounded-2xl text-center">
          <p className="text-[#1C4D8D] font-medium">Generating content...</p>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-950/50 border border-red-500/30 rounded-2xl">
          <p className="text-red-400 font-medium">{error}</p>
        </div>
      )}

      {/* Tiptap Editor Container */}
      <div className="flex-1 bg-[#0c234b] border border-white/10 rounded-2xl overflow-hidden">
        <Tiptap content={content} />
      </div>
    </div>
  );
}

export default OutputSection;
