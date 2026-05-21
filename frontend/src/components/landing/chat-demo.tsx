import { CheckCircle2, MessageSquare } from "lucide-react"

import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { FadeIn } from "@/components/shared/fade-in"
import { chatMessages } from "@/components/landing/data"

function ChatDemo() {
  return (
    <section id="ai-chat" className="py-16 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-[0.55fr_0.45fr] lg:items-center">
        <FadeIn className="space-y-6">
          <SectionHeading
            eyebrow="AI mentor chat"
            title="Real conversations that move careers"
            description="Students get instant answers, personalized roadmaps, and action-ready next steps with every chat."
          />
          <div className="rounded-3xl border border-border/50 bg-card/80 p-6 shadow-lg shadow-black/5 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10 dark:border-white/10 dark:bg-white/[0.03] dark:shadow-black/50">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 font-medium">
                <MessageSquare className="size-4 text-cyan-500" />
                Career AI Mentor
              </div>
              <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs text-emerald-500">
                Live
              </span>
            </div>
            <div className="mt-4 space-y-3 text-sm">
              {chatMessages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={
                    message.role === "user"
                      ? "ml-auto w-fit max-w-[80%] rounded-2xl bg-foreground px-4 py-3 text-background"
                      : "w-fit max-w-[80%] rounded-2xl bg-muted px-4 py-3 text-muted-foreground"
                  }
                >
                  {message.text}
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
        <FadeIn className="space-y-6">
          <div className="rounded-3xl border border-border/50 bg-background/80 p-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5 dark:border-white/10 dark:bg-white/[0.03] dark:hover:shadow-black/40">
            <h3 className="text-lg font-heading font-semibold">
              Your AI insights summary
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Personalized recommendations to upgrade your profile and keep you on track.
            </p>
            <div className="mt-6 space-y-3 text-sm">
              {[
                "Roadmap tailored to your target role",
                "ATS keyword gaps highlighted",
                "Portfolio tasks scheduled",
                "Weekly mentor check-ins",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 text-emerald-500" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-border/50 bg-card/80 p-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5 dark:border-white/10 dark:bg-white/[0.03] dark:hover:shadow-black/40">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Next focus
            </div>
            <div className="mt-4 space-y-2">
              <div className="rounded-2xl bg-muted/70 p-4 text-sm">
                Complete your capstone case study and publish on LinkedIn.
              </div>
              <div className="rounded-2xl bg-muted/70 p-4 text-sm">
                Apply to 8 internships aligned with your roadmap.
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}

export { ChatDemo }
