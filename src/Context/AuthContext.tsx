"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { authClient } from "@/lib/auth/auth-client";

type AuthContextType = {
  session: ReturnType<typeof authClient.useSession>["data"];
  error: ReturnType<typeof authClient.useSession>["error"];
  loading: boolean;
  refreshSession: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

  const { data: session, error, isPending: loading, refetch } =
    authClient.useSession();

  const refreshSession = async () => {
    await refetch?.();
  };

  const value: AuthContextType = {
    session,
    error,
    loading,
    refreshSession,
  };

  console.log("AuthContext value:", value);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};