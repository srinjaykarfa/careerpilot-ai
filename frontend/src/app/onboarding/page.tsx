"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Sparkles } from "lucide-react"

import { Navbar } from "@/components/landing/navbar"
import { Container } from "@/components/shared/container"
import { OnboardingChat } from "@/components/onboarding/onboarding-chat"
import { useAuth } from "@/features/auth/hooks/use-auth"

export default function OnboardingPage() {
  const router = useRouter()
  const [hydrated, setHydrated] = useState(false)
  const isAuthenticated = useAuth((state) => state.isAuthenticated)
  const user = useAuth((state) => state.user)

  useEffect(() => {
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    if (!isAuthenticated) {
      router.replace("/login")
    }
  }, [hydrated, isAuthenticated, router])

  if (!hydrated || !isAuthenticated) {
    return null
  }

  const name = user?.name ?? user?.email ?? "there"

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[320px] bg-[radial-gradient(circle_at_top,_rgba(8,145,178,0.16),_transparent_60%)] dark:bg-[radial-gradient(circle_at_top,_rgba(14,116,144,0.25),_transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(56,189,248,0.08),_transparent_55%)]" />
      <Navbar />
      <main className="relative">
        <Container className="grid w-full gap-12 py-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
              <Sparkles className="size-3 text-cyan-400" />
              Career AI onboarding
            </div>
            <h1 className="text-3xl font-heading font-semibold sm:text-4xl">
              Welcome {name}, let's personalize your mentor.
            </h1>
            <p className="max-w-md text-sm text-muted-foreground sm:text-base">
              Answer a few guided questions so we can tailor your roadmap and
              AI coaching experience.
            </p>
            <div className="rounded-2xl border border-border/60 bg-card/70 px-4 py-3 text-sm text-muted-foreground shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
              One focused question at a time. You can continue later if needed.
            </div>
            <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-cyan-500/15 via-transparent to-transparent px-4 py-3 text-xs text-muted-foreground shadow-sm dark:border-white/10">
              Your mentor listens, adapts, and guides you with every response.
            </div>
          </div>
          <OnboardingChat />
        </Container>
      </main>
    </div>
  )
}
