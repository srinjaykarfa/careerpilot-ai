import { Container } from "@/components/shared/container"
import { FadeIn } from "@/components/shared/fade-in"
import { trustHighlights } from "@/components/landing/data"

function Trust() {
  return (
    <section className="border-y border-border/60 bg-muted/30 py-12 dark:bg-white/[0.02]">
      <Container className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <FadeIn className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Built for students
          </p>
          <h3 className="text-2xl font-heading font-semibold text-foreground sm:text-3xl">
            The AI career mentor built for every stream, every stage.
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            From engineering to arts, the platform adapts to your goals and
            delivers a premium, student-friendly career experience.
          </p>
        </FadeIn>
        <div className="grid gap-4 sm:grid-cols-3">
          {trustHighlights.map((item) => (
            <FadeIn
              key={item.label}
              className="rounded-2xl border border-border/50 bg-background/80 p-4 text-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-border/80 hover:shadow-lg hover:shadow-black/5 dark:border-white/10 dark:bg-white/[0.03] dark:hover:shadow-black/40"
            >
              <item.icon className="size-4 text-cyan-500" />
              <div className="mt-3 text-2xl font-heading font-semibold text-foreground">
                {item.value}
              </div>
              <div className="text-xs text-muted-foreground">{item.label}</div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  )
}

export { Trust }
