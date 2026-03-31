// "use client";
// import { TEMPLATE } from "../../../TemplateList";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import Image from "next/image";
// import React from "react";
// import { useTemplateOutput } from "./TemplateOutputContext";
// interface PROPS {
//   selectedTemplate?: TEMPLATE;
// }
// function FormSection({ selectedTemplate }: PROPS) {
//   const { setContent, setIsLoading, setError } = useTemplateOutput();

//   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);
//     const data: { [key: string]: string } = {};
//     for (const [key, value] of formData.entries()) {
//       data[key] = value as string;
//     }

//     if (!selectedTemplate?.aiPrompt) {
//       setError("No template prompt found.");
//       return;
//     }

//     // Build a human-readable summary of the user inputs using the template form labels.
//     const userInputsSummary =
//       selectedTemplate.form
//         ?.map((field) => {
//           const value = data[field.name] || "";
//           return `${field.label}: ${value}`;
//         })
//         .join("\n") || JSON.stringify(data, null, 2);

//     // ask the model to return markdown-formatted text suitable for the Tiptap editor
//     const fullPrompt = `${selectedTemplate.aiPrompt}\n\nUser Inputs:\n${userInputsSummary}\n\nPlease write the response in **HTML tags**.
//     Use headings, lists, bold/italic, line breaks, and proper indentation so that the text renders nicely in a
//      markdown-aware editor (Tiptap will display it with appropriate spacing and size). start with a heading that includes the main topic.
//       Avoid using generic phrases like "As an AI language model".`;

//     try {
//       setIsLoading(true);
//       setError(null);
//       setContent("");

//       const response = await fetch("/api/gemini/stream", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ prompt: fullPrompt }),
//       });

//       if (!response.ok || !response.body) {
//         throw new Error("Failed to generate content");
//       }

//       const reader = response.body.getReader();
//       const decoder = new TextDecoder();
//       let done = false;
//       let accumulated = "";

//       while (!done) {
//         const result = await reader.read();
//         done = result.done ?? false;

//         if (result.value) {
//           const chunkText = decoder.decode(result.value, { stream: !done });
//           if (chunkText) {
//             accumulated += chunkText;
//             setContent(accumulated);
//           }
//         }
//       }
//     } catch (error) {
//       console.error("Error generating content", error);
//       setError("Failed to generate content. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   return (
//     <div className="p-5 shadow-md border rounded-lg">
//       <Image
//         src={selectedTemplate?.icon || "/default-icon.png"}
//         alt="icon"
//         width={70}
//         height={70}
//       />
//       <h2 className="text-xl font-bold mt-2 text-primary">
//         {selectedTemplate?.name}
//       </h2>
//       <p className="text-sm text-gray-500 mt-2">{selectedTemplate?.desc}</p>
//       <form onSubmit={onSubmit} className="mt-6">
//         {selectedTemplate?.form?.map((field, index) => (
//           <div key={index} className="my-4 flex flex-col gap-2 mb-7">
//             <label
//               htmlFor={field.name}
//               className="block  font-semibold text-gray-700"
//             >
//               {field.label}
//             </label>
//             {field.field == "input" ? (
//               <Input name={field.name} />
//             ) : field.field == "textarea" ? (
//               <textarea
//                 name={field.name}
//                 className="w-full mt-1 p-2 border rounded-md"
//               />
//             ) : null}
//           </div>
//         ))}
//         <Button type="submit" className="bg-primary text-white w-full py-6">
//           Generate Content
//         </Button>
//       </form>
//     </div>
//   );
// }

// export default FormSection;
"use client";
import { TEMPLATE } from "../../../TemplateList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";
import { useTemplateOutput } from "./TemplateOutputContext";

interface PROPS {
  selectedTemplate?: TEMPLATE;
}

function FormSection({ selectedTemplate }: PROPS) {
  const { setContent, setIsLoading, setError } = useTemplateOutput();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: { [key: string]: string } = {};
    for (const [key, value] of formData.entries()) {
      data[key] = value as string;
    }

    if (!selectedTemplate?.aiPrompt) {
      setError("No template prompt found.");
      return;
    }

    const userInputsSummary =
      selectedTemplate.form
        ?.map((field) => {
          const value = data[field.name] || "";
          return `${field.label}: ${value}`;
        })
        .join("\n") || JSON.stringify(data, null, 2);

    const fullPrompt = `${selectedTemplate.aiPrompt}\n\nUser Inputs:\n${userInputsSummary}\n\nPlease write the response in **HTML tags**. 
    Use headings, lists, bold/italic, line breaks, and proper indentation so that the text renders nicely in a
     markdown-aware editor (Tiptap will display it with appropriate spacing and size). start with a heading that includes the main topic.
      Avoid using generic phrases like "As an AI language model".`;

    try {
      setIsLoading(true);
      setError(null);
      setContent("");

      const response = await fetch("/api/gemini/stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: fullPrompt }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Failed to generate content");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let accumulated = "";

      while (!done) {
        const result = await reader.read();
        done = result.done ?? false;

        if (result.value) {
          const chunkText = decoder.decode(result.value, { stream: !done });
          if (chunkText) {
            accumulated += chunkText;
            setContent(accumulated);
          }
        }
      }
    } catch (error) {
      console.error("Error generating content", error);
      setError("Failed to generate content. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 bg-[#0F2854] border border-white/10 rounded-3xl shadow-xl text-white">
      {/* Icon & Title */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1C4D8D] to-[#0F2854] flex items-center justify-center flex-shrink-0">
          <Image
            src={selectedTemplate?.icon || "/default-icon.png"}
            alt="icon"
            width={70}
            height={70}
            className="rounded-xl"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            {selectedTemplate?.name}
          </h2>
          <p className="text-gray-400 mt-1 text-lg">{selectedTemplate?.desc}</p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-8">
        {selectedTemplate?.form?.map((field, index) => (
          <div key={index} className="flex flex-col gap-3">
            <label
              htmlFor={field.name}
              className="block font-semibold text-gray-300 text-base"
            >
              {field.label}
            </label>

            {field.field === "input" ? (
              <Input
                name={field.name}
                className="bg-[#0c234b] border border-white/20 text-white placeholder:text-gray-500 focus:border-[#1C4D8D] h-12 rounded-2xl px-5"
              />
            ) : field.field === "textarea" ? (
              <textarea
                name={field.name}
                className="w-full h-32 bg-[#0c234b] border border-white/20 text-white placeholder:text-gray-500 focus:border-[#1C4D8D] rounded-3xl p-5 resize-y min-h-[120px]"
              />
            ) : null}
          </div>
        ))}

        {/* Generate Button */}
        <Button
          type="submit"
          className="w-full py-7 bg-[#1C4D8D] hover:bg-white hover:text-[#0F2854] text-lg font-semibold rounded-2xl transition-all duration-300 shadow-lg"
        >
          Generate Content
        </Button>
      </form>
    </div>
  );
}

export default FormSection;
