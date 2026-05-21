import Link from "next/link"
import { Check } from "lucide-react"

import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { FadeIn } from "@/components/shared/fade-in"
import { Button } from "@/components/ui/button"
import { pricingPlans } from "@/components/landing/data"

function Pricing() {
  return (
    <section id="pricing" className="py-16 sm:py-24">
      <Container className="space-y-12">
        <SectionHeading
          eyebrow="Pricing"
          title="Simple plans for every stage"
          description="Start free and upgrade as your career ambitions grow."
          align="center"
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <FadeIn
              key={plan.name}
              delay={index * 0.05}
              className={`rounded-3xl border p-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg ${
                plan.highlighted
                  ? "border-foreground/60 bg-foreground text-background shadow-xl hover:shadow-2xl"
                  : "border-border/50 bg-card/80 dark:border-white/10 dark:bg-white/[0.03]"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="text-lg font-heading font-semibold">
                  {plan.name}
                </div>
                {plan.highlighted ? (
                  <span className="rounded-full bg-background/15 px-2 py-1 text-xs">
                    Most popular
                  </span>
                ) : null}
              </div>
              <div className="mt-4 text-3xl font-heading font-semibold">
                {plan.price}
              </div>
              <p
                className={`mt-2 text-sm ${
                  plan.highlighted ? "text-background/80" : "text-muted-foreground"
                }`}
              >
                {plan.description}
              </p>
              <div className="mt-6 space-y-3 text-sm">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2">
                    <Check
                      className={`mt-0.5 size-4 ${
                        plan.highlighted ? "text-emerald-300" : "text-emerald-500"
                      }`}
                    />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <Button
                variant={plan.highlighted ? "secondary" : "default"}
                className={`mt-8 w-full ${
                  plan.highlighted
                    ? "bg-background text-foreground"
                    : "rounded-full"
                }`}
                asChild
              >
                <Link href="/signup">Start {plan.name}</Link>
              </Button>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  )
}

export { Pricing }
