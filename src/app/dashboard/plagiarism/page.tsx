import Tiptap from "@/components/text-editor";
import React from "react";

export default function Page() {
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="h-full w-full lg:w-2/3  border-r border-gray-200 pt-6 px-6">
        <h2 className="text-2xl font-bold">Plagiarism Checker</h2>
        <p className="text-sm text-gray-500 mb-4">
          Check your text for plagiarism
        </p>
        <Tiptap />
      </div>
      <div className="h-screen w-full lg:w-1/3 border p-6 bg-white">
        <h2 className="text-2xl font-bold">Plagiarism Checker</h2>
        <p className="text-sm text-gray-500">Check your text for plagiarism</p>
        <div className="flex flex-col gap-2">
          <input type="text" className="w-full p-2 border rounded-lg" />
          <button className="bg-blue-500 text-white p-2 rounded-lg">
            Check
          </button>
        </div>
      </div>
    </div>
  );
}
