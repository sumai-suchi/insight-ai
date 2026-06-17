"use client";

import React, {
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";

type TemplateOutputContextValue = {
  content: string;
  setContent: (value: string) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  error: string | null;
  setError: (value: string | null) => void;
};

const TemplateOutputContext = createContext<
  TemplateOutputContextValue | undefined
>(undefined);

export function TemplateOutputProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const value: TemplateOutputContextValue = {
    content,
    setContent,
    isLoading,
    setIsLoading,
    error,
    setError,
  };

  return (
    <TemplateOutputContext.Provider value={value} >
      {children}
    </TemplateOutputContext.Provider>
  );
}

export function useTemplateOutput() {
  const ctx = useContext(TemplateOutputContext);
  if (!ctx) {
    throw new Error(
      "useTemplateOutput must be used within a TemplateOutputProvider",
    );
  }
  return ctx;
}

