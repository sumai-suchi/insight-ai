"use client";

import React from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin" | "Author";
  photoURL?: string;
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  sessionToken?: string;
  refreshToken?: string;
  error?: string;
}

/**
 * Sign up with email and password
 */
export async function signUp(data: {
  name: string;
  email: string;
  password: string;
  role?: "user" | "admin" | "Author";
  photoURL?: string;
}): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || "Failed to sign up",
      };
    }

    // Store tokens in localStorage for client-side access
    if (result.sessionToken) {
      localStorage.setItem("sessionToken", result.sessionToken);
    }
    if (result.refreshToken) {
      localStorage.setItem("refreshToken", result.refreshToken);
    }

    // Notify other parts of the app that auth changed (same-tab)
    if (typeof window !== "undefined") {
      try {
        window.dispatchEvent(
          new CustomEvent("auth-change", { detail: { user: result.user ?? null } }),
        );
      } catch (err) {
        // ignore
      }
    }

    // Notify other parts of the app that auth changed
    if (typeof window !== "undefined") {
      try {
        window.dispatchEvent(
          new CustomEvent("auth-change", { detail: { user: result.user ?? null } }),
        );
      } catch (err) {
        // ignore
      }
    }

    // Notify other parts of the app that auth changed
    if (typeof window !== "undefined") {
      try {
        window.dispatchEvent(
          new CustomEvent("auth-change", {
            detail: { user: result.user ?? null },
          }),
        );
      } catch (err) {
        // ignore
      }
    }

    return {
      success: true,
      user: result.user,
      sessionToken: result.sessionToken,
      refreshToken: result.refreshToken,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

/**
 * Sign in with email and password
 */
export async function signIn(data: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || "Failed to sign in",
      };
    }

    // Store tokens in localStorage for client-side access
    if (result.sessionToken) {
      localStorage.setItem("sessionToken", result.sessionToken);
    }
    if (result.refreshToken) {
      localStorage.setItem("refreshToken", result.refreshToken);
    }

    return {
      success: true,
      user: result.user,
      sessionToken: result.sessionToken,
      refreshToken: result.refreshToken,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

/**
 * Sign out
 */
export async function signOut(): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/sign-out`, {
      method: "POST",
      credentials: "include",
    });

    // Clear tokens from localStorage
    localStorage.removeItem("sessionToken");
    localStorage.removeItem("refreshToken");

    // Notify listeners that auth changed (signed out)
    if (typeof window !== "undefined") {
      try {
        window.dispatchEvent(
          new CustomEvent("auth-change", { detail: { user: null } }),
        );
      } catch (err) {
        // ignore
      }
    }

    if (!response.ok) {
      const result = await response.json();
      return {
        success: false,
        error: result.error || "Failed to sign out",
      };
    }

    return { success: true };
  } catch (error) {
    // Clear tokens even if request fails
    localStorage.removeItem("sessionToken");
    localStorage.removeItem("refreshToken");
    // Notify listeners that auth changed (signed out/failed)
    if (typeof window !== "undefined") {
      try {
        window.dispatchEvent(
          new CustomEvent("auth-change", { detail: { user: null } }),
        );
      } catch (err) {
        // ignore
      }
    }
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

/**
 * Get current user session
 */
export async function getSession(): Promise<{
  success: boolean;
  user?: User;
  error?: string;
}> {
  try {
    const token = localStorage.getItem("sessionToken");
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
      credentials: "include",
    });

    const result = await response.json();

    if (!response.ok) {
      // Try to refresh token if session token is expired
      if (response.status === 401) {
        const refreshed = await refreshToken();
        if (refreshed.success) {
          // Retry with new token
          return getSession();
        }
      }
      return {
        success: false,
        error: result.error || "Failed to get session",
      };
    }

    return {
      success: true,
      user: result.user,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

/**
 * Refresh access token
 */
export async function refreshToken(): Promise<{
  success: boolean;
  sessionToken?: string;
  refreshToken?: string;
  error?: string;
}> {
  try {
    const refreshTokenValue = localStorage.getItem("refreshToken");
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken: refreshTokenValue }),
      credentials: "include",
    });

    const result = await response.json();

    if (!response.ok) {
      // Clear tokens if refresh fails
      localStorage.removeItem("sessionToken");
      localStorage.removeItem("refreshToken");
      return {
        success: false,
        error: result.error || "Failed to refresh token",
      };
    }

    // Update tokens in localStorage
    if (result.sessionToken) {
      localStorage.setItem("sessionToken", result.sessionToken);
    }
    if (result.refreshToken) {
      localStorage.setItem("refreshToken", result.refreshToken);
    }

    return {
      success: true,
      sessionToken: result.sessionToken,
      refreshToken: result.refreshToken,
    };
  } catch (error) {
    // Clear tokens on error
    localStorage.removeItem("sessionToken");
    localStorage.removeItem("refreshToken");
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

/**
 * React hook for session (simplified version)
 */
export function useSession(options?: { initialUser?: User | null }) {
  const initialUser = options?.initialUser ?? null;
  const [user, setUser] = React.useState<User | null>(initialUser);
  const [loading, setLoading] = React.useState<boolean>(
    initialUser ? false : true,
  );

  React.useEffect(() => {
    // If we already have server-provided initial user, skip client fetch
    if (initialUser) {
      return;
    }

    getSession()
      .then((result) => {
        if (result.success && result.user) {
          setUser(result.user);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [initialUser]);

  // Listen for auth changes (same-tab via CustomEvent, cross-tab via storage)
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const handleAuthChange = (e: Event) => {
      const custom = e as CustomEvent;
      if (
        custom &&
        custom.detail &&
        typeof custom.detail.user !== "undefined"
      ) {
        setUser(custom.detail.user);
        setLoading(false);
        return;
      }

      // Fallback: re-fetch session
      setLoading(true);
      getSession()
        .then((result) => {
          setUser(result.success ? (result.user ?? null) : null);
        })
        .catch(() => setUser(null))
        .finally(() => setLoading(false));
    };

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "sessionToken" || e.key === "refreshToken") {
        // Another tab changed auth tokens; re-fetch session
        setLoading(true);
        getSession()
          .then((result) => {
            setUser(result.success ? (result.user ?? null) : null);
          })
          .catch(() => setUser(null))
          .finally(() => setLoading(false));
      }
    };

    window.addEventListener("auth-change", handleAuthChange as EventListener);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener(
        "auth-change",
        handleAuthChange as EventListener,
      );
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return {
    data: { user },
    loading,
  };
}

// Export for backward compatibility with existing code
export const signInClient = {
  email: signIn,
};

export const signUpClient = {
  email: signUp,
};
