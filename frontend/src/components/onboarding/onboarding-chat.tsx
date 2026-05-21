"use client"

import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

import { AiMessage } from "@/components/onboarding/ai-message"
import { OnboardingInput } from "@/components/onboarding/onboarding-input"
import { OnboardingProgress } from "@/components/onboarding/onboarding-progress"
import { SuggestionChips } from "@/components/onboarding/suggestion-chips"
import { TypingLoader } from "@/components/onboarding/typing-loader"
import { UserMessage } from "@/components/onboarding/user-message"
import { useAuth } from "@/features/auth/hooks/use-auth"
import {
  sendOnboardingMessage,
  startOnboarding,
} from "@/features/onboarding/api/onboarding.api"
import type { OnboardingMessage } from "@/features/onboarding/types/onboarding.types"

function OnboardingChat() {
  const user = useAuth((state) => state.user)
  const token = useAuth((state) => state.token)
  const [messages, setMessages] = useState<OnboardingMessage[]>([])
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [isStarting, setIsStarting] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState<number | undefined>(undefined)
  const [isComplete, setIsComplete] = useState(false)
  const [stepLabel, setStepLabel] = useState("Getting started")
  const [stepIndex, setStepIndex] = useState(1)

  const totalSteps = 8

  const stepLabels: Record<string, string> = {
    intro: "Getting started",
    skill_assessment: "Skills",
    career_goals: "Career goals",
    education: "Education",
    projects: "Projects",
    experience: "Experience",
    preferences: "Preferences",
    wrap_up: "Wrap up",
  }

  const latestAssistant = useMemo(() => {
    return [...messages].reverse().find((message) => message.role === "assistant")
  }, [messages])

  const latestUser = useMemo(() => {
    return [...messages].reverse().find((message) => message.role === "user")
  }, [messages])

  const suggestions = useMemo(() => {
    const content = latestAssistant?.content ?? ""
    return buildSuggestions(content)
  }, [latestAssistant?.content])

  const updateProgressState = (
    response: { progress?: number; step?: string; isComplete: boolean },
  ) => {
    if (typeof response.progress === "number") {
      setProgress(response.progress)
      const index = Math.max(
        1,
        Math.min(totalSteps, Math.ceil((response.progress / 100) * totalSteps)),
      )
      setStepIndex(index)
    }
    if (response.step) {
      setStepLabel(stepLabels[response.step] ?? "Career profile")
    }
    setIsComplete(response.isComplete)
  }

  useEffect(() => {
    if (!user || sessionId || isStarting) return

    const start = async () => {
      setIsStarting(true)
      setError(null)
      try {
        const response = await startOnboarding({ userId: user.id }, token ?? undefined)
        setSessionId(response.sessionId)
        setMessages([
          {
            id: `assistant-${Date.now()}`,
            role: "assistant",
            content: response.message,
          },
        ])
        updateProgressState(response)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to start onboarding.")
      } finally {
        setIsStarting(false)
      }
    }

    void start()
  }, [user, sessionId, isStarting, token])

  const handleSend = async (message: string) => {
    if (!user || !sessionId) return
    setError(null)
    setIsSending(true)

    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, role: "user", content: message },
    ])

    try {
      const response = await sendOnboardingMessage(
        { userId: user.id, message, sessionId },
        token ?? undefined,
      )
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: response.message,
        },
      ])
      updateProgressState(response)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to send message.")
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="flex flex-col gap-6 rounded-[32px] border border-border/60 bg-card/80 p-6 shadow-[0_40px_90px_rgba(2,8,23,0.2)] backdrop-blur dark:border-white/10 dark:bg-white/[0.03]">
      <OnboardingProgress
        stepLabel={stepLabel}
        stepIndex={stepIndex}
        totalSteps={totalSteps}
        progress={progress}
      />

      {error ? (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      <div className="space-y-4">
        <AnimatePresence mode="wait">
          {latestAssistant ? (
            <motion.div
              key={latestAssistant.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              <AiMessage content={latestAssistant.content} />
            </motion.div>
          ) : (
            <motion.div
              key="starter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-sm text-muted-foreground"
            >
              {isStarting ? "Preparing your mentor..." : "Waiting for your first question."}
            </motion.div>
          )}
        </AnimatePresence>

        {isSending ? <TypingLoader /> : null}

        {!isSending && !isStarting && !isComplete ? (
          <SuggestionChips
            suggestions={suggestions}
            onSelect={handleSend}
            disabled={isSending || isStarting}
          />
        ) : null}

        {latestUser ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Your response
            </p>
            <UserMessage content={latestUser.content} className="mt-2" />
          </motion.div>
        ) : null}
      </div>

      <OnboardingInput
        disabled={isSending || isStarting || isComplete}
        onSend={handleSend}
      />

      {isComplete ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-muted-foreground"
        >
          Onboarding complete. You can continue to your dashboard.
        </motion.p>
      ) : null}
    </div>
  )
}

export { OnboardingChat }

function buildSuggestions(message: string): string[] {
  const text = message.toLowerCase()

  if (text.includes("education") || text.includes("degree") || text.includes("college")) {
    return ["B.Tech", "BCA", "B.Sc", "BA", "Commerce", "MBA"]
  }

  if (text.includes("skills") || text.includes("technolog") || text.includes("stack")) {
    return ["Python", "JavaScript", "React", "Node.js", "Java", "SQL"]
  }

  if (text.includes("goal") || text.includes("career")) {
    return [
      "Software Engineer",
      "Data Analyst",
      "Product Manager",
      "UX Designer",
      "AI/ML Engineer",
    ]
  }

  if (text.includes("project") || text.includes("experience")) {
    return ["Internships", "College projects", "Freelance", "Hackathons"]
  }

  if (text.includes("location") || text.includes("city")) {
    return ["India", "Remote", "USA", "Europe"]
  }

  return []
}
