"use client";

import React, { createContext, useContext } from "react";
import authClient from "./auth-client";

type SessionUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

interface SessionContextType {
  user: SessionUser | null;
  loading: boolean;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const { data, isPending } = authClient.useSession();

  const value: SessionContextType = {
    user: data?.user ?? null,
    loading: isPending,
  };

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSessionContext() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSessionContext must be used within a SessionProvider");
  }
  return context;
}

// "use client";

// import React, { createContext, useContext } from "react";
// import { User } from "./auth-client";
// import { useSession as useSessionHook } from "./auth-client";

// interface SessionContextType {
//   user: User | null;
//   loading: boolean;
// }

// const SessionContext = createContext<SessionContextType | undefined>(undefined);

// export function SessionProvider({
//   children,
//   initialUser,
// }: {
//   children: React.ReactNode;
//   initialUser?: User | null;
// }) {
//   const { data, loading } = useSessionHook({ initialUser });

//   return (
//     <SessionContext.Provider value={{ user: data.user, loading }}>
//       {children}
//     </SessionContext.Provider>
//   );
// }

// export function useSessionContext() {
//   const context = useContext(SessionContext);
//   if (context === undefined) {
//     throw new Error("useSessionContext must be used within a SessionProvider");
//   }
//   return context;
// }
