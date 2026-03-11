"use client";

import React, { createContext, useContext, ReactNode } from "react";
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

  const {
    data: session,
    isPending: loading,
    error,
    refetch,
  } = authClient.useSession();

  const refreshSession = async () => {
    await refetch();
  };

  return (
    <AuthContext.Provider
      value={{
        session: session ?? null,
        error: (error as AuthError | null) ?? null,
        loading,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
