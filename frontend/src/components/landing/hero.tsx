import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { FadeIn } from "@/components/shared/fade-in"
import { Floating } from "@/components/shared/floating"

function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pb-6 pt-5 sm:pb-9 sm:pt-7 lg:min-h-[calc(100svh-230px)] lg:pb-11 lg:pt-8"
    >
      <div className="pointer-events-none absolute left-1/2 top-[-180px] h-[540px] w-[740px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.16),_rgba(16,185,129,0.08),_transparent_68%)] opacity-55 blur-[120px] dark:opacity-80" />
      <div className="pointer-events-none absolute -top-28 right-8 h-64 w-64 rounded-full bg-gradient-to-br from-cyan-500/18 via-emerald-500/10 to-transparent blur-[100px] dark:from-cyan-400/18 dark:via-emerald-400/10" />
      <div className="pointer-events-none absolute -bottom-20 left-8 h-64 w-64 rounded-full bg-gradient-to-br from-emerald-500/16 via-cyan-500/10 to-transparent blur-[100px] dark:from-emerald-400/16 dark:via-cyan-400/10" />
      <div className="pointer-events-none absolute right-[18%] top-[35%] h-40 w-40 rounded-full bg-gradient-to-br from-cyan-400/12 via-emerald-400/8 to-transparent blur-[80px]" />
      <Container className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <FadeIn className="flex flex-col gap-5 sm:gap-6">
          <span className="inline-flex items-center gap-2 self-start rounded-full border border-border/70 bg-background/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            <Sparkles className="size-3" />
            AI-first career mentor
          </span>
          <h1 className="text-[2.4rem] font-heading font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl sm:leading-tight lg:text-6xl">
            Career clarity for every student with an
            <span className="block bg-gradient-to-r from-cyan-500 via-emerald-500 to-cyan-500 bg-clip-text text-transparent">
              AI personal mentor
            </span>
          </h1>
          <p className="max-w-xl text-[1.05rem] leading-7 text-muted-foreground sm:text-lg">
            Career AI Platform is not a job portal. It is a premium AI mentor
            that builds your roadmap, upgrades your resume, optimizes LinkedIn,
            and finds strategic roles that fit your future.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button size="lg" className="w-full rounded-full px-6 sm:w-auto" asChild>
              <Link href="/signup">
                Get started
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full rounded-full px-6 sm:w-auto"
              asChild
            >
              <Link href="#ai-chat">View AI demo</Link>
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <span className="size-2 rounded-full bg-emerald-400" />
              Live mentor responses
            </div>
            <div className="hidden h-4 w-px bg-border sm:block" />
            <div className="flex items-center gap-1">
              <span className="size-2 rounded-full bg-cyan-400" />
              ATS-ready resumes
            </div>
            <div className="hidden h-4 w-px bg-border sm:block" />
            <div className="flex items-center gap-1">
              <span className="size-2 rounded-full bg-foreground" />
              Smart job tracking
            </div>
          </div>
        </FadeIn>

        <FadeIn className="relative">
          <Floating className="relative origin-top-right lg:scale-[0.94] xl:scale-100">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-cyan-500/20 via-emerald-500/10 to-transparent blur-3xl" />
            <div className="relative rounded-3xl border border-border/50 bg-card/80 p-5 shadow-[0_30px_60px_rgba(0,0,0,0.08)] backdrop-blur dark:border-white/10 dark:bg-white/[0.03] dark:shadow-[0_30px_60px_rgba(0,0,0,0.45)]">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 font-medium">
                  <Sparkles className="size-4 text-cyan-500" />
                  AI Career Console
                </div>
                <span className="rounded-full bg-foreground px-2 py-0.5 text-xs text-background">
                  Live
                </span>
              </div>
              <div className="mt-4 grid gap-3">
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-border/50 bg-background/80 p-2.5 dark:border-white/10 dark:bg-white/[0.03]">
                    <div className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      Resume score
                    </div>
                    <div className="mt-2 flex items-end justify-between">
                      <div className="text-xl font-heading font-semibold">88</div>
                      <span className="text-[0.65rem] text-emerald-500">
                        ATS ready
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 rounded-full bg-muted">
                      <div className="h-1.5 w-[88%] rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500" />
                    </div>
                  </div>
                  <div className="rounded-2xl border border-border/50 bg-background/80 p-2.5 dark:border-white/10 dark:bg-white/[0.03]">
                    <div className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      Job match
                    </div>
                    <div className="mt-2 flex items-end justify-between">
                      <div className="text-xl font-heading font-semibold">86%</div>
                      <span className="text-[0.65rem] text-cyan-500">
                        Strong fit
                      </span>
                    </div>
                    <div className="mt-2 text-[0.7rem] text-muted-foreground">
                      12 roles curated
                    </div>
                  </div>
                  <div className="rounded-2xl border border-border/50 bg-background/80 p-2.5 dark:border-white/10 dark:bg-white/[0.03]">
                    <div className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      Roadmap
                    </div>
                    <div className="mt-2 flex items-end justify-between">
                      <div className="text-xl font-heading font-semibold">6/9</div>
                      <span className="text-[0.65rem] text-emerald-500">
                        On track
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 rounded-full bg-muted">
                      <div className="h-1.5 w-[66%] rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500" />
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border border-border/50 bg-background/80 p-3.5 dark:border-white/10 dark:bg-white/[0.03]">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      Mentor chat
                    </div>
                    <span className="text-xs text-emerald-500">Online</span>
                  </div>
                  <div className="mt-3 space-y-2 text-sm">
                    <div className="rounded-xl bg-muted/80 p-2 text-muted-foreground">
                      Build a 90-day plan for data analytics roles.
                    </div>
                    <div className="ml-auto w-fit rounded-xl bg-foreground px-3 py-2 text-background">
                      Done. Drafting the roadmap now.
                    </div>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-border/50 bg-background/80 p-3.5 dark:border-white/10 dark:bg-white/[0.03]">
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      Roadmap progress
                    </div>
                    <div className="mt-3 space-y-2">
                      <div>
                        <div className="flex items-center justify-between text-xs">
                          <span>Foundations</span>
                          <span>70%</span>
                        </div>
                        <div className="mt-1 h-2 rounded-full bg-muted">
                          <div className="h-2 w-[70%] rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500" />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-xs">
                          <span>Portfolio</span>
                          <span>45%</span>
                        </div>
                        <div className="mt-1 h-2 rounded-full bg-muted">
                          <div className="h-2 w-[45%] rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-border/50 bg-background/80 p-3.5 dark:border-white/10 dark:bg-white/[0.03]">
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      AI insights
                    </div>
                    <div className="mt-3 space-y-2 text-xs text-muted-foreground">
                      <div className="rounded-lg bg-muted/70 px-3 py-2">
                        Add Tableau + SQL to boost analytics matches.
                      </div>
                      <div className="rounded-lg bg-muted/70 px-3 py-2">
                        Update LinkedIn headline for internship visibility.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border border-border/50 bg-background/80 p-3.5 dark:border-white/10 dark:bg-white/[0.03]">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      Job tracker
                    </div>
                    <span className="text-xs text-muted-foreground">This week</span>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-3 text-center text-xs">
                    <div className="rounded-xl bg-muted/70 p-3">
                      <div className="text-lg font-semibold text-foreground">18</div>
                      Applied
                    </div>
                    <div className="rounded-xl bg-muted/70 p-3">
                      <div className="text-lg font-semibold text-foreground">5</div>
                      Interviews
                    </div>
                    <div className="rounded-xl bg-muted/70 p-3">
                      <div className="text-lg font-semibold text-foreground">2</div>
                      Offers
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Floating>
        </FadeIn>
      </Container>
    </section>
  )
}

export { Hero }
