import React from "react";

export default function Page() {
  return (
    <div className="flex flex-col lg:flex-row gap-6 p-10">
      <div className="h-full w-full lg:w-1/2 border bg-white rounded-lg p-6">
        <h2 className="text-2xl font-bold">Plagiarism Checker</h2>
        <p className="text-sm text-gray-500">Check your text for plagiarism</p>
      </div>
      <div className="h-full w-full lg:w-1/2 border bg-white rounded-lg p-6">
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
