"use client";

import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { motion } from "framer-motion";

export default function OutputPreview() {
    const [text, setText] = useState(" ");
    const [copied, setCopied] = useState(false);
    const [saved, setSaved] = useState(false);

    // Copy text to clipboard
    const handleCopy = async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Download text as a .txt file
    const handleDownload = () => {
        const blob = new Blob([text], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "output.txt";
        a.click();
        URL.revokeObjectURL(url);
    };

    // Save — shows a success confirmation
    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    // Word & character count
    const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
    const charCount = text.length;

    return (
        <motion.div
            className="flex items-center justify-center p-6 bg-gray-100 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <div className="px-6 py-5 bg-[#F9FAFB] border-b border-gray-700">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-500 mb-1 block">
                    AI Content Editor
                </span>
                <h1 className="text-2xl font-bold text-[#3B82F6] leading-tight">
                    Your Output, <span className="text-black">Perfected.</span>
                </h1>
                <p className="text-sm mt-1 text-black">
                    Edit, copy, or download your generated content below
                </p>
            </div>

            <motion.div
                className="w-5xl rounded-2xl shadow-lg overflow-hidden bg-gray-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <div className="px-6 py-4 bg-gray-100">
                    <h1 className="text-xl font-bold text-black">
                        Output Preview
                    </h1>
                    <p className="text-sm mt-0.5 text-black">
                        InSight — AI Content Editor
                    </p>
                </div>

                <div className="p-6">
                    <p className="text-base flex items-center gap-2 font-semibold mb-4 text-black">
                        <FaRegEdit className="text-green-500 text-2xl cursor-pointer hover:text-green-700 transition duration-200" /> Edit your generated content below
                    </p>

                    <motion.textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        rows={10}
                        className="w-full rounded-xl p-4 text-base resize-none outline-none transition
                           text-black bg-white border border-gray-300
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        placeholder="Your generated content will appear here..."
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    />

                    <p className="text-xs mt-1 mb-5 text-black">
                        {wordCount} words · {charCount} characters
                    </p>

                    <div className="flex flex-wrap gap-3">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleCopy}
                            className={`flex cursor-pointer items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition text-white
                                ${copied ? "bg-emerald-500" : "bg-blue-500 hover:bg-blue-600"}`}
                        >
                            {copied ? "✅ Copied!" : "Copy"}
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleDownload}
                            className="flex cursor-pointer items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition
                             bg-amber-400 hover:bg-amber-500 text-gray-800"
                        >
                            Download
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleSave}
                            className="flex cursor-pointer items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition
                             bg-emerald-500 hover:bg-emerald-600 text-white"
                        >
                            {saved ? "✅ Saved!" : "Save"}
                        </motion.button>
                    </div>

                    {saved && (
                        <motion.div
                            className="mt-4 px-4 py-3 rounded-lg text-sm font-medium
                                bg-emerald-50 text-emerald-800 border border-emerald-400"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            ✅ Content saved successfully!
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}
