"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authClient } from "@/lib/auth/auth-client";

type SessionData = Awaited<ReturnType<typeof authClient.getSession>>["data"];

type AuthError = {
  code?: string;
  message?: string;
  status: number;
  statusText: string;
};

type AuthContextType = {
  session: SessionData | null;
  error: AuthError | null;
  loading: boolean;
  refreshSession: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<SessionData | null>(null);
  const [error, setError] = useState<AuthError | null>(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch or refresh session
  const refreshSession = async () => {
    setLoading(true);
    try {
      const { data, error } = await authClient.getSession();

      if (error) {
        setError(error);
        setSession(null);
      } else {
        setSession(data);
        setError(null);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError({
          message: err.message,
          status: 500,
          statusText: "Internal Server Error",
        });
      } else {
        setError({
          message: "Unknown error",
          status: 500,
          statusText: "Internal Server Error",
        });
      }
      setSession(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshSession();
  }, []);

  return (
    <AuthContext.Provider value={{ session, error, loading, refreshSession }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context easily
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};