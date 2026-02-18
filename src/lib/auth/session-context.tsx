"use client";

import React, { createContext, useContext } from "react";
import { User } from "./auth-client";
import { useSession as useSessionHook } from "./auth-client";

interface SessionContextType {
  user: User | null;
  loading: boolean;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser?: User | null;
}) {
  const { data, loading } = useSessionHook({ initialUser });

  return (
    <SessionContext.Provider value={{ user: data.user, loading }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSessionContext() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSessionContext must be used within a SessionProvider");
  }
  return context;
}
