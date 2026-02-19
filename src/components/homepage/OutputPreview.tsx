"use client";

import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";

export default function OutputPreview() {
   const [text, setText] = useState(
        " "
    );
    return (

        <div className="flex items-center justify-center p-6 bg-gray-100">


            <div className="w-5xl rounded-2xl shadow-lg overflow-hidden bg-gray-800">


                <div className="px-6 py-4 bg-gray-800">
                    <h1 className="text-xl font-bold text-white">
                        Output Preview
                    </h1>
                    <p className="text-sm mt-0.5 text-gray-200">
                        InSight — AI Content Editor
                    </p>
                </div>


                <div className="p-6">


                    <p className="text-base flex items-center gap-2 font-semibold mb-4 text-white">
                        <FaRegEdit className="text-green-500 text-2xl cursor-pointer hover:text-green-700 transition duration-200" /> Edit your generated content below
                    </p>


                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        rows={10}
                        className="w-full rounded-xl p-4 text-base resize-none outline-none transition
                       text-gray-50 bg-gray-700 border border-gray-300
                       focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        placeholder="Your generated content will appear here..."
                    />


                    <p className="text-xs mt-1 mb-5 text-white">
                         words ·  characters
                    </p>


                    <div className="flex flex-wrap gap-3">


                        <button
                            onClick=
                            className={`flex cursor-pointer items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition text-white
                ${copied
                                    ? "bg-emerald-500"
                                    : "bg-blue-500 hover:bg-blue-600"
                                }`}
                        >
                            {copied ? "✅ Copied!" : "Copy"}
                        </button>


                        <button
                            onClick=
                            className="flex cursor-pointer items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition
                         bg-amber-400 hover:bg-amber-500 text-gray-800"
                        >
                            Download
                        </button>


                        <button
                            onClick=
                            className="flex cursor-pointer items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition
                         bg-emerald-500 hover:bg-emerald-600 text-white"
                        >
                            {saved ? "✅ Saved!" : "Save"}
                        </button>

                    </div>


                    {saved && (
                        <div className="mt-4 px-4 py-3 rounded-lg text-sm font-medium
                            bg-emerald-50 text-emerald-800 border border-emerald-400">
                            ✅ Content saved successfully!
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}