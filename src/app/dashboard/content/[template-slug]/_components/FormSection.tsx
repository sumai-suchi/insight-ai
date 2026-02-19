"use client";
import { TEMPLATE } from "@/app/dashboard/_components/TemplateList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";
interface PROPS {
  selectedTemplate?: TEMPLATE;
}
function FormSection({ selectedTemplate }: PROPS) {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: { [key: string]: string } = {};
    for (const [key, value] of formData.entries()) {
      data[key] = value as string;
    }
  };
  return (
    <div className="p-5 shadow-md border rounded-lg">
      <Image
        src={selectedTemplate?.icon || "/default-icon.png"}
        alt="icon"
        width={70}
        height={70}
      />
      <h2 className="text-xl font-bold mt-2 text-primary">
        {selectedTemplate?.name}
      </h2>
      <p className="text-sm text-gray-500 mt-2">{selectedTemplate?.desc}</p>
      <form onSubmit={onSubmit} className="mt-6">
        {selectedTemplate?.form?.map((field, index) => (
          <div key={index} className="my-4 flex flex-col gap-2 mb-7">
            <label
              htmlFor={field.name}
              className="block  font-semibold text-gray-700"
            >
              {field.label}
            </label>
            {field.field == "input" ? (
              <Input name={field.name} />
            ) : field.field == "textarea" ? (
              <textarea
                name={field.name}
                className="w-full mt-1 p-2 border rounded-md"
              />
            ) : null}
          </div>
        ))}
        <Button type="submit" className="bg-primary text-white w-full py-6">
          Generate Content
        </Button>
      </form>
    </div>
  );
}

export default FormSection;
