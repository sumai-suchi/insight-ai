"use client";

import React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  getWorkTypesForIndustry,
  industries,
  teamSizes,
  type IndustryId,
  type TeamSizeId,
  type WorkTypeId,
} from "@/lib/profiling/options";

export type ProgressiveProfilingAnswers = {
  industry: IndustryId | "";
  teamSize: TeamSizeId | "";
  workType: WorkTypeId | "";
  companyName: string;
  websiteUrl: string;
};

type StepId = "industry" | "teamSize" | "workType" | "company";

type ChatMessage =
  | { id: string; role: "assistant"; content: string }
  | { id: string; role: "user"; content: string };

type State = {
  step: StepId;
  answers: ProgressiveProfilingAnswers;
  messages: ChatMessage[];
  saving: boolean;
  error: string;
};

type Action =
  | { type: "hydrate"; answers: Partial<ProgressiveProfilingAnswers>; completed?: boolean }
  | { type: "answerIndustry"; value: IndustryId }
  | { type: "answerTeamSize"; value: TeamSizeId }
  | { type: "answerWorkType"; value: WorkTypeId }
  | { type: "setCompanyName"; value: string }
  | { type: "setWebsiteUrl"; value: string }
  | { type: "setSaving"; value: boolean }
  | { type: "setError"; value: string }
  | { type: "resetError" };

const qIndustry = "What industry do you work in?";
const qTeamSize = "What’s the team size for your project?";
const qWorkType = "What kind of work do you do?";
const qCompany = "What’s your company name or website?";

function uid(prefix: string) {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;
}

function stepFromAnswers(a: ProgressiveProfilingAnswers): StepId {
  if (!a.industry) return "industry";
  if (!a.teamSize) return "teamSize";
  if (!a.workType) return "workType";
  return "company";
}

function labelForIndustry(id: IndustryId) {
  return industries.find((i) => i.id === id)?.label ?? id;
}

function labelForTeamSize(id: TeamSizeId) {
  return teamSizes.find((t) => t.id === id)?.label ?? id;
}

function labelForWorkType(industry: IndustryId | "", id: WorkTypeId) {
  const list = getWorkTypesForIndustry(industry || "other");
  return list.find((w) => w.id === id)?.label ?? id;
}

function buildMessages(a: ProgressiveProfilingAnswers): ChatMessage[] {
  const m: ChatMessage[] = [{ id: uid("a"), role: "assistant", content: qIndustry }];
  if (a.industry) {
    m.push({ id: uid("u"), role: "user", content: labelForIndustry(a.industry) });
    m.push({ id: uid("a"), role: "assistant", content: qTeamSize });
  }
  if (a.teamSize) {
    m.push({ id: uid("u"), role: "user", content: labelForTeamSize(a.teamSize) });
    m.push({ id: uid("a"), role: "assistant", content: qWorkType });
  }
  if (a.workType) {
    m.push({
      id: uid("u"),
      role: "user",
      content: labelForWorkType(a.industry, a.workType),
    });
    m.push({ id: uid("a"), role: "assistant", content: qCompany });
  }
  return m;
}

const initialState: State = {
  step: "industry",
  answers: {
    industry: "",
    teamSize: "",
    workType: "",
    companyName: "",
    websiteUrl: "",
  },
  messages: [{ id: uid("a"), role: "assistant", content: qIndustry }],
  saving: false,
  error: "",
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "hydrate": {
      const answers: ProgressiveProfilingAnswers = {
        ...state.answers,
        ...action.answers,
      };
      const step = stepFromAnswers(answers);
      return {
        ...state,
        answers,
        step,
        messages: buildMessages(answers),
        error: "",
      };
    }
    case "answerIndustry": {
      const answers: ProgressiveProfilingAnswers = {
        ...state.answers,
        industry: action.value,
        // reset downstream
        teamSize: "",
        workType: "",
      };
      return {
        ...state,
        answers,
        step: "teamSize",
        messages: buildMessages(answers),
        error: "",
      };
    }
    case "answerTeamSize": {
      const answers: ProgressiveProfilingAnswers = { ...state.answers, teamSize: action.value, workType: "" };
      return {
        ...state,
        answers,
        step: "workType",
        messages: buildMessages(answers),
        error: "",
      };
    }
    case "answerWorkType": {
      const answers: ProgressiveProfilingAnswers = { ...state.answers, workType: action.value };
      return {
        ...state,
        answers,
        step: "company",
        messages: buildMessages(answers),
        error: "",
      };
    }
    case "setCompanyName":
      return { ...state, answers: { ...state.answers, companyName: action.value } };
    case "setWebsiteUrl":
      return { ...state, answers: { ...state.answers, websiteUrl: action.value } };
    case "setSaving":
      return { ...state, saving: action.value };
    case "setError":
      return { ...state, error: action.value };
    case "resetError":
      return { ...state, error: "" };
    default:
      return state;
  }
}

