"use client";

import React, { useState, useRef, useEffect, FormEvent } from "react";
import ReactMarkdown from "react-markdown";
import { FaComments, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface ChatMessage {
  sender: "user" | "assistant";
  text: string;
}

interface ChatBoxProps {
  open?: boolean;
  onToggle?: () => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({ open: openProp, onToggle }) => {
  const [openState, setOpenState] = useState(false);
  const open = openProp !== undefined ? openProp : openState;

  useEffect(() => {
    if (openProp !== undefined) {
      setOpenState(openProp);
    }
  }, [openProp]);

  const toggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setOpenState((o) => !o);
    }
  };
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const suggestions = [
    "Elevate Your Content with an Advanced SEO Writer",
    "Best AI Writer for Content Creators and Marketers in 2026",
    "Supercharge Your Blog Topics with a Smart Content Ideation Tool",
    "How to Write Trending Articles Fast and Stay Relevant",
    "Secrets to Boost Blog Traffic with AI SEO Optimization",
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    const userMsg: ChatMessage = { sender: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // insert a placeholder bot message which we'll update as chunks arrive
    setMessages((prev) => [...prev, { sender: "assistant", text: "" }]);

    setLoading(true);
    try {
      const res = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            ...messages.map((m) => ({
              role: m.sender === "user" ? "user" : "assistant",
              content: m.text,
            })),
            { role: "user", content: text },
          ],
        }),
      });

      if (!res.body) throw new Error("No response body");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          const chunk = decoder.decode(value);
          setMessages((prev) => {
            const updated = [...prev];
            const lastIndex = updated.length - 1;
            updated[lastIndex] = {
              sender: "assistant",
              text: updated[lastIndex].text + chunk,
            };
            return updated;
          });
        }
      }

      // once complete, try to unwrap JSON wrapper if present
      setMessages((prev) => {
        const updated = [...prev];
        const lastIndex = updated.length - 1;
        try {
          const parsed = JSON.parse(updated[lastIndex].text);
          if (parsed && typeof parsed.text === "string") {
            updated[lastIndex].text = parsed.text;
          }
        } catch {}
        return updated;
      });
    } catch (err) {
      console.error(err);
      setMessages((prev) => {
        const updated = [...prev];
        const lastIndex = updated.length - 1;
        updated[lastIndex] = {
          sender: "assistant",
          text: "An error occurred. Please try again.",
        };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  // when panel is open we slide it in from the right; otherwise show a small button
  const panelContainerClass = `fixed inset-y-0 right-0 left-auto z-50 w-full md:w-1/2 lg:w-1/3 transform transition-transform duration-300 flex flex-col
    ${open ? "translate-x-0" : "translate-x-full"}`;

  const panelClass =
    "relative flex flex-col bg-white shadow-lg overflow-hidden h-full flex-1";

  if (!open) {
    // show a floating open button when closed
    return (
      <button
        onClick={toggle}
        className="fixed bottom-4 right-4 z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none"
        aria-label="Open chat"
      >
        <FaComments />
      </button>
    );
  }

  // panel open
  return (
    <div className={panelContainerClass}>
      <div className={panelClass}>
        <div className="flex items-center justify-between h-12 bg-blue-600 text-white px-3">
          <span className="font-semibold">Chat</span>
          <button
            className="focus:outline-none"
            onClick={toggle}
            aria-label="Close chat"
          >
            <FaTimes />
          </button>
        </div>

        <motion.div
          key="chat-window"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="flex min-h-0 flex-col flex-1 bg-white"
        >
          <div className="flex-1 p-4 pb-20 space-y-2 overflow-y-auto scroll-smooth">
            {messages.length === 0 ? (
              <div className="space-y-2">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    className="w-full text-left px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                    onClick={() => setInput(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            ) : (
              messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{
                    opacity: 0,
                    x: m.sender === "assistant" ? -20 : 20,
                  }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`max-w-[80%] p-2 rounded-md wrap-break-word whitespace-pre-wrap 
                      ${
                        m.sender === "user"
                          ? "ml-auto bg-blue-100 text-black"
                          : "mr-auto bg-gray-100 text-gray-900"
                      }`}
                >
                  {m.sender === "assistant" ? (
                    <ReactMarkdown>{m.text}</ReactMarkdown>
                  ) : (
                    m.text
                  )}
                </motion.div>
              ))
            )}
            {loading && (
              <div className="text-gray-500 animate-pulse">Typing...</div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex items-center border-t border-gray-200 p-2 absolute bottom-0 left-0 right-0 bg-white"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ask me about the site..."
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-blue-600 text-white px-4 py-2 rounded-r-md disabled:opacity-50 hover:bg-blue-700 transition"
            >
              Send
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ChatBox;
