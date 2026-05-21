import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Container } from "@/components/shared/container"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/shared/fade-in"

function FinalCta() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <FadeIn className="relative overflow-hidden rounded-3xl border border-border/60 bg-foreground px-6 py-12 text-background sm:px-12">
          <div className="pointer-events-none absolute -top-20 right-10 h-48 w-48 rounded-full bg-gradient-to-br from-cyan-300/40 via-emerald-300/20 to-transparent blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-10 h-56 w-56 rounded-full bg-gradient-to-br from-emerald-300/30 via-cyan-300/10 to-transparent blur-3xl" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-background/70">
                Build your future
              </p>
              <h2 className="text-3xl font-heading font-semibold sm:text-4xl">
                Your career deserves a mentor who believes in you.
              </h2>
              <p className="max-w-xl text-[1.05rem] leading-7 text-background/80 sm:text-base lg:text-lg">
                From uncertainty to your first offer, Career AI Platform guides
                every step with a supportive AI mentor that upgrades, motivates,
                and keeps you moving forward.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                className="rounded-full bg-background text-foreground"
                asChild
              >
                <Link href="/signup">
                  Start free today
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-background/30 text-background hover:bg-background/10"
                asChild
              >
                <Link href="/login">Talk to sales</Link>
              </Button>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}

export { FinalCta }
