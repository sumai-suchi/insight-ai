// import { TEMPLATE } from "../../TemplateList";
// import Templates from "@/lib/templates";
// import CreateNewContentClient from "./_components/CreateNewContentClient";

// interface PROPS {
//   params: Promise<{ "template-slug": string }>;
// }

// async function CreateNewContent(props: PROPS) {
//   const params = await props.params;
//   const selectedTemplate: TEMPLATE | undefined = Templates?.find(
//     (item) => item.slug == params["template-slug"],
//   );

//   return <CreateNewContentClient selectedTemplate={selectedTemplate} />;
// }

// export default CreateNewContent;
import { TEMPLATE } from "../../TemplateList";
import Templates from "@/lib/templates";
import CreateNewContentClient from "./_components/CreateNewContentClient";

interface PROPS {
  params: Promise<{ "template-slug": string }>;
}

async function CreateNewContent(props: PROPS) {
  const params = await props.params;
  const selectedTemplate: TEMPLATE | undefined = Templates?.find(
    (item) => item.slug == params["template-slug"],
  );

  return (
    <div className="min-h-screen bg-[#0c234b] py-12">
      <div className="max-w-7xl mx-auto px-6">
        <CreateNewContentClient selectedTemplate={selectedTemplate} />
      </div>
    </div>
  );
}

export default CreateNewContent;
