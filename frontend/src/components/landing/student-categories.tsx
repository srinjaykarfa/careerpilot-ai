import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { FadeIn } from "@/components/shared/fade-in"
import { categories } from "@/components/landing/data"

function StudentCategories() {
  return (
    <section className="bg-muted/30 py-16 sm:py-24 dark:bg-white/[0.02]">
      <Container className="space-y-12">
        <SectionHeading
          eyebrow="Who it is for"
          title="Built for every student journey"
          description="Whether you are starting out or switching paths, the platform adapts to your career goals."
          align="center"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <FadeIn
              key={category.title}
              className="rounded-2xl border border-border/50 bg-background/80 p-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-border/80 hover:shadow-lg hover:shadow-black/5 dark:border-white/10 dark:bg-white/[0.03] dark:hover:shadow-black/40"
              delay={index * 0.05}
            >
              <div className="flex size-10 items-center justify-center rounded-xl bg-muted">
                <category.icon className="size-5 text-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-heading font-semibold">
                {category.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {category.description}
              </p>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  )
}

export { StudentCategories }
