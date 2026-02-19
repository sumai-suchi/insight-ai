import React from "react";
import FormSection from "./_components/FormSection";
import OutputSection from "./_components/OutputSection";
import { TEMPLATE } from "../../_components/TemplateList";
import Templates from "@/lib/templates";

interface PROPS {
  params: Promise<{ "template-slug": string }>;
}

async function CreateNewContent(props: PROPS) {
  const params = await props.params;
  const selectedTemplate: TEMPLATE | undefined = Templates?.find(
    (item) => item.slug == params["template-slug"],
  );
  //   console.log("Templates List:", Templates);
  //   console.log("Received Props:", props);
  //   console.log("Template Slug:", params["template-slug"]);
  //   console.log("Selected Template:", selectedTemplate);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 p-5">
      <FormSection selectedTemplate={selectedTemplate} />
      <OutputSection />
    </div>
  );
}

export default CreateNewContent;