export function ProgressiveProfilingModal({
  open,
  initialAnswers,
  onSkip,
  onConfirm,
  onClose,
}: {
  open: boolean;
  initialAnswers?: Partial<ProgressiveProfilingAnswers>;
  onSkip: () => void;
  onConfirm: (answers: ProgressiveProfilingAnswers) => Promise<void> | void;
  onClose: () => void;
}) {
  const [mounted, setMounted] = React.useState(false);
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    if (!open) return;
    dispatch({ type: "hydrate", answers: initialAnswers ?? {} });
  }, [open, initialAnswers]);

  // ESC close
  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const canConfirm = Boolean(state.answers.industry && state.answers.teamSize && state.answers.workType);

  async function handleConfirm() {
    if (!canConfirm || state.saving) return;
    dispatch({ type: "setSaving", value: true });
    dispatch({ type: "resetError" });
    try {
      await onConfirm(state.answers);
      onClose();
    } catch (e) {
      dispatch({ type: "setError", value: e instanceof Error ? e.message : "Failed to save profile" });
    } finally {
      dispatch({ type: "setSaving", value: false });
    }
  }

  if (!mounted) return null;
  if (!open) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-xs"
        onMouseDown={(e) => {
          // close only if clicking overlay (not dialog content)
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          key="panel"
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ type: "spring", damping: 24, stiffness: 240 }}
          className="mx-auto mt-[8vh] w-[92vw] max-w-2xl"
        >
          <Card className="py-0 overflow-hidden shadow-xl border-gray-200">
            <div className="flex items-center justify-between px-5 py-4 border-b bg-white">
              <div>
                <div className="text-sm font-semibold text-gray-900">Quick setup</div>
                <div className="text-xs text-gray-500">Answer 4 short questions to personalize your experience.</div>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close">
                <X />
              </Button>
            </div>

            <div className="bg-gray-50">
              <ScrollArea className="h-[56vh] px-5 py-4">
                <div className="space-y-3">
                  {state.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn(
                        "flex",
                        msg.role === "assistant" ? "justify-start" : "justify-end",
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[85%] rounded-2xl px-4 py-2 text-sm leading-relaxed shadow-sm",
                          msg.role === "assistant"
                            ? "bg-white text-gray-900 border border-gray-200"
                            : "bg-blue-600 text-white",
                        )}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}

                  <AnimatePresence mode="popLayout">
                    {state.step === "industry" && (
                      <motion.div
                        key="step_industry"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1"
                      >
                        {industries.map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => dispatch({ type: "answerIndustry", value: opt.id })}
                            className="text-left rounded-xl border border-gray-200 bg-white hover:bg-blue-50 hover:border-blue-200 transition px-4 py-3"
                          >
                            <div className="text-sm font-semibold text-gray-900">{opt.label}</div>
                          </button>
                        ))}
                      </motion.div>
                    )}

                    {state.step === "teamSize" && (
                      <motion.div
                        key="step_team"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="flex flex-wrap gap-2 pt-1"
                      >
                        {teamSizes.map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => dispatch({ type: "answerTeamSize", value: opt.id })}
                            className="rounded-full border border-gray-200 bg-white hover:bg-blue-50 hover:border-blue-200 transition px-4 py-2 text-sm font-medium text-gray-800"
                          >
                            {opt.label}
                          </button>
                        ))}
                      </motion.div>
                    )}

                    {state.step === "workType" && (
                      <motion.div
                        key="step_work"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1"
                      >
                        {getWorkTypesForIndustry(state.answers.industry || "other").map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => dispatch({ type: "answerWorkType", value: opt.id })}
                            className="text-left rounded-xl border border-gray-200 bg-white hover:bg-blue-50 hover:border-blue-200 transition px-4 py-3"
                          >
                            <div className="text-sm font-semibold text-gray-900">{opt.label}</div>
                          </button>
                        ))}
                      </motion.div>
                    )}

                    {state.step === "company" && (
                      <motion.div
                        key="step_company"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="space-y-2 pt-1"
                      >
                        <Input
                          value={state.answers.companyName}
                          onChange={(e) => dispatch({ type: "setCompanyName", value: e.target.value })}
                          placeholder="Company name (optional)"
                        />
                        <Input
                          value={state.answers.websiteUrl}
                          onChange={(e) => dispatch({ type: "setWebsiteUrl", value: e.target.value })}
                          placeholder="Website URL (optional)"
                        />
                        <div className="text-xs text-gray-500">
                          Tip: you can paste a domain like <span className="font-medium">example.com</span>.
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollArea>
            </div>

            <div className="px-5 py-4 border-t bg-white">
              {state.error && (
                <div className="mb-3 rounded-lg bg-red-50 border border-red-100 text-red-700 px-3 py-2 text-sm">
                  {state.error}
                </div>
              )}
              <div className="flex items-center justify-between gap-3">
                <Button variant="ghost" onClick={onSkip} disabled={state.saving}>
                  Skip for now
                </Button>
                <div className="flex items-center gap-2">
                  <Button variant="outline" onClick={onClose} disabled={state.saving}>
                    Not now
                  </Button>
                  <Button onClick={handleConfirm} disabled={!canConfirm || state.saving}>
                    {state.saving ? "Saving..." : "Confirm & save"}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}


