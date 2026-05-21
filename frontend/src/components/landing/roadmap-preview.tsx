import { CheckCircle2 } from "lucide-react"

import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { FadeIn } from "@/components/shared/fade-in"
import { roadmapSteps } from "@/components/landing/data"

function RoadmapPreview() {
  return (
    <section id="roadmap" className="py-16 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-[0.45fr_0.55fr] lg:items-center">
        <FadeIn className="space-y-6">
          <SectionHeading
            eyebrow="Career roadmap"
            title="A guided path, not random advice"
            description="Follow milestone-based roadmaps that turn your goals into measurable progress."
          />
          <div className="rounded-3xl border border-border/50 bg-card/80 p-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5 dark:border-white/10 dark:bg-white/[0.03] dark:hover:shadow-black/40">
            <div className="text-sm font-medium">Roadmap health</div>
            <div className="mt-2 text-3xl font-heading font-semibold">82%</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Based on completed tasks, skill scores, and mentor feedback.
            </p>
          </div>
        </FadeIn>
        <FadeIn className="space-y-6">
          {roadmapSteps.map((step) => (
            <div
              key={step.title}
              className="rounded-3xl border border-border/50 bg-background/80 p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5 dark:border-white/10 dark:bg-white/[0.03] dark:hover:shadow-black/40"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-heading font-semibold">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
                <span className="text-xs font-semibold text-muted-foreground">
                  {step.timeframe}
                </span>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Progress</span>
                  <span>{step.progress}%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500"
                    style={{ width: `${step.progress}%` }}
                  />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <CheckCircle2 className="size-4 text-emerald-500" />
                Tasks and resources unlocked
              </div>
            </div>
          ))}
        </FadeIn>
      </Container>
    </section>
  )
}

export { RoadmapPreview }
