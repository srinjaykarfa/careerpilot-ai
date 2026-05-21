import { SectionHeading } from "@/components/shared/section-heading"
import { Container } from "@/components/shared/container"
import { FadeIn } from "@/components/shared/fade-in"
import { steps } from "@/components/landing/data"

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 sm:py-24">
      <Container className="space-y-12">
        <SectionHeading
          eyebrow="How it works"
          title="A four-step AI career journey"
          description="Career AI Platform understands your context, builds your roadmap, and guides you to the right roles with focus and clarity."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <FadeIn
              key={step.title}
              className="rounded-2xl border border-border/60 bg-card/70 p-5"
              delay={index * 0.05}
            >
              <div className="flex items-center justify-between">
                <div className="flex size-10 items-center justify-center rounded-xl bg-muted">
                  <step.icon className="size-5 text-foreground" />
                </div>
                <span className="text-xs font-semibold text-muted-foreground">
                  0{index + 1}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-heading font-semibold">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  )
}

export { HowItWorks }
