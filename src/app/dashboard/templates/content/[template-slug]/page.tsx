import { TEMPLATE } from "../../TemplateList"
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
    <CreateNewContentClient selectedTemplate={selectedTemplate} />
  );
}

export default CreateNewContent;
