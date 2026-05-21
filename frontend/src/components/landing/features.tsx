import { SectionHeading } from "@/components/shared/section-heading"
import { Container } from "@/components/shared/container"
import { FadeIn } from "@/components/shared/fade-in"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { features } from "@/components/landing/data"

function Features() {
  return (
    <section id="features" className="bg-muted/30 py-16 sm:py-24 dark:bg-white/[0.02]">
      <Container className="space-y-12">
        <SectionHeading
          eyebrow="Features"
          title="Everything students need to move faster"
          description="One premium AI platform to mentor, optimize, and accelerate every career step."
          align="center"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FadeIn key={feature.title} delay={index * 0.05}>
              <Card className="h-full border-border/50 bg-card/80 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-border/80 hover:shadow-lg hover:shadow-black/5 dark:border-white/10 dark:bg-white/[0.03] dark:hover:shadow-black/40">
                <CardHeader>
                  <div className="flex size-10 items-center justify-center rounded-xl bg-muted">
                    <feature.icon className="size-5 text-foreground" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  )
}

export { Features }
