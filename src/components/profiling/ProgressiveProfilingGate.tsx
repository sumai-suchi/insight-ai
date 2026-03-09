"use client";

import React from "react";
import { useSessionContext } from "@/lib/auth/session-context";
import { ProgressiveProfilingModal, type ProgressiveProfilingAnswers } from "./ProgressiveProfilingModal";

type ProgressiveStatusResponse = {
  answers: Partial<ProgressiveProfilingAnswers>;
  profiling: {
    completedAt: string | null;
    updatedAt: string | null;
    version: number;
  };
};

const DISMISS_KEY = "insightai_profiling_dismissed_until";
const DISMISS_HOURS = 24;

function getDismissedUntil(): number {
  try {
    const raw = localStorage.getItem(DISMISS_KEY);
    if (!raw) return 0;
    const n = Number(raw);
    return Number.isFinite(n) ? n : 0;
  } catch {
    return 0;
  }
}

function setDismissedUntil(ts: number) {
  try {
    localStorage.setItem(DISMISS_KEY, String(ts));
  } catch {
    // ignore
  }
}

export default function ProgressiveProfilingGate() {
  const { user, loading } = useSessionContext();
  const [open, setOpen] = React.useState(false);
  const [initialAnswers, setInitialAnswers] = React.useState<Partial<ProgressiveProfilingAnswers>>({});
  const [checking, setChecking] = React.useState(false);

  // Avoid repeated checks for the same user id
  const lastCheckedUserId = React.useRef<string | null>(null);

  React.useEffect(() => {
    if (loading) return;
    if (!user?.id) {
      setOpen(false);
      lastCheckedUserId.current = null;
      return;
    }

    if (lastCheckedUserId.current === user.id) return;
    lastCheckedUserId.current = user.id;

    const dismissedUntil = getDismissedUntil();
    if (dismissedUntil && dismissedUntil > Date.now()) return;

    let cancelled = false;
    (async () => {
      setChecking(true);
      try {
        const res = await fetch("/api/profile/progressive", { method: "GET" });
        if (!res.ok) return;
        const data = (await res.json()) as ProgressiveStatusResponse;
        if (cancelled) return;

        setInitialAnswers(data.answers || {});
        const completedAt = data.profiling?.completedAt;
        if (!completedAt) {
          setOpen(true);
        }
      } finally {
        if (!cancelled) setChecking(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [loading, user?.id]);

  async function handleConfirm(answers: ProgressiveProfilingAnswers) {
    const res = await fetch("/api/profile/progressive", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(answers),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      throw new Error(data?.error || "Failed to save profiling");
    }
    // once saved, prevent re-opening
    setOpen(false);
  }

  function handleSkip() {
    setDismissedUntil(Date.now() + DISMISS_HOURS * 60 * 60 * 1000);
    setOpen(false);
  }

  // Don’t render until we know auth state; keeps initial render stable.
  if (loading) return null;
  if (!user) return null;

  return (
    <>
      {/* `checking` is kept for future UX (spinner badge), but not required visually */}
      <div className="hidden" aria-hidden="true" data-checking={checking ? "1" : "0"} />
      <ProgressiveProfilingModal
        open={open}
        initialAnswers={initialAnswers}
        onSkip={handleSkip}
        onConfirm={handleConfirm}
        onClose={() => setOpen(false)}
      />
    </>
  );
}


